import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaCheckCircle, FaTimesCircle, FaHome, FaSignInAlt } from 'react-icons/fa';
import './Auth.css';

export default function VerifyEmail() {
  const [status, setStatus] = useState({ type: 'verifying', message: '' });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';
  const { setUser } = useAuth();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const token = searchParams.get('token');
    if (!token) {
      setStatus({ type: 'error', message: 'Invalid verification link. No token found.' });
      return;
    }

    fetch(`${API_URL}/api/auth/verify-email?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (data.success) {
          setStatus({ type: 'success', message: data.message || 'Email verified successfully!' });
          if (data.token && data.user) {
            localStorage.setItem('access_token', data.token);
            localStorage.setItem('refresh_token', data.refresh_token);
            setUser(data.user);
          }
          setTimeout(() => navigate('/', { replace: true }), 2500);
        } else {
          setStatus({ type: 'error', message: data.message || data.detail || 'Verification failed' });
        }
      })
      .catch(() => {
        setStatus({ type: 'error', message: 'Network error. Please try again.' });
      });
  }, [searchParams, navigate, API_URL, setUser]);

  return (
    <div className="auth-page section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-container animate-fade-in" style={{ maxWidth: 480, width: '100%' }}>
        <div className="auth-card card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>

          {status.type === 'verifying' && (
            <>
              <div className="spinner" style={{ width: 56, height: 56, borderWidth: 4, margin: '0 auto 1.5rem' }} />
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Verifying your email...</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Hang tight while we confirm your account.</p>
            </>
          )}

          {status.type === 'success' && (
            <>
              <FaCheckCircle size={64} style={{ color: '#22c55e', marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#22c55e' }}>You're all set!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {status.message}<br />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Redirecting to homepage...</span>
              </p>
              <button onClick={() => navigate('/')} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <FaHome /> Go to Homepage
              </button>
            </>
          )}

          {status.type === 'error' && (
            <>
              <FaTimesCircle size={64} style={{ color: '#ef4444', marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#ef4444' }}>Verification Failed</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{status.message}</p>
              <button onClick={() => navigate('/auth/login')} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <FaSignInAlt /> Go to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
