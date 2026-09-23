import { useRef } from 'react';
import { Check, Users, ChevronLeft, ChevronRight, Quote, LogIn, CalendarCheck, FileUp, Award, MessageCircle } from 'lucide-react';
import { W } from './siteTokens.js';
import { studentSection, testimonials } from './siteContent.js';
import { Section, SectionHeading } from './Section.jsx';
import { useAutoRotate } from './useSiteAnimations.js';

export default function Students() {
  const hasTestimonials = testimonials.length > 0;

  return (
    <Section id="students">
      <SectionHeading
        eyebrow={studentSection.eyebrow}
        icon={Users}
        title={hasTestimonials ? 'What our students say' : 'Students at AUJ'}
        subtitle={
          hasTestimonials
            ? undefined
            : 'Everything an enrolled student needs, from their first class to their certificate.'
        }
      />

      {/* Real testimonials only — never fabricated. If the array in
          siteContent.js is empty, this whole block is skipped. */}
      {hasTestimonials && <TestimonialCarousel />}

      <StudentPortalPanel spaced={hasTestimonials} />
    </Section>
  );
}

function TestimonialCarousel() {
  const { index, goTo, next, prev, setPaused } = useAutoRotate(testimonials.length, 6000);
  const touchStartX = useRef(null);

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  }
  function onTouchEnd(e) {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStartX.current = null;
    setPaused(false);
  }

  return (
    <div
      className="w-reveal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ position: 'relative', maxWidth: 800, margin: '0 auto 56px' }}
    >
      <div
        style={{
          position: 'relative',
          background: '#fff',
          border: `1px solid ${W.border}`,
          borderRadius: 'var(--w-radius-lg)',
          padding: 'clamp(26px, 4vw, 44px)',
          boxShadow: 'var(--w-shadow)',
          minHeight: 210,
          overflow: 'hidden',
        }}
      >
        <Quote size={72} color={W.primary} style={{ position: 'absolute', top: -6, right: 10, opacity: 0.07 }} aria-hidden="true" />

        {testimonials.map((t, i) => (
          <div
            key={t.id}
            aria-hidden={i !== index}
            style={{
              position: i === index ? 'relative' : 'absolute',
              inset: i === index ? undefined : 'clamp(26px, 4vw, 44px)',
              opacity: i === index ? 1 : 0,
              transform: i === index ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity .55s var(--w-ease), transform .55s var(--w-ease)',
              pointerEvents: i === index ? 'auto' : 'none',
            }}
          >
            <p style={{ fontSize: 'clamp(15px, 1.7vw, 18px)', lineHeight: 1.72, color: W.navy, margin: 0, fontWeight: 500 }}>
              {t.text}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22 }}>
              <div
                className="w-animated-gradient"
                style={{
                  width: 42, height: 42, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: 15, flexShrink: 0,
                }}
              >
                {t.name.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <div className="w-display" style={{ fontSize: 14.5, fontWeight: 700, color: W.navy }}>{t.name}</div>
                <div style={{ fontSize: 12.5, color: W.text2 }}>{t.course}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 22 }}>
        <button onClick={prev} aria-label="Previous testimonial" className="w-carousel-btn">
          <ChevronLeft size={17} />
        </button>

        <div style={{ display: 'flex', gap: 7 }}>
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index}
              style={{
                width: i === index ? 26 : 8, height: 8, borderRadius: 99, border: 'none', padding: 0,
                background: i === index ? W.primary : W.border, cursor: 'pointer',
                transition: 'width .4s var(--w-ease), background-color .3s var(--w-ease)',
              }}
            />
          ))}
        </div>

        <button onClick={next} aria-label="Next testimonial" className="w-carousel-btn">
          <ChevronRight size={17} />
        </button>
      </div>

      <style>{`
        .w-carousel-btn {
          width: 40px; height: 40px; border-radius: 12px;
          border: 1px solid ${W.border}; background: #fff; color: ${W.navy};
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: transform .3s var(--w-ease), box-shadow .3s var(--w-ease),
                      border-color .3s var(--w-ease), color .3s var(--w-ease);
        }
        .w-carousel-btn:hover {
          transform: translateY(-2px); color: ${W.primary};
          border-color: ${W.primary}; box-shadow: var(--w-shadow);
        }
        .w-carousel-btn:active { transform: translateY(0) scale(0.95); }
      `}</style>
    </div>
  );
}

function StudentPortalPanel({ spaced }) {
  const features = [
    { icon: CalendarCheck, text: 'Attendance & class timetable' },
    { icon: FileUp, text: 'Assignments and submissions' },
    { icon: Award, text: 'Marks and course progress' },
    { icon: MessageCircle, text: 'Direct messaging with instructors' },
  ];

  return (
    <div
      className="w-reveal-scale w-portal-panel"
      style={{
        marginTop: spaced ? 12 : 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        borderRadius: 'var(--w-radius-lg)',
        overflow: 'hidden',
        border: `1px solid ${W.border}`,
        boxShadow: 'var(--w-shadow)',
        background: '#fff',
      }}
    >
      {/* Copy side */}
      <div style={{ padding: 'clamp(26px, 4vw, 44px)' }}>
        <h3 className="w-display" style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', fontWeight: 800, color: W.navy, margin: 0, lineHeight: 1.25 }}>
          {studentSection.title}
        </h3>
        <p style={{ fontSize: 14.5, lineHeight: 1.72, color: W.text2, margin: '14px 0 0' }}>
          {studentSection.body}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '22px 0 0', display: 'grid', gap: 11 }}>
          {studentSection.points.map((p) => (
            <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: W.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <Check size={12} color={W.primary} strokeWidth={3} />
              </span>
              <span style={{ fontSize: 14, color: W.navy, lineHeight: 1.55 }}>{p}</span>
            </li>
          ))}
        </ul>
        <a href="#/login" className="w-btn w-btn-primary" style={{ marginTop: 26 }}>
          <LogIn size={15} /> {studentSection.cta}
        </a>
      </div>

      {/* Visual side */}
      <div
        style={{
          position: 'relative',
          background: `linear-gradient(140deg, ${W.navy}, #16305B)`,
          padding: 'clamp(26px, 4vw, 44px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12,
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          className="w-drift"
          style={{
            position: 'absolute', top: -90, right: -60, width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,143,239,0.4), transparent 68%)',
          }}
        />
        {features.map((f, i) => (
          <div
            key={f.text}
            className="w-reveal"
            data-delay={120 + i * 100}
            style={{
              position: 'relative',
              display: 'flex', alignItems: 'center', gap: 13,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 14, padding: '13px 15px',
            }}
          >
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <f.icon size={16} color="#fff" />
            </div>
            <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.92)', fontWeight: 500 }}>{f.text}</span>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .w-portal-panel { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
