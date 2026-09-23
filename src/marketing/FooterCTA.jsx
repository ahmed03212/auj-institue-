import { ArrowRight, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, MessageCircle, ArrowUp } from 'lucide-react';
import { W } from './siteTokens.js';
import { site, navLinks, courses, finalCta } from './siteContent.js';
import { scrollToSection, prefersReducedMotion } from './useSiteAnimations.js';

export function FinalCTA() {
  return (
    <section style={{ padding: '0 0 92px', background: W.veryLight }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 20px' }}>
        <div
          className="w-reveal-scale"
          style={{
            position: 'relative',
            borderRadius: 'var(--w-radius-lg)',
            padding: 'clamp(34px, 5vw, 62px) clamp(22px, 4vw, 52px)',
            background: `linear-gradient(135deg, ${W.primary} 0%, ${W.primaryDeep} 100%)`,
            overflow: 'hidden',
            textAlign: 'center',
            boxShadow: '0 30px 60px -26px rgba(43,95,184,0.55)',
          }}
        >
          <div
            aria-hidden="true"
            className="w-drift"
            style={{
              position: 'absolute', top: -140, left: -80, width: 380, height: 380, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.22), transparent 66%)',
            }}
          />
          <div
            aria-hidden="true"
            className="w-drift"
            style={{
              position: 'absolute', bottom: -160, right: -60, width: 340, height: 340, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.14), transparent 68%)',
              animationDelay: '5s',
            }}
          />

          <div style={{ position: 'relative' }}>
            <h2
              className="w-display"
              style={{ fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.22 }}
            >
              {finalCta.title}
            </h2>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.86)', margin: '14px auto 0', maxWidth: 520 }}>
              {finalCta.body}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
              <button
                className="w-btn"
                onClick={() => scrollToSection('contact')}
                style={{ background: '#fff', color: W.primaryDeep }}
              >
                {finalCta.primary} <ArrowRight size={16} className="w-arrow" />
              </button>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="w-btn w-btn-light">
                <Phone size={15} /> {finalCta.secondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const socials = [
    { key: 'facebook', Icon: Facebook, href: site.social.facebook, label: 'Facebook' },
    { key: 'instagram', Icon: Instagram, href: site.social.instagram, label: 'Instagram' },
    { key: 'linkedin', Icon: Linkedin, href: site.social.linkedin, label: 'LinkedIn' },
    { key: 'whatsapp', Icon: MessageCircle, href: site.social.whatsapp, label: 'WhatsApp' },
  ].filter((s) => s.href); // only render socials that have a real link configured

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

  return (
    <footer style={{ background: W.navy, color: '#fff', paddingTop: 64 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 20px' }}>
        <div
          className="w-footer-grid"
          style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1.3fr', gap: 40, paddingBottom: 48 }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 16 }}>
              <div
                className="w-animated-gradient"
                style={{ width: 42, height: 42, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <span className="w-display" style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>AUJ</span>
              </div>
              <div style={{ lineHeight: 1.1 }}>
                <div className="w-display" style={{ fontSize: 16, fontWeight: 800 }}>{site.brandTop}</div>
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.55)' }}>
                  {site.brandBottom}
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.72, color: 'rgba(255,255,255,0.62)', maxWidth: 300, margin: 0 }}>
              Practical, career-focused computer training delivered in a fully equipped lab by instructors with real industry experience.
            </p>

            {socials.length > 0 && (
              <div style={{ display: 'flex', gap: 9, marginTop: 20 }}>
                {socials.map(({ key, Icon, href, label }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-social"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Nav */}
          <FooterCol title="Navigate">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollToSection(l.id)} className="w-footer-link">
                {l.label}
              </button>
            ))}
          </FooterCol>

          {/* Courses */}
          <FooterCol title="Courses">
            {courses.slice(0, 6).map((c) => (
              <button key={c.id} onClick={() => scrollToSection('courses')} className="w-footer-link">
                {c.name}
              </button>
            ))}
          </FooterCol>

          {/* Contact */}
          <FooterCol title="Contact">
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="w-footer-link" style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
              <Phone size={14} style={{ marginTop: 3, flexShrink: 0, color: W.primary }} /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="w-footer-link" style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
              <Mail size={14} style={{ marginTop: 3, flexShrink: 0, color: W.primary }} /> {site.email}
            </a>
            <span className="w-footer-link" style={{ display: 'flex', gap: 9, alignItems: 'flex-start', cursor: 'default' }}>
              <MapPin size={14} style={{ marginTop: 3, flexShrink: 0, color: W.primary }} /> {site.address}
            </span>
            <a href="#/login" className="w-footer-link" style={{ color: W.primary, fontWeight: 600 }}>
              Student / Teacher Login →
            </a>
          </FooterCol>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '22px 0 28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 16, flexWrap: 'wrap',
          }}
        >
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            © {new Date().getFullYear()} {site.brandTop} {site.brandBottom}. All rights reserved.
          </p>
          <button onClick={toTop} className="w-social" aria-label="Back to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .w-footer-link {
          display: block; text-align: left; background: none; border: none; padding: 0;
          font-family: 'Inter', sans-serif; font-size: 13.5px; line-height: 1.5;
          color: rgba(255,255,255,0.62); text-decoration: none; cursor: pointer;
          transition: color .25s var(--w-ease), transform .25s var(--w-ease);
        }
        .w-footer-link:hover { color: #fff; transform: translateX(3px); }

        .w-social {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.8);
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: transform .3s var(--w-ease), background-color .3s var(--w-ease), color .3s var(--w-ease);
        }
        .w-social:hover {
          transform: translateY(-3px);
          background: ${W.primary}; color: #fff; border-color: ${W.primary};
        }

        @media (max-width: 900px) {
          .w-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 540px) {
          .w-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h4 className="w-display" style={{ fontSize: 13.5, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
        {title}
      </h4>
      <div style={{ display: 'grid', gap: 11 }}>{children}</div>
    </div>
  );
}
