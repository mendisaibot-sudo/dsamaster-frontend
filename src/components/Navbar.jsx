import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useScrollspy } from '../hooks/useScrollspy';
import { FaCodeBranch, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import './Navbar.css';

const navLinks = [
  { id: 'home', label: 'Home', path: '/', type: 'route' },
  { id: 'datastructures', label: 'Data Structures', path: '/datastructures', type: 'route' },
  { id: 'algorithms', label: 'Algorithms', path: '/algorithms', type: 'route' },
  { id: 'problems', label: 'Problems', path: '/problems', type: 'route' },
  { id: 'progress', label: 'Progress', path: '/progress', type: 'route' },
  { id: 'blog', label: 'Blog', path: '/blog', type: 'route' }
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const activeId = useScrollspy(navLinks.map(link => link.id), 100);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e, link) => {
    // All links are now routes, just close mobile menu
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-brand" onClick={() => setMobileMenuOpen(false)}>
          <FaCodeBranch className="brand-icon" />
          <span>DSA Master</span>
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            <li key={link.id}>
              <Link
                to={link.path}
                className={activeId === link.id ? 'active' : ''}
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
