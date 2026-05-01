import { Link } from "react-router-dom";
import { FaClock, FaCalendarAlt, FaArrowRight, FaRocket } from "react-icons/fa";
import { allPosts } from "./blogData";
import "./Blog.css";

const BlogListing = () => {
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
        {allPosts.map((post, i) => (
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
                  <span className="blog-meta"><FaClock /> {post.readTime} read</span>
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
