import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaSpinner, FaExclamationCircle, FaSignInAlt } from 'react-icons/fa';
import './Auth.css';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const refresh = searchParams.get('refresh');
    const errorMsg = searchParams.get('error');

    if (errorMsg) {
      setError(errorMsg === 'google_auth_failed' 
        ? 'Google authentication failed. Please try again.' 
        : errorMsg === 'github_auth_failed'
        ? 'GitHub authentication failed. Please try again.'
        : 'Authentication failed. Please try again.'
      );
      return;
    }

    if (!token || !refresh) {
      setError('Authentication information missing. Please try again.');
      return;
    }

    // Store tokens (same as normal login)
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refresh);

    // Fetch user data
    const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';
    fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
          navigate('/');
        } else {
          setError('Failed to retrieve user information.');
        }
      })
      .catch(() => {
        setError('Network error while retrieving user information.');
      });
  }, [searchParams, navigate, setUser]);

  if (error) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <FaExclamationCircle size={48} color="#ef4444" style={{ marginBottom: '1rem' }} />
            <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Authentication Failed</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{error}</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/login')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FaSignInAlt /> Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <FaSpinner size={36} className="spin" style={{ marginBottom: '1rem', color: 'var(--accent)' }} />
          <h2 style={{ color: 'var(--text-primary)' }}>Logging you in...</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Please wait while we complete the authentication.</p>
        </div>
      </div>
    </div>
  );
}
