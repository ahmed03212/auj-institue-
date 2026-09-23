import { useHashRouter } from '../hooks/useHashRouter.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import StudentShell from './StudentShell.jsx';
import { StudentDashboardPage, AttendancePage, TimetablePage, MarksPage } from './StudentPages.jsx';
import { AssignmentsPage, MessagesPage, StudentProfilePage } from './StudentPages2.jsx';

export default function StudentApp() {
  const [path, navigate] = useHashRouter('/dashboard');
  const { profile } = useAuth();

  let content;
  if (path === '/attendance') content = <AttendancePage />;
  else if (path === '/assignments') content = <AssignmentsPage />;
  else if (path === '/timetable') content = <TimetablePage />;
  else if (path === '/marks') content = <MarksPage />;
  else if (path === '/messages') content = <MessagesPage />;
  else if (path === '/profile') content = <StudentProfilePage />;
  else content = <StudentDashboardPage profile={profile} />;

  return (
    <StudentShell path={path} navigate={navigate}>
      {content}
    </StudentShell>
  );
}
