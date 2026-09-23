import { getIcon } from './icons.js';
import { ArrowRight, Clock, BarChart3, GraduationCap } from 'lucide-react';
import { W } from './siteTokens.js';
import { courses } from './siteContent.js';
import { Section, SectionHeading } from './Section.jsx';
import { scrollToSection } from './useSiteAnimations.js';

export default function Courses() {
  return (
    <Section id="courses" alt>
      <SectionHeading
        eyebrow="Our Programs"
        icon={GraduationCap}
        title="Professional courses built for real work"
        subtitle="Each program is structured around practical lab sessions and finished projects — not just theory."
      />

      <div
        className="w-courses-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}
      >
        {courses.map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1000px) { .w-courses-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .w-courses-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

function CourseCard({ course, index }) {
  const Icon = getIcon(course.icon);

  return (
    <article
      className="w-reveal w-card"
      data-delay={index * 90}
      style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Visual header — gradient panel with a large watermark icon */}
      <div
        style={{
          position: 'relative',
          height: 128,
          background: `linear-gradient(135deg, ${W.soft} 0%, #DCEAFD 100%)`,
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {/* Watermark */}
        <Icon
          size={128}
          color={W.primary}
          strokeWidth={1}
          className="w-card-img"
          style={{ position: 'absolute', right: -22, bottom: -28, opacity: 0.13 }}
          aria-hidden="true"
        />
        {/* Foreground icon chip */}
        <div
          className="w-card-icon"
          style={{
            position: 'relative',
            width: 58, height: 58, borderRadius: 16,
            background: '#fff',
            border: `1px solid rgba(79,143,239,0.24)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 12px 26px -12px rgba(79,143,239,0.55)',
          }}
        >
          <Icon size={26} color={W.primary} strokeWidth={2} />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 className="w-display" style={{ fontSize: 18, fontWeight: 700, color: W.navy, margin: 0 }}>
          {course.name}
        </h3>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', margin: '11px 0 0' }}>
          <Meta icon={Clock} text={course.duration} />
          <Meta icon={BarChart3} text={course.level} />
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.68, color: W.text2, margin: '14px 0 0' }}>
          {course.description}
        </p>

        {/* Topic chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '16px 0 0' }}>
          {course.topics.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11.5, fontWeight: 600, color: W.primaryDeep,
                background: W.soft, border: `1px solid rgba(79,143,239,0.16)`,
                padding: '4px 10px', borderRadius: 99,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={() => scrollToSection('contact')}
          className="w-link"
          style={{
            marginTop: 'auto', paddingTop: 20,
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13.5, fontWeight: 600, color: W.primary, alignSelf: 'flex-start',
          }}
        >
          Learn More <ArrowRight size={15} className="w-arrow" />
        </button>
      </div>
    </article>
  );
}

function Meta({ icon: Icon, text }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: W.text2, fontWeight: 500 }}>
      <Icon size={13} color={W.primary} /> {text}
    </span>
  );
}
