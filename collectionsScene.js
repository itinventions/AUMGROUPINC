/**
 * AUM GROUP INC — Fine Jewellery & Gems
 * Three.js Soft Luxury Ambient Atmosphere for Collections Showcase
 *
 * Designed to be soft, subtle, and non-distracting:
 * - A gentle, calming field of ~36 soft-feathered champagne & emerald light motes.
 * - Gentle harmonic drift reminiscent of candlelight caustics on fine jewellery.
 * - Very subtle cursor parallax with heavy dampening.
 * - Automatically pauses when out of view (0% CPU/GPU overhead).
 */

import { isWebGLAvailable } from './helpers.js';

export class CollectionsScene {
  constructor(canvasId = 'collections-webgl-canvas') {
    this.canvas = document.getElementById(canvasId);
    this.section = document.getElementById('our-gems');
    if (!this.canvas || !isWebGLAvailable() || typeof THREE === 'undefined') {
      return;
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animationFrameId = null;
    this.isVisible = false;
    this.clock = null;

    // Soft particle dust system
    this.particleSystem = null;
    this.particlePositions = null;
    this.initialParticlePositions = [];
    this.particlePhases = [];
    this.particleSpeeds = [];
    this.particleCount = 36; // Soft and non-distracting stationary ambient motes

    this.init();
  }

  init() {
    this.clock = new THREE.Clock();

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || 700;
    this.camera = new THREE.PerspectiveCamera(45, width / Math.max(height, 1), 0.1, 100);
    this.camera.position.z = 24;

    // 3. Renderer with alpha transparency
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));

    // 4. Create Soft Ambient Light Motes
    this.createSoftAmbientMotes();

    // 5. Bind Events & Visibility Observer
    this.bindEvents();
    this.setupObserver();
  }

  createSoftFeatheredTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // Ultra-soft, feathered radial glow with gentle falloff
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 250, 240, 0.95)');
    grad.addColorStop(0.25, 'rgba(223, 199, 167, 0.55)');
    grad.addColorStop(0.6, 'rgba(0, 160, 120, 0.18)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }

  createSoftAmbientMotes() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);

    const cWarmGold = new THREE.Color(0xdfc7a7);
    const cSoftEmerald = new THREE.Color(0x32a884);
    const cIvory = new THREE.Color(0xf6f0e6);

    for (let i = 0; i < this.particleCount; i++) {
      // Dispersed evenly across the background width and height
      const x = (Math.random() - 0.5) * 36;
      const y = (Math.random() - 0.5) * 18;
      const z = -4 - Math.random() * 8; // Sits comfortably deep behind the cards

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      this.initialParticlePositions.push({ x, y, z });
      this.particlePhases.push(Math.random() * Math.PI * 2);
      this.particleSpeeds.push(0.18 + Math.random() * 0.22); // Slow, soothing pace

      // Color selection: soft gold, ivory, or subtle emerald
      let col = cWarmGold;
      const rand = Math.random();
      if (rand < 0.45) col = cWarmGold;
      else if (rand < 0.8) col = cIvory;
      else col = cSoftEmerald;

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.95,
      map: this.createSoftFeatheredTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.35, // Soft, gentle transparency
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particlePositions = positions;
    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  bindEvents() {
    // Window resize
    window.addEventListener('resize', () => {
      if (!this.canvas || !this.renderer || !this.camera) return;
      const width = this.canvas.clientWidth || window.innerWidth;
      const height = this.canvas.clientHeight || 700;
      this.camera.aspect = width / Math.max(height, 1);
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  setupObserver() {
    if (!this.section || !('IntersectionObserver' in window)) {
      this.start();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.start();
        } else {
          this.stop();
        }
      });
    }, { threshold: 0.05 });

    observer.observe(this.section);
  }

  start() {
    if (this.isVisible) return;
    this.isVisible = true;
    this.animate();
  }

  stop() {
    this.isVisible = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  animate() {
    if (!this.isVisible) return;
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const elapsed = this.clock.getElapsedTime();

    // Stationary particle system - zero mouse or cursor movement
    if (this.particleSystem) {
      this.particleSystem.position.set(0, 0, 0);
    }

    // Animate Soft Ambient Motes: slow, peaceful vertical wave (stationary backdrop)
    if (this.particleSystem && this.particlePositions) {
      for (let i = 0; i < this.particleCount; i++) {
        const init = this.initialParticlePositions[i];
        const phase = this.particlePhases[i];
        const speed = this.particleSpeeds[i];

        // Soft harmonic sine drift
        const py = init.y + Math.sin(elapsed * speed + phase) * 0.45;
        const px = init.x + Math.cos(elapsed * (speed * 0.7) + phase) * 0.25;

        this.particlePositions[i * 3] = px;
        this.particlePositions[i * 3 + 1] = py;
      }
      this.particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
