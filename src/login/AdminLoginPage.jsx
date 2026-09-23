import { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { T, globalStyle } from '../tokens.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { friendlyAuthError } from '../lib/friendly-auth-error.js';

export default function AdminLoginPage() {
  const { loginWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    if (!email || !password) {
      setErr('Enter your admin email and password.');
      return;
    }
    setBusy(true);
    try {
      await loginWithEmail(email, password);
      window.location.hash = '/dashboard';
    } catch (e) {
      setErr(friendlyAuthError(e));
      setBusy(false);
    }
  }

  return (
    <div className="cl-fade-in flex items-center justify-center min-h-screen w-full px-4" style={{ backgroundColor: '#0B1230' }}>
      <style>{globalStyle}</style>
      <div className="w-full relative" style={{ maxWidth: 380 }}>
        <div className="text-center mb-7">
          <div className="cl-display flex items-center justify-center rounded-2xl mx-auto mb-4" style={{ width: 56, height: 56, background: `linear-gradient(135deg, ${T.violet}, ${T.royal})` }}>
            <ShieldCheck size={26} color="#fff" />
          </div>
          <h1 className="cl-display text-white text-[19px] font-bold">System Administrator</h1>
          <p className="cl-body text-[12.5px] mt-1.5" style={{ color: '#8FA0D6' }}>Restricted access — authorized personnel only</p>
        </div>

        <div className="cl-fade-in rounded-2xl p-6" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: `1px solid ${T.navyBorder}`, animationDelay: '80ms' }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="cl-body text-[11.5px] font-semibold uppercase tracking-wide" style={{ color: '#8FA0D6' }}>Admin Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="username"
                placeholder="admin@auj.edu.pk"
                className="cl-body w-full mt-1.5 rounded-lg px-3.5 py-3 text-[13.5px] outline-none"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: `1px solid ${T.navyBorder}`, color: '#fff' }}
              />
            </div>
            <div>
              <label className="cl-body text-[11.5px] font-semibold uppercase tracking-wide" style={{ color: '#8FA0D6' }}>Password</label>
              <div className="relative mt-1.5">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="cl-body w-full rounded-lg px-3.5 py-3 pr-10 text-[13.5px] outline-none"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: `1px solid ${T.navyBorder}`, color: '#fff' }}
                />
                <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#8FA0D6' }} aria-label="Toggle password visibility">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {err && (
              <div className="flex items-start gap-2 rounded-lg px-3 py-2.5" style={{ backgroundColor: 'rgba(224,71,61,0.12)', border: '1px solid rgba(224,71,61,0.3)' }}>
                <AlertCircle size={14} color="#F3908B" className="shrink-0 mt-0.5" />
                <span className="cl-body text-[12px]" style={{ color: '#F3908B' }}>{err}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="cl-icon-btn cl-body w-full mt-1 text-[13.5px] font-semibold py-3 rounded-lg text-white flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ background: `linear-gradient(135deg, ${T.violet}, ${T.royal})` }}
            >
              {busy ? <Loader2 size={15} className="animate-spin" /> : null}
              {busy ? 'Verifying…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
