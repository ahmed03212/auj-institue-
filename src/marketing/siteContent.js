/* ===================================================================
 *  SITE CONTENT — EDIT THIS FILE TO UPDATE THE WEBSITE
 * ===================================================================
 *  Every piece of text, number, course and testimonial on the public
 *  website comes from this one file. Nothing is hardcoded inside the
 *  components, so you can update the site without touching any JSX.
 *
 *  ⚠️  PLACEHOLDERS ARE MARKED WITH:  // TODO:
 *      Replace those with AUJ's real details before going live.
 *      Anything not marked TODO is either structural or already safe.
 * =================================================================== */

export const site = {
  // ---- Brand -------------------------------------------------------
  brandTop: 'AUJ',
  brandBottom: 'COMPUTER INSTITUTE',

  // ---- Contact details --------------------------------------------
  // TODO: replace all four with AUJ's real contact information.
  phone: '+92 300 0000000',
  email: 'info@auj.edu.pk',
  address: 'Karachi, Sindh, Pakistan',
  hours: 'Mon – Sat, 9:00 AM – 8:00 PM',

  // TODO: add real social links, or leave '' to hide the icon.
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    whatsapp: '',
  },
};

// ---- Navigation ----------------------------------------------------
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'courses', label: 'Courses' },
  { id: 'about', label: 'About Us' },
  { id: 'why', label: 'Why AUJ?' },
  { id: 'students', label: 'Students' },
  { id: 'contact', label: 'Contact' },
];

// ---- Hero ----------------------------------------------------------
export const hero = {
  eyebrow: 'Professional IT Training Institute',
  titleLine1: 'Learn Today.',
  titleLine2: 'Lead Tomorrow.',
  subtitle:
    'Hands-on, practical computer training built around real projects and modern industry tools — taught in a fully equipped lab by instructors who work in the field.',
  primaryCta: 'Enroll Now',
  secondaryCta: 'Explore Courses',
  // Small rotating highlights under the CTAs (auto-rotates, pauses on hover)
  highlights: [
    'Practical, project-based learning',
    'Fully equipped modern computer lab',
    'Career-focused course structure',
    'Small batches, personal attention',
  ],
};

// ---- Statistics ----------------------------------------------------
/*  IMPORTANT: these are the numbers that animate from 0 in the stats
 *  section. They are NOT invented — set them to AUJ's real figures.
 *  Set `value: null` on any stat whose real number you don't have yet
 *  and the card will show the `fallback` text instead of a fake count. */
export const stats = [
  { id: 'students', label: 'Students Trained', value: null, fallback: '—', suffix: '+', icon: 'Users' },       // TODO: real number
  { id: 'courses', label: 'Professional Courses', value: null, fallback: '—', suffix: '', icon: 'BookOpen' },  // TODO: real number
  { id: 'trainers', label: 'Expert Trainers', value: null, fallback: '—', suffix: '', icon: 'UserCheck' },     // TODO: real number
  { id: 'practical', label: 'Practical Learning', value: 100, fallback: '—', suffix: '%', icon: 'Laptop' },
];

// ---- Courses -------------------------------------------------------
/*  TODO: adjust names, durations, levels and descriptions to match the
 *  courses AUJ actually offers. `icon` accepts any lucide-react name. */
export const courses = [
  {
    id: 'web',
    name: 'Web Development',
    icon: 'Code2',
    duration: '4 Months',
    level: 'Beginner to Advanced',
    description: 'Build responsive, modern websites from scratch using HTML, CSS, JavaScript and current front-end frameworks.',
    topics: ['HTML & CSS', 'JavaScript', 'React', 'Responsive Design'],
  },
  {
    id: 'graphic',
    name: 'Graphic Designing',
    icon: 'Palette',
    duration: '3 Months',
    level: 'Beginner to Advanced',
    description: 'Master industry-standard design tools and the visual principles behind professional branding and print work.',
    topics: ['Photoshop', 'Illustrator', 'Branding', 'Print & Digital'],
  },
  {
    id: 'office',
    name: 'MS Office',
    icon: 'FileSpreadsheet',
    duration: '2 Months',
    level: 'Beginner',
    description: 'Get confident with the office software every workplace expects — from documents and spreadsheets to presentations.',
    topics: ['Word', 'Excel', 'PowerPoint', 'Outlook'],
  },
  {
    id: 'ai',
    name: 'AI & Machine Learning',
    icon: 'BrainCircuit',
    duration: '5 Months',
    level: 'Intermediate',
    description: 'Understand how modern AI works and build practical models with Python, from data handling to deployment.',
    topics: ['Python', 'Data Analysis', 'ML Models', 'AI Tools'],
  },
  {
    id: 'app',
    name: 'App Development',
    icon: 'Smartphone',
    duration: '4 Months',
    level: 'Intermediate',
    description: 'Design and build mobile applications that run on real devices, covering the full development cycle.',
    topics: ['Mobile UI', 'App Logic', 'APIs', 'Publishing'],
  },
  {
    id: 'hardware',
    name: 'Computer Hardware',
    icon: 'Cpu',
    duration: '2 Months',
    level: 'Beginner',
    description: 'Learn to assemble, diagnose and repair computer systems with hands-on lab practice on real machines.',
    topics: ['Assembly', 'Troubleshooting', 'Networking', 'Maintenance'],
  },
];

