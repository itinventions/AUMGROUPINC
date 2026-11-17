/**
 * AUM GROUP INC. FINE JEWELLERY & GEMS
 * Text Animations & Numerical Rollup Orchestrator
 * - Luxury gold specular sheen sweeps on italic accents
 * - Staggered editorial headline entrances
 * - Scroll-triggered numerical counter animations for prices & heritage years
 * - Interactive hover sheen triggers on atelier and product cards
 * - ZERO cursor tracking, ZERO mouse canvas drift, ZERO sparkle crosses
 */

export class TextLoopAnimations {
  constructor() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.countersTriggered = new Set();

    this.init();
  }

  init() {
    this.setupHeadlineEntrance();
    this.setupNumberRollups();
    this.setupCardHoverSheen();
  }

  /**
   * Hero editorial headline entrance sequence
   */
  setupHeadlineEntrance() {
    const heroTitle = document.querySelector('.havenly-hero-title');
    if (!heroTitle) return;

    // Add luxury entrance state once DOM is ready
    requestAnimationFrame(() => {
      heroTitle.classList.add('is-rendered');
    });
  }

  /**
   * Numerical rollups on scroll (for featured product prices, heritage founding year)
   */
  setupNumberRollups() {
    if (this.isReducedMotion) return;

    const priceElements = Array.from(document.querySelectorAll('.havenly-card-price[data-usd]'));
    if (priceElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.countersTriggered.has(entry.target)) {
            this.countersTriggered.add(entry.target);
            this.animatePrice(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    priceElements.forEach((el) => observer.observe(el));
  }

  /**
   * Smoothly eases price from 0 to target USD amount
   */
  animatePrice(element) {
    const targetUsd = parseFloat(element.dataset.usd);
    if (isNaN(targetUsd)) return;

    // Check if parent has currency or format
    const duration = 1200; // 1.2s smooth animation
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(targetUsd * easeProgress);

      element.textContent = '$' + currentVal.toLocaleString('en-US');

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = '$' + targetUsd.toLocaleString('en-US');
      }
    };

    requestAnimationFrame(step);
  }

  /**
   * Interactive hover sheen on atelier cards and featured cards
   */
  setupCardHoverSheen() {
    const cards = document.querySelectorAll('.havenly-atelier-card, .havenly-product-card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        const title = card.querySelector('.havenly-atelier-name, .havenly-card-title');
        if (title) {
          title.style.transition = 'color 0.3s ease, letter-spacing 0.3s ease';
        }
      });
    });
  }
}
