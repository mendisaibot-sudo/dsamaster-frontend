import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ 
    email: '', password: '', first_name: '', last_name: '', display_name: '' 
  });
  const [captcha, setCaptcha] = useState(null);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';

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
    if (mode === 'register') loadCaptcha();
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(form.email, form.password);
        if (!res.success) setError(res.error || 'Login failed');
      } else {
        if (!captchaAnswer.trim()) {
          setError('Please enter the CAPTCHA');
          setLoading(false);
          return;
        }
        const res = await register({ 
          ...form, 
          captcha_id: captcha?.captcha_id, 
          captcha_answer: captchaAnswer 
        });
        if (!res.success) {
          let errorMsg = res.error || res.message || 'Registration failed';
          // Handle Pydantic validation errors
          if (res.detail && Array.isArray(res.detail)) {
            errorMsg = res.detail.map(d => d.msg).join(' ');
          } else if (res.detail) {
            errorMsg = res.detail;
          }
          setError(errorMsg);
          loadCaptcha();
          setCaptchaAnswer('');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setCaptchaAnswer('');
  };

  return (
    <div className="auth-page section">
      <div className="auth-container animate-fade-in">
        <div className="auth-card card">
          <div className="auth-header">
            <h1 className="section-title" style={{ fontSize: '1.75rem' }}>
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="section-subtitle" style={{ fontSize: '0.95rem' }}>
              {mode === 'login' 
                ? 'Sign in to track your progress' 
                : 'Join to start your DSA journey'}
            </p>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="form-input"
                required
              />
            </div>

          {mode === 'login' && (
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                className="form-input"
                required
              />
            </div>
          )}

          {mode === 'register' && (
              <>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    placeholder="Min 12 chars, A-Z, 0-9, special char"
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})}
                    className="form-input"
                    required
                  />
                  <div className="password-requirements" style={{fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem'}}>
                    Password must have: 12+ chars, 1 uppercase, 1 digit, 1 special char (!@#$%^&*)
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      value={form.first_name}
                      onChange={e => setForm({...form, first_name: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      value={form.last_name}
                      onChange={e => setForm({...form, last_name: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Display Name <span className="text-muted">(optional)</span></label>
                  <input
                    type="text"
                    placeholder="How others see you"
                    value={form.display_name}
                    onChange={e => setForm({...form, display_name: e.target.value})}
                    className="form-input"
                  />
                </div>

                {/* CAPTCHA */}
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
                      className="btn btn-secondary btn-sm"
                    >
                      🔄 Refresh
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter characters above"
                    value={captchaAnswer}
                    onChange={e => setCaptchaAnswer(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </>
            )}

            <button 
              type="submit" 
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {mode === 'login' && (
            <div className="auth-forgot" style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <button 
                onClick={() => navigate('/auth/forgot-password')} 
                className="auth-link"
                style={{ fontSize: '0.85rem' }}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <div className="auth-footer">
            <p>
              {mode === 'login' ? (
                <>New here? <button onClick={toggleMode} className="auth-link">Create an account</button></>
              ) : (
                <>Already have an account? <button onClick={toggleMode} className="auth-link">Sign in</button></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
