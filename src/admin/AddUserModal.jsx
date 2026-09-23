import { useState } from 'react';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { X, Loader2, CheckCircle2, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { T } from '../tokens.js';
import { getScratchAuth } from '../firebase.js';
import { createUserProfileDoc } from '../contexts/AuthContext.jsx';
import { idToEmail, isValidLoginId } from '../lib/auth-helpers.js';
import { friendlyAuthError } from '../lib/friendly-auth-error.js';

const studentCourses = ['Web Development', 'Graphic Designing', 'MS Office', 'AI & Machine Learning', 'App Development'];
const teacherDepartments = ['Computer Science', 'Design', 'Business', 'Mathematics'];

function genPassword() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let out = '';
  for (let i = 0; i < 10; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export default function AddUserModal({ role, open, onClose }) {
  const isTeacher = role === 'teacher';
  const [stage, setStage] = useState('form'); // form | saving | success
  const [name, setName] = useState('');
  const [loginId, setLoginId] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(studentCourses[0]);
  const [department, setDepartment] = useState(teacherDepartments[0]);
  const [password, setPassword] = useState(genPassword());
  const [showPw, setShowPw] = useState(true);
  const [err, setErr] = useState('');
  const [createdEmail, setCreatedEmail] = useState('');

  function reset() {
    setStage('form');
    setName('');
    setLoginId('');
    setPhone('');
    setPassword(genPassword());
    setErr('');
  }

  function handleClose() {
    onClose();
    setTimeout(reset, 250);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    if (!name.trim()) return setErr('Enter a full name.');
    if (!isValidLoginId(loginId)) return setErr(`Enter a valid ${isTeacher ? 'Teacher' : 'Student'} ID (letters, numbers, - or _, 3–20 chars).`);
    if (password.length < 6) return setErr('Password must be at least 6 characters.');

    const email = idToEmail(loginId, role);
    setStage('saving');

    const { auth: scratchAuth, cleanup } = getScratchAuth();
    try {
      const cred = await createUserWithEmailAndPassword(scratchAuth, email, password);
      await createUserProfileDoc(cred.user.uid, {
        role,
        name: name.trim(),
        loginId: loginId.trim(),
        email,
        phone: phone.trim(),
        status: 'active',
        ...(isTeacher ? { department } : { course }),
      });
      await signOut(scratchAuth);
      setCreatedEmail(email);
      setStage('success');
    } catch (e) {
      setErr(friendlyAuthError(e));
      setStage('form');
    } finally {
      cleanup();
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(15,23,41,0.5)', backdropFilter: 'blur(4px)' }} onClick={handleClose} />
      <div
        className="cl-fade-in relative w-full rounded-2xl overflow-hidden"
        style={{ maxWidth: 480, maxHeight: '88vh', overflowY: 'auto', backgroundColor: T.card, boxShadow: '0 30px 60px -12px rgba(15,23,66,0.35)' }}
      >
        <div className="flex items-center justify-between px-6 py-4 sticky top-0" style={{ backgroundColor: T.card, borderBottom: `1px solid ${T.border}` }}>
          <div>
            <h3 className="cl-display text-[16px] font-bold" style={{ color: T.ink }}>
              {isTeacher ? 'Add Teacher' : 'Add Student'}
            </h3>
            <p className="cl-body text-[11.5px]" style={{ color: T.inkFaint }}>Creates a real sign-in account</p>
          </div>
          <button onClick={handleClose} className="cl-icon-btn rounded-lg p-1.5" style={{ backgroundColor: T.page }}>
            <X size={16} color={T.inkSoft} />
          </button>
        </div>

        <div className="p-6">
          {stage === 'success' ? (
            <div className="flex flex-col items-center text-center py-4">
              <div className="rounded-full flex items-center justify-center" style={{ width: 64, height: 64, backgroundColor: T.greenTint }}>
                <CheckCircle2 size={32} color={T.green} />
              </div>
              <h4 className="cl-display text-[16px] font-bold mt-4" style={{ color: T.ink }}>
                {isTeacher ? 'Teacher' : 'Student'} account created
              </h4>
              <p className="cl-body text-[12.5px] mt-1" style={{ color: T.inkSoft }}>{name} can now sign in with:</p>
              <div className="w-full mt-4 rounded-lg p-3.5 text-left" style={{ backgroundColor: T.page, border: `1px solid ${T.border}` }}>
                <Row label={isTeacher ? 'Teacher ID' : 'Student ID'} value={loginId} />
                <Row label="Password" value={password} mono />
                <p className="cl-body text-[10.5px] mt-2" style={{ color: T.inkFaint }}>Auth email (internal use): {createdEmail}</p>
              </div>
              <p className="cl-body text-[11px] mt-3" style={{ color: T.inkFaint }}>Share these credentials securely — they won't be shown again here.</p>
              <button onClick={handleClose} className="cl-icon-btn cl-body w-full mt-5 text-[13px] font-semibold py-2.5 rounded-lg text-white" style={{ backgroundColor: T.royal }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <Field label="Full Name">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder={isTeacher ? 'e.g. Hassan Raza' : 'e.g. Ali Raza'} className="auj-input" />
              </Field>
              <Field label={isTeacher ? 'Teacher ID' : 'Student ID'}>
                <input value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder={isTeacher ? 'e.g. TCH-1042' : 'e.g. STU-2044'} className="auj-input" />
              </Field>
              <Field label="Phone">
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 300 1234567" className="auj-input" />
              </Field>
              <Field label={isTeacher ? 'Department' : 'Course'}>
                <select value={isTeacher ? department : course} onChange={(e) => (isTeacher ? setDepartment(e.target.value) : setCourse(e.target.value))} className="auj-input">
                  {(isTeacher ? teacherDepartments : studentCourses).map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Temporary Password">
                <div className="relative flex items-center gap-2">
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPw ? 'text' : 'password'} className="auj-input flex-1" />
                  <button type="button" onClick={() => setShowPw((s) => !s)} className="cl-icon-btn rounded-lg p-2" style={{ backgroundColor: T.page }}>
                    {showPw ? <EyeOff size={15} color={T.inkSoft} /> : <Eye size={15} color={T.inkSoft} />}
                  </button>
                  <button type="button" onClick={() => setPassword(genPassword())} className="cl-icon-btn rounded-lg p-2" style={{ backgroundColor: T.page }} title="Generate new password">
                    <RefreshCw size={15} color={T.inkSoft} />
                  </button>
                </div>
              </Field>

              {err && (
                <div className="rounded-lg px-3 py-2.5 cl-body text-[12px]" style={{ backgroundColor: T.redTint, color: T.red }}>{err}</div>
              )}

              <button
                type="submit"
                disabled={stage === 'saving'}
                className="cl-icon-btn cl-body w-full mt-1 text-[13.5px] font-semibold py-3 rounded-lg text-white flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ backgroundColor: isTeacher ? T.green : T.royal }}
              >
                {stage === 'saving' && <Loader2 size={15} className="animate-spin" />}
                {stage === 'saving' ? 'Creating account…' : `Create ${isTeacher ? 'Teacher' : 'Student'} Account`}
              </button>
            </form>
          )}
        </div>

        <style>{`
          .auj-input {
            border: 1.5px solid ${T.border}; border-radius: 10px; padding: 9px 12px;
            font-size: 13.5px; color: ${T.ink}; background: #fff; outline: none; width: 100%;
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="cl-body text-[12px] font-semibold" style={{ color: T.inkSoft }}>{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Row({ label, value, mono }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="cl-body text-[11.5px]" style={{ color: T.inkFaint }}>{label}</span>
      <span className={`cl-body text-[12.5px] font-semibold ${mono ? 'font-mono' : ''}`} style={{ color: T.ink }}>{value}</span>
    </div>
  );
}
