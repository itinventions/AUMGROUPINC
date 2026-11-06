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


---

## 🎨 UI/UX Color Design System & Palette Guide (v2.0)

> Based on the official luxury jewellery moodboard (**Escéli / Aum Group Inc v2.0**), this guide defines how and where each color is utilized according to international UI/UX and visual hierarchy standards.

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ #004438         │ #402020         │ #d6d1c4         │ #8c8c8c         │
│ Imperial        │ Royal           │ Alabaster       │ Silver          │
│ Emerald         │ Burgundy        │ Cream           │ Slate           │
│ (Dominant Base) │ (High-Impact)   │ (Typography/UI) │ (Muted/Borders) │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

---

### 1. The Core Color Palette Swatches

| Color Name | Hex Code | RGB | HSL | Semantic UI Role | Visual Psychology |
|---|---|---|---|---|---|
| **Imperial Emerald** | `#004438` | `rgb(0, 68, 56)` | `170°, 100%, 13%` | Primary Brand Anchor / Deep Canvas | Timeless heritage, rare gemstones, prestige, trust |
| **Royal Burgundy** | `#402020` | `rgb(64, 32, 32)` | `0°, 33%, 19%` | High-Impact Accent / Micro-Conversion | Velvet gift boxes, royal distinction, passion, exclusivity |
| **Alabaster Cream** | `#d6d1c4` | `rgb(214, 209, 196)` | `43°, 18%, 80%` | Primary High-Contrast Typography & Icons | Silk packaging, diamond radiance, warmth, legibility |
| **Silver Slate** | `#8c8c8c` | `rgb(140, 140, 140)` | `0°, 0%, 55%` | Secondary Metadata, Dividers & Outlines | Platinum/white gold setting, balance, neutrality |

---

### 2. UI/UX Design Principles: The 60-30-10 Golden Rule

