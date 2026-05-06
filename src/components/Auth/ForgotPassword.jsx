import { useState } from 'react';
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import './Auth.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      // Always show success message for security — do not leak whether email exists
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
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
              Reset Password
            </h1>
            <p className="section-subtitle" style={{ fontSize: '0.95rem' }}>
              Enter your email and we&apos;ll send you a reset link.
            </p>
          </div>

          {error && (
            <div className="auth-error" style={{ marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          {submitted ? (
            <>
              <div className="auth-success" style={{ marginBottom: '1.5rem' }}>
                If an account exists with this email, a password reset link has been sent.
              </div>
              <a href="/auth/login" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <FaArrowLeft size={14} />
                Back to Sign In
              </a>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
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
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={loading}
              >
                {loading ? 'Sending...' : (
                  <>
                    <FaPaperPlane size={14} />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>
          )}

          {!submitted && (
            <div className="auth-footer">
              <a href="/auth/login" className="auth-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <FaArrowLeft size={12} />
                Back to Sign In
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
