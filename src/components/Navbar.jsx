import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useScrollspy } from '../hooks/useScrollspy';
import { FaBars, FaTimes, FaMoon, FaSun, FaUser, FaSignOutAlt, FaCodeBranch } from 'react-icons/fa';
import DSALogo from './DSALogo';
import './Navbar.css';

const navLinks = [
  { id: 'home', label: 'Home', path: '/', type: 'route' },
  { id: 'datastructures', label: 'Data Structures', path: '/datastructures', type: 'route' },
  { id: 'algorithms', label: 'Algorithms', path: '/algorithms', type: 'route' },
  { id: 'statistics', label: 'Statistics', path: '/statistics', type: 'route' },
  { id: 'machinelearning', label: 'Machine Learning', path: '/machine-learning', type: 'route' },
  { id: 'problems', label: 'Problems', path: '/problems', type: 'route' },
  { id: 'progress', label: 'Progress', path: '/progress', type: 'route' },
  { id: 'blog', label: 'Blog', path: '/blog', type: 'route' }
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-brand" onClick={() => setMobileMenuOpen(false)}>
          <DSALogo size={36} />
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

        <div className="nav-actions">
          {user ? (
            <div className="nav-user-menu">
              <div className="nav-user-trigger">
                <div className="nav-user-avatar">
                  {user.first_name?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="nav-user-name">{user.first_name}</span>
              </div>
              <div className="nav-user-dropdown">
                <div className="nav-user-info">
                  <span className="nav-user-fullname">{user.first_name} {user.last_name}</span>
                  <span className="nav-user-email">{user.email}</span>
                </div>
                <div className="nav-user-divider" />
                <Link to="/profile" className="nav-user-item">
                  <FaUser /> My Profile
                </Link>
                <Link to="/progress" className="nav-user-item">
                  <FaCodeBranch /> My Progress
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin/panel" className="nav-user-item">
                    <FaUser /> Admin Panel
                  </Link>
                )}
                <div className="nav-user-divider" />
                <button onClick={handleLogout} className="nav-user-item nav-user-logout">
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/auth/login" className="nav-signin-btn">
              <FaUser />
              <span>Sign In</span>
            </Link>
          )}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
