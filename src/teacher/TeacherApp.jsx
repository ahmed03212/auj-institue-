/* ==================================================================
 * ⚠️  PLACEHOLDER — REPLACE THIS FILE WITH YOUR REAL TeacherApp.jsx
 * ==================================================================
 *
 * Your original teacher portal (the ~3,300-line AujApp.jsx you sent
 * earlier) belongs here. This stub only exists so the project builds
 * and the other portals can be tested.
 *
 * TO RESTORE IT:
 *   1. Take your original AujApp.jsx file.
 *   2. Save it over this file, at: src/teacher/TeacherApp.jsx
 *   3. Apply the two small edits below so it reads real Firebase data
 *      instead of its old hardcoded mock login state.
 *
 * EDIT 1 — change the component signature and delete the fake state.
 *   FIND:
 *     export default function App() {
 *       ...
 *       const [loggedOut, setLoggedOut] = useState(false);
 *       const [profile, setProfile] = useState({ name: "Muhammad Usman", ... });
 *       ...
 *       const updateProfile = (patch) => setProfile((p) => ({ ...p, ...patch }));
 *       if (loggedOut) {
 *         return <LoggedOutScreen onLoginAgain={() => setLoggedOut(false)} profile={profile} />;
 *       }
 *
 *   REPLACE WITH:
 *     export default function App({ profile, onUpdateProfile, onLogout }) {
 *       ...                                    // keep everything else
 *       const updateProfile = (patch) => onUpdateProfile(patch);
 *       // (delete the loggedOut state and the LoggedOutScreen early-return —
 *       //  real sign-out is handled by AuthContext now)
 *
 * EDIT 2 — point the sidebar's logout at the real one.
 *   FIND:     onLogout={() => setLoggedOut(true)}
 *   REPLACE:  onLogout={onLogout}
 *
 * That's all — TeacherPortal.jsx already passes those three props in.
 * ================================================================== */

import { LogOut, AlertTriangle } from 'lucide-react';
import { T, globalStyle } from '../tokens.js';

export default function TeacherApp({ profile, onLogout }) {
  return (
    <div className="cl-body min-h-screen w-full flex items-center justify-center px-4" style={{ backgroundColor: T.page }}>
      <style>{globalStyle}</style>
      <div className="cl-fade-in rounded-2xl p-8 text-center" style={{ maxWidth: 520, backgroundColor: T.card, border: `1px solid ${T.border}` }}>
        <div className="rounded-full flex items-center justify-center mx-auto mb-4" style={{ width: 56, height: 56, backgroundColor: T.amberTint }}>
          <AlertTriangle size={26} color={T.amber} />
        </div>
        <h1 className="cl-display text-[18px] font-bold" style={{ color: T.ink }}>Teacher portal placeholder</h1>
        <p className="cl-body text-[13px] mt-2 leading-relaxed" style={{ color: T.inkSoft }}>
          Signed in as <strong style={{ color: T.ink }}>{profile?.name || 'Teacher'}</strong> — authentication is working.
        </p>
        <p className="cl-body text-[12.5px] mt-3 leading-relaxed" style={{ color: T.inkSoft }}>
          Replace <code style={{ backgroundColor: T.page, padding: '2px 6px', borderRadius: 4 }}>src/teacher/TeacherApp.jsx</code> with
          your original <code style={{ backgroundColor: T.page, padding: '2px 6px', borderRadius: 4 }}>AujApp.jsx</code>. Step-by-step
          instructions are in the comment block at the top of that file.
        </p>
        <button
          onClick={onLogout}
          className="cl-icon-btn cl-body mt-6 mx-auto flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-[13px] font-semibold"
          style={{ backgroundColor: T.royal }}
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  );
}
