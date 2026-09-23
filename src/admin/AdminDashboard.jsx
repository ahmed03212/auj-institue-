import { GraduationCap, UserRound, ShieldCheck, Activity } from 'lucide-react';
import { T } from '../tokens.js';
import { useUsersByRole } from '../hooks/useFirestoreUsers.js';

export default function AdminDashboard({ navigate }) {
  const { users: teachers, loading: tLoading } = useUsersByRole('teacher');
  const { users: students, loading: sLoading } = useUsersByRole('student');

  const activeTeachers = teachers.filter((t) => t.status !== 'suspended').length;
  const activeStudents = students.filter((s) => s.status !== 'suspended').length;

  return (
    <div className="cl-fade-in flex flex-col gap-6">
      <div>
        <h2 className="cl-display text-[15px] font-bold" style={{ color: T.ink }}>Welcome back, Super Admin</h2>
        <p className="cl-body text-[13px] mt-1" style={{ color: T.inkSoft }}>Live data from Firestore — updates instantly as accounts are added.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={GraduationCap} label="Total Students" value={sLoading ? '—' : students.length} sub={`${activeStudents} active`} color={T.royal} tint={T.statBg} onClick={() => navigate('/students')} />
        <StatCard icon={UserRound} label="Total Teachers" value={tLoading ? '—' : teachers.length} sub={`${activeTeachers} active`} color={T.green} tint={T.greenTint} onClick={() => navigate('/teachers')} />
        <StatCard icon={ShieldCheck} label="System Role" value="Admin" sub="Full access" color={T.violet} tint={T.violetTint} />
      </div>

      <div className="cl-card rounded-2xl p-6" style={{ backgroundColor: T.card, border: `1px solid ${T.border}` }}>
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} color={T.inkFaint} />
          <h3 className="cl-display text-[14px] font-bold" style={{ color: T.ink }}>What's real vs sample data</h3>
        </div>
        <ul className="cl-body text-[13px] space-y-2" style={{ color: T.inkSoft }}>
          <li>✅ Login, account creation, and the Teachers/Students lists here are wired to real Firebase Auth + Firestore.</li>
          <li>✅ The public website's stats and course list read from <code>src/marketing/siteContent.js</code> — edit that one file to update the site.</li>
          <li>🟡 Academic content in the portals (attendance, marks, timetable) still shows sample data for demonstration.</li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color, tint, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className="cl-card cl-fade-in rounded-2xl p-5 text-left"
      style={{ backgroundColor: T.card, border: `1px solid ${T.border}`, cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="rounded-xl flex items-center justify-center mb-3" style={{ width: 42, height: 42, backgroundColor: tint }}>
        <Icon size={20} color={color} />
      </div>
      <p className="cl-display text-[22px] font-bold" style={{ color: T.ink }}>{value}</p>
      <p className="cl-body text-[12.5px] mt-0.5" style={{ color: T.inkSoft }}>{label}</p>
      <p className="cl-body text-[11px] mt-1.5" style={{ color: T.inkFaint }}>{sub}</p>
    </button>
  );
}
