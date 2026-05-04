import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Auth.css';

export default function VerifyEmail() {
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link. No token found.');
      return;
    }

    fetch(`${API_URL}/api/auth/verify-email?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('success');
          setMessage(data.message || 'Email verified successfully!');
          // Auto-redirect to homepage after 3 seconds
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message || data.detail || 'Verification failed');
        }
      })
      .catch(err => {
        setStatus('error');
        setMessage('Network error. Please try again.');
      });
  }, [searchParams, navigate, API_URL]);

  return (
    <div className="auth-page section">
      <div className="auth-container animate-fade-in">
        <div className="auth-card card">
          <div className="auth-header">
            <h1 className="section-title" style={{ fontSize: '1.75rem' }}>
              Email Verification
            </h1>
          </div>

          {status === 'verifying' && (
            <div className="auth-loading" style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="spinner" />
              <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                Verifying your email...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="auth-success" style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="success-icon" style={{ 
                fontSize: '3rem', 
                color: '#22c55e',
                marginBottom: '1rem'
              }}>
                ✓
              </div>
              <h3 style={{ color: '#22c55e', marginBottom: '0.5rem' }}>
                Success!
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                {message}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Redirecting to homepage in a few seconds...
              </p>
              <button 
                onClick={() => navigate('/')}
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                Go to Homepage
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="auth-error" style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="error-icon" style={{ 
                fontSize: '3rem', 
                color: '#ef4444',
                marginBottom: '1rem'
              }}>
                ✕
              </div>
              <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>
                Verification Failed
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                {message}
              </p>
              <button 
                onClick={() => navigate('/auth/login')}
                className="btn btn-primary"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
