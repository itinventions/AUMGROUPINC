/**
 * AURÉLIA FINE JEWELLERY & GEMS
 * Testimonials & Perspectives Controller
 */

export class Testimonials {
  constructor() {
    this.newsletterForm = document.getElementById('newsletter-form');
    this.initNewsletter();
    this.initPerspectives();
  }

  initPerspectives() {
    const grid = document.querySelector('#testimonials .testimonials-grid');
    if (!grid) return;

    // ------------------------------------------------------------------------
    // A. LAPTOP & TABLET (> 768px):
    //    Only movable/scrollable if cards count > 4.
    //    If <= 4 cards (e.g. 3 cards), strictly static grid (NOT movable).
    // ------------------------------------------------------------------------
    const updateScrollState = () => {
      const cards = grid.querySelectorAll('.testimonial-card');
      const isMoreThan4 = cards.length > 4;
      const isLaptopOrTablet = window.innerWidth > 768;

      if (isMoreThan4 && isLaptopOrTablet) {
        grid.classList.add('is-scrollable-desktop');

        // Create luxury desktop controls if not already present
        let controls = document.getElementById('testimonials-desktop-controls');
        if (!controls) {
          controls = document.createElement('div');
          controls.id = 'testimonials-desktop-controls';
          controls.className = 'testimonials-desktop-controls';
          controls.innerHTML = `
            <button type="button" class="testimonials-arrow-btn prev" aria-label="Previous Perspective">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button type="button" class="testimonials-arrow-btn next" aria-label="Next Perspective">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          `;
          grid.parentNode.insertBefore(controls, grid.nextSibling);

          const prevBtn = controls.querySelector('.prev');
          const nextBtn = controls.querySelector('.next');
          const getScrollDistance = () => {
            const firstCard = grid.querySelector('.testimonial-card');
            return firstCard ? firstCard.offsetWidth + 32 : 360;
          };

          if (prevBtn) {
            prevBtn.addEventListener('click', () => {
              grid.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' });
            });
          }
          if (nextBtn) {
            nextBtn.addEventListener('click', () => {
              grid.scrollBy({ left: getScrollDistance(), behavior: 'smooth' });
            });
          }
        }
      } else {
        grid.classList.remove('is-scrollable-desktop');
        const controls = document.getElementById('testimonials-desktop-controls');
        if (controls) controls.remove();
      }
    };

    updateScrollState();

    // Mouse drag scrolling on laptop/tablet (ONLY active if > 4 cards)
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    grid.addEventListener('mousedown', (e) => {
      const cards = grid.querySelectorAll('.testimonial-card');
      if (cards.length <= 4 || window.innerWidth <= 768) return;
      isDown = true;
      grid.classList.add('is-dragging');
      startX = e.pageX - grid.offsetLeft;
      scrollLeft = grid.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      grid.classList.remove('is-dragging');
    });

    grid.addEventListener('mouseleave', () => {
      if (!isDown) return;
      isDown = false;
      grid.classList.remove('is-dragging');
    });

    grid.addEventListener('mousemove', (e) => {
      if (!isDown || window.innerWidth <= 768) return;
      e.preventDefault();
      const x = e.pageX - grid.offsetLeft;
      const walk = (x - startX) * 1.5;
      grid.scrollLeft = scrollLeft - walk;
    });

    // ------------------------------------------------------------------------
    // B. MOBILE (<= 768px):
    //    Right to left scrolling automatically (auto-rotator)!
    //    Pauses on touch, resumes on release.
    // ------------------------------------------------------------------------
    let autoScrollTimer = null;
    let isUserTouching = false;
    let resumeTimeout = null;
    let isVisible = false;

    const getStepDistance = () => {
      const firstCard = grid.querySelector('.testimonial-card');
      if (!firstCard) return 280;
      return firstCard.offsetWidth + 20;
    };

    const advanceStep = () => {
      if (isUserTouching || !isVisible || window.innerWidth > 768) return;
      const cards = grid.querySelectorAll('.testimonial-card');
      if (cards.length <= 1) return;

      const maxScroll = grid.scrollWidth - grid.clientWidth;
      if (grid.scrollLeft >= maxScroll - 15) {
        // Reached end: smoothly cycle back to beginning
        grid.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const step = getStepDistance();
        grid.scrollBy({ left: step, behavior: 'smooth' });
      }
    };

    const startMobileAutoScroll = () => {
      if (autoScrollTimer !== null) return;
      if (window.innerWidth > 768) return; // MOBILE ONLY
      autoScrollTimer = setInterval(advanceStep, 3500);
    };

    const stopMobileAutoScroll = () => {
      if (autoScrollTimer !== null) {
        clearInterval(autoScrollTimer);
        autoScrollTimer = null;
      }
    };

    // Pause on user touch interaction
    grid.addEventListener('touchstart', () => {
      isUserTouching = true;
      clearTimeout(resumeTimeout);
    }, { passive: true });

    grid.addEventListener('touchend', () => {
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isUserTouching = false;
      }, 3500);
    }, { passive: true });

    // IntersectionObserver: only auto-scroll when section is visible
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && window.innerWidth <= 768) {
            startMobileAutoScroll();
          } else {
            stopMobileAutoScroll();
          }
        });
      }, { threshold: 0.15 });
      observer.observe(grid);
    } else {
      isVisible = true;
      startMobileAutoScroll();
    }

    // Responsive resize handler
    window.addEventListener('resize', () => {
      updateScrollState();
      if (window.innerWidth > 768) {
        stopMobileAutoScroll();
        grid.scrollTo({ left: 0, behavior: 'auto' });
      } else if (isVisible) {
        startMobileAutoScroll();
      }
    });

    // Support dynamic updates to testimonials if added dynamically
    if (window.MutationObserver) {
      const observer = new MutationObserver(() => updateScrollState());
      observer.observe(grid, { childList: true });
    }
  }

  initNewsletter() {
    if (!this.newsletterForm) return;

    this.newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = this.newsletterForm.querySelector('.newsletter-input');
      const btn = this.newsletterForm.querySelector('.newsletter-btn');
      if (!input || !input.value) return;

      const originalBtnContent = btn.innerHTML;
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
      btn.style.backgroundColor = '#98d8aa';
      input.disabled = true;

      setTimeout(() => {
        input.value = '';
        input.placeholder = 'Thank you for subscribing';
        input.disabled = false;
        btn.innerHTML = originalBtnContent;
        btn.style.backgroundColor = '';
      }, 2500);
    });
  }
}
