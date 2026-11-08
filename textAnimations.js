/**
 * AURÉLIA FINE JEWELLERY & GEMS
 * Text Background & Interactive Loop Animations
 */

import { lerp } from './helpers.js';

export class TextLoopAnimations {
  constructor() {
    this.textBlock = document.querySelector('.hero-text-block');
    this.ambientHalo = document.querySelector('.text-ambient-halo');
    this.mouse = { currentX: 0, currentY: 0, targetX: 0, targetY: 0 };
    this.sparkleInterval = null;

    this.init();
  }

  init() {
    if (!this.textBlock) return;

    this.bindEvents();
    this.startParallaxLoop();
    this.startDynamicGlintSpawner();
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      const rect = this.textBlock.getBoundingClientRect();
      // Mouse offset relative to center of screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      this.mouse.targetX = (e.clientX - centerX) / centerX;
      this.mouse.targetY = (e.clientY - centerY) / centerY;

      // Update ambient halo position to follow cursor with organic lag
      if (this.ambientHalo) {
        const haloX = (e.clientX - rect.left) * 0.15;
        const haloY = (e.clientY - rect.top) * 0.15;
        this.ambientHalo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`;
      }
    });

    // Reset smoothly when leaving window
    document.addEventListener('mouseleave', () => {
      this.mouse.targetX = 0;
      this.mouse.targetY = 0;
    });
  }

  startParallaxLoop() {
    const update = () => {
      this.mouse.currentX = lerp(this.mouse.currentX, this.mouse.targetX, 0.04);
      this.mouse.currentY = lerp(this.mouse.currentY, this.mouse.targetY, 0.04);

      if (this.textBlock) {
        // Very subtle luxury tilt (max 4px translation, 1deg rotation)
        const tiltX = this.mouse.currentX * 6;
        const tiltY = this.mouse.currentY * 4;
        const rotY = this.mouse.currentX * 1.5;
        const rotX = -this.mouse.currentY * 1.2;

        this.textBlock.style.transform = `perspective(1000px) translate3d(${tiltX}px, ${tiltY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      requestAnimationFrame(update);
    };
    update();
  }

  startDynamicGlintSpawner() {
    // Dynamically spawns subtle microscopic diamond glints in the text backdrop
    const haloContainer = document.querySelector('.text-ambient-halo');
    if (!haloContainer) return;

    this.sparkleInterval = setInterval(() => {
      if (document.hidden) return;

      const glint = document.createElement('div');
      glint.className = 'dynamic-sparkle';

      // Random position around text
      const randomX = 10 + Math.random() * 80;
      const randomY = 15 + Math.random() * 70;
      const size = 6 + Math.random() * 10;

      glint.style.cssText = `
        position: absolute;
        top: ${randomY}%;
        left: ${randomX}%;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
        opacity: 0;
        z-index: 2;
        transform: scale(0) rotate(0deg);
        transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      `;

      // Inner sparkle cross
      glint.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" style="width: 100%; height: 100%;">
          <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" fill="rgba(255, 255, 255, 0.95)" />
        </svg>
      `;

      haloContainer.appendChild(glint);

      // Animate in and out
      requestAnimationFrame(() => {
        glint.style.opacity = '1';
        glint.style.transform = 'scale(1) rotate(45deg)';
      });

      setTimeout(() => {
        glint.style.opacity = '0';
        glint.style.transform = 'scale(0.2) rotate(90deg)';
        setTimeout(() => {
          if (glint.parentNode) glint.parentNode.removeChild(glint);
        }, 800);
      }, 1200 + Math.random() * 1000);

    }, 2800);
  }
}
