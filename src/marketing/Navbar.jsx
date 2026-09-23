import { useEffect, useState } from 'react';
import { ArrowRight, LogIn } from 'lucide-react';
import { W } from './siteTokens.js';
import { site, navLinks } from './siteContent.js';
import { useActiveSection, useScrolled, scrollToSection } from './useSiteAnimations.js';

const sectionIds = navLinks.map((l) => l.id);

export default function Navbar() {
  const scrolled = useScrolled(24);
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.classList.toggle('w-noscroll', open);
    return () => document.body.classList.remove('w-noscroll');
  }, [open]);

  // Close the drawer if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const go = (id) => {
    setOpen(false);
    // Let the drawer close before scrolling so the motion reads cleanly.
    setTimeout(() => scrollToSection(id), open ? 220 : 0);
  };

  return (
    <>
      <header
        className={scrolled ? 'w-glass' : ''}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          height: 'var(--w-nav-h)',
          display: 'flex',
          alignItems: 'center',
          background: scrolled ? undefined : 'transparent',
          borderBottom: `1px solid ${scrolled ? W.border : 'transparent'}`,
          boxShadow: scrolled ? '0 4px 24px -12px rgba(11,27,54,0.18)' : 'none',
          transition: 'background-color .45s var(--w-ease), box-shadow .45s var(--w-ease), border-color .45s var(--w-ease)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); go('home'); }}
            style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', flexShrink: 0 }}
          >
            <div
              className="w-animated-gradient"
              style={{
                width: 42, height: 42, borderRadius: 13,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 18px -6px rgba(79,143,239,0.6)',
              }}
            >
              <span className="w-display" style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>AUJ</span>
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <div className="w-display" style={{ fontSize: 16, fontWeight: 800, color: W.navy }}>{site.brandTop}</div>
              <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', color: W.text2 }}>
                {site.brandBottom}
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="w-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); go(link.id); }}
                className={`w-link${active === link.id ? ' is-active' : ''}`}
                style={{ fontSize: 14.5 }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="w-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a href="#/login" className="w-btn w-btn-ghost" style={{ padding: '10px 16px', fontSize: 13.5 }}>
              <LogIn size={15} /> Login
            </a>
            <button className="w-btn w-btn-primary" style={{ padding: '11px 20px', fontSize: 13.5 }} onClick={() => go('contact')}>
              Enroll Now <ArrowRight size={15} className="w-arrow" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="w-nav-mobile"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{
              width: 44, height: 44, borderRadius: 12,
              border: `1px solid ${W.border}`, background: '#fff',
              display: 'none', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0, position: 'relative',
            }}
          >
            <span style={{ position: 'relative', width: 18, height: 12, display: 'block' }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    position: 'absolute', left: 0, height: 2, width: '100%',
                    borderRadius: 2, background: W.navy,
                    top: i === 0 ? 0 : i === 1 ? 5 : 10,
                    transform:
                      open && i === 0 ? 'translateY(5px) rotate(45deg)' :
                      open && i === 2 ? 'translateY(-5px) rotate(-45deg)' : 'none',
                    opacity: open && i === 1 ? 0 : 1,
                    transition: 'transform .4s var(--w-ease), opacity .25s var(--w-ease)',
                  }}
                />
              ))}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 88,
          background: 'rgba(11,27,54,0.35)',
          backdropFilter: 'blur(3px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity .35s var(--w-ease)',
        }}
      />
      <aside
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 89,
          width: 'min(320px, 86vw)',
          background: '#fff',
          borderLeft: `1px solid ${W.border}`,
          boxShadow: '-20px 0 50px -20px rgba(11,27,54,0.25)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .45s var(--w-ease)',
          display: 'flex', flexDirection: 'column',
          paddingTop: 'calc(var(--w-nav-h) + 12px)',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', padding: '8px 20px', gap: 2 }}>
          {navLinks.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); go(link.id); }}
              style={{
                padding: '14px 12px',
                fontSize: 15.5,
                fontWeight: active === link.id ? 700 : 500,
                color: active === link.id ? W.primary : W.navy,
                textDecoration: 'none',
                borderRadius: 12,
                background: active === link.id ? W.soft : 'transparent',
                // Stagger links in as the drawer opens.
                opacity: open ? 1 : 0,
                transform: open ? 'translateX(0)' : 'translateX(14px)',
                transition: `opacity .4s var(--w-ease) ${open ? 120 + i * 55 : 0}ms, transform .4s var(--w-ease) ${open ? 120 + i * 55 : 0}ms, background-color .25s, color .25s`,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 10, borderTop: `1px solid ${W.border}` }}>
          <a href="#/login" className="w-btn w-btn-ghost" style={{ width: '100%' }}>
            <LogIn size={15} /> Student / Teacher Login
          </a>
          <button className="w-btn w-btn-primary" style={{ width: '100%' }} onClick={() => go('contact')}>
            Enroll Now <ArrowRight size={15} className="w-arrow" />
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 1023px) {
          .w-nav-desktop { display: none !important; }
          .w-nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
