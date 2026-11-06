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

    // Trigger initial hero text & elements on page load
    requestAnimationFrame(() => {
      this.revealInitialElements();
    });
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
      rootMargin: '0px 0px -50px 0px',
      threshold: [0, 0.08]
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          entry.target.classList.remove('is-revealed');
        }
      });
    }, observerOptions);

    this.revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  revealInitialElements() {
    // Gracefully stagger elements that are visible on initial viewport load
    const vh = window.innerHeight;
    this.revealElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.9 && rect.bottom > 0) {
        setTimeout(() => {
          el.classList.add('is-revealed');
        }, index * 80);
      }
    });
  }
}
