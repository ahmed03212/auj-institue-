// ===================================================================
//  Marketing site design tokens
//  Exact palette from the brief — white-dominant, blue used as accent.
// ===================================================================
export const W = {
  primary: '#4F8FEF',
  primaryDark: '#3A75D0',
  primaryDeep: '#2B5FB8',
  soft: '#EAF3FF',
  veryLight: '#F7FAFF',
  white: '#FFFFFF',
  navy: '#0B1B36',
  text2: '#52647D',
  border: '#DCE8F7',
};

// All site-wide CSS: fonts, design-token CSS variables, scroll-reveal
// base states, and every reusable animation/interaction class.
// prefers-reduced-motion is honoured at the bottom.
export const siteStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --w-primary: ${W.primary};
    --w-primary-dark: ${W.primaryDark};
    --w-primary-deep: ${W.primaryDeep};
    --w-soft: ${W.soft};
    --w-very-light: ${W.veryLight};
    --w-white: ${W.white};
    --w-navy: ${W.navy};
    --w-text2: ${W.text2};
    --w-border: ${W.border};

    --w-radius-sm: 10px;
    --w-radius: 16px;
    --w-radius-lg: 24px;

    --w-shadow-sm: 0 1px 2px rgba(11,27,54,0.04);
    --w-shadow: 0 4px 20px -4px rgba(11,27,54,0.08);
    --w-shadow-lg: 0 24px 48px -16px rgba(11,27,54,0.16);
    --w-shadow-blue: 0 16px 32px -12px rgba(79,143,239,0.45);

    --w-ease: cubic-bezier(0.16, 1, 0.3, 1);
    --w-ease-out: cubic-bezier(0.33, 1, 0.68, 1);

    --w-nav-h: 72px;
  }

  .w-site {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: var(--w-navy);
    background: var(--w-white);
    overflow-x: hidden;
  }
  .w-site * { box-sizing: border-box; }
  .w-display { font-family: 'Sora', 'Inter', sans-serif; letter-spacing: -0.02em; }

  /* Anchor offset so sticky nav never covers section headings */
  .w-site section[id] { scroll-margin-top: calc(var(--w-nav-h) + 16px); }

  /* ---------------- Scroll reveal ---------------- */
  /* Base hidden state; .is-visible is added by IntersectionObserver. */
  .w-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s var(--w-ease), transform 0.7s var(--w-ease);
    will-change: opacity, transform;
  }
  .w-reveal.is-visible { opacity: 1; transform: none; }

  .w-reveal-left  { opacity: 0; transform: translateX(-28px); transition: opacity .7s var(--w-ease), transform .7s var(--w-ease); }
  .w-reveal-right { opacity: 0; transform: translateX(28px);  transition: opacity .7s var(--w-ease), transform .7s var(--w-ease); }
  .w-reveal-left.is-visible, .w-reveal-right.is-visible { opacity: 1; transform: none; }

  .w-reveal-scale { opacity: 0; transform: scale(0.96); transition: opacity .7s var(--w-ease), transform .7s var(--w-ease); }
  .w-reveal-scale.is-visible { opacity: 1; transform: none; }

  /* ---------------- Entrance (hero, above the fold) ---------------- */
  @keyframes wFadeUp { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }
  @keyframes wFadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes wScaleIn { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: none; } }
  .w-enter { animation: wFadeUp 0.9s var(--w-ease) both; }
  .w-enter-fade { animation: wFadeIn 1s var(--w-ease) both; }
  .w-enter-scale { animation: wScaleIn 1s var(--w-ease) both; }

  /* ---------------- Ambient motion ---------------- */
  @keyframes wFloat {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-14px); }
  }
  @keyframes wFloatSlow {
    0%, 100% { transform: translateY(0) translateX(0); }
    33%      { transform: translateY(-10px) translateX(6px); }
    66%      { transform: translateY(6px) translateX(-6px); }
  }
  @keyframes wPulseRing {
    0%   { transform: scale(0.95); opacity: 0.5; }
    70%  { transform: scale(1.25); opacity: 0; }
    100% { transform: scale(1.25); opacity: 0; }
  }
  @keyframes wDrift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%      { transform: translate(24px, -20px) scale(1.06); }
  }
  @keyframes wSpinSlow { to { transform: rotate(360deg); } }
  @keyframes wGradientShift {
    0%, 100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }
  @keyframes wMarquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .w-float      { animation: wFloat 6s ease-in-out infinite; }
  .w-float-slow { animation: wFloatSlow 11s ease-in-out infinite; }
  .w-drift      { animation: wDrift 18s ease-in-out infinite; }
  .w-spin-slow  { animation: wSpinSlow 40s linear infinite; }

  .w-animated-gradient {
    background: linear-gradient(120deg, var(--w-primary), #6FA6F5, var(--w-primary-deep), var(--w-primary));
    background-size: 300% 300%;
    animation: wGradientShift 12s ease infinite;
  }

  /* ---------------- Buttons ---------------- */
  .w-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14.5px;
    padding: 13px 26px; border-radius: 12px; border: 1px solid transparent;
    cursor: pointer; text-decoration: none; white-space: nowrap;
    transition: transform .3s var(--w-ease), box-shadow .3s var(--w-ease),
                background-color .3s var(--w-ease), color .3s var(--w-ease),
                border-color .3s var(--w-ease);
  }
  .w-btn-primary { background: var(--w-primary); color: #fff; box-shadow: 0 6px 16px -6px rgba(79,143,239,0.6); }
  .w-btn-primary:hover { background: var(--w-primary-dark); transform: translateY(-2px); box-shadow: var(--w-shadow-blue); }
  .w-btn-primary:active { transform: translateY(0) scale(0.985); }

  .w-btn-ghost { background: #fff; color: var(--w-navy); border-color: var(--w-border); }
  .w-btn-ghost:hover { border-color: var(--w-primary); color: var(--w-primary); transform: translateY(-2px); box-shadow: var(--w-shadow); }
  .w-btn-ghost:active { transform: translateY(0) scale(0.985); }

  .w-btn-light { background: rgba(255,255,255,0.14); color: #fff; border-color: rgba(255,255,255,0.3); }
  .w-btn-light:hover { background: rgba(255,255,255,0.22); transform: translateY(-2px); }

  /* Arrow nudge inside buttons/links */
  .w-btn .w-arrow, .w-link .w-arrow { transition: transform .3s var(--w-ease); }
  .w-btn:hover .w-arrow, .w-link:hover .w-arrow { transform: translateX(4px); }

  /* ---------------- Cards ---------------- */
  .w-card {
    background: #fff; border: 1px solid var(--w-border); border-radius: var(--w-radius);
    transition: transform .4s var(--w-ease), box-shadow .4s var(--w-ease), border-color .4s var(--w-ease);
  }
  .w-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--w-shadow-lg);
    border-color: rgba(79,143,239,0.45);
  }
  .w-card:hover .w-card-img { transform: scale(1.07); }
  .w-card:hover .w-card-icon { transform: translateY(-3px) scale(1.06); }
  .w-card-img  { transition: transform .7s var(--w-ease); }
  .w-card-icon { transition: transform .4s var(--w-ease); }

  /* ---------------- Links ---------------- */
  .w-link {
    position: relative; color: var(--w-navy); text-decoration: none; font-weight: 500;
    transition: color .25s var(--w-ease);
  }
  .w-link::after {
    content: ''; position: absolute; left: 0; bottom: -4px; height: 2px; width: 100%;
    background: var(--w-primary); border-radius: 2px;
    transform: scaleX(0); transform-origin: right;
    transition: transform .35s var(--w-ease);
  }
  .w-link:hover { color: var(--w-primary); }
  .w-link:hover::after { transform: scaleX(1); transform-origin: left; }
  .w-link.is-active { color: var(--w-primary); font-weight: 600; }
  .w-link.is-active::after { transform: scaleX(1); }

  /* ---------------- Inputs ---------------- */
  .w-input {
    width: 100%; font-family: 'Inter', sans-serif; font-size: 14px; color: var(--w-navy);
    background: #fff; border: 1.5px solid var(--w-border); border-radius: 12px;
    padding: 12px 14px; outline: none;
    transition: border-color .25s var(--w-ease), box-shadow .25s var(--w-ease);
  }
  .w-input::placeholder { color: #9AAAC0; }
  .w-input:focus { border-color: var(--w-primary); box-shadow: 0 0 0 4px rgba(79,143,239,0.14); }

  /* ---------------- Focus visibility (accessibility) ---------------- */
  .w-site a:focus-visible,
  .w-site button:focus-visible,
  .w-site input:focus-visible,
  .w-site textarea:focus-visible,
  .w-site select:focus-visible,
  .w-site [tabindex]:focus-visible {
    outline: 3px solid rgba(79,143,239,0.55);
    outline-offset: 3px;
    border-radius: 8px;
  }

  /* ---------------- Misc utilities ---------------- */
  .w-eyebrow {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--w-primary); background: var(--w-soft);
    padding: 7px 14px; border-radius: 99px; border: 1px solid rgba(79,143,239,0.18);
  }
  .w-glass {
    background: rgba(255,255,255,0.72);
    backdrop-filter: blur(16px) saturate(170%);
    -webkit-backdrop-filter: blur(16px) saturate(170%);
  }
  .w-noscroll { overflow: hidden; }
  .w-site ::selection { background: rgba(79,143,239,0.22); }

  /* Hide scrollbar on the logo marquee only */
  .w-marquee-track { animation: wMarquee 32s linear infinite; }
  .w-marquee:hover .w-marquee-track { animation-play-state: paused; }

  /* ---------------- Reduced motion ---------------- */
  @media (prefers-reduced-motion: reduce) {
    .w-site *, .w-site *::before, .w-site *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }
    .w-reveal, .w-reveal-left, .w-reveal-right, .w-reveal-scale {
      opacity: 1 !important; transform: none !important;
    }
  }
`;
