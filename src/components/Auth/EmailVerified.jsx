import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaHome, FaSpinner } from 'react-icons/fa';
import './Auth.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';

export default function EmailVerified() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying | success | error
  const [message, setMessage] = useState('Verifying your email...');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid or missing verification token.');
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (data.success) {
          setStatus('success');
          setMessage('Account registration completed successfully and email verified.');
        } else {
          setStatus('error');
          setMessage(data.error || 'Account creation failed, email verification failed.');
        }
      } catch {
        setStatus('error');
        setMessage('Network error during verification. Please try again later.');
      }
    };

    verify();
  }, [token]);

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  return (
    <div className="auth-page section">
      <div className="auth-container animate-fade-in">
        <div className="auth-card card" style={{ textAlign: 'center' }}>
          {status === 'verifying' && (
            <div className="auth-icon-circle primary">
              <FaSpinner className="fa-spin" />
            </div>
          )}
          {status === 'success' && (
            <div className="auth-icon-circle success">
              <FaCheckCircle />
            </div>
          )}
          {status === 'error' && (
            <div className="auth-icon-circle error">
              <FaTimesCircle />
            </div>
          )}

          <div className="auth-header">
            <h1 className="section-title" style={{ fontSize: '1.5rem' }}>
              {status === 'verifying' ? 'Verifying...'
                : status === 'success' ? 'Email Verified'
                : 'Verification Failed'}
            </h1>
            <p className="section-subtitle" style={{ fontSize: '0.95rem' }}>
              {message}
            </p>
          </div>

          {(status === 'success' || status === 'error') && (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Redirecting to homepage in a few seconds...
            </p>
          )}

          <a
            href="/"
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <FaHome size={14} />
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
