import { CalendarCheck, FileUp, Award, TrendingUp, Clock, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { T } from '../tokens.js';

// ---- Sample academic data (demo only — see admin dashboard note) ----
const attendanceLog = [
  { date: 'Aug 18', course: 'Web Development', status: 'present' },
  { date: 'Aug 19', course: 'Web Development', status: 'present' },
  { date: 'Aug 20', course: 'Web Development', status: 'absent' },
  { date: 'Aug 21', course: 'Web Development', status: 'present' },
  { date: 'Aug 22', course: 'Web Development', status: 'late' },
  { date: 'Aug 24', course: 'Web Development', status: 'present' },
];

const timetable = [
  { day: 'Monday', time: '9:00 – 11:00 AM', course: 'Web Development', room: 'Lab 2' },
  { day: 'Tuesday', time: '11:00 AM – 1:00 PM', course: 'UI/UX Design', room: 'Lab 1' },
  { day: 'Wednesday', time: '9:00 – 11:00 AM', course: 'Web Development', room: 'Lab 2' },
  { day: 'Thursday', time: '2:00 – 4:00 PM', course: 'Database Systems', room: 'Lab 3' },
  { day: 'Sunday', time: '10:00 AM – 12:00 PM', course: 'Web Development', room: 'Lab 2' },
];

const marks = [
  { subject: 'HTML & CSS Fundamentals', obtained: 92, total: 100 },
  { subject: 'JavaScript Essentials', obtained: 85, total: 100 },
  { subject: 'React Basics', obtained: 78, total: 100 },
  { subject: 'Mid Term Project', obtained: 44, total: 50 },
];

export function StudentDashboardPage({ profile }) {
  const present = attendanceLog.filter((a) => a.status === 'present').length;
  const attendancePct = Math.round((present / attendanceLog.length) * 100);

  return (
    <div className="cl-fade-in flex flex-col gap-6">
      <div className="cl-fade-in rounded-2xl p-6" style={{ background: `linear-gradient(135deg, ${T.navyDeep}, ${T.navy})` }}>
        <p className="cl-body text-[12.5px]" style={{ color: '#9BA7D4' }}>Welcome back,</p>
        <h2 className="cl-display text-white text-[20px] font-bold mt-0.5">{profile?.name || 'Student'}</h2>
        <p className="cl-body text-[12px] mt-1.5" style={{ color: '#8FA0D6' }}>{profile?.course || 'Web Development'} · ID: {profile?.loginId}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MiniStat icon={CalendarCheck} label="Attendance" value={`${attendancePct}%`} tint={T.statBg} color={T.royal} />
        <MiniStat icon={FileUp} label="Pending Assignments" value="2" tint={T.amberTint} color={T.amber} />
        <MiniStat icon={Award} label="Average Score" value="84%" tint={T.greenTint} color={T.green} />
      </div>

      <div className="cl-card rounded-2xl p-6" style={{ backgroundColor: T.card, border: `1px solid ${T.border}` }}>
        <h3 className="cl-display text-[14px] font-bold mb-4" style={{ color: T.ink }}>Today's Class</h3>
        <div className="flex items-center gap-4 rounded-xl p-4" style={{ backgroundColor: T.statBg }}>
          <div className="rounded-lg flex items-center justify-center shrink-0" style={{ width: 44, height: 44, backgroundColor: T.royal }}>
            <Clock size={20} color="#fff" />
          </div>
          <div>
            <p className="cl-body text-[13.5px] font-semibold" style={{ color: T.ink }}>Web Development — 9:00 to 11:00 AM</p>
            <p className="cl-body text-[12px] mt-0.5 flex items-center gap-1" style={{ color: T.inkSoft }}><MapPin size={11} /> Lab 2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value, tint, color }) {
  return (
    <div className="cl-card cl-fade-in rounded-2xl p-5" style={{ backgroundColor: T.card, border: `1px solid ${T.border}` }}>
      <div className="rounded-xl flex items-center justify-center mb-3" style={{ width: 40, height: 40, backgroundColor: tint }}>
        <Icon size={18} color={color} />
      </div>
      <p className="cl-display text-[21px] font-bold" style={{ color: T.ink }}>{value}</p>
      <p className="cl-body text-[12px] mt-0.5" style={{ color: T.inkSoft }}>{label}</p>
    </div>
  );
}

export function AttendancePage() {
  const present = attendanceLog.filter((a) => a.status === 'present').length;
  const pct = Math.round((present / attendanceLog.length) * 100);
  return (
    <div className="cl-fade-in flex flex-col gap-5">
      <div className="cl-card rounded-2xl p-6 flex items-center gap-5" style={{ backgroundColor: T.card, border: `1px solid ${T.border}` }}>
        <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 60, height: 60, backgroundColor: T.statBg }}>
          <TrendingUp size={26} color={T.royal} />
        </div>
        <div>
          <p className="cl-display text-[24px] font-bold" style={{ color: T.ink }}>{pct}%</p>
          <p className="cl-body text-[12.5px]" style={{ color: T.inkSoft }}>Overall attendance this month</p>
        </div>
      </div>
      <div className="cl-card rounded-2xl overflow-hidden" style={{ backgroundColor: T.card, border: `1px solid ${T.border}` }}>
        {attendanceLog.map((a, i) => (
          <div key={i} className="cl-row flex items-center justify-between px-5 py-3.5" style={{ borderBottom: i < attendanceLog.length - 1 ? `1px solid ${T.border}` : 'none' }}>
            <div>
              <p className="cl-body text-[13px] font-semibold" style={{ color: T.ink }}>{a.date}</p>
              <p className="cl-body text-[11.5px]" style={{ color: T.inkFaint }}>{a.course}</p>
            </div>
            <StatusPill status={a.status} />
          </div>
        ))}
      </div>
      <p className="cl-body text-[11.5px] text-center" style={{ color: T.inkFaint }}>Sample data for demonstration.</p>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    present: { bg: T.greenTint, fg: T.green, label: 'Present', icon: CheckCircle2 },
    absent: { bg: T.redTint, fg: T.red, label: 'Absent', icon: XCircle },
    late: { bg: T.amberTint, fg: T.amber, label: 'Late', icon: Clock },
  };
  const s = map[status];
  return (
    <span className="cl-body flex items-center gap-1.5 text-[11.5px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: s.bg, color: s.fg }}>
      <s.icon size={12} /> {s.label}
    </span>
  );
}

