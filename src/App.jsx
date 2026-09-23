import { useEffect, useState, lazy, Suspense } from 'react';
import { Loader2, ShieldAlert, LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { T, globalStyle } from './tokens.js';
import { isFirebaseConfigured } from './firebase.js';
import Website from './marketing/Website.jsx';

// The public website is what most visitors load, so the portals are
// code-split out of the initial bundle and fetched only when someone
// actually navigates to a login screen or a portal route.
const LoginPage = lazy(() => import('./login/LoginPage.jsx'));
const AdminLoginPage = lazy(() => import('./login/AdminLoginPage.jsx'));
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));
const TeacherPortal = lazy(() => import('./teacher/TeacherPortal.jsx'));
const StudentApp = lazy(() => import('./student/StudentApp.jsx'));

// The admin login is intentionally not linked from anywhere in the UI.
// Only someone who knows this exact URL fragment can reach it. Change this
// to your own value before deploying — see FIREBASE_SETUP.md.
const ADMIN_ROUTE_TOKEN = '#admin-portal-x7q2';

function useRawHash() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

function Screen({ children }) {
  return (
    <div className="cl-body flex items-center justify-center min-h-screen w-full" style={{ backgroundColor: T.navyDeep }}>
      <style>{globalStyle}</style>
      {children}
    </div>
  );
}

function Gate() {
  const { user, profile, role, loading, error, logout } = useAuth();
  const rawHash = useRawHash();

  const wantsAdminLogin = rawHash === ADMIN_ROUTE_TOKEN;
  const wantsLogin = rawHash === '#/login';

  // ---- Public website -------------------------------------------------
  // The marketing site owns the root (no hash, "#/", or plain section
  // anchors like "#courses"). Portal routes are "#/something" — those are
  // handled below. A signed-in user can browse back to the public site via
  // the "View Website" link in their portal sidebar without signing out.
  const isPortalRoute =
    rawHash.startsWith('#/') && rawHash !== '#/' && rawHash !== '#/login';

  if (!wantsAdminLogin && !wantsLogin && !isPortalRoute) {
    return <Website />;
  }

  if (!isFirebaseConfigured()) {
    return (
      <Screen>
        <div className="text-center px-6 max-w-md">
          <ShieldAlert size={32} color="#F3908B" className="mx-auto mb-3" />
          <h1 className="cl-display text-white text-[16px] font-bold">Firebase isn't configured yet</h1>
          <p className="cl-body text-[13px] mt-2" style={{ color: '#9BA7D4' }}>
            Copy <code>.env.example</code> to <code>.env.local</code> and fill in your Firebase project keys, then
            restart the dev server. See FIREBASE_SETUP.md for step-by-step instructions.
          </p>
          <a href="#/" className="cl-body inline-block mt-5 text-[13px]" style={{ color: '#5B7CFF' }}>← Back to website</a>
        </div>
      </Screen>
    );
  }

  if (loading) {
    return (
      <Screen>
        <Loader2 size={28} className="animate-spin" color="#5B7CFF" />
      </Screen>
    );
  }

  // Not logged in yet.
  if (!user) {
    return wantsAdminLogin ? <AdminLoginPage /> : <LoginPage />;
  }

  // Logged in but we couldn't load a matching Firestore profile/role.
  if (!profile || !role) {
    return (
      <Screen>
        <div className="text-center px-6 max-w-md">
          <ShieldAlert size={32} color="#F3908B" className="mx-auto mb-3" />
          <h1 className="cl-display text-white text-[16px] font-bold">Account not fully set up</h1>
          <p className="cl-body text-[13px] mt-2" style={{ color: '#9BA7D4' }}>
            {error || 'Your account is missing a role. Contact your administrator.'}
          </p>
          <button
            onClick={logout}
            className="cl-icon-btn cl-body mt-5 mx-auto flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-[13px] font-semibold"
            style={{ backgroundColor: T.royal }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </Screen>
    );
  }

  if (role === 'admin') return <AdminApp />;
  if (role === 'teacher') return <TeacherPortal />;
  if (role === 'student') return <StudentApp />;

  return (
    <Screen>
      <div className="text-center px-6 max-w-md">
        <ShieldAlert size={32} color="#F3908B" className="mx-auto mb-3" />
        <h1 className="cl-display text-white text-[16px] font-bold">Unknown role: {role}</h1>
        <button onClick={logout} className="cl-icon-btn cl-body mt-5 mx-auto flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-[13px] font-semibold" style={{ backgroundColor: T.royal }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </Screen>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <Screen>
            <Loader2 size={28} className="animate-spin" color="#5B7CFF" />
          </Screen>
        }
      >
        <Gate />
      </Suspense>
    </AuthProvider>
  );
}
