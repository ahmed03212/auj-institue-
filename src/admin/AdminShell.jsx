import { useState } from 'react';
import { LayoutDashboard, GraduationCap, UserRound, ShieldCheck, LogOut, Menu, X, Globe } from 'lucide-react';
import { T, globalStyle } from '../tokens.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/teachers', label: 'Teachers', icon: UserRound },
  { path: '/students', label: 'Students', icon: GraduationCap },
];

export default function AdminShell({ path, navigate, children }) {
  const { profile, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavList = ({ onNav }) => (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map((item) => {
        const active = path === item.path;
        return (
          <button
            key={item.path}
            onClick={() => { navigate(item.path); onNav?.(); }}
            className="cl-body flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium text-left transition-all"
            style={active ? { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' } : { color: '#9BA7D4' }}
          >
            <item.icon size={17} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="flex w-full min-h-screen cl-body" style={{ backgroundColor: T.page }}>
      <style>{globalStyle}</style>

      <aside className="hidden lg:flex flex-col shrink-0" style={{ width: 240, background: `linear-gradient(180deg, ${T.navyDeep}, ${T.navy})` }}>
        <SidebarHeader />
        <div className="flex-1 pt-2">
          <NavList />
        </div>
        <SidebarFooter profile={profile} logout={logout} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} onClick={() => setMobileOpen(false)} />
          <aside className="cl-fade-in absolute left-0 top-0 bottom-0 flex flex-col" style={{ width: 240, background: `linear-gradient(180deg, ${T.navyDeep}, ${T.navy})` }}>
            <div className="flex justify-end p-3">
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <X size={16} color="#fff" />
              </button>
            </div>
            <SidebarHeader />
            <div className="flex-1 pt-2">
              <NavList onNav={() => setMobileOpen(false)} />
            </div>
            <SidebarFooter profile={profile} logout={logout} />
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="auj-glass-header sticky top-0 z-30 flex items-center justify-between px-5 lg:px-8 py-4" style={{ borderBottom: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg" style={{ backgroundColor: T.page }}>
              <Menu size={18} color={T.inkSoft} />
            </button>
            <h1 className="cl-display text-[17px] font-bold" style={{ color: T.ink }}>
              {navItems.find((n) => n.path === path)?.label || 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-2.5 rounded-full pl-1 pr-3.5 py-1" style={{ backgroundColor: T.violetTint }}>
            <div className="rounded-full flex items-center justify-center" style={{ width: 28, height: 28, backgroundColor: T.violet }}>
              <ShieldCheck size={14} color="#fff" />
            </div>
            <span className="cl-body text-[12.5px] font-semibold" style={{ color: T.violet }}>Super Admin</span>
          </div>
        </header>
        <main className="px-5 lg:px-8 py-6" key={path}>
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarHeader() {
  return (
    <div className="flex items-center gap-2.5 px-5 py-5">
      <div className="cl-display flex items-center justify-center rounded-xl" style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${T.royal}, ${T.cyan})` }}>
        <span className="text-white text-[12px] font-bold">AUJ</span>
      </div>
      <div>
        <p className="cl-display text-white text-[13.5px] font-bold leading-tight">AUJ Institute</p>
        <p className="cl-body text-[10.5px]" style={{ color: '#8FA0D6' }}>System Admin</p>
      </div>
    </div>
  );
}

function SidebarFooter({ profile, logout }) {
  return (
    <div className="px-3 pb-4 pt-2" style={{ borderTop: `1px solid ${T.navyBorder}` }}>
      <div className="flex items-center gap-2.5 px-2 py-2.5">
        <div className="rounded-full flex items-center justify-center shrink-0 text-white text-[12px] font-bold" style={{ width: 32, height: 32, backgroundColor: T.violet }}>
          {(profile?.name || 'A').slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="cl-body text-[12px] font-semibold text-white truncate">{profile?.name || 'Admin'}</p>
          <p className="cl-body text-[10.5px] truncate" style={{ color: '#8FA0D6' }}>{profile?.email}</p>
        </div>
      </div>
      <a
        href="#/"
        className="cl-body flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-[13px] font-medium"
        style={{ color: '#9BA7D4' }}
      >
        <Globe size={16} /> View Website
      </a>
      <button onClick={logout} className="cl-body flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-[13px] font-medium" style={{ color: '#F3908B' }}>
        <LogOut size={16} /> Sign Out
      </button>
    </div>
  );
}
