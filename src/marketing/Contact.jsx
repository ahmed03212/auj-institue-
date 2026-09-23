import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { W } from './siteTokens.js';
import { site, contact } from './siteContent.js';
import { Section, SectionHeading } from './Section.jsx';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '', message: '' });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  /**
   * NOTE: there is no backend wired to this form yet, so rather than
   * silently pretending to submit, it opens the visitor's mail client
   * with the details pre-filled and addressed to the institute. Swap
   * this for a real endpoint (Firebase, Formspree, etc.) when ready.
   */
  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Course enquiry${form.course ? ` — ${form.course}` : ''}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCourse: ${form.course}\n\n${form.message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  }

  const details = [
    { icon: Phone, label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: 'Address', value: site.address },
    { icon: Clock, label: 'Timings', value: site.hours },
  ];

  return (
    <Section id="contact" alt>
      <SectionHeading
        eyebrow={contact.eyebrow}
        icon={MessageSquare}
        title={contact.title}
        subtitle={contact.body}
      />

      <div
        className="w-contact-grid"
        style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 24, alignItems: 'start' }}
      >
        {/* Contact details */}
        <div className="w-reveal-left" style={{ display: 'grid', gap: 12 }}>
          {details.map((d, i) => {
            const Inner = (
              <>
                <div
                  className="w-card-icon"
                  style={{
                    width: 42, height: 42, borderRadius: 12, background: W.soft,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                >
                  <d.icon size={18} color={W.primary} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: W.text2 }}>
                    {d.label}
                  </div>
                  <div style={{ fontSize: 14.5, color: W.navy, fontWeight: 600, marginTop: 3, wordBreak: 'break-word' }}>
                    {d.value}
                  </div>
                </div>
              </>
            );

            const style = {
              display: 'flex', alignItems: 'center', gap: 14, padding: 18,
              textDecoration: 'none',
            };

            return d.href ? (
              <a key={d.label} href={d.href} className="w-reveal w-card" data-delay={i * 80} style={style}>
                {Inner}
              </a>
            ) : (
              <div key={d.label} className="w-reveal w-card" data-delay={i * 80} style={style}>
                {Inner}
              </div>
            );
          })}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-reveal-right"
          style={{
            background: '#fff', border: `1px solid ${W.border}`,
            borderRadius: 'var(--w-radius-lg)', padding: 'clamp(22px, 3vw, 32px)',
            boxShadow: 'var(--w-shadow)',
          }}
        >
          <div className="w-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="Your Name" htmlFor="c-name">
              <input id="c-name" className="w-input" value={form.name} onChange={set('name')} required placeholder="Full name" />
            </Field>
            <Field label="Phone" htmlFor="c-phone">
              <input id="c-phone" className="w-input" type="tel" value={form.phone} onChange={set('phone')} required placeholder="+92 300 0000000" />
            </Field>
          </div>

          <div className="w-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
            <Field label="Email" htmlFor="c-email">
              <input id="c-email" className="w-input" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />
            </Field>
            <Field label="Course of Interest" htmlFor="c-course">
              <select id="c-course" className="w-input" value={form.course} onChange={set('course')}>
                <option value="">Select a course</option>
                {contact.courseOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          <div style={{ marginTop: 14 }}>
            <Field label="Message" htmlFor="c-message">
              <textarea
                id="c-message"
                className="w-input"
                value={form.message}
                onChange={set('message')}
                rows={4}
                placeholder="Tell us what you'd like to know…"
                style={{ resize: 'vertical', minHeight: 96, fontFamily: 'inherit' }}
              />
            </Field>
          </div>

          <button type="submit" className="w-btn w-btn-primary" style={{ marginTop: 20, width: '100%' }}>
            {sent ? <><CheckCircle2 size={16} /> Opening your mail app…</> : <>Send Enquiry <Send size={15} className="w-arrow" /></>}
          </button>

          <p style={{ fontSize: 11.5, color: W.text2, textAlign: 'center', margin: '12px 0 0', lineHeight: 1.6 }}>
            This form opens your email app with the details filled in. You can also call or WhatsApp us directly.
          </p>
        </form>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .w-contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .w-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Section>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: W.navy, marginBottom: 6 }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
