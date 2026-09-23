/**
 * Firebase Auth needs an email + password under the hood. Students and
 * teachers log in with a plain ID instead of an email, so we deterministically
 * turn "STU-2044" into a synthetic address like "stu-2044@students.auj.internal".
 * The same function is used both when an admin creates an account and when
 * a student/teacher signs in, so the two always match.
 */
export function idToEmail(loginId, role) {
  const clean = String(loginId).trim().toLowerCase().replace(/\s+/g, '-');
  const domain = role === 'teacher' ? 'teachers.auj.internal' : 'students.auj.internal';
  return `${clean}@${domain}`;
}

export function isValidLoginId(id) {
  return /^[a-zA-Z0-9._-]{3,20}$/.test(String(id || '').trim());
}
