import { getIcon } from './icons.js';
import { W } from './siteTokens.js';
import { stats } from './siteContent.js';
import { useCountUp } from './useSiteAnimations.js';

export default function Stats() {
  return (
    <section style={{ position: 'relative', padding: '0 0 20px', background: W.white }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 20px' }}>
        <div
          className="w-reveal-scale"
          style={{
            position: 'relative',
            borderRadius: 'var(--w-radius-lg)',
            padding: 'clamp(28px, 4vw, 46px) clamp(20px, 3vw, 40px)',
            background: `linear-gradient(135deg, ${W.navy} 0%, #142A50 55%, ${W.primaryDeep} 130%)`,
            overflow: 'hidden',
            boxShadow: '0 30px 60px -28px rgba(11,27,54,0.5)',
          }}
        >
          {/* Ambient decoration */}
          <div
            aria-hidden="true"
            className="w-drift"
            style={{
              position: 'absolute', top: -120, right: -80, width: 380, height: 380, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(79,143,239,0.35), transparent 68%)',
            }}
          />
          <svg aria-hidden="true" style={{ position: 'absolute', left: 16, bottom: 12, opacity: 0.35 }} width="120" height="120">
            <defs>
              <pattern id="statDots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.6" fill="#fff" opacity="0.25" />
              </pattern>
            </defs>
            <rect width="120" height="120" fill="url(#statDots)" />
          </svg>

          <div
            className="w-stats-grid"
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 20,
            }}
          >
            {stats.map((stat, i) => (
              <StatItem key={stat.id} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .w-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 26px !important; }
        }
        @media (max-width: 400px) {
          .w-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function StatItem({ stat, index }) {
  const Icon = getIcon(stat.icon);
  const [ref, value] = useCountUp(stat.value, 1800);

  // If no real number is configured, show the fallback rather than inventing one.
  const display = stat.value == null ? stat.fallback : `${value.toLocaleString()}${stat.suffix || ''}`;

  return (
    <div
      ref={ref}
      className="w-reveal"
      data-delay={index * 110}
      style={{ textAlign: 'center', padding: '4px 8px' }}
    >
      <div
        style={{
          width: 46, height: 46, borderRadius: 13, margin: '0 auto 14px',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Icon size={21} color="#fff" strokeWidth={2} />
      </div>
      <div
        className="w-display"
        style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}
      >
        {display}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', marginTop: 6, fontWeight: 500 }}>
        {stat.label}
      </div>
    </div>
  );
}