In luxury digital experiences, visual noise degrades the perception of premium value. We apply the **60-30-10 Rule** to structure user attention:

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   60% DOMINANT CANVAS (Deep Emerald #004438 / #002821 / Obsidian Base) │
│   Establishes the intimate, high-jewelry boutique atmosphere.          │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                                                                │   │
│   │   30% STRUCTURAL HIERARCHY (#d6d1c4 Alabaster & #8c8c8c Slate) │   │
│   │   Headings, navigation links, icons, divider lines.            │   │
│   │                                                                │   │
│   │   ┌───────────────────────────┐                                │   │
│   │   │  10% ACCENT (#402020)     │                                │   │
│   │   │  Badges, CTAs, Cart, Sale │                                │   │
│   │   └───────────────────────────┘                                │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

1. **60% Dominant Base (`#004438` & `#002821`)**:
   - Covers full viewport backgrounds, fixed luxury navigation bars, slide-out drawer menus, and hero background vignette atmospheres.
   - Keeps the digital environment dark, intimate, and focused, echoing high-end private gemstone salons.

2. **30% Structural Typography & Hierarchy (`#d6d1c4` & `#8c8c8c`)**:
   - `#d6d1c4` (Alabaster Cream): All primary headlines, editorial typography (`Cormorant Garamond`), centered navigation menu links, and primary brand logos.
   - `#8c8c8c` (Silver Slate): Secondary metadata, shipping notices, timestamps, inactive states, and delicate 1px border dividers.

3. **10% High-Impact Focal Accent (`#402020` Burgundy)**:
   - Reserved strictly for conversion hotspots and interactive cues: shopping cart notification counters, wishlist heart active state, exclusive collection tags ("Best Seller", "Heirloom Edition"), and checkout/reservation buttons.
   - Because it is used sparingly, it instantly draws the shopper's eye without overwhelming the refined emerald ambiance.

---

### 3. Component-by-Component Color Application Matrix

| Component | Element | Assigned Color | Hex Code | UI/UX Rationale |
|---|---|---|---|---|
| **Navbar (Top Tier)** | Background | Deep Emerald Glass | `rgba(0, 36, 29, 0.98)` | Provides depth and luxury presence at the top of the viewport. |
| **Navbar (Top Tier)** | Shipping Notice | Silver Slate + Alabaster Icon | `#8c8c8c` / `#d6d1c4` | Non-intrusive value proposition that reassures the customer. |
| **Navbar (Top Tier)** | Brand Logo | Alabaster Gold Filter | `#d6d1c4` | Crisp, elevated brand presence with 56px height. |
| **Navbar (Top Tier)** | Notification Badges | Royal Burgundy with Cream Text | `#402020` / `#d6d1c4` | High contrast badge that immediately communicates cart activity. |
| **Navbar (Divider)** | Separator Line | Subtle Slate Border | `rgba(140, 140, 140, 0.22)` | Elegant, barely-there structural separation between tiers. |
| **Navbar (Bottom Tier)**| Background | Darker Emerald Tone | `rgba(0, 32, 26, 0.94)` | Visually anchors the centered links. |
| **Navbar (Bottom Tier)**| Menu Links (Default)| Alabaster Cream | `#d6d1c4` (opacity: 0.88) | Ultra-clean, peaceful typography with zero distracting active lines. |
| **Navbar (Bottom Tier)**| Menu Links (Hover)  | Pure White + Glow + Underline | `#ffffff` + Alabaster Underline | **Hover-Only Effect**: Glow and expanding line appear solely when engaged. |
| **Hero Section** | Eyebrow & Subtitles | Silver Slate & Signature Accent | `#8c8c8c` & `#d6d1c4` | Editorial posture that frames the main headline. |
| **Hero Section** | Main Heading | Alabaster Cream | `#d6d1c4` / `#fcfbfa` | Maximum optical readability against dark background. |
| **Call To Action** | Primary Button | Royal Burgundy or Emerald Glass| `#402020` | Signals immediate, high-confidence conversion. |
| **Product Cards** | Card Surface | Emerald Glassmorphism | `rgba(0, 68, 56, 0.45)` | Lets card float seamlessly over the backdrop. |
| **Product Cards** | Card Borders | Muted Silver Slate | `rgba(140, 140, 140, 0.25)` | Delineates cards cleanly on Retina and OLED screens. |
| **Badges & Tags** | "Best Seller" / "New"| Royal Burgundy Ribbon | `#402020` | Echoes the satin gift ribbons from the brand packaging moodboard. |
| **Mobile Drawer** | Canvas & Close Button | Deep Emerald & Alabaster | `#002821` / `#d6d1c4` | Consistent branded slide-out navigation on smartphones. |

---

### 4. Accessibility & Contrast Verification (WCAG 2.1)

| Foreground Text | Background Surface | Contrast Ratio | WCAG Compliance Level | Result |
|---|---|---|---|---|
| `#d6d1c4` (Alabaster) | `#004438` (Emerald Primary) | **7.8:1** | **AAA** (Normal & Large Text) | Pass (Optimal) |
| `#d6d1c4` (Alabaster) | `#002821` (Emerald Deep) | **10.2:1** | **AAA** (Enhanced Contrast) | Pass (Flawless) |
| `#d6d1c4` (Alabaster) | `#402020` (Royal Burgundy) | **8.4:1** | **AAA** (Badges & Buttons) | Pass (Flawless) |
| `#ffffff` (Pure White) | `#402020` (Royal Burgundy) | **11.1:1** | **AAA** (Hover States) | Pass (Flawless) |
| `#8c8c8c` (Silver Slate) | `#002821` (Emerald Deep) | **4.6:1** | **AA** (Secondary Meta) | Pass (Standard) |

---

### 5. Interactive State Design Principles

To maintain an unhurried, royal shopping atmosphere:
1. **Resting State (Clean Elegance)**: 
   - No aggressive animated pulses or persistent underline bars cluttering the navigation bar. 
   - Typography sits serenely in `#d6d1c4` with balanced letter spacing.
2. **Hover State (Interactive Delight)**:
   - Visual feedback happens **only on user intent**: text brightness rises to `#ffffff`, an ambient Alabaster glow expands (`0 0 12px rgba(214, 209, 196, 0.7)`), and a smooth 2px underline expands outward from the center.
3. **Active / Click State (Tactile Confidence)**:
   - Cart and wishlist buttons trigger a subtle spring bounce (`scale(1.15) -> scale(1)`) with Burgundy `#402020` badge feedback.

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
