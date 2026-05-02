import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUser, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { login } from '../../utils/auth';
import './admin.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!username.trim()) errs.username = 'Username is required';
    if (!password.trim()) errs.password = 'Password is required';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin/blog');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1><FaLock /> Admin Access</h1>
          <p>Sign in to manage blog posts</p>
        </div>

        {error && (
          <div className="admin-toast admin-toast-error" style={{ marginBottom: '1rem', position:'static', animation:'none', maxWidth:'100%' }}>
            <FaLock className="admin-toast-icon" />
            <span className="admin-toast-message">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-form-group">
            <label htmlFor="username">Username</label>
            <div style={{ position: 'relative' }}>
              <FaUser style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize:'0.9rem' }} />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setFieldErrors(p => ({ ...p, username: '' })); }}
                placeholder="Enter username"
                className={fieldErrors.username ? 'admin-input-error' : ''}
                style={{ paddingLeft: '2.5rem' }}
                autoComplete="username"
              />
            </div>
            {fieldErrors.username && <span className="admin-error-text">{fieldErrors.username}</span>}
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <FaLock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize:'0.9rem' }} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setFieldErrors(p => ({ ...p, password: '' })); }}
                placeholder="Enter password"
                className={fieldErrors.password ? 'admin-input-error' : ''}
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', fontSize:'0.9rem' }}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {fieldErrors.password && <span className="admin-error-text">{fieldErrors.password}</span>}
          </div>

          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
            <FaSignInAlt /> {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
