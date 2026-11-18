/**
 * AUM GROUP INC. FINE JEWELLERY & GEMS
 * Scroll Animations Orchestrator
 * - Smooth scroll-triggered editorial reveals with staggered child entrances
 * - Precision reading scroll progress bar
 * - Header glass enhancement on scroll
 * - Gentle optical scroll depth (parallax) on editorial visuals
 * - 100% stationary clean aesthetic: ZERO cursor tracking, ZERO canvas drift, ZERO sparkle crosses
 */

export class ScrollAnimations {
  constructor() {
    this.revealElements = [];
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.progressBar = null;
    this.navbar = null;
    this.heroImgWrap = null;
    this.archCard = null;
    this.isTicking = false;

    this.init();
  }

  init() {
    window.scrollTo(0, 0);
    this.navbar = document.querySelector('.havenly-navbar') || document.querySelector('.navbar');
    this.heroImgWrap = document.querySelector('.havenly-hero-img-wrap');
    this.archCard = document.querySelector('.havenly-arch-card');

    this.setupScrollProgressBar();
    this.setupRevealObserver();
    this.setupHeaderScrollState();
    this.setupParallaxDepth();

    // Trigger initial hero and above-the-fold elements on load
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      this.revealInitialElements();
    } else {
      window.addEventListener('DOMContentLoaded', () => this.revealInitialElements(), { once: true });
    }
  }

  /**
   * Sets up smooth reading progress line anchored to header
   */
  setupScrollProgressBar() {
    let bar = document.getElementById('scroll-progress-bar');
    if (!bar && this.navbar) {
      bar = document.createElement('div');
      bar.id = 'scroll-progress-bar';
      bar.className = 'scroll-progress-line';
      bar.setAttribute('aria-hidden', 'true');
      this.navbar.appendChild(bar);
    }
    this.progressBar = bar;

    const updateProgress = () => {
      if (!this.progressBar) return;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      this.progressBar.style.width = Math.min(100, Math.max(0, scrollPercent)).toFixed(1) + '%';
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  /**
   * IntersectionObserver for all reveal containers, cards, and editorial headers
   */
  setupRevealObserver() {
    const selector = [
      '.reveal-on-scroll',
      '.reveal-fade-left',
      '.reveal-fade-right',
      '.reveal-scale-up',
      '.havenly-atelier-card',
      '.havenly-product-card',
      '.havenly-pillar-card',
      '.havenly-review-card',
      '.havenly-journey-card',
      '.havenly-presence-card',
      '.havenly-filter-bar-wrap',
      '.video-editorial-card',
      '.havenly-bespoke-inner'
    ].join(', ');

    const elements = Array.from(document.querySelectorAll(selector));
    this.revealElements = elements;

    if (this.isReducedMotion) {
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -30px 0px',
      threshold: 0.04
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          // If element scrolls substantially far below or above, allow subtle soft re-entry
          const rect = entry.target.getBoundingClientRect();
          const vh = window.innerHeight;
          if (rect.top > vh * 1.35 || rect.bottom < -vh * 0.35) {
            entry.target.classList.remove('is-revealed');
          }
        }
      });
    }, observerOptions);

    elements.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  /**
   * Navbar subtle elevation on scroll
   */
  setupHeaderScrollState() {
    if (!this.navbar) return;

    const onScrollHeader = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (scrollY > 35) {
        this.navbar.classList.add('is-scrolled');
      } else {
        this.navbar.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();
  }

  /**
   * Gentle optical depth displacement on scroll (laptop/desktop only)
   * Strictly NO cursor tracking, pure scroll-linked displacement
   */
  setupParallaxDepth() {
    if (this.isReducedMotion) return;

    const onScrollDepth = () => {
      if (window.innerWidth <= 768) return; // Disabled on mobile for buttery smooth performance

      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

      // Hero frame subtle drift (max 26px)
      if (this.heroImgWrap && scrollY < 900) {
        const heroOffset = Math.min(26, scrollY * 0.06);
        this.heroImgWrap.style.transform = `translate3d(0, ${heroOffset.toFixed(1)}px, 0)`;
      }

      // Arch card subtle perspective shift when entering view
      if (this.archCard) {
        const rect = this.archCard.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.top < vh && rect.bottom > 0) {
          const progress = (vh - rect.top) / (vh + rect.height);
          const archOffset = (progress - 0.5) * 16;
          const img = this.archCard.querySelector('.havenly-arch-img');
          if (img) {
            img.style.transform = `translate3d(0, ${archOffset.toFixed(1)}px, 0) scale(1.02)`;
          }
        }
      }

      this.isTicking = false;
    };

    const requestTick = () => {
      if (!this.isTicking) {
        requestAnimationFrame(onScrollDepth);
        this.isTicking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
  }

  /**
   * Reveal all above-the-fold elements immediately so initial view is crisp
   */
  revealInitialElements() {
    const vh = window.innerHeight;
    this.revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.95 && rect.bottom > 0) {
        el.classList.add('is-revealed');
      }
    });

    // Also ensure hero left & right have is-revealed
    const heroLeft = document.querySelector('.havenly-hero-left');
    const heroRight = document.querySelector('.havenly-hero-right');
    const filterBar = document.querySelector('.havenly-filter-bar-wrap');
    if (heroLeft) heroLeft.classList.add('is-revealed');
    if (heroRight) heroRight.classList.add('is-revealed');
    if (filterBar) filterBar.classList.add('is-revealed');
  }
}
