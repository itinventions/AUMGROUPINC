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
   * Continuous Scroll Transitions for Simple Gold, Studded Gold, and Diamond Showcase Sections.
   * As scrolling progresses:
   * - Upper section smoothly glides upward and fades out.
   * - Below section emerges gliding upward from down into position, fading in.
   * - Applies ONLY to: #gold-collection, #studded-gold, #diamond-collection.
   */
  setupShowcaseScrollTransitions() {
    const sectionIds = ['gold-collection', 'studded-gold', 'gems-collection', 'silver-collection'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0 || this.isReducedMotion) return;

    let isTicking = false;

    const onScrollUpdate = () => {
      // On mobile viewports (<= 768px), keep showcase sections 100% visible without translate shift
      if (window.innerWidth <= 768) {
        sections.forEach((sec) => {
          const content = sec.querySelector(
            '.gold-banner-container, .studded-banner-container, .gems-banner-container, .silver-banner-container, .diamond-banner-container'
          );
          const backdrop = sec.querySelector(
            '.gold-showcase-backdrop, .studded-showcase-backdrop, .gems-showcase-backdrop, .silver-showcase-backdrop, .diamond-showcase-backdrop'
          );
          if (content) {
            content.style.opacity = '';
            content.style.transform = '';
          }
          if (backdrop) {
            backdrop.style.opacity = '';
            backdrop.style.transform = '';
          }
        });
        isTicking = false;
        return;
      }

      const vh = window.innerHeight;

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        const content = sec.querySelector(
          '.gold-banner-container, .studded-banner-container, .gems-banner-container, .silver-banner-container, .diamond-banner-container'
        );
        const backdrop = sec.querySelector(
          '.gold-showcase-backdrop, .studded-showcase-backdrop, .gems-showcase-backdrop, .silver-showcase-backdrop, .diamond-showcase-backdrop'
        );

        if (!content) return;

        const top = rect.top;
        const height = rect.height || 600;
        const bottom = rect.bottom;

        let contentOpacity = 1;
        let contentTranslateY = 0;
        let bgTranslateY = 0;
        let bgOpacity = 1;

        // 1. Entering from the bottom (fade up from down as it appears)
        if (top > 0 && top < vh) {
          const enterProgress = Math.min(1, Math.max(0, (vh - top) / (vh * 0.75)));
          contentOpacity = Math.min(1, enterProgress * 1.15);
          contentTranslateY = (1 - enterProgress) * 65; // glides up from +65px
          bgTranslateY = (1 - enterProgress) * 30;
          bgOpacity = 0.35 + 0.65 * enterProgress;
        }
        // 2. Exiting through the top (upper section fades up as below section appears)
        else if (top <= 0 && bottom > 0) {
          const exitProgress = Math.min(1, Math.max(0, -top / (height * 0.75)));
          contentOpacity = Math.max(0, 1 - (exitProgress * 1.15));
          contentTranslateY = -exitProgress * 65; // glides upward to -65px
          bgTranslateY = -exitProgress * 30;
          bgOpacity = Math.max(0.3, 1 - (exitProgress * 0.7));
        }
        // 3. Completely above viewport
        else if (bottom <= 0) {
          contentOpacity = 0;
          contentTranslateY = -65;
          bgTranslateY = -30;
          bgOpacity = 0.3;
        }
        // 4. Completely below viewport
        else if (top >= vh) {
          contentOpacity = 0;
          contentTranslateY = 65;
          bgTranslateY = 30;
          bgOpacity = 0.3;
        }

        if (
          sec.id === 'gold-collection' ||
          sec.id === 'studded-gold' ||
          sec.id === 'gems-collection' ||
          sec.id === 'silver-collection'
        ) {
          bgTranslateY = 0;
        }

        content.style.opacity = contentOpacity.toFixed(3);
        content.style.transform = `translate3d(0, ${contentTranslateY.toFixed(1)}px, 0)`;

        if (backdrop) {
          backdrop.style.opacity = bgOpacity.toFixed(3);
          backdrop.style.transform = `translate3d(0, ${bgTranslateY.toFixed(1)}px, 0)`;
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
      threshold: 0.01
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
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
    this.revealElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 1.1) {
        el.classList.add('is-revealed');
      }
    });
  }
}
