# AUJ Computer Institute — website + portals

One React + Vite app containing four things:

| Route | What it is | Who sees it |
|---|---|---|
| `#/` (or no hash) | Public marketing website | Everyone |
| `#/login` | Student / Teacher login | Public |
| `#admin-portal-x7q2` | Super Admin login | **Hidden** — link it nowhere |
| `#/dashboard` etc. | The portal for whoever is signed in | Signed-in users |

---

## ⚠️ First: restore your teacher portal file

`src/teacher/TeacherApp.jsx` is currently a **placeholder**. Replace it
with your original `AujApp.jsx` and apply the two small edits described
in the comment block at the top of that placeholder file. Everything
else is already wired to pass it real Firebase data.

---

## Running it

```bash
npm install
cp .env.example .env.local     # then paste your Firebase keys in
npm run dev
```

Firebase setup (creating the project, enabling auth, publishing the
security rules, and creating your first admin account) is covered
step-by-step in **FIREBASE_SETUP.md**.

---

## Editing the website content

**Everything on the public site comes from one file:**

```
src/marketing/siteContent.js
```

Phone numbers, address, course list, section text — all of it. You do
not need to touch any JSX to update the site. Anything still needing
your real information is marked with `// TODO:`.

### Things worth knowing

**Statistics** — the stat cards animate from 0, but only if you give
them a real number. They currently have `value: null`, so they display
`—` rather than inventing a figure. Set the real numbers when you have
them:

```js
{ id: 'students', label: 'Students Trained', value: 450, ... }
```

**Testimonials** — the `testimonials` array is intentionally **empty**,
so no fake student quotes are ever shown. Add real ones and the
carousel (auto-rotating, pause-on-hover, swipeable, with dots and
arrows) appears automatically:

```js
export const testimonials = [
  { id: '1', name: 'Real Student', course: 'Web Development', text: 'Their actual words…' },
];
```

**Icons** — `siteContent.js` refers to icons by name. If you add a new
one, also import it in `src/marketing/icons.js`. This is deliberate:
importing the whole icon library added ~700KB to the bundle.

**Contact form** — there's no backend attached, so rather than
pretending to send, it opens the visitor's email app with the details
pre-filled. Swap `handleSubmit` in `src/marketing/Contact.jsx` for a
real endpoint (Firebase, Formspree, etc.) when you're ready.

---

## How the site is built

```
src/marketing/
  siteContent.js        ← all text, courses, stats, contact details
  siteTokens.js         ← colour tokens + every animation/interaction class
  useSiteAnimations.js  ← reusable hooks (reveal, counters, parallax, carousel)
  icons.js              ← explicit icon registry (keeps the bundle small)
  Section.jsx           ← shared section wrapper + heading
  Navbar / Hero / Stats / Courses / AboutWhy / Students / Contact / FooterCTA
  Website.jsx           ← assembles the page
```

Colours are CSS variables defined in `siteTokens.js` (`--w-primary`,
`--w-navy`, etc.), so a palette change is a one-file edit.

Animations are driven by a single shared `IntersectionObserver`.
Elements opt in with a class and an optional stagger:

```jsx
<div className="w-reveal" data-delay="120">…</div>
```

Available: `w-reveal` (fade-up), `w-reveal-left`, `w-reveal-right`,
`w-reveal-scale`. All of it is disabled automatically under
`prefers-reduced-motion`.

---

## Verified

Checked in a real browser at 320 / 390 / 768 / 1024 / 1440px:

- No horizontal overflow at any width
- No console or page errors
- Scroll reveals fire correctly (47 animated elements)
- Mobile drawer, animated hamburger, and section scrolling all work

Bundle is code-split so marketing visitors don't download the portals
or the Firebase SDK:

| Chunk | Gzipped |
|---|---|
| main (website) | 24 KB |
| react | 45 KB |
| firebase *(only on portal routes)* | 113 KB |
| each portal | 1–6 KB |

---

## Before going live

1. Replace the teacher placeholder file (see top of this README).
2. Fill in every `// TODO:` in `siteContent.js`.
3. Change `ADMIN_ROUTE_TOKEN` in `src/App.jsx` to your own secret value.
4. Publish `firestore.rules` in the Firebase console.
5. Add real stat numbers and testimonials when you have them.
