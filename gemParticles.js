/**
 * AURÉLIA FINE JEWELLERY & GEMS
 * Three.js Luxury Diamond & Gemstone Dust Particle System (Hero Text Backdrop)
 */

import { lerp, getNormalizedMousePos } from './helpers.js';

export class GemParticles {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.particleCount = 140;
    this.particles = null;
    this.geometry = null;
    this.material = null;
    this.positions = null;
    this.initialPositions = [];
    this.phases = [];
    this.speeds = [];

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    this.init();
    this.bindEvents();
  }

  createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // Draw diamond sparkle star / soft glowing particle
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.18, 'rgba(245, 230, 205, 0.9)');
    gradient.addColorStop(0.45, 'rgba(223, 199, 167, 0.4)');
    gradient.addColorStop(0.8, 'rgba(100, 160, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  init() {
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);

    // Luxury palette: pure diamond white, warm champagne gold, soft sapphire blue
    const colorWhite = new THREE.Color(0xffffff);
    const colorGold = new THREE.Color(0xdfc7a7);
    const colorSapphire = new THREE.Color(0x9bc2ff);

    for (let i = 0; i < this.particleCount; i++) {
      // Confine particles strictly around hero text bounds
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 6;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      this.initialPositions.push({ x, y, z });
      this.phases.push(Math.random() * Math.PI * 2);
      this.speeds.push(0.3 + Math.random() * 0.7);

      // Color distribution: 55% gold/champagne, 30% diamond white, 15% sapphire ice
      const randColor = Math.random();
      let chosenColor;
      if (randColor < 0.55) {
        chosenColor = colorGold;
      } else if (randColor < 0.85) {
        chosenColor = colorWhite;
      } else {
        chosenColor = colorSapphire;
      }

      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.material = new THREE.PointsMaterial({
      size: 0.55,
      map: this.createGlowTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.particles);
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      const norm = getNormalizedMousePos(e);
      this.mouse.targetX = norm.x * 0.8;
      this.mouse.targetY = norm.y * 0.5;
    }, { passive: true });
  }

  update(delta, time) {
    if (!this.particles || !this.geometry) return;

    // Smooth mouse lerp
    this.mouse.x = lerp(this.mouse.x, this.mouse.targetX, 0.05);
    this.mouse.y = lerp(this.mouse.y, this.mouse.targetY, 0.05);

    const positions = this.geometry.attributes.position.array;

    for (let i = 0; i < this.particleCount; i++) {
      const init = this.initialPositions[i];
      const speed = this.speeds[i];
      const phase = this.phases[i];

      // Harmonic vertical and horizontal floating loop
      const yOffset = Math.sin(time * speed + phase) * 0.85;
      const xOffset = Math.cos(time * (speed * 0.8) + phase) * 0.65;

      // Mouse parallax shift
      positions[i * 3] = init.x + xOffset + this.mouse.x * (0.8 + (init.z + 8) * 0.04);
      positions[i * 3 + 1] = init.y + yOffset + this.mouse.y * (0.8 + (init.z + 8) * 0.04);
      positions[i * 3 + 2] = init.z;
    }

    this.geometry.attributes.position.needsUpdate = true;

    // Gentle global rotation
    this.particles.rotation.y = time * 0.018;
    this.particles.rotation.x = Math.sin(time * 0.015) * 0.03;
  }
}