// ---- About ---------------------------------------------------------
export const about = {
  eyebrow: 'About AUJ',
  title: 'A computer institute built around practical skill',
  // TODO: replace with AUJ's real story / description.
  body: [
    'AUJ Computer Institute trains students in the technical skills that employers actually hire for. Every course is structured around practical work in our lab rather than theory alone, so students finish with something they can demonstrate.',
    'Our instructors bring real industry experience into the classroom, and our batches are kept small enough that every student gets individual attention throughout their course.',
  ],
  points: [
    'Practical, lab-based training on real equipment',
    'Course content aligned with current industry tools',
    'Individual guidance and progress tracking',
    'Certificate awarded on successful completion',
  ],
};

// ---- Why AUJ -------------------------------------------------------
export const whyFeatures = [
  { id: 'trainers', icon: 'UserCheck', title: 'Expert Trainers', text: 'Learn from instructors with genuine professional experience in the fields they teach.' },
  { id: 'lab', icon: 'MonitorSmartphone', title: 'Modern Lab', text: 'A fully equipped computer lab with the hardware and software used in real workplaces.' },
  { id: 'practical', icon: 'Wrench', title: 'Practical Learning', text: 'Every concept is applied immediately through hands-on lab work, not just lectures.' },
  { id: 'career', icon: 'Briefcase', title: 'Career-Focused Training', text: 'Course structure and projects are built around what employers actually look for.' },
  { id: 'projects', icon: 'FolderKanban', title: 'Hands-On Projects', text: 'Finish your course with completed projects you can show to future employers.' },
  { id: 'support', icon: 'LifeBuoy', title: 'Student Support', text: 'Ongoing guidance from enrollment through to course completion and beyond.' },
];

// ---- Students / Testimonials ---------------------------------------
/*  ⚠️  DO NOT invent testimonials. This array is intentionally EMPTY.
 *  Add real student feedback here and the testimonial carousel will
 *  appear automatically. While it's empty, the Students section shows
 *  a student-portal panel instead — no fake quotes are ever displayed.
 *
 *  Format:
 *  { id: '1', name: 'Real Name', course: 'Web Development', text: 'Their real words…' }
 */
export const testimonials = [
  // TODO: add real student testimonials here.
];

// ---- Student section (shown alongside / instead of testimonials) ----
export const studentSection = {
  eyebrow: 'For Students',
  title: 'Your course, tracked in one place',
  body: 'Enrolled students get their own portal to follow attendance, assignments, class timetable and results — with login details issued by the institute.',
  points: [
    'Check attendance and class schedule anytime',
    'View assignments and submission status',
    'See marks and course progress',
    'Message your instructor directly',
  ],
  cta: 'Student Login',
};

// ---- Contact -------------------------------------------------------
export const contact = {
  eyebrow: 'Get in Touch',
  title: 'Ready to start your course?',
  body: 'Send us a message with the course you\'re interested in and we\'ll get back to you with schedule, fees and enrollment details.',
  courseOptions: courses.map((c) => c.name),
};

// ---- Final CTA -----------------------------------------------------
export const finalCta = {
  title: 'Take the first step toward a technical career',
  body: 'Visit the institute or send us a message — we\'ll help you choose the course that fits your goals.',
  primary: 'Enroll Now',
  secondary: 'Contact Us',
};
