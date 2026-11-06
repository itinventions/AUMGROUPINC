# AUM GROUP INC — Fine Jewellery & Gems

An ultra-luxury, pixel-perfect website for **AUM GROUP INC Fine Jewellery & Gems**. Built with modern web standards, modular architecture, Three.js WebGL particle effects, and continuous text background loop animations.

---

## 💎 Project Structure

The project strictly follows a clean, modular folder pattern:

```
/ (Root / public_html / wwwroot)
├── index.html                           # Main entry homepage (AUM GROUP INC Fine Jewellery)
├── about.html                           # About Us page (Aum Group Inc.)
├── 404.html                             # Custom luxury 404 Error page
├── 500.html                             # Custom luxury 500 Server Error page
├── style.css                            # Luxury brand styling & layout
├── animations.css                       # Micro-animations & keyframes
├── main.js                              # Main application entry point
├── navbar.js                            # Navigation bar logic
├── scene.js                             # Three.js WebGL scene
├── gemParticles.js                      # Three.js diamond particle system
├── gemsMarquee.js                       # Infinite marquee carousel
├── textAnimations.js                    # Ambient background & sparkles
├── scrollAnimations.js                  # Scroll reveal animations
├── testimonials.js                      # Testimonials slider
├── helpers.js                           # Math & utility helpers
├── about.js                             # About page interactions
├── .htaccess                            # Apache server optimization & security
├── robots.txt                           # Search engine crawling directives
├── sitemap.xml                          # SEO sitemap
└── assets/                              # Fonts, icons, images, models, textures
```

---

## ✨ Features & Technical Details

1. **Pixel-Perfect Visual Replication**:
   - **Typography**: Editorial serif heading (`Cormorant Garamond`) with Roman `"Timeless Gems."` and italicized serif `"Elegance."`, paired with clean tracking on subheadings and nav links (`Montserrat` and `Inter`).
   - **Color Palette**: Curated luxury tones including champagne gold (`#dfc59e`), warm ivory (`#fcfbfa`), muted stone (`#cfc7be`), and deep obsidian black (`#090807`).
   - **Navigation Bar**: Clean brand logo, centered navigation links with the golden active indicator line under `"Home"`, and right-aligned luxury action icons including the shopping bag with the golden circular `"0"` notification badge.
   - **Call-to-Action**: Rectangular `"EXPLORE COLLECTION  →"` button in warm champagne gold with hover gloss sheen and arrow micro-animation.

2. **Three.js & WebGL Interactive Environment**:
   - Floating diamond & gemstone dust particles with varying refractive hues (champagne, pure diamond white, sapphire blue).
   - Harmonic floating drift combined with smooth mouse-parallax depth tracking.
   - Automatic fallback if WebGL is unavailable on older hardware.

3. **Loop Animations in Text Background**:
   - **Ambient Caustics Halo**: Radial gradient breathing softly behind the headline, echoing warm candlelight and royal sapphire gemstone undertones.
   - **Gem Glints & Twinkles**: Four-point diamond star flares that shimmer in an infinite organic loop around the typography.
   - **Dynamic Sparkle Spawner**: Subtle microscopic light bursts generated dynamically behind the text.

4. **Phase 2: Gems Collection Infinite Carousel**:
   - **Background**: High-resolution `02_Hompage_Background_Image.png` with cinematic golden light and obsidian bokeh.
   - **Header**: Editorial `"Find Your Perfect Gem"` paired with `"Explore Our Collection"` and `"View All →"` hover micro-interaction.
   - **Continuous Seamless Marquee**: Cards scroll automatically in a smooth, hardware-accelerated 36-second loop. As cards exit on the left edge, they seamlessly enter from the right without stutter or jumps.
   - **Interactive Pause & Drag**: Marquee automatically pauses when hovered or focused, and supports touch swipe and mouse drag.
   - **Cards**: Obsidian glassmorphism cards with fine borders, image zoom, title color change, and gold glow elevation on hover.

---

## 🚀 Running the Project

To preview locally using Python:
```bash
python -m http.server 5500
```
Then navigate to: `http://localhost:5500/`

To preview using Node.js:
```bash
npx serve .
```

---

## 🎨 Logo Replacement

When you have your official logo asset ready:
1. Place your logo file in `assets/icons/logo.svg` or `assets/images/logo.png`.
2. Update the `.brand-logo-container` in [index.html](file:///c:/AUMGROUPINC-PROJECT/index.html) with your image or SVG tag.
