/**
 * AUM GROUP INC / GEMORÉ FINE JEWELLERY & GEMS
 * Replicated 2-Tier Luxury Navbar Component & Interactive Controls (v2.0)
 */

export class Navbar {
  constructor() {
    this.navElement = document.querySelector('.navbar');
    this.navLinks = document.querySelectorAll('.nav-tier-link, .drawer-nav-link');
    this.mobileToggle = document.getElementById('mobile-menu-toggle');
    this.drawer = document.getElementById('navbar-drawer');
    this.drawerOverlay = document.getElementById('navbar-drawer-overlay');
    this.drawerCloseBtn = document.getElementById('drawer-close-btn');

    // Wishlist & Cart elements
    this.wishlistBtn = document.getElementById('wishlist-btn');
    this.wishlistBadge = document.getElementById('wishlist-counter');
    this.cartBtn = document.getElementById('cart-btn');
    this.cartBadge = document.getElementById('cart-counter');

    this.cartCount = 0;
    this.wishlistCount = 0;
    this.isWishlisted = false;

    this.init();
  }

  init() {
    this.updateNavHeight();
    window.addEventListener('resize', () => this.updateNavHeight(), { passive: true });

    this.bindHideOnScroll();   // ← NEW: hide on scroll-down, show on scroll-up
    this.bindWishlist();
    this.bindCartInteraction();
    this.bindMobileMenu();
    this.bindLinkInteractions();
    this.bindScrollSpy();
  }

  updateNavHeight() {
    if (this.navElement) {
      const height = this.navElement.offsetHeight || 96;
      document.documentElement.style.setProperty('--nav-h', `${height}px`);
    }
  }

  /**
   * Only visible when at the very top of the page (scrollY <= 20).
   * As soon as user scrolls down, the navbar slides out of view and stays hidden.
   * It will never appear during scrolling until user scrolls all the way back to the top.
   */
  bindHideOnScroll() {
    if (!this.navElement) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const drawerOpen = this.drawer && this.drawer.classList.contains('open');

      if (drawerOpen) {
        this.navElement.classList.remove('nav-hidden');
        return;
      }

      if (currentScrollY <= 20) {
        this.navElement.classList.remove('nav-hidden');
      } else {
        this.navElement.classList.add('nav-hidden');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position on page load
    handleScroll();
  }

  bindWishlist() {
    if (!this.wishlistBtn) return;

    this.wishlistBtn.addEventListener('click', () => {
      this.isWishlisted = !this.isWishlisted;
      this.wishlistCount = this.isWishlisted ? 1 : 0;

      if (this.wishlistBadge) {
        this.wishlistBadge.textContent = this.wishlistCount;
        this.wishlistBadge.style.transform = 'scale(1.4)';
        setTimeout(() => {
          this.wishlistBadge.style.transform = 'scale(1)';
        }, 280);
      }

      const svgPath = this.wishlistBtn.querySelector('svg path');
      if (svgPath) {
        if (this.isWishlisted) {
          svgPath.setAttribute('fill', '#402020');
          this.wishlistBtn.style.color = '#d6d1c4';
        } else {
          svgPath.setAttribute('fill', 'none');
          this.wishlistBtn.style.color = '';
        }
      }
    });
  }

  bindCartInteraction() {
    // Allows interaction when user clicks Explore Collection / Buy buttons
    const ctaButtons = document.querySelectorAll('.hero-cta-btn, .gem-card-cta');
    ctaButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.cartCount++;
        if (this.cartBadge) {
          this.cartBadge.textContent = this.cartCount;
          this.cartBadge.style.transform = 'scale(1.45)';
          setTimeout(() => {
            this.cartBadge.style.transform = 'scale(1)';
          }, 300);
        }
      });
    });

    if (this.cartBtn) {
      this.cartBtn.addEventListener('click', () => {
        // Subtle cart click feedback
        this.cartBtn.style.transform = 'scale(0.92)';
        setTimeout(() => {
          this.cartBtn.style.transform = '';
        }, 200);
      });
    }
  }

  bindMobileMenu() {
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleDrawer(true);
      });
    }

    if (this.drawerCloseBtn) {
      this.drawerCloseBtn.addEventListener('click', () => {
        this.toggleDrawer(false);
      });
    }

    if (this.drawerOverlay) {
      this.drawerOverlay.addEventListener('click', () => {
        this.toggleDrawer(false);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.drawer && this.drawer.classList.contains('open')) {
        this.toggleDrawer(false);
      }
    });
  }

  toggleDrawer(open) {
    if (!this.drawer) return;
    if (open) {
      this.drawer.classList.add('open');
      if (this.drawerOverlay) this.drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (this.mobileToggle) this.mobileToggle.setAttribute('aria-expanded', 'true');
      // Always reveal navbar when drawer opens
      if (this.navElement) this.navElement.classList.remove('nav-hidden');
    } else {
      this.drawer.classList.remove('open');
      if (this.drawerOverlay) this.drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (this.mobileToggle) this.mobileToggle.setAttribute('aria-expanded', 'false');
      if (this.navElement && window.scrollY > 20) {
        this.navElement.classList.add('nav-hidden');
      }
    }
  }

  bindLinkInteractions() {
    this.navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        this.navLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');

        // Also sync mobile drawer link with desktop link
        const href = link.getAttribute('href');
        document.querySelectorAll(`.nav-tier-link[href="${href}"], .drawer-nav-link[href="${href}"]`).forEach((matched) => {
          matched.classList.add('active');
        });

        this.toggleDrawer(false);
      });
    });
  }

  bindScrollSpy() {
    const isStandalonePage = window.location.pathname.includes('about.html') || window.location.pathname.includes('contact.html');
    if (isStandalonePage) return;

    const sectionIds = ['home', 'shop', 'our-gems', 'about-us', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const navH = this.navElement ? this.navElement.offsetHeight : 96;
      let currentSectionId = '#home';

      sections.forEach((section) => {
        const top = section.offsetTop - navH - 100;
        if (scrollY >= top) {
          currentSectionId = `#${section.id}`;
        }
      });

      this.navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          if (href === currentSectionId || (currentSectionId === '#our-gems' && (href === '#shop' || href === '#bestsellers'))) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    }, { passive: true });
  }
}
