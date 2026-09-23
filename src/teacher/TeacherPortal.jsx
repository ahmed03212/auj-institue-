import { useAuth } from '../contexts/AuthContext.jsx';
import TeacherApp from './TeacherApp.jsx';

// Bridges the real Firebase-backed AuthContext to the existing TeacherApp
// component, which already expects `profile`, `onUpdateProfile`, `onLogout`.
export default function TeacherPortal() {
  const { profile, updateOwnProfile, logout } = useAuth();

  // Give the existing UI the fields it expects even before a bio/role has
  // ever been set in Firestore, so nothing renders "undefined".
  const displayProfile = {
    name: profile?.name || '',
    role: profile?.department ? `${profile.department} Instructor` : 'Instructor',
    email: profile?.email || '',
    phone: profile?.phone || '',
    bio: profile?.bio || '',
    ...profile,
  };

  return <TeacherApp profile={displayProfile} onUpdateProfile={updateOwnProfile} onLogout={logout} />;
}
