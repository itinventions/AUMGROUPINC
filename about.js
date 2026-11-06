/**
 * AUM GROUP INC FINE JEWELLERY & GEMS
 * About Us Page Controller
 */

import { Navbar } from './navbar.js';
import { ScrollAnimations } from './scrollAnimations.js';

class AboutPage {
  constructor() {
    this.navbar = null;
    this.scrollAnimations = null;
    this.init();
  }

  init() {
    // 1. Initialize Navbar
    this.navbar = new Navbar();

    // 2. Initialize Bidirectional Scroll Animations
    this.scrollAnimations = new ScrollAnimations();

    // 2. Smooth Scroll for "Our Story ↓" CTA
    const storyBtn = document.getElementById('our-story-btn');
    if (storyBtn) {
      storyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('our-story');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // 3. Footer Newsletter Handler
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('.newsletter-input');
        const btn = newsletterForm.querySelector('.newsletter-btn');
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

    console.log('%c AUM GROUP INC %c About Us Loaded ', 
      'background: #dfc7a7; color: #12100e; font-weight: bold; padding: 4px 8px; border-radius: 2px;',
      'background: #141210; color: #dfc7a7; padding: 4px 8px;');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new AboutPage());
} else {
  new AboutPage();
}
