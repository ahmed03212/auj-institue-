import { useEffect } from 'react';
import { siteStyle } from './siteTokens.js';
import { useScrollReveal } from './useSiteAnimations.js';
import Navbar from './Navbar.jsx';
import Hero from './Hero.jsx';
import Stats from './Stats.jsx';
import Courses from './Courses.jsx';
import { About, WhyAUJ } from './AboutWhy.jsx';
import Students from './Students.jsx';
import Contact from './Contact.jsx';
import { FinalCTA, Footer } from './FooterCTA.jsx';

export default function Website() {
  // Wire up the shared IntersectionObserver for every .w-reveal element.
  useScrollReveal([]);

  // The portals use hash routing (#/dashboard etc). The marketing site uses
  // plain anchors (#courses), so make sure landing here starts at the top
  // rather than wherever a previous portal route left the scroll position.
  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#/') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="w-site">
      <style>{siteStyle}</style>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Courses />
        <About />
        <WhyAUJ />
        <Students />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
