/**
 * AUM GROUP INC FINE JEWELLERY & GEMS
 * Main Application Orchestrator
 */

import { Navbar } from './navbar.js';
import { WebGLSceneManager } from './scene.js';
import { GemParticles } from './gemParticles.js';
import { CollectionsScene } from './collectionsScene.js';
import { TextLoopAnimations } from './textAnimations.js';
import { ScrollAnimations } from './scrollAnimations.js';
import { GemsMarquee } from './gemsMarquee.js';
import { Testimonials } from './testimonials.js';

class App {
  constructor() {
    this.navbar = null;
    this.sceneManager = null;
    this.gemParticles = null;
    this.collectionsScene = null;
    this.scrollAnimations = null;
    this.textAnimations = null;
    this.gemsMarquee = null;
    this.testimonials = null;
  }

  init() {
    // 1. Initialize Navbar & UI Components
    this.navbar = new Navbar();

    // 2. Initialize Collections Showcase Three.js Visual Ambience
    try {
      this.collectionsScene = new CollectionsScene('collections-webgl-canvas');
    } catch (err) {
      console.warn('CollectionsScene initialization skipped:', err);
    }

    // 3. Initialize Phase 4 Client Testimonials & Footer Interactions
    this.testimonials = new Testimonials();

    // 4. Initialize Three.js WebGL Environment
    const canvas = document.getElementById('webgl-canvas');
    if (canvas && typeof THREE !== 'undefined') {
      try {
        this.sceneManager = new WebGLSceneManager(canvas);
        if (this.sceneManager.scene && this.sceneManager.camera) {
          this.gemParticles = new GemParticles(
            this.sceneManager.scene,
            this.sceneManager.camera
          );
          this.sceneManager.addUpdatable(this.gemParticles);
        }
      } catch (err) {
        console.error('Three.js initialization failed:', err);
      }
    }

    // 5. Initialize Scroll-Triggered Reveal Animations on elements & text
    this.scrollAnimations = new ScrollAnimations();

    // 6. Initialize Text Background Loop Animations & Interactivity
    this.textAnimations = new TextLoopAnimations();

    // 7. Initialize Full-Width Cinematic Video Showcase Section
    this.initCinematicVideo();

    console.log('%c AUM GROUP INC %c Fine Jewellery & Gems Experience Loaded ', 
      'background: #dfc7a7; color: #12100e; font-weight: bold; padding: 4px 8px; border-radius: 2px;',
      'background: #141210; color: #dfc7a7; padding: 4px 8px;');
  }

  /**
   * Initializes the 100% full-width Atelier Video Showcase:
   * - Ensures autoplay and loop with video muted by default (no native controls).
   * - Provides discreet luxury sound toggle.
   * - Pauses when off-screen to preserve memory and high frame rates.
   */
  initCinematicVideo() {
    const video = document.getElementById('atelier-video');
    const soundToggle = document.getElementById('video-sound-toggle');
    const soundLabel = document.getElementById('sound-label-text');

    if (!video) return;

    // Enforce 100% muted playback initially
    video.muted = true;
    video.defaultMuted = true;

    // Smooth autoplay with safety fallback
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }

    // Discreet sound toggle
    if (soundToggle) {
      soundToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        if (video.muted) {
          soundToggle.classList.remove('is-unmuted');
          if (soundLabel) soundLabel.textContent = 'Unmute';
        } else {
          soundToggle.classList.add('is-unmuted');
          if (soundLabel) soundLabel.textContent = 'Mute';
        }
      });
    }

    // Performance: Pause video when scrolled out of view
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.15 });

      observer.observe(video);
    }
  }
}

// Boot application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
  });
} else {
  const app = new App();
  app.init();
}
