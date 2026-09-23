import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase.js';

// Live-subscribes to all users with a given role (teacher/student), sorted
// newest first. Used by the admin panel's list pages so adding/editing a
// user updates the table instantly without a manual refresh.
export function useUsersByRole(role) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'users'), where('role', '==', role), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setUsers(snap.docs.map((d) => ({ uid: d.id, ...d.data() })));
        setLoading(false);
      },
      (e) => {
        setError(e.message || 'Failed to load data.');
        setLoading(false);
      }
    );
    return unsub;
  }, [role]);

  return { users, loading, error };
}

export function useAllUsersCount() {
  const { users: teachers } = useUsersByRole('teacher');
  const { users: students } = useUsersByRole('student');
  return { teacherCount: teachers.length, studentCount: students.length };
}