export function TimetablePage() {
  return (
    <div className="cl-fade-in flex flex-col gap-3">
      {timetable.map((t, i) => (
        <div key={i} className="cl-card cl-row flex items-center gap-4 rounded-xl p-4" style={{ backgroundColor: T.card, border: `1px solid ${T.border}` }}>
          <div className="rounded-lg flex flex-col items-center justify-center shrink-0" style={{ width: 56, height: 56, backgroundColor: T.statBg }}>
            <span className="cl-display text-[11px] font-bold" style={{ color: T.royal }}>{t.day.slice(0, 3)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="cl-body text-[13.5px] font-semibold" style={{ color: T.ink }}>{t.course}</p>
            <p className="cl-body text-[11.5px] mt-0.5 flex items-center gap-3 flex-wrap" style={{ color: T.inkSoft }}>
              <span className="flex items-center gap-1"><Clock size={11} />{t.time}</span>
              <span className="flex items-center gap-1"><MapPin size={11} />{t.room}</span>
            </p>
          </div>
        </div>
      ))}
      <p className="cl-body text-[11.5px] text-center mt-1" style={{ color: T.inkFaint }}>Sample data for demonstration.</p>
    </div>
  );
}

export function MarksPage() {
  return (
    <div className="cl-fade-in flex flex-col gap-3">
      {marks.map((m, i) => {
        const pct = Math.round((m.obtained / m.total) * 100);
        const color = pct >= 80 ? T.green : pct >= 60 ? T.amber : T.red;
        return (
          <div key={i} className="cl-card rounded-xl p-4" style={{ backgroundColor: T.card, border: `1px solid ${T.border}` }}>
            <div className="flex items-center justify-between mb-2">
              <p className="cl-body text-[13px] font-semibold" style={{ color: T.ink }}>{m.subject}</p>
              <span className="cl-body text-[13px] font-bold" style={{ color }}>{m.obtained}/{m.total}</span>
            </div>
            <div className="w-full rounded-full h-2 overflow-hidden" style={{ backgroundColor: T.border }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color, transition: 'width 1s cubic-bezier(0.16,1,0.3,1)' }} />
            </div>
          </div>
        );
      })}
      <p className="cl-body text-[11.5px] text-center mt-1" style={{ color: T.inkFaint }}>Sample data for demonstration.</p>
    </div>
  );
}
