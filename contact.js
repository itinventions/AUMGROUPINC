/**
 * AUM GROUP INC FINE JEWELLERY & GEMS
 * Contact Us Page Controller
 */

import { Navbar } from './navbar.js';
import { ScrollAnimations } from './scrollAnimations.js';

class ContactPage {
  constructor() {
    this.navbar = null;
    this.scrollAnimations = null;
    this.init();
  }

  init() {
    // 1. Initialize Replicated Luxury Navbar
    this.navbar = new Navbar();

    // 2. Initialize Bidirectional Scroll Animations
    this.scrollAnimations = new ScrollAnimations();

    // 3. Shape / Cut Pill Toggle Interaction
    this.bindShapePills();

    // 4. Certification Preference Selection
    this.bindCertOptions();

    // 5. Wholesale & Bespoke Inquiry Form
    this.bindInquiryForm();

    // 6. Interactive FAQ Accordions
    this.bindFaqAccordions();

    // 7. Smooth Scroll for Anchor Links
    this.bindSmoothScroll();

    // 8. Footer Newsletter Handler
    this.bindNewsletter();

    console.log(
      '%c AUM GROUP INC %c Contact & Concierge Loaded ',
      'background: #dfc7a7; color: #12100e; font-weight: bold; padding: 4px 8px; border-radius: 2px;',
      'background: #002821; color: #dfc7a7; padding: 4px 8px;'
    );
  }

  bindShapePills() {
    const pills = document.querySelectorAll('.contact-shape-pill');
    const hiddenInput = document.getElementById('selected-shapes');

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pill.classList.toggle('active');
        pill.setAttribute(
          'aria-pressed',
          pill.classList.contains('active') ? 'true' : 'false'
        );

        if (hiddenInput) {
          const selected = Array.from(
            document.querySelectorAll('.contact-shape-pill.active')
          ).map((p) => p.dataset.shape || p.textContent.trim());
          hiddenInput.value = selected.join(', ');
        }
      });
    });
  }

  bindCertOptions() {
    const certLabels = document.querySelectorAll('.contact-cert-label');
    certLabels.forEach((label) => {
      label.addEventListener('click', () => {
        certLabels.forEach((l) => l.classList.remove('active'));
        label.classList.add('active');
        const radio = label.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });
  }

  bindInquiryForm() {
    const form = document.getElementById('contact-inquiry-form');
    const statusBox = document.getElementById('contact-form-status');
    const submitBtn = document.getElementById('contact-submit-btn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        if (statusBox) {
          statusBox.className = 'contact-form-status error';
          statusBox.innerHTML = 'Please fill in all required fields (Name, Business Email, and Specifications).';
          statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        return;
      }

      // Visual submission loading state
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" style="width:16px;height:16px;margin-right:8px;display:inline-block;animation:spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>Transmitting Inquiry...</span>
      `;

      setTimeout(() => {
        // Success response
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;margin-right:8px;display:inline-block;">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Inquiry Received</span>
        `;
        submitBtn.style.backgroundColor = '#98d8aa';

        if (statusBox) {
          statusBox.className = 'contact-form-status success';
          statusBox.innerHTML = `
            <strong>Thank you, ${name}!</strong> Your diamond inquiry has been securely dispatched to our Mumbai trading desk. A dedicated specialist will review your specifications and contact you at <strong>${email}</strong> within 4 business hours.
          `;
          statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        form.reset();
        document.querySelectorAll('.contact-shape-pill.active').forEach((p) => p.classList.remove('active'));

        setTimeout(() => {
          submitBtn.innerHTML = originalBtnHTML;
          submitBtn.style.backgroundColor = '';
        }, 4000);
      }, 1200);
    });
  }

  bindFaqAccordions() {
    const faqItems = document.querySelectorAll('.contact-faq-item');

    faqItems.forEach((item) => {
      const trigger = item.querySelector('.contact-faq-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Optional: close other FAQ items
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove('active');
            const otherTrigger = other.querySelector('.contact-faq-trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  bindSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const hash = anchor.getAttribute('href');
        if (hash && hash.length > 1) {
          const target = document.querySelector(hash);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  bindNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;

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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ContactPage());
} else {
  new ContactPage();
}

