import { useEffect, useState } from 'react';

// Same behaviour as the hook already living inside TeacherApp.jsx, extracted
// so the Admin and Student portals can share it. Any hash value that doesn't
// look like an internal path (i.e. doesn't start with "/") is treated as if
// it were empty, so a stray top-level hash (like the hidden admin route
// token, or the marketing site's own hash) never leaks into a portal's own
// navigation state.
export function useHashRouter(defaultPath = '/dashboard') {
  const getPath = () => {
    const h = window.location.hash.replace(/^#/, '');
    return h.startsWith('/') ? h : defaultPath;
  };
  const [path, setPath] = useState(getPath());

  useEffect(() => {
    if (!window.location.hash.replace(/^#/, '').startsWith('/')) {
      window.location.hash = defaultPath;
    }
    const onChange = () => setPath(getPath());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = (p) => {
    if (p !== path) window.location.hash = p;
  };
  return [path, navigate];
}
