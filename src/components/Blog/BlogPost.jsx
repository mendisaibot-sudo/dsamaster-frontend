import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaCalendarAlt, FaClock, FaBookmark, FaTwitter, FaLinkedin, FaGithub,
  FaTag, FaRocket, FaCode, FaBrain, FaLightbulb, FaArrowLeft
} from 'react-icons/fa';
import { allPosts } from './blogData';
import { API_BASE } from '../../utils/auth';
import './Blog.css';

const iconMap = { code: FaCode, brain: FaBrain, lightbulb: FaLightbulb, rocket: FaRocket };

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [contentData, setContentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetch(`${API_BASE}/blogs/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (cancelled) return;
        if (data?.data) {
          const p = data.data;
          setPost({
            ...p,
            readTime: typeof p.readTime === 'number' ? `${p.readTime} min` : p.readTime,
            tags: Array.isArray(p.tags) ? p.tags : [],
          });
          setContentData({ sections: p.sections || [] });
        } else {
          const local = allPosts.find(p => p.slug === slug);
          setPost(local || null);
          if (local) {
            import(`./blogContent/${slug}.json`)
              .then(m => setContentData(m.default || m))
              .catch(() => setContentData(null));
          }
        }
      })
      .catch(() => {
        if (cancelled) return;
        const local = allPosts.find(p => p.slug === slug);
        setPost(local || null);
        if (local) {
          import(`./blogContent/${slug}.json`)
            .then(m => setContentData(m.default || m))
            .catch(() => setContentData(null));
        }
      })
      .finally(() => setLoading(false));
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    const fn = () => {
      const top = window.scrollY;
      const doc = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(doc > 0 ? Math.min(100, Math.max(0, (top / doc) * 100)) : 0);
    };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (loading) {
    return (
      <div className="blog-page" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
        Loading article...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-page not-found">
        <h2>Article not found</h2>
        <Link to="/blog" className="back-link"><FaArrowLeft /> Back to Blog</Link>
      </div>
    );
  }

  const fallbackContent = `Content for "${post.title}" is currently unavailable. Check back soon!`;

  return (
    <div className="blog-page">
      <div className="reading-progress-bar">
        <div className="progress-fill" style={{ width: `${readingProgress}%` }} />
      </div>

      <section className="blog-hero">
        <div className="hero-gradient-overlay" />
        <div className="blog-hero-content">
          <div className="blog-meta-top">
            <span className="blog-category-badge"><FaRocket /> {post.category}</span>
            <span className="blog-read-time"><FaClock /> {post.readTime} read</span>
          </div>
          <h1 className="blog-title">{post.title}</h1>
          <p className="blog-subtitle">{post.subtitle}</p>
          <div className="blog-author-row">
            <div className="blog-author-avatar">
              <img src={post.authorAvatar} alt={post.author} />
            </div>
            <div className="blog-author-info">
              <span className="author-name">{post.author}</span>
              <span className="author-title">{post.authorTitle}</span>
            </div>
            <div className="blog-date"><FaCalendarAlt /> {post.date}</div>
          </div>
        </div>
        {post.heroImage && (
          <div className="blog-hero-illustration">
            <img src={post.heroImage} alt={post.title} />
          </div>
        )}
      </section>

      <article className="blog-article">
        <div className="blog-container">
          <aside className="blog-sidebar">
            <button className={`sidebar-btn bookmark-btn ${bookmarked ? 'active' : ''}`} onClick={() => setBookmarked(!bookmarked)}><FaBookmark /></button>
            <button className="sidebar-btn share-btn twitter"><FaTwitter /></button>
            <button className="sidebar-btn share-btn linkedin"><FaLinkedin /></button>
            <button className="sidebar-btn share-btn github"><FaGithub /></button>
            <Link to="/blog" className="sidebar-btn share-btn back" aria-label="Back to blog"><FaArrowLeft /></Link>
          </aside>

          <div className="blog-content">
            {contentData ? (
              contentData.sections.map((section, idx) => {
                const IconComp = iconMap[section.icon] || FaRocket;
                return (
                  <section key={idx} className={`blog-section ${section.conclusion ? 'conclusion' : ''}`}>
                    {!section.conclusion ? (
                      <div className="section-header">
                        <div className={`section-icon-wrapper ${section.icon === 'rocket' && !section.conclusion ? 'warning' : ''}`}>
                          <IconComp />
                        </div>
                        <h2>{section.title}</h2>
                      </div>
                    ) : (
                      <h2>{section.title}</h2>
                    )}

                    {section.illustration && (
                      <div className="section-illustration">
                        <img src={section.illustration} alt={section.title} />
                      </div>
                    )}

                    {section.content?.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}

                    {section.highlightBox && (
                      <div className="blog-highlight-box">
                        <h4><FaTag /> {section.highlightBox.title}</h4>
                        <ul>
                          {section.highlightBox.items.map((item, iIdx) => (
                            <li key={iIdx}><strong>{item.bold}</strong>{item.text}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.contentAfter?.map((para, aIdx) => (
                      <p key={`after-${aIdx}`}>{para}</p>
                    ))}

                    {section.quote && (
                      <blockquote className={`blog-quote ${section.quote.accent ? 'accent' : ''}`}>
                        <span className="quote-mark">&ldquo;</span>
                        <p>{section.quote.text}</p>
                        <cite>{section.quote.cite}</cite>
                      </blockquote>
                    )}
                  </section>
                );
              })
            ) : (
              <p className="lead">{fallbackContent}</p>
            )}

            <Link to="/blog" className="back-link"><FaArrowLeft /> Back to all articles</Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
