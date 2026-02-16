import React, { useState } from 'react';
import api from '../services/api';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = isLogin ? '/token/' : '/travel/register/';
    
    try {
      const res = await api.post(endpoint, formData);
      if (isLogin) {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        window.location.href = '/dashboard';
      } else {
        setIsLogin(true);
        alert("Account created. Please sign in.");
      }
    } catch (err) {
      console.error("Auth Error:", err.response?.data);
      alert(isLogin ? "Invalid credentials." : "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        
        {/* Branding Header */}
        <div style={{ padding: '3.5rem 2.5rem 2.5rem', textAlign: 'center' }}>
          <h1 className="brand-logo">PennyPilot</h1>
          <p style={{ fontWeight: 700, color: 'var(--slate-900)', fontSize: '1.125rem' }}>
            Your budget Itinerary for vacation
          </p>
          
          <div style={{ 
            marginTop: '1.5rem', 
            display: 'inline-block', 
            padding: '0.25rem 1rem', 
            background: 'var(--slate-50)', 
            borderRadius: '99px', 
            border: '1px solid var(--slate-100)' 
          }}>
            <span className="field-label" style={{ margin: 0 }}>
              {isLogin ? "Login" : "Create Account"}
            </span>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} style={{ padding: '0 2.5rem 2.5rem' }}>
          {!isLogin && (
            <div className="form-group">
              <label className="field-label">Email</label>
              <input 
                type="email"
                required
                className="pill-input"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          )}

          <div className="form-group">
            <label className="field-label">Username</label>
            <input 
              type="text"
              required
              className="pill-input"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="field-label">Password</label>
            <input 
              type="password"
              required
              className="pill-input"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ marginTop: '1rem' }}
          >
            {loading ? "PROCESSING..." : (isLogin ? "SIGN IN" : "REGISTER")}
          </button>
        </form>

        {/* Footer Toggle */}
        <div style={{ 
          background: 'var(--slate-50)', 
          padding: '1.5rem', 
          textAlign: 'center', 
          borderTop: '1px solid var(--slate-100)' 
        }}>
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontWeight: 700, 
              cursor: 'pointer', 
              color: 'var(--slate-600)', 
              textDecoration: 'underline',
              fontSize: '0.875rem'
            }}
          >
            {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}