import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaRedo, FaArrowLeft } from 'react-icons/fa';
import './Auth.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';

function PasswordStrength({ password }) {
  const reqs = [
    { label: 'At least 12 characters', test: p => p.length >= 12 },
    { label: 'One uppercase letter', test: p => /[A-Z]/.test(p) },
    { label: 'One lowercase letter', test: p => /[a-z]/.test(p) },
    { label: 'One digit', test: p => /\d/.test(p) },
    { label: 'One special character', test: p => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
  ];
  const passed = reqs.filter(r => r.test(password)).length;
  const strength = passed === 0 ? 0 : Math.round((passed / reqs.length) * 100);
  let barColor = '#ef4444';
  if (strength >= 100) barColor = '#84cc16';
  else if (strength >= 40) barColor = '#eab308';

  return (
    <div className="password-strength">
      <div className="strength-bar-bg">
        <div className="strength-bar-fill" style={{ width: `${strength}%`, background: barColor }} />
      </div>
      <ul className="strength-checklist">
        {reqs.map((req, i) => (
          <li key={i} className={req.test(password) ? 'met' : ''}>
            {req.test(password) ? <span style={{ fontSize: 11 }}>✓</span> : <span className="check-circle">○</span>}
            <span>{req.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token. Please request a new reset link.');
    }
  }, [token]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const reqs = [
      newPassword.length >= 12,
      /[A-Z]/.test(newPassword),
      /[a-z]/.test(newPassword),
      /\d/.test(newPassword),
      /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    ];
    if (!reqs.every(Boolean)) {
      setError('Password does not meet all requirements.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: newPassword })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'Password reset failed. The link may have expired.');
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
            <FaLock />
          </div>

          <div className="auth-header">
            <h1 className="section-title" style={{ fontSize: '1.5rem' }}>
              {success ? 'Password Updated' : 'Set New Password'}
            </h1>
            <p className="section-subtitle" style={{ fontSize: '0.95rem' }}>
              {success
                ? 'Password updated successfully. Redirecting...'
                : 'Enter your new password below.'}
            </p>
          </div>

          {error && (
            <div className="auth-error" style={{ marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          {success ? (
            <>
              <div className="auth-success" style={{ marginBottom: '1.5rem' }}>
                <FaCheckCircle size={16} style={{ marginRight: 6 }} />
                Password updated successfully. You will be redirected to sign in shortly.
              </div>
              <a href="#/auth/login" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <FaArrowLeft size={14} />
                Go to Sign In
              </a>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form" style={{ textAlign: 'left' }}>
              <div className="form-group">
                <label className="form-label">
                  <FaLock size={12} style={{ marginRight: 6, opacity: 0.7 }} />
                  New Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter a strong password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
                <PasswordStrength password={newPassword} />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaLock size={12} style={{ marginRight: 6, opacity: 0.7 }} />
                  Confirm Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirm(!showConfirm)}
                    tabIndex={-1}
                  >
                    {showConfirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={loading || !token}
              >
                {loading ? 'Updating...' : (
                  <>
                    <FaRedo size={14} />
                    Update Password
                  </>
                )}
              </button>
            </form>
          )}

          {!success && (
            <div className="auth-footer">
              <a href="#/auth/login" className="auth-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
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
