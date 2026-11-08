/**
 * AURÉLIA FINE JEWELLERY & GEMS
 * Footer & Newsletter Controller
 */

export class Testimonials {
  constructor() {
    this.newsletterForm = document.getElementById('newsletter-form');
    this.initNewsletter();
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
