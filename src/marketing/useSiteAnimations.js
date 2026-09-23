import { useEffect, useRef, useState, useCallback } from 'react';

// Respect the OS-level reduced-motion setting everywhere we animate in JS.
export function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Adds `.is-visible` to any element carrying a `.w-reveal*` class once it
 * scrolls into view. One shared observer handles the whole page, so we
 * aren't spinning up an observer per element. Elements can set
 * `data-delay="120"` (ms) for staggered entrances.
 */
const REVEAL_SELECTOR = '.w-reveal, .w-reveal-left, .w-reveal-right, .w-reveal-scale';

export function useScrollReveal(deps = []) {
  useEffect(() => {
    const reduced = prefersReducedMotion();

    // Under reduced motion we never hide anything — just mark everything
    // visible immediately and skip observing entirely.
    if (reduced) {
      const showAll = () =>
        document.querySelectorAll(REVEAL_SELECTOR).forEach((n) => n.classList.add('is-visible'));
      showAll();
      const mo = new MutationObserver(showAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = Number(el.dataset.delay || 0);
          if (delay) el.style.transitionDelay = `${delay}ms`;
          el.classList.add('is-visible');
          io.unobserve(el); // reveal once, then stop watching
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    // Track which nodes we've already handed to the observer so repeat
    // scans (from the MutationObserver below) don't re-observe them.
    const seen = new WeakSet();
    const scan = () => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((n) => {
        if (seen.has(n) || n.classList.contains('is-visible')) return;
        seen.add(n);
        io.observe(n);
      });
    };

    scan();

    // Sections mount after this hook's first run (and lazily as the user
    // scrolls), so watch the DOM and pick up any reveal elements added later.
    // Without this, anything rendered after mount stays permanently hidden.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net: if something goes wrong with observation, make sure content
    // is never left invisible. Runs once, shortly after load.
    const failSafe = setTimeout(() => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) n.classList.add('is-visible');
      });
    }, 1200);

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(failSafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Counts from 0 to `target` when the returned ref enters the viewport.
 * Uses requestAnimationFrame with an ease-out curve (no timers, no layout
 * thrash) and stops cleanly on unmount. If `target` is null/undefined the
 * hook stays inert — used so stats without a real number never fake one.
 */
export function useCountUp(target, duration = 1800) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (target == null) return;
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    let rafId;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          setValue(Math.round(target * eased));
          if (p < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, duration]);

  return [ref, value];
}

/**
 * Tracks which section is currently in view so the navbar can highlight
 * the matching link. Uses IntersectionObserver rather than scroll math.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that's visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** True once the page has scrolled past `offset` — drives the sticky navbar. */
export function useScrolled(offset = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return scrolled;
}

/**
 * Small parallax helper. Returns a ref; the element is translated on the
 * Y axis as it scrolls. transform-only (GPU friendly), rAF-throttled,
 * and disabled entirely under reduced-motion or on small screens.
 */
export function useParallax(strength = 0.06) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || window.innerWidth < 1024) return;

    let ticking = false;
    const update = () => {
      const offset = window.scrollY * strength;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [strength]);

  return ref;
}

/**
 * Generic auto-rotating index with pause support.
 * Used by the hero highlights and the testimonial carousel. Rotation is
 * paused on hover/focus/interaction, and never runs under reduced-motion.
 */
export function useAutoRotate(length, interval = 5000) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (length <= 1 || paused || prefersReducedMotion()) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => clearInterval(id);
  }, [length, interval, paused]);

  const goTo = useCallback((i) => setIndex(((i % length) + length) % length), [length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % length), [length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + length) % length), [length]);

  return { index, goTo, next, prev, setPaused, paused };
}

/** Smooth-scrolls to a section id, accounting for the sticky navbar height. */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--w-nav-h') || '72',
    10
  );
  const top = el.getBoundingClientRect().top + window.scrollY - navH - 8;
  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
}
