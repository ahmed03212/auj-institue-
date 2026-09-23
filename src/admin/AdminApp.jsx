import { useHashRouter } from '../hooks/useHashRouter.js';
import AdminShell from './AdminShell.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import ManageUsers from './ManageUsers.jsx';

export default function AdminApp() {
  const [path, navigate] = useHashRouter('/dashboard');

  let content;
  if (path === '/teachers') content = <ManageUsers role="teacher" />;
  else if (path === '/students') content = <ManageUsers role="student" />;
  else content = <AdminDashboard navigate={navigate} />;

  return (
    <AdminShell path={path} navigate={navigate}>
      {content}
    </AdminShell>
  );
}
