import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { UserPlus, Search, MoreVertical, Ban, CheckCircle2, Phone } from 'lucide-react';
import { T } from '../tokens.js';
import { db } from '../firebase.js';
import { useUsersByRole } from '../hooks/useFirestoreUsers.js';
import AddUserModal from './AddUserModal.jsx';

export default function ManageUsers({ role }) {
  const isTeacher = role === 'teacher';
  const { users, loading, error } = useUsersByRole(role);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [menuFor, setMenuFor] = useState(null);

  const filtered = users.filter((u) =>
    !search.trim() ||
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.loginId?.toLowerCase().includes(search.toLowerCase())
  );

  async function toggleStatus(u) {
    const next = u.status === 'suspended' ? 'active' : 'suspended';
    await updateDoc(doc(db, 'users', u.uid), { status: next });
    setMenuFor(null);
  }

  return (
    <div className="cl-fade-in flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative" style={{ maxWidth: 280, flex: 1 }}>
          <Search size={15} color={T.inkFaint} className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${isTeacher ? 'teachers' : 'students'}...`}
            className="cl-body w-full rounded-lg pl-9 pr-3 py-2.5 text-[13px] outline-none"
            style={{ backgroundColor: T.card, border: `1px solid ${T.border}`, color: T.ink }}
          />
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="cl-icon-btn cl-body flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-[13px] font-semibold"
          style={{ backgroundColor: isTeacher ? T.green : T.royal }}
        >
          <UserPlus size={15} /> Add {isTeacher ? 'Teacher' : 'Student'}
        </button>
      </div>

      {error && <div className="cl-body text-[12.5px] rounded-lg px-3 py-2.5" style={{ backgroundColor: T.redTint, color: T.red }}>{error}</div>}

      <div className="cl-card rounded-2xl overflow-hidden" style={{ backgroundColor: T.card, border: `1px solid ${T.border}` }}>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: 560 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {['Name', isTeacher ? 'Teacher ID' : 'Student ID', isTeacher ? 'Department' : 'Course', 'Phone', 'Status', ''].map((h) => (
                  <th key={h} className="cl-body text-left text-[11px] font-bold uppercase tracking-wide px-5 py-3" style={{ color: T.inkFaint }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} className="cl-body text-[13px] text-center py-10" style={{ color: T.inkFaint }}>Loading…</td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={6} className="cl-body text-[13px] text-center py-10" style={{ color: T.inkFaint }}>
                  {users.length === 0 ? `No ${isTeacher ? 'teachers' : 'students'} yet. Add the first one.` : 'No matches.'}
                </td></tr>
              )}
              {filtered.map((u) => (
                <tr key={u.uid} className="cl-row relative" style={{ borderBottom: `1px solid ${T.border}` }}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="rounded-full flex items-center justify-center shrink-0 text-white text-[11px] font-bold" style={{ width: 30, height: 30, backgroundColor: isTeacher ? T.green : T.royal }}>
                        {(u.name || '?').slice(0, 1).toUpperCase()}
                      </div>
                      <span className="cl-body text-[13px] font-semibold whitespace-nowrap" style={{ color: T.ink }}>{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 cl-body text-[12.5px]" style={{ color: T.inkSoft }}>{u.loginId}</td>
                  <td className="px-5 py-3.5 cl-body text-[12.5px] whitespace-nowrap" style={{ color: T.inkSoft }}>{isTeacher ? u.department : u.course}</td>
                  <td className="px-5 py-3.5 cl-body text-[12.5px]" style={{ color: T.inkSoft }}>
                    <span className="flex items-center gap-1.5"><Phone size={12} color={T.inkFaint} />{u.phone || '—'}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="cl-body text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={u.status === 'suspended' ? { backgroundColor: T.redTint, color: T.red } : { backgroundColor: T.greenTint, color: T.green }}
                    >
                      {u.status === 'suspended' ? 'Suspended' : 'Active'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right relative">
                    <button onClick={() => setMenuFor(menuFor === u.uid ? null : u.uid)} className="cl-icon-btn p-1.5 rounded-lg" style={{ backgroundColor: T.page }}>
                      <MoreVertical size={15} color={T.inkSoft} />
                    </button>
                    {menuFor === u.uid && (
                      <div className="cl-fade-in absolute right-5 top-full mt-1 rounded-lg overflow-hidden z-10" style={{ backgroundColor: T.card, border: `1px solid ${T.border}`, boxShadow: '0 12px 24px -8px rgba(15,23,66,0.2)', minWidth: 160 }}>
                        <button onClick={() => toggleStatus(u)} className="cl-body flex items-center gap-2 w-full px-3.5 py-2.5 text-[12.5px] text-left" style={{ color: u.status === 'suspended' ? T.green : T.red }}>
                          {u.status === 'suspended' ? <CheckCircle2 size={14} /> : <Ban size={14} />}
                          {u.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddUserModal role={role} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
