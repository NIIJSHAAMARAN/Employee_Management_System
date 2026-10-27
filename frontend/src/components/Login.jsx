import { useState } from 'react';
import { loginUser, registerUser, errMsg } from '../api/http';

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (isRegister) {
        await registerUser(form);
      }
      const user = await loginUser({ email: form.email, password: form.password });
      onLogin(user);
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center">
      <form className="card shadow-sm p-4 auth-card" onSubmit={handleSubmit}>
        <h1 className="h4 mb-3">{isRegister ? 'Create account' : 'Sign in'}</h1>
        {error && <div className="alert alert-danger py-2">{error}</div>}

        {isRegister && (
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input className="form-control" type="password" name="password" value={form.password} onChange={handleChange} minLength={6} required />
        </div>

        <button className="btn btn-primary w-100" disabled={busy}>
          {busy ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
        </button>
        <button type="button" className="btn btn-link mt-2" onClick={() => { setIsRegister(!isRegister); setError(''); }}>
          {isRegister ? 'Already have an account? Sign in' : 'New here? Create an account'}
        </button>
      </form>
    </div>
  );
}
