import { ArrowRight, Play, GraduationCap, Code2, Cloud, BookOpen, Laptop, Sparkles } from 'lucide-react';
import { W } from './siteTokens.js';
import { hero } from './siteContent.js';
import { useAutoRotate, useParallax, scrollToSection } from './useSiteAnimations.js';

export default function Hero() {
  const { index, setPaused } = useAutoRotate(hero.highlights.length, 3200);
  const blobRef = useParallax(0.05);
  const visualRef = useParallax(-0.03);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        paddingTop: 'calc(var(--w-nav-h) + 56px)',
        paddingBottom: 80,
        overflow: 'hidden',
        background: `linear-gradient(180deg, ${W.veryLight} 0%, ${W.white} 72%)`,
      }}
    >
      {/* ---- Animated decorative background ---- */}
      <div ref={blobRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div
          className="w-drift"
          style={{
            position: 'absolute', top: -180, right: -120, width: 620, height: 620, borderRadius: '50%',
            background: `radial-gradient(circle, rgba(79,143,239,0.16), transparent 68%)`,
            filter: 'blur(10px)',
          }}
        />
        <div
          className="w-drift"
          style={{
            position: 'absolute', bottom: -220, left: -160, width: 560, height: 560, borderRadius: '50%',
            background: `radial-gradient(circle, rgba(79,143,239,0.10), transparent 70%)`,
            animationDelay: '4s',
          }}
        />
        {/* Subtle dot grid */}
        <svg style={{ position: 'absolute', top: 120, left: 24, opacity: 0.5 }} width="150" height="150" aria-hidden="true">
          <defs>
            <pattern id="heroDots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill={W.primary} opacity="0.22" />
            </pattern>
          </defs>
          <rect width="150" height="150" fill="url(#heroDots)" />
        </svg>
      </div>

      <div
        className="w-hero-grid"
        style={{
          position: 'relative',
          maxWidth: 1240,
          margin: '0 auto',
          padding: '0 20px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        {/* ---- Copy ---- */}
        <div>
          <div className="w-enter w-eyebrow" style={{ animationDelay: '80ms' }}>
            <Sparkles size={13} /> {hero.eyebrow}
          </div>

          <h1
            className="w-display w-hero-title"
            style={{ fontSize: 'clamp(38px, 5.4vw, 62px)', fontWeight: 800, lineHeight: 1.06, margin: '22px 0 0', color: W.navy }}
          >
            <span className="w-enter" style={{ display: 'block', animationDelay: '180ms' }}>{hero.titleLine1}</span>
            <span
              className="w-enter"
              style={{
                display: 'block',
                animationDelay: '300ms',
                background: `linear-gradient(100deg, ${W.primary}, ${W.primaryDeep})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {hero.titleLine2}
            </span>
          </h1>

          <p
            className="w-enter"
            style={{ animationDelay: '420ms', fontSize: 'clamp(15px, 1.5vw, 17px)', lineHeight: 1.72, color: W.text2, margin: '22px 0 0', maxWidth: 520 }}
          >
            {hero.subtitle}
          </p>

          <div className="w-enter w-hero-ctas" style={{ animationDelay: '540ms', display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <button className="w-btn w-btn-primary" onClick={() => scrollToSection('contact')}>
              {hero.primaryCta} <ArrowRight size={16} className="w-arrow" />
            </button>
            <button className="w-btn w-btn-ghost" onClick={() => scrollToSection('courses')}>
              <Play size={15} /> {hero.secondaryCta}
            </button>
          </div>

          {/* Rotating highlights — pauses on hover/focus */}
          <div
            className="w-enter"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            tabIndex={0}
            aria-live="polite"
            style={{
              animationDelay: '660ms',
              marginTop: 34, display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 18px', borderRadius: 14,
              background: W.soft, border: `1px solid rgba(79,143,239,0.2)`,
              maxWidth: 440, minHeight: 56,
            }}
          >
            <span
              style={{
                width: 8, height: 8, borderRadius: '50%', background: W.primary, flexShrink: 0,
                boxShadow: `0 0 0 4px rgba(79,143,239,0.18)`,
              }}
            />
            <div style={{ position: 'relative', flex: 1, minHeight: 22 }}>
              {hero.highlights.map((h, i) => (
                <span
                  key={h}
                  style={{
                    position: i === index ? 'relative' : 'absolute',
                    inset: i === index ? undefined : 0,
                    display: 'block',
                    fontSize: 14, fontWeight: 600, color: W.primaryDeep,
                    opacity: i === index ? 1 : 0,
                    transform: i === index ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'opacity .5s var(--w-ease), transform .5s var(--w-ease)',
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ---- Visual ---- */}
        <div ref={visualRef} className="w-hero-visual w-enter-scale" style={{ animationDelay: '380ms', position: 'relative' }}>
          <HeroIllustration />
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .w-hero-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
          .w-hero-visual { order: -1; max-width: 460px; margin: 0 auto; }
        }
        @media (max-width: 420px) {
          .w-hero-ctas .w-btn { width: 100%; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Custom-drawn education/technology visual.
 * Built from SVG + DOM rather than a stock photo so it matches the
 * brand palette exactly and animates natively at any screen size.
 * ------------------------------------------------------------------ */
function HeroIllustration() {
  const orbitIcons = [
    { Icon: GraduationCap, angle: -90, delay: '0s' },
    { Icon: Laptop, angle: -20, delay: '0.8s' },
    { Icon: Cloud, angle: 40, delay: '1.6s' },
    { Icon: BookOpen, angle: 120, delay: '2.4s' },
    { Icon: Code2, angle: 190, delay: '3.2s' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 0.92' }}>
      {/* Soft glow behind everything */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: '8% 6%', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(79,143,239,0.18), transparent 65%)`,
          filter: 'blur(24px)',
        }}
      />

      {/* Orbit ring */}
      <svg
        viewBox="0 0 400 400"
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <ellipse cx="200" cy="128" rx="150" ry="88" fill="none" stroke={W.primary} strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="5 7" />
        <ellipse cx="200" cy="128" rx="108" ry="62" fill="none" stroke={W.primary} strokeOpacity="0.14" strokeWidth="1.5" />
      </svg>

      {/* Orbiting glass icon bubbles */}
      {orbitIcons.map(({ Icon, angle, delay }, i) => {
        const rad = (angle * Math.PI) / 180;
        // Matches the ellipse drawn above (centre 50%/32%, radii 37.5%/22%)
        // so the bubbles sit on the ring and stay clear of the laptop below.
        const x = 50 + Math.cos(rad) * 37.5;
        const y = 32 + Math.sin(rad) * 22;
        return (
          <div
            key={i}
            className="w-float"
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: delay,
            }}
          >
            <div
              style={{
                width: 'clamp(38px, 9vw, 54px)',
                height: 'clamp(38px, 9vw, 54px)',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                border: `1px solid rgba(79,143,239,0.28)`,
                boxShadow: '0 10px 24px -10px rgba(79,143,239,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Icon size={21} color={W.primary} strokeWidth={2} />
            </div>
          </div>
        );
      })}

      {/* Laptop with animated code editor */}
      <div style={{ position: 'absolute', left: '50%', bottom: '2%', transform: 'translateX(-50%)', width: '78%' }}>
        <div className="w-float" style={{ animationDuration: '7s' }}>
          {/* Screen */}
          <div
            style={{
              background: W.navy,
              borderRadius: 12,
              padding: 9,
              boxShadow: '0 30px 60px -22px rgba(11,27,54,0.5)',
              border: `1px solid rgba(255,255,255,0.08)`,
            }}
          >
            <div style={{ background: '#0F2547', borderRadius: 7, padding: '9px 11px', minHeight: 132 }}>
              {/* Window dots */}
              <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
                {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
                  <span key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c, opacity: 0.85 }} />
                ))}
              </div>
              {/* Fake code lines */}
              {[
                { w: '58%', c: '#7FB3FF' }, { w: '78%', c: '#A9C9FF', indent: 12 },
                { w: '44%', c: '#6FE3C4', indent: 12 }, { w: '66%', c: '#A9C9FF', indent: 24 },
                { w: '36%', c: '#FFD489', indent: 12 }, { w: '70%', c: '#7FB3FF' },
              ].map((line, i) => (
                <div
                  key={i}
                  style={{
                    height: 6, width: line.w, marginLeft: line.indent || 0, marginBottom: 7,
                    borderRadius: 3, background: line.c, opacity: 0.55,
                    animation: `wFadeIn .6s var(--w-ease) both`,
                    animationDelay: `${700 + i * 120}ms`,
                  }}
                />
              ))}
              {/* Blinking cursor */}
              <div
                style={{
                  height: 6, width: 8, borderRadius: 2, background: W.primary,
                  animation: 'wFadeIn 1s steps(2, start) infinite alternate',
                }}
              />
            </div>
          </div>
          {/* Base */}
          <div
            style={{
              height: 9, width: '112%', marginLeft: '-6%',
              background: `linear-gradient(180deg, #D4DEEC, #B8C6D9)`,
              borderRadius: '0 0 10px 10px',
            }}
          />
        </div>
      </div>

      {/* Floating stat card */}
      <div
        className="w-float"
        style={{ position: 'absolute', left: '-2%', bottom: '26%', animationDelay: '1.2s', animationDuration: '8s' }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${W.border}`,
            borderRadius: 14,
            padding: '11px 14px',
            boxShadow: '0 18px 36px -16px rgba(11,27,54,0.28)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}
        >
          <div style={{ width: 32, height: 32, borderRadius: 9, background: W.soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GraduationCap size={16} color={W.primary} />
          </div>
          <div>
            <div className="w-display" style={{ fontSize: 13, fontWeight: 700, color: W.navy, lineHeight: 1.2 }}>Hands-on</div>
            <div style={{ fontSize: 10.5, color: W.text2 }}>Lab training</div>
          </div>
        </div>
      </div>

      {/* Floating progress card */}
      <div
        className="w-float"
        style={{ position: 'absolute', right: '-3%', top: '4%', animationDelay: '2.2s', animationDuration: '9s' }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${W.border}`,
            borderRadius: 14,
            padding: '12px 14px',
            boxShadow: '0 18px 36px -16px rgba(11,27,54,0.28)',
            minWidth: 128,
          }}
        >
          <div style={{ fontSize: 10.5, color: W.text2, marginBottom: 7, fontWeight: 600 }}>Course progress</div>
          <div style={{ height: 6, borderRadius: 99, background: W.soft, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%', width: '74%', borderRadius: 99,
                background: `linear-gradient(90deg, ${W.primary}, #7FB3FF)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
