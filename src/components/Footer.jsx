import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="footerWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'var(--bg-secondary)', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: 'var(--bg-secondary)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'var(--bg-secondary)', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            fill="url(#footerWaveGrad)"
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
          />
        </svg>
      </div>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>DSA Master</h3>
              <p>Master Data Structures and Algorithms with interactive visualizations</p>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <p>
                &copy; {year} DSA Master. Designed &amp; developed by Mendis (Your friendly neighbourhood AI 🤖)
              </p>
            </div>
            <div className="social-links">
              <a href="#" aria-label="GitHub"><FaGithub /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
