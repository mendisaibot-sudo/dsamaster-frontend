import { useState } from 'react';
import { FaEnvelope, FaRedo, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import './Auth.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';

export default function VerificationPending() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sentTo, setSentTo] = useState(() => {
    try {
      return sessionStorage.getItem('pendingEmail') || '';
    } catch {
      return '';
    }
  });

  const handleResend = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const targetEmail = sentTo || email;
    if (!targetEmail.trim()) {
      setError('Please enter your email address.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Verification email resent. Please check your inbox (and spam folder).');
        if (!sentTo) setSentTo(email);
      } else {
        setError(data.error || 'Failed to resend verification email.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page section">
      <div className="auth-container animate-fade-in">
        <div className="auth-card card" style={{ textAlign: 'center' }}>
          <div className="auth-icon-circle primary">
            <FaEnvelope />
          </div>

          <div className="auth-header">
            <h1 className="section-title" style={{ fontSize: '1.5rem' }}>
              Almost There!
            </h1>
            <p className="section-subtitle" style={{ fontSize: '0.95rem' }}>
              Check your email to verify your account.
            </p>
          </div>

          {sentTo && (
            <div className="auth-email-display">
              {sentTo}
            </div>
          )}

          {error && (
            <div className="auth-error" style={{ marginTop: '1rem' }}>
              {error}
            </div>
          )}

          {success && (
            <div className="auth-success" style={{ marginTop: '1rem' }}>
              <FaCheckCircle size={14} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleResend} className="auth-form" style={{ marginTop: '1.5rem' }}>
            {!sentTo && (
              <div className="form-group">
                <label className="form-label">
                  <FaEnvelope size={12} style={{ marginRight: 6, opacity: 0.7 }} />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading ? 'Sending...' : (
                <>
                  <FaRedo size={14} style={{ marginRight: 6 }} />
                  Resend Verification Email
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <a href="/auth/login" className="auth-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <FaArrowLeft size={12} />
              Back to Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
