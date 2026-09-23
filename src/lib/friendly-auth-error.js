export function friendlyAuthError(e) {
  const code = e?.code || '';
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) {
    return 'Incorrect ID/email or password.';
  }
  if (code.includes('too-many-requests')) return 'Too many attempts. Try again in a few minutes.';
  if (code.includes('network-request-failed')) return 'Network error — check your connection.';
  if (code.includes('email-already-in-use')) return 'That ID is already registered to another account.';
  if (code.includes('weak-password')) return 'Password must be at least 6 characters.';
  if (code.includes('invalid-email')) return 'That ID contains characters that cannot be used.';
  return e?.message || 'Something went wrong. Please try again.';
}
