/**
 * AURÉLIA FINE JEWELLERY & GEMS
 * Three.js WebGL Scene Architecture (Constrained to Hero Text Area)
 */

import { isWebGLAvailable } from './helpers.js';

export class WebGLSceneManager {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.isSupported = isWebGLAvailable();
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animationFrameId = null;
    this.updatables = [];
    this.clock = null;

    if (this.isSupported && typeof THREE !== 'undefined') {
      this.init();
    } else {
      console.warn('WebGL is not supported or THREE.js is not loaded.');
      if (this.canvas) this.canvas.style.display = 'none';
    }
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    // 2. Camera & Dimensions (Constrained strictly to text area)
    const width = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : (this.canvas.clientWidth || 600);
    const height = this.canvas.parentElement ? this.canvas.parentElement.clientHeight : (this.canvas.clientHeight || 450);
    const aspect = width / Math.max(height, 1);
    this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    this.camera.position.z = 16;

    // 3. WebGL Renderer with alpha transparency
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // 4. Subtle ambient lighting for particles
    const ambientLight = new THREE.AmbientLight(0xfff7ea, 1.2);
    this.scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xdfc7a7, 2, 35);
    goldPointLight.position.set(0, 0, 10);
    this.scene.add(goldPointLight);

    // 5. Events & Responsive Observers
    window.addEventListener('resize', this.onResize.bind(this));
    if (typeof ResizeObserver !== 'undefined' && this.canvas.parentElement) {
      this.resizeObserver = new ResizeObserver(() => this.onResize());
      this.resizeObserver.observe(this.canvas.parentElement);
    }

    // 6. Pause rendering when the hero canvas is scrolled out of viewport
    if ('IntersectionObserver' in window && this.canvas) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) this.resume();
          else this.pause();
        });
      }, { threshold: 0.05 });
      const heroSection = this.canvas.closest('.hero-wrapper') || this.canvas;
      heroObserver.observe(heroSection);
    }

    // 7. Start Loop
    this.start();
  }

  addUpdatable(object) {
    if (object && typeof object.update === 'function') {
      this.updatables.push(object);
    }
  }

  onResize() {
    if (!this.camera || !this.renderer || !this.canvas) return;
    const width = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : (this.canvas.clientWidth || 600);
    const height = this.canvas.parentElement ? this.canvas.parentElement.clientHeight : (this.canvas.clientHeight || 450);
    this.camera.aspect = width / Math.max(height, 1);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  }

  start() {
    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);
      const delta = this.clock ? this.clock.getDelta() : 0.016;
      const elapsedTime = this.clock ? this.clock.getElapsedTime() : 0;

      // Update all subscribed components
      for (const obj of this.updatables) {
        obj.update(delta, elapsedTime);
      }

      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    };
    animate();
  }

  pause() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resume() {
    if (this.animationFrameId || !this.renderer) return;
    if (this.clock) this.clock.getDelta(); // discard time spent paused
    this.start();
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onResize.bind(this));
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
