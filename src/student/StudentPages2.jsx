import { useState } from 'react';
import { FileText, Upload, CheckCircle2, Send, Mail, Phone, PenSquare, Check, X } from 'lucide-react';
import { T } from '../tokens.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const initialAssignments = [
  { id: 1, title: 'Portfolio Landing Page', course: 'Web Development', due: 'Aug 28', submitted: false },
  { id: 2, title: 'CSS Grid Layout Exercise', course: 'Web Development', due: 'Sep 2', submitted: false },
  { id: 3, title: 'JS DOM Manipulation Quiz', course: 'Web Development', due: 'Aug 20', submitted: true },
];

export function AssignmentsPage() {
  const [assignments, setAssignments] = useState(initialAssignments);

  function submit(id) {
    setAssignments((list) => list.map((a) => (a.id === id ? { ...a, submitted: true } : a)));
  }

  return (
    <div className="cl-fade-in flex flex-col gap-3">
      {assignments.map((a) => (
        <div key={a.id} className="cl-card rounded-xl p-4 flex items-center justify-between gap-3 flex-wrap" style={{ backgroundColor: T.card, border: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="rounded-lg flex items-center justify-center shrink-0" style={{ width: 40, height: 40, backgroundColor: a.submitted ? T.greenTint : T.statBg }}>
              <FileText size={18} color={a.submitted ? T.green : T.royal} />
            </div>
            <div className="min-w-0">
              <p className="cl-body text-[13px] font-semibold truncate" style={{ color: T.ink }}>{a.title}</p>
              <p className="cl-body text-[11.5px] mt-0.5" style={{ color: T.inkFaint }}>{a.course} · Due {a.due}</p>
            </div>
          </div>
          {a.submitted ? (
            <span className="cl-body flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-full shrink-0" style={{ backgroundColor: T.greenTint, color: T.green }}>
              <CheckCircle2 size={13} /> Submitted
            </span>
          ) : (
            <button onClick={() => submit(a.id)} className="cl-icon-btn cl-body flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-2 rounded-lg text-white shrink-0" style={{ backgroundColor: T.royal }}>
              <Upload size={13} /> Submit
            </button>
          )}
        </div>
      ))}
      <p className="cl-body text-[11.5px] text-center mt-1" style={{ color: T.inkFaint }}>Sample assignment list — submissions are simulated for this demo.</p>
    </div>
  );
}

const initialThread = [
  { from: 'teacher', text: "Don't forget the portfolio project is due Thursday.", time: '2 days ago' },
  { from: 'me', text: 'Got it, working on it now!', time: '2 days ago' },
];

export function MessagesPage() {
  const [thread, setThread] = useState(initialThread);
  const [draft, setDraft] = useState('');

  function send() {
    if (!draft.trim()) return;
    setThread((t) => [...t, { from: 'me', text: draft.trim(), time: 'Just now' }]);
    setDraft('');
  }

  return (
    <div className="cl-fade-in flex flex-col rounded-2xl overflow-hidden" style={{ backgroundColor: T.card, border: `1px solid ${T.border}`, height: 480 }}>
      <div className="px-5 py-3.5 flex items-center gap-2.5" style={{ borderBottom: `1px solid ${T.border}` }}>
        <div className="rounded-full flex items-center justify-center text-white text-[11px] font-bold" style={{ width: 30, height: 30, backgroundColor: T.green }}>H</div>
        <div>
          <p className="cl-body text-[13px] font-semibold" style={{ color: T.ink }}>Hassan Raza</p>
          <p className="cl-body text-[10.5px]" style={{ color: T.inkFaint }}>Web Development Instructor</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
        {thread.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[75%] rounded-2xl px-4 py-2.5" style={m.from === 'me' ? { backgroundColor: T.royal, color: '#fff' } : { backgroundColor: T.page, color: T.ink }}>
              <p className="cl-body text-[13px]">{m.text}</p>
              <p className="cl-body text-[10px] mt-1 opacity-70">{m.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-3" style={{ borderTop: `1px solid ${T.border}` }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message…"
          className="cl-body flex-1 rounded-lg px-3.5 py-2.5 text-[13px] outline-none"
          style={{ backgroundColor: T.page, border: `1px solid ${T.border}`, color: T.ink }}
        />
        <button onClick={send} className="cl-icon-btn rounded-lg p-2.5" style={{ backgroundColor: T.royal }}>
          <Send size={15} color="#fff" />
        </button>
      </div>
    </div>
  );
}

export function StudentProfilePage() {
  const { profile, updateOwnProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await updateOwnProfile({ name: name.trim(), phone: phone.trim() });
    setSaving(false);
    setEditing(false);
  }

  function cancel() {
    setName(profile?.name || '');
    setPhone(profile?.phone || '');
    setEditing(false);
  }

  return (
    <div className="cl-fade-in flex flex-col gap-5" style={{ maxWidth: 520 }}>
      <div className="cl-card rounded-2xl overflow-hidden" style={{ backgroundColor: T.card, border: `1px solid ${T.border}` }}>
        <div className="p-6" style={{ background: `linear-gradient(135deg, ${T.navyDeep}, ${T.navy})` }}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {editing ? (
                <input value={name} onChange={(e) => setName(e.target.value)} className="cl-display text-[18px] font-bold bg-transparent outline-none border-b w-full" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} />
              ) : (
                <h2 className="cl-display text-white text-[18px] font-bold">{profile?.name}</h2>
              )}
              <p className="cl-body text-[12px] mt-1" style={{ color: '#9BA7D4' }}>{profile?.course} · Student ID: {profile?.loginId}</p>
            </div>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="cl-icon-btn cl-body flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-2 rounded-lg text-white shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)' }}>
                <PenSquare size={13} /> Edit
              </button>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={cancel} className="cl-icon-btn p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}><X size={14} color="#fff" /></button>
                <button onClick={save} disabled={saving} className="cl-icon-btn p-2 rounded-lg" style={{ backgroundColor: T.royal }}><Check size={14} color="#fff" /></button>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 flex flex-col gap-3">
          <InfoRow icon={Mail} value={profile?.email} label="Login email (internal)" />
          <div>
            <label className="cl-body text-[11px] font-semibold uppercase tracking-wide" style={{ color: T.inkFaint }}>Phone</label>
            {editing ? (
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="cl-body w-full mt-1 rounded-lg px-3 py-2.5 text-[13px] outline-none" style={{ backgroundColor: T.page, border: `1px solid ${T.border}`, color: T.ink }} />
            ) : (
              <p className="cl-body text-[13px] mt-1 flex items-center gap-2" style={{ color: T.inkSoft }}><Phone size={13} color={T.inkFaint} /> {profile?.phone || '—'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div>
      <label className="cl-body text-[11px] font-semibold uppercase tracking-wide" style={{ color: T.inkFaint }}>{label}</label>
      <p className="cl-body text-[13px] mt-1 flex items-center gap-2" style={{ color: T.inkSoft }}><Icon size={13} color={T.inkFaint} /> {value}</p>
    </div>
  );
}
