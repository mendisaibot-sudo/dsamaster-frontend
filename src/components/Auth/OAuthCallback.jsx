import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const refresh = params.get('refresh');
    const error = params.get('error');

    if (error) {
      // Error case: redirect to login page with error
      navigate('/auth/login', {
        state: { error: 'OAuth authentication failed. Please try again.' }
      });
      return;
    }

    if (token) {
      // Store tokens in localStorage (same keys as normal login)
      localStorage.setItem('access_token', token);
      if (refresh) {
        localStorage.setItem('refresh_token', refresh);
      }

      // Fetch user data to update auth context
      const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';
      fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUser(data.user);
            navigate('/', { replace: true });
          } else {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/auth/login', {
              state: { error: 'Failed to authenticate. Please try again.' }
            });
          }
        })
        .catch(() => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          navigate('/auth/login', {
            state: { error: 'Failed to authenticate. Please try again.' }
          });
        });
    } else {
      // No token, redirect to login
      navigate('/auth/login', {
        state: { error: 'Authentication failed. No token received.' }
      });
    }
  }, [navigate, setUser]);

  return (
    <div className="auth-page section oauth-callback">
      <div className="auth-container">
        <div className="auth-card card">
          <div className="auth-header" style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div className="oauth-loading-spinner"></div>
            <h2>Completing sign-in...</h2>
            <p className="section-subtitle">Please wait while we authenticate you</p>
          </div>
        </div>
      </div>
    </div>
  );
}
