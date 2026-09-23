import { W } from './siteTokens.js';

/** Shared section wrapper — keeps vertical rhythm and max-width consistent. */
export function Section({ id, children, style, alt = false }) {
  return (
    <section
      id={id}
      style={{
        position: 'relative',
        padding: '92px 0',
        background: alt ? W.veryLight : W.white,
        ...style,
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 20px' }}>{children}</div>
    </section>
  );
}

/** Shared eyebrow + title + subtitle block. */
export function SectionHeading({ eyebrow, title, subtitle, icon: Icon, center = true, maxWidth = 620 }) {
  return (
    <div
      style={{
        textAlign: center ? 'center' : 'left',
        maxWidth: center ? maxWidth : undefined,
        margin: center ? '0 auto 52px' : '0 0 44px',
      }}
    >
      {eyebrow && (
        <div className="w-reveal w-eyebrow">
          {Icon && <Icon size={13} />} {eyebrow}
        </div>
      )}
      <h2
        className="w-reveal w-display"
        data-delay="80"
        style={{
          fontSize: 'clamp(27px, 3.6vw, 40px)',
          fontWeight: 800,
          lineHeight: 1.18,
          color: W.navy,
          margin: eyebrow ? '18px 0 0' : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="w-reveal"
          data-delay="160"
          style={{ fontSize: 'clamp(14.5px, 1.4vw, 16px)', lineHeight: 1.72, color: W.text2, margin: '14px 0 0' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
