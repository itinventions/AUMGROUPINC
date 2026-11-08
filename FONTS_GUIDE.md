# 💎 Typography & Font Families Architecture Guide
> **AUM GROUP INC / GEMORÉ — Fine Jewellery & Gems**  
> Complete implementation, import architecture, and design usage guide for the 4 custom luxury fonts.

---

## 📌 Executive Font Inventory

| # | Font Family Name | Creator / Avatar / Studio | File in `assets/fonts/` | Recommended Web Role |
|---|---|---|---|---|
| **1** | **Brannboll Connect PERSONAL USE** | *Måns Grebäck (Avatar: mawns mawns)* | `BrannbollConnect_PERSONAL_USE.ttf` | Linked Script Sport / Craft Monograms, Bespoke Jewellery Badges, Swash Accents |
| **2** | **Derathea** | *Hyperactype (Avatar: hyperactype)* | `Derathea.ttf` | High-End Signature Flourishes, Luxury Hero Subtitles, Boutique Taglines |
| **3** | **Senjalara Demo** | *CalligraphyFonts.net* | `Senjalara.ttf` & `SenjalaraDemoRegular.ttf` | Delicate Modern Calligraphy, Elegant "Welcome" Greetings, Certificates |
| **4** | **Romantyc Harmony** | *Ardian Nuvianto (Avatar: Damarletter Studio)* | `Romantyc_Harmony.ttf` | Romantic Copperplate Cursive, Gemstone Highlights, Premium Editorial Quotes |

---

## 🎯 Where to Use Each Font Family (`Konsi Font Family Kaha Use Karni He`)

### 1. `Brannboll Connect PERSONAL USE`
* **Style:** Linked baseball-style script with connected ligatures and automatic swashes (via numbers 0–9).
* **Where to Use:**
  - **Shipping & Guarantee Badges:** Ideal for badges such as `"Free Worldwide Shipping"`, `"Handcrafted Since 1998"`, or promotional seals.
  - **Craftsmanship & Workshop Highlights:** Perfect for jewellery craftsmanship callouts where letters visually lock together like interlocking metal chains.
  - **Bespoke Monograms:** Custom initials or engraved signature flourishes on product customization modals.
* **CSS Class:** `.font-brannboll`
* **CSS Variable:** `var(--font-brannboll)`

---

### 2. `Derathea`
* **Style:** Modern luxury signature script with smooth, flowing, organic hand-drawn strokes.
* **Where to Use:**
  - **Brand Tagline Accents:** Underneath the main hero heading (e.g., *"Crafted with pure devotion"*).
  - **Section Eyebrow Accents:** Small, chic signature words floating near section headings like *"Bespoke Gems"* or *"The Master Artisan"*.
  - **Customer Testimonials / Signatures:** Client author signatures in the review carousel (`"— Sophia Laurent"`).
* **CSS Class:** `.font-derathea`
* **CSS Variable:** `var(--font-derathea)`

---

### 3. `Senjalara Demo`
* **Style:** Sophisticated calligraphy script with dramatic ascending and descending flourishes and airy luxury posture.
* **Where to Use:**
  - **Website Welcome Greeting:** The graceful cursive `— Welcome —` display during the luxury entry loader experience.
  - **Authenticity Certificates:** Used for certification headings (e.g., *"IGI & GIA Certified Authenticity"*).
  - **VIP Concierge / Special Invitation:** Header invitation text for exclusive private gem viewings.
* **CSS Class:** `.font-senjalara`
* **CSS Variable:** `var(--font-senjalara)`

---

### 4. `Romantyc Harmony`
* **Style:** Timeless copperplate calligraphy script with delicate hair-lines, romantic swashes, and royal elegance.
* **Where to Use:**
  - **Rare Gemstone Collection Callouts:** Highlighting rare stones (e.g., *"Padparadscha Sapphire"*, *"Pigeon Blood Ruby"*, *"Canary Yellow Diamond"*).
  - **Love & Bridal Collection Badges:** Engagement rings, bridal heirloom stories, and anniversary collections.
  - **Editorial Dropquotes & Heritage Statements:** Large italicized opening quotes in the "About Us" heritage timeline.
* **CSS Class:** `.font-romantyc`
* **CSS Variable:** `var(--font-romantyc)`

---

### 5. Primary UI & Navigation Fonts (Readability Core)
To ensure the navigation links, currency selector, and body copy remain razor-sharp and effortlessly readable across all screens:
* **`Cormorant Garamond`**: Classical serif for primary headings, brand titles, and luxury editorial titles.
* **`Montserrat` & `Inter`**: Clean geometric sans-serif for the two-tier navbar links (`HOME`, `SHOPPING`, `ABOUT US`, `CONTACT US`, `BEST SELLERS`), utility labels, and currency dropdowns.

---

## 💻 CSS `@font-face` Import & Usage Implementation

These definitions are imported directly in `style.css`:

```css
/* ==========================================================================
   CUSTOM LUXURY FONT FAMILY IMPORTS (@font-face)
   ========================================================================== */

/* 1. Brannboll Connect PERSONAL USE (by mawns mawns) */
@font-face {
  font-family: 'Brannboll Connect';
  src: url('assets/fonts/BrannbollConnect_PERSONAL_USE.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* 2. Derathea (by hyperactype hyperactype) */
@font-face {
  font-family: 'Derathea';
  src: url('assets/fonts/Derathea.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* 3. Senjalara Demo (by CalligraphyFonts.net) */
@font-face {
  font-family: 'Senjalara Demo';
  src: url('assets/fonts/Senjalara.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* 4. Romantyc Harmony (by Damarletter Studio) */
@font-face {
  font-family: 'Romantyc Harmony';
  src: url('assets/fonts/Romantyc_Harmony.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* CSS Custom Properties / Variables */
:root {
  --font-brannboll: 'Brannboll Connect', cursive, sans-serif;
  --font-derathea: 'Derathea', cursive, sans-serif;
  --font-senjalara: 'Senjalara Demo', cursive, serif;
  --font-romantyc: 'Romantyc Harmony', cursive, serif;
}

/* Utility Classes */
.font-brannboll { font-family: var(--font-brannboll); }
.font-derathea { font-family: var(--font-derathea); }
.font-senjalara { font-family: var(--font-senjalara); }
.font-romantyc { font-family: var(--font-romantyc); }
```

---

## 🎨 Quick HTML Code Examples

```html
<!-- Example 1: Derathea for luxury signature tagline -->
<span class="font-derathea text-gold-champagne text-2xl">Bespoke Elegance</span>

<!-- Example 2: Romantyc Harmony for romantic gemstone title -->
<h3 class="font-romantyc text-3xl text-gold-hover">Royal Ceylon Sapphire</h3>

<!-- Example 3: Senjalara Demo for welcome greeting -->
<div class="font-senjalara text-4xl text-gold-champagne">— Welcome to Aurelia —</div>

<!-- Example 4: Brannboll Connect for craft guarantee seal -->
<span class="font-brannboll text-xl text-white">Handcrafted Fine Gems</span>
```

