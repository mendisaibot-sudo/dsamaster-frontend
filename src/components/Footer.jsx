import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
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
  );
};

export default Footer;
