// Shared visual tokens — mirrors the palette already used inside TeacherApp.jsx
// so the Admin and Student portals feel like the same product.
export const T = {
  navyDeep: "#132353",
  navy: "#1C2E63",
  navyBorder: "rgba(255,255,255,0.10)",
  royal: "#2F5CFF",
  royalSoft: "#5B7CFF",
  cyan: "#22D3EE",
  royalTint: "#EAF0FF",
  cyanTint: "#E3FAFD",
  statBg: "#EAF2FF",
  statBorder: "#D7E6FF",
  page: "#F5F7FC",
  card: "#FFFFFF",
  border: "#E8ECF5",
  ink: "#0F1729",
  inkSoft: "#5B6579",
  inkFaint: "#8C96AC",
  green: "#17A960",
  greenTint: "#E8F9F0",
  red: "#E0473D",
  redTint: "#FCEAE9",
  amber: "#D3891E",
  amberTint: "#FBF0DE",
  violet: "#7C5CFF",
  violetTint: "#F0ECFF",
};

export const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
  .cl-display { font-family: 'Sora', sans-serif; }
  .cl-body { font-family: 'Inter', sans-serif; }

  @keyframes fadeSlideUp { from { opacity:0; transform: translateY(12px);} to { opacity:1; transform: translateY(0);} }
  @keyframes dropdownIn { from { opacity:0; transform: translateY(6px) scale(0.98);} to { opacity:1; transform: translateY(0) scale(1);} }
  @keyframes pulseBadge {
    0% { box-shadow: 0 0 0 0 rgba(224,71,61,0.45); }
    70% { box-shadow: 0 0 0 6px rgba(224,71,61,0); }
    100% { box-shadow: 0 0 0 0 rgba(224,71,61,0); }
  }

  * { -webkit-tap-highlight-color: transparent; }
  ::selection { background: rgba(47,92,255,0.18); }

  .cl-fade-in { animation: fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }

  .cl-card { transition: transform .25s cubic-bezier(0.16,1,0.3,1), box-shadow .25s ease, border-color .25s ease; }
  .cl-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -12px rgba(15,23,66,0.16), 0 0 0 1px rgba(47,92,255,0.08);
    border-color: rgba(47,92,255,0.18);
  }

  .cl-row { transition: background-color .18s ease, transform .15s ease; }
  .cl-row:hover { background-color: #F7F9FE; }

  .cl-icon-btn { transition: transform .2s cubic-bezier(0.16,1,0.3,1), box-shadow .2s ease, filter .2s ease; }
  .cl-icon-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 22px -4px rgba(15,23,66,0.16), 0 0 0 1px rgba(47,92,255,0.06); }
  .cl-icon-btn:active { transform: translateY(0) scale(0.96); }

  .auj-glass-header {
    background: rgba(245,247,252,0.72);
    backdrop-filter: blur(14px) saturate(160%);
    -webkit-backdrop-filter: blur(14px) saturate(160%);
  }

  input:focus, select:focus, textarea:focus {
    box-shadow: 0 0 0 3px rgba(47,92,255,0.15) !important;
    border-color: #2F5CFF !important;
    transition: box-shadow .15s ease, border-color .15s ease;
  }

  .cl-badge-pulse { animation: pulseBadge 2.2s infinite; }
`;
