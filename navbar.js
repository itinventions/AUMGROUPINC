/**
 * AUM GROUP INC FINE JEWELLERY & GEMS
 * Navbar Component & Interactive Controls
 */

export class Navbar {
  constructor() {
    this.navElement = document.querySelector('.navbar');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.mobileToggle = document.querySelector('.mobile-menu-toggle');
    this.navLinksContainer = document.querySelector('.nav-links');
    this.cartBtn = document.querySelector('.cart-btn');
    this.cartBadge = document.querySelector('.cart-badge');
    this.searchBtn = document.querySelector('.search-btn');
    this.userBtn = document.querySelector('.user-btn');

    this.cartCount = 0;

    this.init();
  }

  init() {
    this.updateNavHeight();
    window.addEventListener('resize', () => this.updateNavHeight(), { passive: true });
    this.bindLinkInteractions();
    this.bindMobileMenu();
    this.bindCartInteraction();
    this.bindScrollSpy();
  }

  updateNavHeight() {
    if (this.navElement) {
      document.documentElement.style.setProperty('--nav-h', `${this.navElement.offsetHeight}px`);
    }
  }

  bindScrollSpy() {
    const isAboutPage = window.location.pathname.includes('about.html');
    if (isAboutPage) return;

    const sectionIds = ['home', 'our-gems', 'expertise', 'about-us', 'reviews'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const navH = this.navElement ? this.navElement.offsetHeight : 85;
      let currentSectionId = '#home';

      sections.forEach((section) => {
        const top = section.offsetTop - navH - 120;
        if (scrollY >= top) {
          currentSectionId = `#${section.id}`;
        }
      });

      this.navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          if (href === currentSectionId) link.classList.add('active');
          else link.classList.remove('active');
        }
      });
    }, { passive: true });
  }

  bindLinkInteractions() {
    this.navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        // Remove active class from all links
        this.navLinks.forEach((l) => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');

        // Close mobile drawer if open
        if (this.navLinksContainer && this.navLinksContainer.classList.contains('mobile-open')) {
          this.toggleMobileMenu(false);
        }
      });
    });
  }

  bindMobileMenu() {
    if (!this.mobileToggle || !this.navLinksContainer) return;

    this.mobileToggle.addEventListener('click', () => {
      const isOpen = this.navLinksContainer.classList.contains('mobile-open');
      this.toggleMobileMenu(!isOpen);
    });

    const mobileCloseBtn = document.getElementById('mobile-menu-close');
    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', () => {
        this.toggleMobileMenu(false);
      });
    }

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (
        this.navLinksContainer.classList.contains('mobile-open') &&
        !this.navLinksContainer.contains(e.target) &&
        !this.mobileToggle.contains(e.target)
      ) {
        this.toggleMobileMenu(false);
      }
    });
  }

  toggleMobileMenu(open) {
    if (!this.navLinksContainer) return;
    if (open) {
      this.navLinksContainer.classList.add('mobile-open');
      this.mobileToggle.setAttribute('aria-expanded', 'true');
    } else {
      this.navLinksContainer.classList.remove('mobile-open');
      this.mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  bindCartInteraction() {
    // Allows interaction when user clicks Explore Collection or Cart
    const ctaBtn = document.querySelector('.hero-cta-btn');
    if (ctaBtn && this.cartBadge) {
      ctaBtn.addEventListener('click', (e) => {
        // Feedback animation
        this.cartCount++;
        this.cartBadge.textContent = this.cartCount;
        this.cartBadge.style.transform = 'scale(1.4)';
        setTimeout(() => {
          this.cartBadge.style.transform = 'scale(1)';
        }, 300);
      });
    }

    if (this.cartBtn) {
      this.cartBtn.addEventListener('click', () => {
        console.log('Cart opened. Current items:', this.cartCount);
      });
    }
  }
}
