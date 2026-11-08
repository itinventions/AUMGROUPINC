/**
 * AURÉLIA FINE JEWELLERY & GEMS
 * Phase 2: Infinite Seamless Gemstone Carousel & Marquee
 *
 * Cards continuously loop: as a card disappears on one side,
 * an identical card enters from the other side in an unbroken cycle.
 * Keeps only 1 set of cards in the HTML source, cloning dynamically at runtime.
 */

export class GemsMarquee {
  constructor() {
    this.wrapper = document.getElementById('gems-marquee-wrapper');
    this.track = document.getElementById('gems-marquee-track');

    this.currentX = 0;
    this.speed = 0.72; // Luxurious, smooth scrolling speed (~43px/sec at 60fps)
    this.isPaused = false;
    this.isDragging = false;
    this.startX = 0;
    this.dragStartCurrentX = 0;
    this.singleSetWidth = 0;
    this.animationFrameId = null;

    this.init();
  }

  init() {
    if (!this.wrapper || !this.track) return;

    // 1. Get original 5 cards from HTML
    const originalCards = Array.from(this.track.children);
    if (originalCards.length === 0) return;

    // 2. Clone cards twice dynamically so we have 3 identical sets in memory.
    // This guarantees seamless loop coverage across all viewports (including 4K monitors).
    for (let cycle = 0; cycle < 2; cycle++) {
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('tabindex', '-1');
        this.track.appendChild(clone);
      });
    }

    // 3. Measure singleSetWidth after DOM update
    // Use requestAnimationFrame so layout is fully computed
    requestAnimationFrame(() => {
      this.measureWidth();
    });

    // 4. Attach event listeners
    this.bindHover();
    this.bindCardSpotlight();
    this.bindPointerDrag();
    this.bindResize();

    // 5. Start animation loop only while visible
    this.observeVisibility();
  }

  measureWidth() {
    const cards = this.track.children;
    if (cards.length >= 10) {
      const firstSetCard = cards[0];
      const secondSetCard = cards[5]; // Offset by exactly 5 original cards
      this.singleSetWidth = secondSetCard.offsetLeft - firstSetCard.offsetLeft;
    } else {
      let total = 0;
      for (let i = 0; i < 5 && i < cards.length; i++) {
        total += cards[i].offsetWidth + 30;
      }
      this.singleSetWidth = total;
    }
  }

  animate() {
    if (!this.isPaused && !this.isDragging && this.singleSetWidth > 0) {
      this.currentX -= this.speed;

      // When 1 full set moves past the left edge, wrap seamlessly by singleSetWidth
      if (this.currentX <= -this.singleSetWidth) {
        this.currentX += this.singleSetWidth;
      } else if (this.currentX > 0) {
        this.currentX -= this.singleSetWidth;
      }

      this.track.style.transform = `translate3d(${this.currentX.toFixed(2)}px, 0, 0)`;
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  start() {
    if (this.animationFrameId === null) {
      this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
  }

  stop() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  // Run the loop only while the carousel is actually on screen.
  observeVisibility() {
    window.addEventListener('gems:visibility', (e) => {
      if (e.detail && e.detail.visible) this.start();
      else this.stop();
    });

    if (!('IntersectionObserver' in window)) {
      this.start();
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? this.start() : this.stop()));
    }, { threshold: 0 });
    observer.observe(this.wrapper);
  }

  bindHover() {
    // Pause animation when hovering over the track or any gem card
    this.wrapper.addEventListener('mouseenter', () => {
      this.isPaused = true;
    });

    this.wrapper.addEventListener('mouseleave', () => {
      if (!this.isDragging) {
        this.isPaused = false;
      }
    });

    // Accessibility keyboard focus pause
    this.wrapper.addEventListener('focusin', () => {
      this.isPaused = true;
    });

    this.wrapper.addEventListener('focusout', () => {
      this.isPaused = false;
    });
  }

  bindCardSpotlight() {
    // Dynamic interactive jewel light following cursor across cards
    this.wrapper.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.gem-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--light-x', `${x.toFixed(1)}px`);
      card.style.setProperty('--light-y', `${y.toFixed(1)}px`);
    }, { passive: true });

    this.wrapper.addEventListener('pointerleave', () => {
      const cards = this.wrapper.querySelectorAll('.gem-card');
      cards.forEach((card) => {
        card.style.setProperty('--light-x', '50%');
        card.style.setProperty('--light-y', '50%');
      });
    }, { passive: true });
  }

  bindPointerDrag() {
    const onPointerDown = (e) => {
      this.isDragging = true;
      this.startX = e.clientX || (e.touches && e.touches[0].clientX);
      this.dragStartCurrentX = this.currentX;
      this.wrapper.style.cursor = 'grabbing';
    };

    const onPointerMove = (e) => {
      if (!this.isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      if (clientX === undefined) return;

      const deltaX = clientX - this.startX;
      this.currentX = this.dragStartCurrentX + deltaX;

      // Wrap continuously during drag
      if (this.singleSetWidth > 0) {
        while (this.currentX <= -this.singleSetWidth) {
          this.currentX += this.singleSetWidth;
        }
        while (this.currentX > 0) {
          this.currentX -= this.singleSetWidth;
        }
      }

      this.track.style.transform = `translate3d(${this.currentX.toFixed(2)}px, 0, 0)`;
    };

    const onPointerUp = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.wrapper.style.cursor = 'grab';
    };

    // Desktop Mouse Drag
    this.wrapper.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    // Mobile / Tablet Touch Swipe
    this.wrapper.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
  }

  bindResize() {
    window.addEventListener('resize', () => {
      this.measureWidth();
    });
  }
}
