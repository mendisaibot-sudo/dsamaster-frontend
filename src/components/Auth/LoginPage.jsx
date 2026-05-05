import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaCheck, FaExclamationCircle, FaRedo } from 'react-icons/fa';
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
        <div
          className="strength-bar-fill"
          style={{ width: `${strength}%`, background: barColor }}
        />
      </div>
      <ul className="strength-checklist">
        {reqs.map((req, i) => (
          <li key={i} className={req.test(password) ? 'met' : ''}>
            {req.test(password) ? <FaCheck size={11} /> : <span className="check-circle">○</span>}
            <span>{req.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [form, setForm] = useState({
    email: '', password: '', confirmPassword: '',
    first_name: '', last_name: '', display_name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState('');
  const { login, register } = useAuth();

  const loadCaptcha = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/captcha`, { method: 'POST' });
      const data = await res.json();
      if (data.success) setCaptcha(data.data);
    } catch (err) {
      console.error('Failed to load captcha:', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'register') loadCaptcha();
  }, [activeTab]);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError('');
    setResendSuccess('');
    setCaptchaAnswer('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResendSuccess('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        const res = await login(form.email, form.password);
        if (!res.success) setError(res.error || 'Sign in failed. Please check your credentials.');
      } else {
        if (form.password !== form.confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }
        const reqs = [
          form.password.length >= 12,
          /[A-Z]/.test(form.password),
          /[a-z]/.test(form.password),
          /\d/.test(form.password),
          /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
        ];
        if (!reqs.every(Boolean)) {
          setError('Password does not meet all requirements.');
          setLoading(false);
          return;
        }
        if (!captchaAnswer.trim()) {
          setError('Please enter the CAPTCHA.');
          setLoading(false);
          return;
        }
        const res = await register({
          ...form,
          captcha_id: captcha?.captcha_id,
          captcha_answer: captchaAnswer
        });
        if (!res.success) {
          // Check if backend says "check your email" / verification required
          const msg = (res.error || res.message || '').toLowerCase();
          if (msg.includes('check your email') || msg.includes('verify your email') || msg.includes('verification')) {
            try { sessionStorage.setItem('pendingEmail', form.email); } catch {}
            navigate('/auth/verify-pending');
            return;
          }
          setError(res.error || 'Registration failed. Please try again.');
          loadCaptcha();
          setCaptchaAnswer('');
        } else {
          // Registration succeeded but might still need verification (token-based flow not returned)
          const msg = (res.message || '').toLowerCase();
          if (msg.includes('check your email') || msg.includes('verify your email')) {
            try { sessionStorage.setItem('pendingEmail', form.email); } catch {}
            navigate('/auth/verify-pending');
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setResendSuccess('');
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email })
      });
      const data = await res.json();
      if (data.success) {
        setResendSuccess('Verification email resent. Please check your inbox.');
      } else {
        setError(data.error || 'Failed to resend verification email.');
      }
    } catch {
      setError('Failed to resend verification email. Please try again.');
    }
  };

  const isRegister = activeTab === 'register';

  return (
    <div className="auth-page section">
      <div className="auth-container animate-fade-in">
        <div className="auth-card card">
          {/* Tabs */}
          <div className="auth-tabs">
            <button
              className={activeTab === 'login' ? 'active' : ''}
              onClick={() => switchTab('login')}
              type="button"
            >
              <FaLock size={14} />
              Sign In
            </button>
            <button
              className={activeTab === 'register' ? 'active' : ''}
              onClick={() => switchTab('register')}
              type="button"
            >
              <FaUser size={14} />
              Create Account
            </button>
          </div>

          <div className="auth-header">
            <h1 className="section-title" style={{ fontSize: '1.6rem' }}>
              {isRegister ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p className="section-subtitle" style={{ fontSize: '0.95rem' }}>
              {isRegister
                ? 'Join the community and start mastering DSA'
                : 'Sign in to track your progress and continue learning'}
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <FaExclamationCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          {resendSuccess && (
            <div className="auth-success">
              <FaCheck size={14} />
              <span>{resendSuccess}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                <FaEnvelope size={12} style={{ marginRight: 6, opacity: 0.7 }} />
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="form-input"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">
                <FaLock size={12} style={{ marginRight: 6, opacity: 0.7 }} />
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
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
            </div>

            {/* Confirm Password (register only) */}
            {isRegister && (
              <div className="form-group">
                <label className="form-label">
                  <FaLock size={12} style={{ marginRight: 6, opacity: 0.7 }} />
                  Confirm Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={form.confirmPassword}
                    onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
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
                <PasswordStrength password={form.password} />
              </div>
            )}

            {/* Forgot Password link (login only) */}
            {!isRegister && (
              <div className="forgot-password-row">
                <a href="#/auth/forgot-password" className="auth-link" style={{ fontSize: '0.85rem' }}>
                  Forgot Password?
                </a>
              </div>
            )}

            {/* Name fields (register only) */}
            {isRegister && (
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <FaUser size={12} style={{ marginRight: 6, opacity: 0.7 }} />
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    value={form.first_name}
                    onChange={e => setForm({ ...form, first_name: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FaUser size={12} style={{ marginRight: 6, opacity: 0.7 }} />
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={form.last_name}
                    onChange={e => setForm({ ...form, last_name: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            )}

            {isRegister && (
              <div className="form-group">
                <label className="form-label">
                  <FaUser size={12} style={{ marginRight: 6, opacity: 0.7 }} />
                  Display Name
                  <span className="text-muted">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="How others see you"
                  value={form.display_name}
                  onChange={e => setForm({ ...form, display_name: e.target.value })}
                  className="form-input"
                />
              </div>
            )}

            {/* CAPTCHA (register only) */}
            {isRegister && (
              <div className="captcha-section">
                <label className="form-label">Security Check</label>
                <div className="captcha-box">
                  {captcha && (
                    <img
                      src={captcha.image}
                      alt="CAPTCHA"
                      className="captcha-image"
                    />
                  )}
                  <button
                    type="button"
                    onClick={loadCaptcha}
                    className="btn btn-secondary btn-sm captcha-refresh"
                  >
                    <FaRedo size={12} />
                    Refresh
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Enter the characters above"
                  value={captchaAnswer}
                  onChange={e => setCaptchaAnswer(e.target.value)}
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
              {loading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isRegister ? (
                <>Already have an account? <button onClick={() => switchTab('login')} className="auth-link" type="button">Sign in</button></>
              ) : (
                <>New here? <button onClick={() => switchTab('register')} className="auth-link" type="button">Create an account</button></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
