import { getIcon } from './icons.js';
import { Check, Building2, Sparkles } from 'lucide-react';
import { W } from './siteTokens.js';
import { about, whyFeatures } from './siteContent.js';
import { Section, SectionHeading } from './Section.jsx';

export function About() {
  return (
    <Section id="about">
      <div
        className="w-about-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}
      >
        {/* Visual */}
        <div className="w-reveal-left" style={{ position: 'relative' }}>
          <AboutVisual />
        </div>

        {/* Copy */}
        <div className="w-reveal-right">
          <div className="w-eyebrow"><Building2 size={13} /> {about.eyebrow}</div>
          <h2
            className="w-display"
            style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', fontWeight: 800, lineHeight: 1.2, color: W.navy, margin: '18px 0 0' }}
          >
            {about.title}
          </h2>
          {about.body.map((p, i) => (
            <p key={i} style={{ fontSize: 15, lineHeight: 1.76, color: W.text2, margin: '16px 0 0' }}>
              {p}
            </p>
          ))}

          <ul style={{ listStyle: 'none', padding: 0, margin: '26px 0 0', display: 'grid', gap: 12 }}>
            {about.points.map((point, i) => (
              <li
                key={point}
                className="w-reveal"
                data-delay={140 + i * 90}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}
              >
                <span
                  style={{
                    width: 22, height: 22, borderRadius: '50%', background: W.soft,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                  }}
                >
                  <Check size={13} color={W.primary} strokeWidth={3} />
                </span>
                <span style={{ fontSize: 14.5, color: W.navy, lineHeight: 1.55 }}>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 940px) {
          .w-about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </Section>
  );
}

/* Abstract lab/classroom composition — drawn, not stock. */
function AboutVisual() {
  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 0.86' }}>
      <div
        aria-hidden="true"
        className="w-drift"
        style={{
          position: 'absolute', inset: '10%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,143,239,0.14), transparent 68%)',
          filter: 'blur(14px)',
        }}
      />

      {/* Main panel — stylised lab bench with monitors */}
      <div
        style={{
          position: 'absolute', inset: '8% 6% 14%',
          background: '#fff', border: `1px solid ${W.border}`, borderRadius: 20,
          boxShadow: '0 30px 60px -28px rgba(11,27,54,0.28)',
          padding: 20, display: 'flex', flexDirection: 'column', gap: 14,
        }}
      >
        {/* Row of monitors */}
        <div style={{ display: 'flex', gap: 10 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ flex: 1 }}>
              <div
                style={{
                  background: W.navy, borderRadius: 8, padding: 6,
                  animation: 'wFadeIn .7s var(--w-ease) both', animationDelay: `${i * 140}ms`,
                }}
              >
                <div style={{ background: '#0F2547', borderRadius: 5, height: 52, padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {[70, 46, 58].map((w, j) => (
                    <span key={j} style={{ height: 4, width: `${w}%`, borderRadius: 2, background: j === 1 ? '#6FE3C4' : '#7FB3FF', opacity: 0.55 }} />
                  ))}
                </div>
              </div>
              <div style={{ height: 4, width: '50%', margin: '0 auto', background: W.border, borderRadius: '0 0 3px 3px' }} />
            </div>
          ))}
        </div>

        {/* Progress rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 2 }}>
          {[{ l: 'Practical sessions', v: 92 }, { l: 'Project work', v: 84 }, { l: 'Lab time', v: 96 }].map((row, i) => (
            <div key={row.l}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 11.5, color: W.text2, fontWeight: 500 }}>{row.l}</span>
                <span style={{ fontSize: 11.5, color: W.primary, fontWeight: 700 }}>{row.v}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: W.veryLight, overflow: 'hidden' }}>
                <div
                  className="w-reveal"
                  data-delay={200 + i * 120}
                  style={{
                    height: '100%', width: `${row.v}%`, borderRadius: 99,
                    background: `linear-gradient(90deg, ${W.primary}, #7FB3FF)`,
                    transformOrigin: 'left',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badge */}
      <div
        className="w-float"
        style={{ position: 'absolute', right: '-2%', bottom: '6%', animationDuration: '8s' }}
      >
        <div
          style={{
            background: '#fff', border: `1px solid ${W.border}`, borderRadius: 14,
            padding: '12px 15px', boxShadow: '0 18px 36px -16px rgba(11,27,54,0.26)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}
        >
          <div style={{ width: 32, height: 32, borderRadius: 9, background: W.soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={16} color={W.primary} />
          </div>
          <div>
            <div className="w-display" style={{ fontSize: 12.5, fontWeight: 700, color: W.navy }}>Small batches</div>
            <div style={{ fontSize: 10.5, color: W.text2 }}>Personal attention</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhyAUJ() {
  return (
    <Section id="why" alt>
      <SectionHeading
        eyebrow="Why AUJ?"
        icon={Sparkles}
        title="What makes training here different"
        subtitle="Everything is built around one idea — students should leave able to do the work, not just describe it."
      />

      <div
        className="w-why-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
      >
        {whyFeatures.map((f, i) => {
          const Icon = getIcon(f.icon);
          return (
            <div
              key={f.id}
              className="w-reveal w-card"
              data-delay={i * 90}
              style={{ padding: 26 }}
            >
              <div
                className="w-card-icon"
                style={{
                  width: 50, height: 50, borderRadius: 14,
                  background: `linear-gradient(135deg, ${W.soft}, #DCEAFD)`,
                  border: `1px solid rgba(79,143,239,0.18)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <Icon size={22} color={W.primary} strokeWidth={2} />
              </div>
              <h3 className="w-display" style={{ fontSize: 16.5, fontWeight: 700, color: W.navy, margin: 0 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.68, color: W.text2, margin: '9px 0 0' }}>
                {f.text}
              </p>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 1000px) { .w-why-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 620px)  { .w-why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}
