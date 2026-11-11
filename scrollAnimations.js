/**
 * AURÉLIA FINE JEWELLERY & GEMS
 * Scroll Animations Orchestrator
 * - Bidirectional scroll animations: elements appear on scroll down and disappear on scroll up
 * - Purely element-and-text focused animation (clean, zero background/side distortions)
 */

export class ScrollAnimations {
  constructor() {
    this.revealElements = [];
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.setupRevealObserver();
    this.setupShowcaseScrollTransitions();

    // Trigger initial hero text & elements on page load
    requestAnimationFrame(() => {
      this.revealInitialElements();
    });
  }

  /**
   * Continuous Scroll Transitions for Gold, Studded Gold, Gems, Silver, and Diamond Showcase Sections.
   * As scrolling progresses:
   * - Each section moves naturally in normal flow (no hard card overlapping, no backdrop bleed).
   * - Content smoothly enters/appears from its corresponding side (Right if text is on right, Left if text is on left).
   * - Content smoothly exits/disappears towards its side as scrolling moves past it.
   * - 100% solid, opaque backdrops ensure no ghosting or previous background leakage.
   */
  setupShowcaseScrollTransitions() {
    const sectionIds = ['gold-collection', 'studded-gold', 'gems-collection', 'silver-collection', 'diamond-collection'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0 || this.isReducedMotion) return;

    let isTicking = false;

    // Content placement sides:
    // gold-collection: left (-1)
    // studded-gold: right (+1)
    // gems-collection: left (-1)
    // silver-collection: right (+1)
    // diamond-collection: left (-1)
    const sideMap = {
      'gold-collection': -1,
      'studded-gold': 1,
      'gems-collection': -1,
      'silver-collection': 1,
      'diamond-collection': -1,
    };

    const onScrollUpdate = () => {
      const vh = window.innerHeight;
      const isMobile = window.innerWidth <= 768;
      const maxTranslateX = isMobile ? 36 : 75;
      const maxTranslateY = isMobile ? 8 : 14;

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        const content = sec.querySelector(
          '.gold-banner-container, .studded-banner-container, .gems-banner-container, .silver-banner-container, .diamond-banner-container'
        );
        const backdrop = sec.querySelector(
          '.gold-showcase-backdrop, .studded-showcase-backdrop, .gems-showcase-backdrop, .silver-showcase-backdrop, .diamond-showcase-backdrop'
        );

        if (!content) return;

        const dir = sideMap[sec.id] || -1;
        const top = rect.top;
        const height = rect.height || (isMobile ? 600 : 700);
        const bottom = rect.bottom;

        let contentOpacity = 1;
        let contentTranslateX = 0;
        let contentTranslateY = 0;

        // 1. Entering from bottom (fade in & glide in from its corresponding side)
        if (top > 0 && top < vh) {
          const enterProgress = Math.min(1, Math.max(0, (vh - top) / (vh * 0.82)));
          contentOpacity = Math.min(1, enterProgress * 1.25);
          const factor = 1 - enterProgress;
          contentTranslateX = dir * factor * maxTranslateX;
          contentTranslateY = factor * maxTranslateY;
        }
        // 2. Centered in viewport & active: glides out towards its side as it scrolls past top
        else if (top <= 0 && bottom >= height * 0.25) {
          const exitProgress = Math.min(1, Math.max(0, -top / (height * 0.75)));
          contentOpacity = Math.max(0, 1 - (exitProgress * 1.25));
          contentTranslateX = dir * exitProgress * maxTranslateX;
          contentTranslateY = -exitProgress * maxTranslateY;
        }
        // 3. Completely above viewport (disappeared towards its side)
        else if (bottom < height * 0.25) {
          contentOpacity = 0;
          contentTranslateX = dir * maxTranslateX;
          contentTranslateY = -maxTranslateY;
        }
        // 4. Completely below viewport (waiting at its side)
        else if (top >= vh) {
          contentOpacity = 0;
          contentTranslateX = dir * maxTranslateX;
          contentTranslateY = maxTranslateY;
        }

        // Section & backdrop are ALWAYS 100% solid & opaque so no background bleed or ghosting ever occurs
        sec.style.opacity = '1';
        sec.style.pointerEvents = 'auto';

        content.style.opacity = contentOpacity.toFixed(3);
        content.style.transform = `translate3d(${contentTranslateX.toFixed(1)}px, ${contentTranslateY.toFixed(1)}px, 0)`;

        if (backdrop) {
          backdrop.style.opacity = '1';
          backdrop.style.transform = 'translate3d(0, 0, 0)';
        }
      });

      isTicking = false;
    };

    const requestTick = () => {
      if (!isTicking) {
        requestAnimationFrame(onScrollUpdate);
        isTicking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });

    // Initial pass
    requestAnimationFrame(onScrollUpdate);
  }

  setupRevealObserver() {
    this.revealElements = Array.from(
      document.querySelectorAll('.reveal-on-scroll, .reveal-fade-left, .reveal-fade-right, .reveal-scale-up')
    );

    if (this.isReducedMotion) {
      this.revealElements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px 50px 0px', // Trigger slightly before it hits viewport so no blank screen is seen
      threshold: 0.02
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          // When element scrolls completely out of viewport (either below or above),
          // remove is-revealed so it smoothly re-enters from its side when scrolled back
          const rect = entry.target.getBoundingClientRect();
          if (rect.top > window.innerHeight || rect.bottom < 0) {
            entry.target.classList.remove('is-revealed');
          }
        }
      });
    }, observerOptions);

    this.revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  revealInitialElements() {
    // Reveal all elements in initial viewport immediately
    const vh = window.innerHeight;
    this.revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.95 && rect.bottom > 0) {
        el.classList.add('is-revealed');
      }
    });
  }
}
