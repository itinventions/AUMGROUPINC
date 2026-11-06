/**
 * AUM GROUP INC FINE JEWELLERY & GEMS
 * Main Application Orchestrator
 */

import { Navbar } from './navbar.js';
import { WebGLSceneManager } from './scene.js';
import { GemParticles } from './gemParticles.js';
import { TextLoopAnimations } from './textAnimations.js';
import { ScrollAnimations } from './scrollAnimations.js';
import { GemsMarquee } from './gemsMarquee.js';
import { Testimonials } from './testimonials.js';

class App {
  constructor() {
    this.navbar = null;
    this.sceneManager = null;
    this.gemParticles = null;
    this.scrollAnimations = null;
    this.textAnimations = null;
    this.gemsMarquee = null;
    this.testimonials = null;
  }

  init() {
    // 1. Initialize Navbar & UI Components
    this.navbar = new Navbar();

    // 2. Initialize Phase 2 Gems Marquee (Seamless Infinite Loop)
    this.gemsMarquee = new GemsMarquee();

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

    console.log('%c AUM GROUP INC %c Fine Jewellery & Gems Experience Loaded ', 
      'background: #dfc7a7; color: #12100e; font-weight: bold; padding: 4px 8px; border-radius: 2px;',
      'background: #141210; color: #dfc7a7; padding: 4px 8px;');
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
