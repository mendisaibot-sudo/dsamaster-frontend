import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaClock, FaCalendarAlt, FaArrowRight, FaRocket } from "react-icons/fa";
import { API_BASE } from "../../utils/auth";
import "./Blog.css";

const BlogListing = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/blogs`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        setPosts(data?.data || []);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="blog-page">
      <section className="blog-listing-hero">
        <div className="hero-gradient-overlay" />
        <div className="blog-listing-content">
          <span className="blog-category-badge large"><FaRocket /> Mendis Blog</span>
          <h1 className="blog-title">Latest <span className="gradient-text">Articles</span></h1>
          <p className="blog-subtitle">Thoughts on AI, algorithms, software engineering, and building the future.</p>
        </div>
      </section>
      <div className="blog-loading" style={{ textAlign: "center", padding: "3rem", color: "var(--text-secondary)" }}>Loading articles...</div>
    </div>
  );
  return (
    <div className="blog-page">
      <section className="blog-listing-hero">
        <div className="hero-gradient-overlay" />
        <div className="blog-listing-content">
          <span className="blog-category-badge large">
            <FaRocket /> Mendis Blog
          </span>
          <h1 className="blog-title">Latest <span className="gradient-text">Articles</span></h1>
          <p className="blog-subtitle">
            Thoughts on AI, algorithms, software engineering, and building the future.
          </p>
        </div>
      </section>

      <section className="blog-listing-grid">
        {posts.map((post, i) => (
          <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-card-link">
            <article className="blog-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="blog-card-image-wrapper">
                <img src={post.heroImage} alt={post.title} loading="lazy" />
                <div className="blog-card-category">{post.category}</div>
              </div>
              <div className="blog-card-body">
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-footer">
                  <span className="blog-meta"><FaCalendarAlt /> {post.date}</span>
                  <span className="blog-meta"><FaClock /> {typeof post.readTime === 'number' ? `${post.readTime} min` : post.readTime} read</span>
                  <span className="read-more">Read <FaArrowRight /></span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default BlogListing;
