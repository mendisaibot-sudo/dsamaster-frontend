import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ 
    email: '', password: '', first_name: '', last_name: '', display_name: '' 
  });
  const [captcha, setCaptcha] = useState(null);
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const loadCaptcha = async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';
    const res = await fetch(`${API_URL}/api/auth/captcha`, { method: 'POST' });
    const data = await res.json();
    if (data.success) setCaptcha(data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      const res = await login(form.email, form.password);
      if (!res.success) setError(res.error || 'Login failed');
    } else {
      const res = await register({ ...form, captcha_id: captcha?.captcha_id, captcha_answer: captchaAnswer });
      if (!res.success) setError(res.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-card border border-border rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        {mode === 'login' ? 'Anmelden' : 'Konto erstellen'}
      </h2>

      {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="E-Mail"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          className="w-full p-3 bg-secondary border border-border rounded-lg text-foreground outline-none focus:border-primary"
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
          className="w-full p-3 bg-secondary border border-border rounded-lg text-foreground outline-none focus:border-primary"
          required
        />

        {mode === 'register' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Vorname"
                value={form.first_name}
                onChange={e => setForm({...form, first_name: e.target.value})}
                className="w-full p-3 bg-secondary border border-border rounded-lg text-foreground outline-none focus:border-primary"
                required
              />
              <input
                type="text"
                placeholder="Nachname"
                value={form.last_name}
                onChange={e => setForm({...form, last_name: e.target.value})}
                className="w-full p-3 bg-secondary border border-border rounded-lg text-foreground outline-none focus:border-primary"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Anzeigename (optional)"
              value={form.display_name}
              onChange={e => setForm({...form, display_name: e.target.value})}
              className="w-full p-3 bg-secondary border border-border rounded-lg text-foreground outline-none focus:border-primary"
            />

            {/* CAPTCHA */}
            <div className="border border-border rounded-lg p-4">
              {captcha && <img src={captcha.image} alt="CAPTCHA" className="mb-3" />}
              <button type="button" onClick={loadCaptcha} className="text-sm text-primary hover:underline">
                {captcha ? 'Neues CAPTCHA' : 'CAPTCHA laden'}
              </button>
              <input
                type="text"
                placeholder="CAPTCHA eingeben"
                value={captchaAnswer}
                onChange={e => setCaptchaAnswer(e.target.value)}
                className="w-full mt-3 p-3 bg-secondary border border-border rounded-lg text-foreground outline-none focus:border-primary"
                required
              />
            </div>
          </>
        )}

        <button type="submit" className="w-full bg-primary text-primary-foreground p-3 rounded-lg font-semibold hover:opacity-90 transition">
          {mode === 'login' ? 'Anmelden' : 'Konto erstellen'}
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-muted-foreground">
        {mode === 'login' ? (
          <>Noch kein Konto? <button onClick={() => setMode('register')} className="text-primary hover:underline">Registrieren</button></>
        ) : (
          <>Bereits ein Konto? <button onClick={() => setMode('login')} className="text-primary hover:underline">Anmelden</button></>
        )}
      </p>
    </div>
  );
}
