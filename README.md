# AUM GROUP INC. — Fine Jewellery & Gems

An ultra-luxury, high-performance web experience for **AUM GROUP INC. Fine Jewellery & Gems** (Established 2011, Mumbai). Built with modern vanilla web technologies, modular CSS architecture, Three.js WebGL refractive particle environments, real-time multi-currency conversion, and an editorial high-jewelry visual design system.

---

## 💎 Project Structure

The codebase is organized into a clean, modular, and maintainable architecture designed for zero-build static hosting (Hostinger, Apache, cPanel, Nginx, or AWS S3/CloudFront):

```
/ (Root / public_html / wwwroot)
├── index.html                           # Flagship Homepage (Hero, 3D WebGL, Marquee, Specialties, 5-col Footer)
├── about.html                           # About Us — Heritage, Manufacturing, GIA/IGI, Global Presence & HQ
├── contact.html                         # Contact Concierge — Showroom Locator, Inquiries & Consultation Form
├── shop.html                            # Master Shop Catalogue — All Collections, Filters, Sorting & Cart Drawer
├── shop-diamond.html                    # Curated Natural & Lab-Grown Diamond Jewellery Catalogue
├── shop-gems.html                       # Curated Precious & Semi-Precious Gemstones Catalogue
├── shop-gold.html                       # Curated 18K / 22K Hallmarked Gold Jewellery Catalogue
├── shop-silver.html                     # Curated 925 Sterling Silver Couture Catalogue
├── 404.html                             # Custom Luxury 404 Error Page
├── 500.html                             # Custom Luxury 500 Server Error Page
│
├── style.css                            # Dedicated Homepage Stylesheet (Exclusively for index.html)
├── about.css                            # Dedicated About Us Stylesheet (Exclusively for about.html)
├── contact.css                          # Dedicated Contact Concierge Stylesheet (Exclusively for contact.html)
├── shop.css                             # Unified Shop Stylesheet (Powers all 5 shopping/catalogue pages)
├── animations.css                       # Shared Micro-animations, Keyframes & Scroll-Reveal Utilities
│
├── main.js                              # Application bootstrap, global state, currency sync & quickview
├── navbar.js                            # 2-Tier luxury navbar, currency modal, search & slide-out drawer
├── shop.js                              # Catalog engine: dynamic rendering, filtering, sorting, cart & wishlist
├── shop-data.js                         # Master product catalogue database with luxury specifications
├── about.js                             # Interactive timeline & milestone counters for about.html
├── contact.js                           # Form validation, client concierge handlers & FAQ accordion
├── scene.js                             # Three.js WebGL canvas setup & scene manager
├── gemParticles.js                      # Three.js refractive gemstone dust particle simulation
├── collectionsScene.js                  # Three.js 3D gemstone display showcase
├── gemsMarquee.js                       # Seamless infinite gemstone carousel with touch drag / hover pause
├── textAnimations.js                    # Ambient caustics halo & diamond glint flare spawner
├── scrollAnimations.js                  # IntersectionObserver-driven scroll reveal animations
├── testimonials.js                      # Luxury editorial client review slider
├── helpers.js                           # Mathematics, currency exchange rates & string formatting helpers
│
├── .htaccess                            # Apache/Hostinger configuration (Gzip, Cache-Control, Security Headers)
├── .gitignore                           # Production git exclusions (archives, OS, editor, secrets, temp)
├── robots.txt                           # Search engine crawling directives & sitemap location
├── sitemap.xml                          # Canonical XML sitemap for SEO indexing
├── FONTS_GUIDE.md                       # Comprehensive luxury typography & font-loading reference
├── AUM.tar.gz                           # Production deployment archive (excludes git/temp files)
└── assets/                              # Brand assets, imagery, fonts, and certification badges
    ├── fonts/                           # Cormorant Garamond, Montserrat, Inter, Jost web fonts
    ├── icons/                           # Brand SVG icons, payment badges, GIA (gia.png) & IGI (igi.png)
    ├── images/                          # Ultra-high-resolution gemstone & jewellery photography
    └── textures/                        # WebGL particle textures & noise maps
```

---

## 🎨 Modular CSS Architecture

To ensure optimal page-load speed, high browser cache efficiency, and clean maintainability, styles are strictly decoupled:

