import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useScrollspy } from '../hooks/useScrollspy';
import { FaCodeBranch, FaBars, FaTimes, FaMoon, FaSun, FaUser, FaSignOutAlt } from 'react-icons/fa';
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

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:inline">{user.first_name}</span>
              <button
                onClick={logout}
                className="p-2 rounded-lg hover:bg-secondary transition"
                title="Abmelden"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition text-sm"
            >
              <FaUser />
              <span className="hidden md:inline">Anmelden</span>
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
