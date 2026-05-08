import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('login');
  const [form, setForm] = useState({
    email: '', password: '', confirmPassword: '',
    first_name: '', last_name: '', display_name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [error, setError] = useState(location.state?.error || '');
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
                <a href="/auth/forgot-password" className="auth-link" style={{ fontSize: '0.85rem' }}>
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

            {/* OAuth login (login tab only) */}
            {!isRegister && (
              <>
                <div className="oauth-divider">
                  <span className="oauth-divider-line"></span>
                  <span className="oauth-divider-text">or continue with</span>
                  <span className="oauth-divider-line"></span>
                </div>

                <div className="oauth-buttons">
                  <a
                    href={`${API_URL}/api/auth/oauth/google`}
                    className="oauth-btn oauth-google"
                    title="Sign in with Google"
                  >
                    <svg className="oauth-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </a>
                  <a
                    href={`${API_URL}/api/auth/oauth/github`}
                    className="oauth-btn oauth-github"
                    title="Sign in with GitHub"
                  >
                    <svg className="oauth-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </>
            )}
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
