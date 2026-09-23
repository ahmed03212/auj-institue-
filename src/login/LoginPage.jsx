import { useState } from 'react';
import { GraduationCap, UserRound, Eye, EyeOff, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { T, globalStyle } from '../tokens.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { isValidLoginId } from '../lib/auth-helpers.js';
import { friendlyAuthError } from '../lib/friendly-auth-error.js';

export default function LoginPage() {
  const { loginWithId } = useAuth();
  const [role, setRole] = useState('student');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    if (!isValidLoginId(id)) {
      setErr(`Enter a valid ${role === 'teacher' ? 'Teacher' : 'Student'} ID.`);
      return;
    }
    if (!password) {
      setErr('Enter your password.');
      return;
    }
    setBusy(true);
    try {
      window.location.hash = '/dashboard';
      await loginWithId(id, password, role);
    } catch (e) {
      setErr(friendlyAuthError(e));
      setBusy(false);
    }
  }

  return (
    <div className="cl-fade-in flex items-center justify-center min-h-screen w-full px-4" style={{ backgroundColor: T.navyDeep }}>
      <style>{globalStyle}</style>

      <div className="pointer-events-none fixed -top-20 -right-20 w-80 h-80 rounded-full opacity-30" style={{ background: `radial-gradient(circle, ${T.cyan}, transparent 70%)`, filter: 'blur(40px)' }} />
      <div className="pointer-events-none fixed -bottom-24 -left-24 w-96 h-96 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${T.royal}, transparent 70%)`, filter: 'blur(50px)' }} />

      <button
        onClick={() => { window.location.hash = '/'; }}
        className="fixed top-5 left-5 flex items-center gap-1.5 cl-body text-[12.5px] font-medium z-10"
        style={{ color: '#9BA7D4' }}
      >
        <ArrowLeft size={14} /> Back to website
      </button>

      <div className="w-full relative" style={{ maxWidth: 400 }}>
        <div className="text-center mb-7">
          <div className="cl-display flex items-center justify-center rounded-2xl mx-auto mb-4" style={{ width: 60, height: 60, background: `linear-gradient(135deg, ${T.royal}, ${T.cyan})` }}>
            <span className="text-white text-[17px] font-bold">AUJ</span>
          </div>
          <h1 className="cl-display text-white text-[21px] font-bold">AUJ Computer Lab Institute</h1>
          <p className="cl-body text-[13px] mt-1.5" style={{ color: '#9BA7D4' }}>Sign in to your portal</p>
        </div>

        <div className="cl-fade-in rounded-2xl p-6 sm:p-7" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: `1px solid ${T.navyBorder}`, animationDelay: '80ms' }}>
          <div className="flex gap-1.5 p-1 rounded-xl mb-5" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <button
              type="button"
              onClick={() => { setRole('student'); setErr(''); }}
              className="cl-body flex-1 flex items-center justify-center gap-1.5 text-[13px] font-semibold py-2.5 rounded-lg transition-all"
              style={role === 'student' ? { backgroundColor: T.royal, color: '#fff' } : { color: '#9BA7D4' }}
            >
              <GraduationCap size={15} /> Student
            </button>
            <button
              type="button"
              onClick={() => { setRole('teacher'); setErr(''); }}
              className="cl-body flex-1 flex items-center justify-center gap-1.5 text-[13px] font-semibold py-2.5 rounded-lg transition-all"
              style={role === 'teacher' ? { backgroundColor: T.royal, color: '#fff' } : { color: '#9BA7D4' }}
            >
              <UserRound size={15} /> Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="cl-body text-[11.5px] font-semibold uppercase tracking-wide" style={{ color: '#8FA0D6' }}>
                {role === 'teacher' ? 'Teacher ID' : 'Student ID'}
              </label>
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder={role === 'teacher' ? 'e.g. TCH-1042' : 'e.g. STU-2044'}
                autoComplete="username"
                className="cl-body w-full mt-1.5 rounded-lg px-3.5 py-3 text-[13.5px] outline-none"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: `1px solid ${T.navyBorder}`, color: '#fff' }}
              />
            </div>

            <div>
              <label className="cl-body text-[11.5px] font-semibold uppercase tracking-wide" style={{ color: '#8FA0D6' }}>
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="cl-body w-full rounded-lg px-3.5 py-3 pr-10 text-[13.5px] outline-none"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: `1px solid ${T.navyBorder}`, color: '#fff' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#8FA0D6' }}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
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
              style={{ backgroundColor: T.royal }}
            >
              {busy ? <Loader2 size={15} className="animate-spin" /> : null}
              {busy ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="cl-body text-[11.5px] text-center mt-5" style={{ color: '#6E7BA8' }}>
            Credentials are provided by your administrator.
            <br />Forgot your password? Contact the admin office.
          </p>
        </div>
      </div>
    </div>
  );
}