| Stylesheet | File Size | Target Page(s) | Scope & Contents |
|---|---|---|---|
| **`style.css`** | ~144 KB | [`index.html`](file:///d:/AUM/index.html) | Exclusively homepage: Hero, Three.js overlays, gems marquee, signature specialties, testimonials slider, 5-column footer. |
| **`about.css`** | ~77 KB | [`about.html`](file:///d:/AUM/about.html) | Exclusively About page: Brand heritage, manufacturing mastery, direct supply advantage, GIA/IGI section, global presence, corporate HQ, 5-column footer. |
| **`contact.css`** | ~59 KB | [`contact.html`](file:///d:/AUM/contact.html) | Exclusively Contact page: Concierge intro, consultation booking, inquiry form, showroom locator, worldwide branches, FAQ accordion, 5-column footer. |
| **`shop.css`** | ~185 KB | All 5 Shop Pages | Unified shopping system: Hero banners, multi-faceted filter sidebar, product grid, hover states, quickview modal, wishlist, cart drawer, 5-column footer. |
| **`animations.css`** | ~9 KB | All Pages | Shared utility keyframes: caustics pulse, gem shimmer, marquee scroll, modal fades, spring scale badges. |

---

## 🏛️ Footer 5-Column Luxury Architecture

Every page features the standardized, responsive 5-column luxury footer grid:

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ COLUMN 1        │ COLUMN 2        │ COLUMN 3        │ COLUMN 4        │ COLUMN 5        │
│ Brand Identity  │ Customer Care   │ Information     │ CERTIFICATIONS  │ Get in Touch    │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ • Gold AUM Logo │ • About Us      │ • Diamond Cuts  │ • GIA Badge     │ • Email Address │
│ • Heritage Bio  │ • Shipping Info │ • GIA & IGI     │   (Official)    │ • Phone Support │
│ • Social Links  │ • Returns       │ • Manufacturing │ • IGI Badge     │ • Mumbai HQ     │
│   (IG, FB, PI,  │ • FAQ           │ • Direct Supply │   (Official)    │   Address       │
│    YT)          │ • Contact Us    │ • Corporate HQ  │                 │                 │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

- **Desktop (>1024px)**: `grid-template-columns: 1.35fr 1fr 1fr 1fr 1fr;`
- **Tablet (768px – 1024px)**: Responsive 3-column auto-wrap layout.
- **Mobile (<768px)**: Single-column centered stack with optimized vertical rhythm.
- **Certifications**: Houses official GIA and IGI laboratory badges without intrusive text overlays.

---

## 🎨 UI/UX Color Design System & Palette Guide (v2.0)

Built on the official luxury jewellery moodboard (**Escéli / Aum Group Inc v2.0**), adhering to the international **60-30-10 Rule** of visual hierarchy:

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ #004438         │ #402020         │ #d6d1c4         │ #8c8c8c         │
│ Imperial        │ Royal           │ Alabaster       │ Silver          │
│ Emerald         │ Burgundy        │ Cream           │ Slate           │
│ (Dominant Base) │ (High-Impact)   │ (Typography/UI) │ (Muted/Borders) │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

### Core Palette Specification

| Color Name | Hex Code | RGB | Semantic UI Role | Visual Psychology |
|---|---|---|---|---|
| **Imperial Emerald** | `#004438` | `rgb(0, 68, 56)` | Primary Brand Anchor / Canvas | Heritage, rare Colombian emeralds, prestige, high trust |
| **Deep Emerald Tone**| `#002821` | `rgb(0, 40, 33)` | Tier-2 Navbars & Mobile Drawer | Intimacy, depth, high-jewelry private salon ambiance |
| **Royal Burgundy**   | `#402020` | `rgb(64, 32, 32)` | Conversion Accent & Badges | Velvet ring boxes, royal distinction, exclusive editions |
| **Alabaster Cream**  | `#d6d1c4` | `rgb(214, 209, 196)`| Editorial Typography & Headings | Silk packaging, diamond radiance, pristine clarity |
| **Silver Slate**     | `#8c8c8c` | `rgb(140, 140, 140)`| Secondary Metadata & Dividers | Platinum / white gold setting neutrality |
| **Warm Champagne**   | `#dfc59e` | `rgb(223, 197, 158)`| Star Shimmers & Gold Accents | Warm candlelight, yellow gold polish, refined luxury |

### The 60-30-10 Golden Rule

1. **60% Dominant Base (`#004438` / `#002821`)**: Viewport backgrounds, luxury navigation bars, slide-out drawer menus, and hero backgrounds.
2. **30% Structural Hierarchy (`#d6d1c4` / `#8c8c8c`)**: Editorial headings (`Cormorant Garamond`), centered menu links, product titles, and delicate 1px dividers.
3. **10% High-Impact Accent (`#402020` Burgundy)**: Shopping cart badges, wishlist heart highlights, "Best Seller" ribbon tags, and primary CTAs.

### Accessibility & Contrast Compliance (WCAG 2.1)

| Foreground Text | Background Surface | Contrast Ratio | WCAG Compliance | Status |
|---|---|---|---|---|
| `#d6d1c4` (Alabaster) | `#004438` (Emerald Primary) | **7.8:1** | **AAA** (All Text) | Pass |
| `#d6d1c4` (Alabaster) | `#002821` (Emerald Deep)    | **10.2:1** | **AAA** (Enhanced) | Pass |
| `#d6d1c4` (Alabaster) | `#402020` (Royal Burgundy)  | **8.4:1** | **AAA** (Buttons)  | Pass |
| `#ffffff` (Pure White) | `#402020` (Royal Burgundy)  | **11.1:1**| **AAA** (Hover)    | Pass |
| `#8c8c8c` (Silver Slate)| `#002821` (Emerald Deep)  | **4.6:1** | **AA** (Metadata)  | Pass |

---

## 🌍 Multi-Currency Conversion Engine

Integrated real-time currency switcher supporting 11 global trading currencies:
- **USD ($)** — United States Dollar (Base)
- **EUR (€)** — Euro
- **GBP (£)** — British Pound Sterling
- **AED (AED)** — UAE Dirham
- **INR (₹)** — Indian Rupee
- **JPY (¥)** — Japanese Yen
- **CAD (CA$)** — Canadian Dollar
- **AUD (AU$)** — Australian Dollar
- **SGD (SG$)** — Singapore Dollar
- **HKD (HK$)** — Hong Kong Dollar
- **CHF (CHF)** — Swiss Franc

All product prices, cart totals, quickview previews, and checkout estimates update instantly without page reloads via `localStorage` synchronization.

---

## ✨ Interactive Features & Micro-Interactions

1. **Three.js Gem Dust Particles**:
   - Refractive, floating diamond dust with champagne, diamond-white, and sapphire-blue glints.
   - Mouse-parallax tilt dynamics with fallback handling for low-power devices.
2. **Infinite Gemstones Marquee**:
   - Continuous 36-second seamless hardware-accelerated carousel.
   - Auto-pause on hover/focus, with mobile touch swipe and drag support.
3. **Product Catalog & Quickview**:
   - Dynamic multi-criteria filter (Category, Metal, Gemstone, Price).
   - Fast modal quickview with image zoom, carat/metal selector, and direct Add-to-Bag flow.
4. **Slide-Out Luxury Navigation Drawer**:
   - Smooth transform slide-in on mobile with backdrop blur.
   - Guarded by `@media (min-width: 1025px) { display: none !important; }` to eliminate desktop overlap.

---

## 🚀 Local Development & Preview

Run locally using Python:
```bash
python -m http.server 5500
```
Then open: [http://localhost:5500/](http://localhost:5500/)

Run locally using Node.js:
```bash
npx serve .
```

---

## 📦 Production Deployment (Hostinger / cPanel)

1. Use the pre-built archive [`AUM.tar.gz`](file:///d:/AUM/AUM.tar.gz).
2. Upload `AUM.tar.gz` to your server's root web directory (e.g. `public_html/`).
3. Extract via cPanel File Manager or SSH:
   ```bash
   tar -xzf AUM.tar.gz
   ```
4. Verify `.htaccess` is present to ensure Gzip compression and security headers are active.
5. In your browser, perform a hard refresh (`Ctrl + Shift + R` or `Cmd + Shift + R`) to load the `v=5.0` assets.

---

## 📄 License & Attribution

© 2011–2026 **AUM GROUP INC.** All Rights Reserved.  
Proprietary luxury web application developed for AUM GROUP INC. Fine Jewellery & Gems, Mumbai, Maharashtra, India.
