/**
 * AUM GROUP INC FINE JEWELLERY & GEMS
 * Main Application Orchestrator
 */

import { Navbar, formatPrice, getActiveCurrency } from './navbar.js';
import { WebGLSceneManager } from './scene.js';
import { GemParticles } from './gemParticles.js';
import { CollectionsScene } from './collectionsScene.js';
import { TextLoopAnimations } from './textAnimations.js';
import { ScrollAnimations } from './scrollAnimations.js';
import { GemsMarquee } from './gemsMarquee.js';
import { Testimonials } from './testimonials.js';

/* Comprehensive Database for 5 Sections of New Arrivals */
const NEW_ARRIVALS_DATA = {
  'na-1': {
    id: 'na-1',
    category: 'gold-studded',
    eyebrow: 'Gold Studded Atelier',
    title: 'The Aethelgard Emerald & Diamond Suite',
    usdPrice: 4850,
    sku: 'AUM-GS-201',
    image: 'assets/images/shop/products/prod-2-a.jpg',
    cert: 'SSEF Gem Report & GIA Authenticated',
    desc: 'An exceptional high-jewellery centerpiece featuring an untreated 2.40-carat natural Colombian emerald of supreme Muzo vivid green saturation, set within a double architectural halo of hand-selected pavé diamonds in solid 18K yellow gold.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 18K Yellow Gold (750 Swiss Hallmarked)' },
      { label: 'Primary Gemstone', val: 'Natural Colombian Emerald (2.40 Carat, Muzo Origin)' },
      { label: 'Gemstone Color & Cut', val: 'Vivid Green / Cushion Modified Brilliant' },
      { label: 'Accent Diamonds', val: '36 Round Brilliant Diamonds (0.65 ct total, F Color, VS1)' },
      { label: 'Certification', val: 'SSEF Swiss Report #2026-9812 & GIA #21948301' },
      { label: 'Total Gross Weight', val: '8.42 grams' },
      { label: 'Setting Craft', val: 'Micro-Pavé & Bezel Atelier Hand Setting' }
    ]
  },
  'na-2': {
    id: 'na-2',
    category: 'gold-studded',
    eyebrow: 'Gold Studded Atelier',
    title: 'Florentine Diamond Cocktail Ring',
    usdPrice: 3900,
    sku: 'AUM-GS-202',
    image: 'assets/images/shop/products/prod-1-a.jpg',
    cert: 'IGI Certified Natural Diamond Suite',
    desc: 'An opulent celebration of gold sculpture and diamond light. Master jewelers in our atelier hand-set 48 marquise and brilliant-cut natural diamonds across an undulating textured gold crown, echoing Renaissance Italian goldsmithing.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 18K Yellow Gold (750 Hallmarked)' },
      { label: 'Diamond Content', val: '48 Marquise & Brilliant Diamonds (1.85 ct total)' },
      { label: 'Diamond Color & Clarity', val: 'Colorless E-F / Clarity VVS2' },
      { label: 'Certification', val: 'IGI Diamond Dossier #5819034' },
      { label: 'Crown Dimensions', val: '18.2 mm length × 12.4 mm width' },
      { label: 'Total Gross Weight', val: '9.15 grams' },
      { label: 'Atelier Finish', val: 'Florentine Satin Engraved & Mirror Polished' }
    ]
  },
  'na-3': {
    id: 'na-3',
    category: 'simple-gold',
    eyebrow: 'Simple Gold Atelier',
    title: 'Sculptural Solitaire Gold Studs',
    usdPrice: 1450,
    sku: 'AUM-SG-301',
    image: 'assets/images/shop/products/prod-16-a.jpg',
    cert: 'AUM Atelier Hallmarked 18K Purity',
    desc: 'Pure, essential luxury designed for everyday discernment. Cast in dense 18K solid yellow gold with an ergonomic, organic spherical contour that catches natural light seamlessly from every angle.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 18K Yellow Gold (750 Swiss Assay Mark)' },
      { label: 'Earring Dimensions', val: '9.5 mm Diameter' },
      { label: 'Fastening Mechanism', val: 'La Poussette Ultra-Secure Locking Backs' },
      { label: 'Surface Finish', val: 'Hand-Polished High Mirror Lustre' },
      { label: 'Total Weight', val: '4.80 grams (Pair)' },
      { label: 'Hypoallergenic Seal', val: '100% Nickel-Free Noble Gold Alloy' }
    ]
  },
  'na-4': {
    id: 'na-4',
    category: 'simple-gold',
    eyebrow: 'Simple Gold Atelier',
    title: 'Florentine Ribbon Gold Cuff',
    usdPrice: 2750,
    sku: 'AUM-SG-302',
    image: 'assets/images/shop/products/prod-12-a.jpg',
    cert: 'Assay Office 18K Certified',
    desc: 'An unbroken ribbon of hand-forged 18K yellow gold shaped to rest gracefully against the wrist. Features cross-hatched Florentine engraved texturing framed by sharp mirror-beveled outer borders.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 18K Yellow Gold (750 Hallmarked)' },
      { label: 'Band Width', val: '6.5 mm Uniform Taper' },
      { label: 'Wrist Circumference', val: 'Medium (Fits 15 cm – 18 cm wrists comfortably)' },
      { label: 'Surface Treatment', val: 'Hand-Crosshatched Italian Florentine' },
      { label: 'Total Weight', val: '16.50 grams Solid Gold' },
      { label: 'Clasp Mechanism', val: 'Spring-Tension Hinged Cuff with Safety Catch' }
    ]
  },
  'na-5': {
    id: 'na-5',
    category: 'diamonds',
    eyebrow: 'Diamond Collection',
    title: 'Classic Solitaire Diamond Pendant',
    usdPrice: 3200,
    sku: 'AUM-DIA-401',
    image: 'assets/images/shop/products/prod-8-a.jpg',
    cert: 'GIA Certified #2238491823',
    desc: 'A magnificent 1.50-carat round brilliant natural diamond possessing perfect D-colorless clarity and triple excellent symmetry, poised in a minimalist four-prong 950 platinum basket upon an 18-inch adjustable wheat chain.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 950 Platinum (Pt950 Hallmarked)' },
      { label: 'Center Diamond Weight', val: '1.50 Carat Natural Earth-Mined Diamond' },
      { label: 'Color Grade', val: 'D (Highest Colorless Benchmark)' },
      { label: 'Clarity Grade', val: 'VVS1 (Exceptional Flawless Purity)' },
      { label: 'Cut / Polish / Symmetry', val: 'Triple Excellent (3X EX)' },
      { label: 'Certification', val: 'Gemological Institute of America (GIA)' },
      { label: 'Chain Length', val: '18 inches adjustable to 16 inches' }
    ]
  },
  'na-6': {
    id: 'na-6',
    category: 'diamonds',
    eyebrow: 'Diamond Collection',
    title: 'Brilliant Solitaire Diamond Ring',
    usdPrice: 5600,
    sku: 'AUM-DIA-402',
    image: 'assets/images/shop/products/prod-5-a.jpg',
    cert: 'GIA Certified #6481920491',
    desc: 'Designed as an eternal heirloom, this classic ring presents a 2.05-carat round brilliant diamond of exceptional sparkle, elevated above a fine shank pavé-set with 14 micro-brilliant diamonds in 18K white gold.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 18K White Gold (Rhodium Plated)' },
      { label: 'Center Diamond Weight', val: '2.05 Carats' },
      { label: 'Color & Clarity', val: 'E Color / VVS2 Clarity' },
      { label: 'Accent Diamonds', val: '14 Round Brilliant Pavé (0.28 ct total)' },
      { label: 'Fluorescence', val: 'None' },
      { label: 'Certification', val: 'GIA Laser Inscribed Report' },
      { label: 'Ring Size', val: 'Bespoke Sizing Compliant (Complimentary)' }
    ]
  },
  'na-7': {
    id: 'na-7',
    category: 'gemstones',
    eyebrow: 'Gemstone Archive',
    title: 'Royal Sapphire Statement Ring',
    usdPrice: 6400,
    sku: 'AUM-GEM-501',
    image: 'assets/images/shop/products/prod-6-a.jpg',
    cert: 'Gübelin Gem Lab Report #230491',
    desc: 'An unheated 3.10-carat royal blue Ceylon sapphire of profound optical depth and electric blue flashes, flanked by two custom-cut tapered baguette diamonds in an architectural 18K white gold mounting.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 18K White Gold (750 Hallmarked)' },
      { label: 'Center Gemstone', val: 'Natural Ceylon Sapphire (3.10 ct, Unheated)' },
      { label: 'Origin', val: 'Ratnapura, Sri Lanka (Ethically Mined)' },
      { label: 'Color Saturation', val: 'Royal Blue (Vivid Saturation)' },
      { label: 'Side Diamonds', val: '2 Tapered Baguettes (0.45 ct total, F / VS1)' },
      { label: 'Certification', val: 'Gübelin Gem Lab (Lucerne, Switzerland)' },
      { label: 'Gross Weight', val: '6.80 grams' }
    ]
  },
  'na-8': {
    id: 'na-8',
    category: 'gemstones',
    eyebrow: 'Gemstone Archive',
    title: 'Burmese Pigeon Blood Ruby Ring',
    usdPrice: 7200,
    sku: 'AUM-GEM-502',
    image: 'assets/images/shop/products/prod-9-a.jpg',
    cert: 'SSEF Gemstone Certificate #119830',
    desc: 'One of nature’s rarest wonders: an authentic untreated Burmese Ruby exhibiting the legendary "Pigeon Blood" crimson red hue with intense natural red fluorescence, crowned by a petal halo of 16 marquise diamonds.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 18K Yellow Gold (750 Hallmarked)' },
      { label: 'Center Gemstone', val: 'Natural Burmese Ruby (2.20 ct, Untreated/No Heat)' },
      { label: 'Origin', val: 'Mogok Valley, Myanmar' },
      { label: 'Color Grade', val: 'Pigeon Blood Red (SSEF Certified)' },
      { label: 'Halo Diamonds', val: '16 Marquise-Cut Diamonds (0.72 ct total, E/VVS)' },
      { label: 'Certification', val: 'SSEF Swiss Gemmological Institute' },
      { label: 'Total Weight', val: '7.10 grams' }
    ]
  },
  'na-9': {
    id: 'na-9',
    category: 'silver',
    eyebrow: 'Silver Atelier',
    title: 'Artisan Sculptural Silver Cuff',
    usdPrice: 540,
    sku: 'AUM-SLV-601',
    image: 'assets/images/shop/products/prod-13-a.jpg',
    cert: '925 Sterling Silver Master Assay',
    desc: 'A tour de force of contemporary silversmithing. Sculpted from 32.4 grams of solid 925 sterling silver, electroplated with an ultra-protective micro-layer of noble rhodium that preserves lifelong brilliance without tarnishing.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 925 Sterling Silver' },
      { label: 'Plating Seal', val: 'Multi-layer Bright Rhodium (Tarnish-Proof)' },
      { label: 'Inner Dimensions', val: '65 mm length × 52 mm width' },
      { label: 'Max Width', val: '22 mm Sculptural Flare' },
      { label: 'Total Weight', val: '32.40 grams Sterling Silver' },
      { label: 'Atelier Signature', val: 'Laser Engraved AUM GROUP INC Hallmark' }
    ]
  },
  'na-10': {
    id: 'na-10',
    category: 'silver',
    eyebrow: 'Silver Atelier',
    title: 'Luminous Moonstone & Silver Pendant',
    usdPrice: 420,
    sku: 'AUM-SLV-602',
    image: 'assets/images/shop/products/prod-10-a.jpg',
    cert: 'Natural Gemstone Atelier Guarantee',
    desc: 'Featuring a 4.80-carat natural blue-sheen rainbow moonstone with celestial adularescence, suspended in a bezel setting of polished 925 sterling silver and accompanied by a heavy 20-inch Venetian box chain.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 925 Sterling Silver' },
      { label: 'Center Gemstone', val: 'Natural Rainbow Moonstone (4.80 ct, Sri Lanka)' },
      { label: 'Optical Effect', val: 'Vivid Blue Adularescence (Floating Light)' },
      { label: 'Chain Specification', val: '20-Inch Solid 925 Silver Venetian Box Chain' },
      { label: 'Pendant Dimensions', val: '24 mm drop × 14 mm width' },
      { label: 'Total Weight', val: '8.60 grams' },
      { label: 'Certificate', val: 'AUM Certificate of Authenticity & Origin' }
    ]
  },
  'na-gold-3': {
    id: 'na-gold-3',
    category: 'simple-gold',
    eyebrow: 'Simple Gold Atelier',
    title: 'Aura Royale Sculpted Gold Bangle',
    usdPrice: 9400,
    sku: 'AUM-SG-303',
    image: 'assets/images/shop/products/prod-5-a.jpg',
    cert: 'Assay Office 18K Certified Hallmark',
    desc: 'An architectural expression of gold purity. Cast in dense 18K solid yellow gold with a knife-edge sculpted contour and seamless hinge clasp.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 18K Yellow Gold (750 Swiss Assay)' },
      { label: 'Profile Craft', val: 'Knife-Edge Tapered Sculpture' },
      { label: 'Inner Circumference', val: '17 cm Oval Ergonomic Fit' },
      { label: 'Total Weight', val: '28.40 grams' },
      { label: 'Clasp Mechanism', val: 'Concealed Double Safety Tongue Catch' }
    ]
  },
  'na-gold-4': {
    id: 'na-gold-4',
    category: 'simple-gold',
    eyebrow: 'Simple Gold Atelier',
    title: 'Sovereign Fluted 18K Gold Signet Ring',
    usdPrice: 7600,
    sku: 'AUM-SG-304',
    image: 'assets/images/shop/products/prod-15-a.jpg',
    cert: 'Swiss Assay 18K Guaranteed',
    desc: 'Inspired by ancient Hellenistic goldsmithing, featuring deep fluted channeling and hand-burnished satin borders in solid 18k gold.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 18K Yellow Gold (750 Hallmarked)' },
      { label: 'Crown Dimension', val: '14.5 mm Octagonal Face' },
      { label: 'Atelier Finish', val: 'Fluted Satin & Mirror Beveled' },
      { label: 'Total Weight', val: '12.80 grams' },
      { label: 'Engraving Service', val: 'Complimentary Bespoke Atelier Monogram' }
    ]
  },
  'na-stud-3': {
    id: 'na-stud-3',
    category: 'gold-studded',
    eyebrow: 'Studded Gold Atelier',
    title: 'Sovereign Colombian Emerald Ring',
    usdPrice: 24200,
    sku: 'AUM-GS-203',
    image: 'assets/images/shop/collection-emerald.jpg',
    cert: 'SSEF Swiss Gemmological Report #118492',
    desc: 'An extraordinary 3.15-carat untreated Muzo emerald flanked by two step-cut trapezoid diamonds in a handcrafted 18K yellow gold setting.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 18K Yellow Gold & Platinum Prongs' },
      { label: 'Center Gemstone', val: 'Natural Muzo Colombian Emerald (3.15 ct, Untreated)' },
      { label: 'Accent Diamonds', val: '2 Step-Cut Trapezoids (0.95 ct total, E/VVS1)' },
      { label: 'Certification', val: 'SSEF Swiss Gemmological Report #118492' },
      { label: 'Total Weight', val: '9.60 grams' }
    ]
  },
  'na-stud-4': {
    id: 'na-stud-4',
    category: 'gold-studded',
    eyebrow: 'Studded Gold Atelier',
    title: 'Opulent Ribbon Gold Collar Necklace',
    usdPrice: 19800,
    sku: 'AUM-GS-204',
    image: 'assets/images/shop/products/prod-14-a.jpg',
    cert: 'GIA Natural Diamond Dossier',
    desc: 'Articulated flexible 18K gold links channel-set with 2.10 carats of VS1 diamonds, contouring naturally around the collarbone.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 18K Yellow Gold (750 Hallmarked)' },
      { label: 'Total Diamond Weight', val: '2.10 Carats Round Brilliant (F Color, VS1)' },
      { label: 'Collar Length', val: '16.5 inches Anatomical Ergonomic Drape' },
      { label: 'Total Weight', val: '42.10 grams' }
    ]
  },
  'na-gem-3': {
    id: 'na-gem-3',
    category: 'gemstones',
    eyebrow: 'Gemstone Archive',
    title: 'Palais Royale South Sea Pearl Drops',
    usdPrice: 11200,
    sku: 'AUM-GEM-503',
    image: 'assets/images/shop/products/prod-8-a.jpg',
    cert: 'Gemological Atelier Verification',
    desc: 'Matched pair of 14mm rare golden Australian South Sea pearls with brilliant-cut diamond bell caps and lever-back 18K yellow gold mountings.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 18K Yellow Gold' },
      { label: 'Primary Gems', val: 'Natural Golden South Sea Pearls (14.2 mm, AAA Grade)' },
      { label: 'Accent Diamonds', val: '28 Round Brilliant Diamonds (0.55 ct total)' },
      { label: 'Origin', val: 'Kimberley Coast, Western Australia' }
    ]
  },
  'na-gem-4': {
    id: 'na-gem-4',
    category: 'gemstones',
    eyebrow: 'Gemstone Archive',
    title: 'Imperial Pigeon Blood Ruby Solitaire',
    usdPrice: 32000,
    sku: 'AUM-GEM-504',
    image: 'assets/images/shop/products/prod-11-a.jpg',
    cert: 'Gübelin Gem Lab Report #98412',
    desc: 'A museum-tier 2.85-carat untreated Mogok Burmese ruby possessing the pinnacle vivid crimson saturation and natural red fluorescence.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 18K Yellow Gold & Platinum Basket' },
      { label: 'Center Gemstone', val: 'Natural Burmese Ruby (2.85 ct, Untreated/No Heat)' },
      { label: 'Color Grade', val: 'Pigeon Blood Red (Gübelin Benchmark)' },
      { label: 'Accent Diamonds', val: '2 Shield-Cut Diamonds (0.80 ct total, D/IF)' },
      { label: 'Total Weight', val: '7.85 grams' }
    ]
  },
  'na-silv-3': {
    id: 'na-silv-3',
    category: 'silver',
    eyebrow: 'Silver Atelier',
    title: 'Argentium Moonlit Solitaire Ring',
    usdPrice: 3200,
    sku: 'AUM-SLV-603',
    image: 'assets/images/shop/products/prod-1-a.jpg',
    cert: 'Argentium 925 Guaranteed Anti-Tarnish',
    desc: 'Sculpted in hypoallergenic Argentium 925 with germanium protection and finished with triple rhodium mirror polish.',
    specs: [
      { label: 'Metal Purity', val: 'Patented Argentium 925 Silver' },
      { label: 'Surface Finish', val: 'Triple Molten Rhodium & Platinum Micro-Flash' },
      { label: 'Ring Size', val: 'Complimentary Custom Atelier Sizing' },
      { label: 'Hypoallergenic', val: '100% Nickel-Free & Firestain-Free' }
    ]
  },
  'na-silv-4': {
    id: 'na-silv-4',
    category: 'silver',
    eyebrow: 'Silver Atelier',
    title: 'Cascade Argentium Drop Earrings',
    usdPrice: 3600,
    sku: 'AUM-SLV-604',
    image: 'assets/images/shop/products/prod-4-a.jpg',
    cert: 'Argentium Master Assay Hallmark',
    desc: 'Articulated geometric silver drops capturing ambient light like liquid moonlight, engineered for ultra-lightweight drape.',
    specs: [
      { label: 'Metal Purity', val: 'Solid Argentium 925 Silver' },
      { label: 'Drop Length', val: '52 mm Articulated Cascade' },
      { label: 'Fastening', val: 'Post with Comfort-Disk Friction Backs' },
      { label: 'Total Weight', val: '14.20 grams (Pair)' }
    ]
  },
  'na-dia-3': {
    id: 'na-dia-3',
    category: 'diamonds',
    eyebrow: 'Diamond Collection',
    title: 'Constellation Pavé Diamond Eternity Band',
    usdPrice: 6800,
    sku: 'AUM-DIA-403',
    image: 'assets/images/shop/products/prod-7-a.jpg',
    cert: 'IGI Certified Natural Diamond Suite',
    desc: 'A continuous unbroken circle of 32 micro-pavé round brilliant diamonds (1.20 ct, E Color, VVS1) set into solid 950 platinum.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 950 Platinum (Pt950 Hallmarked)' },
      { label: 'Diamond Content', val: '32 Round Brilliant Diamonds (1.20 ct total)' },
      { label: 'Color & Clarity', val: 'Colorless E / Clarity VVS1' },
      { label: 'Band Width', val: '2.8 mm Continuous Shared-Prong' }
    ]
  },
  'na-dia-4': {
    id: 'na-dia-4',
    category: 'diamonds',
    eyebrow: 'Diamond Collection',
    title: 'Infinite Line Diamond Tennis Bracelet',
    usdPrice: 15400,
    sku: 'AUM-DIA-404',
    image: 'assets/images/shop/products/prod-12-a.jpg',
    cert: 'GIA Authenticated Natural Diamond Line',
    desc: '52 precision-matched natural diamonds totaling 4.50 carats in 18K white gold with dual concealed safety clasps.',
    specs: [
      { label: 'Metal Purity', val: 'Solid 18K White Gold (750 Hallmarked)' },
      { label: 'Diamond Quantity & Weight', val: '52 Round Brilliant Cut Diamonds (4.50 ct total)' },
      { label: 'Color & Clarity Benchmark', val: 'F-G Color / VS1 Clarity' },
      { label: 'Bracelet Length', val: '7.0 inches with Double Hidden Safety Latch' },
      { label: 'Total Weight', val: '18.90 grams' }
    ]
  }
};

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
    this.activeModalProductId = null;
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

    // 8. Initialize 5-Section New Arrivals (Tabs, Professional Cards, Quick View Modal)
    this.initNewArrivals();

    // 9. Initialize Currency Sync for New Arrivals
    this.initCurrencySync();

    console.log('%c AUM GROUP INC %c Fine Jewellery & Gems Experience Loaded ', 
      'background: #dfc7a7; color: #12100e; font-weight: bold; padding: 4px 8px; border-radius: 2px;',
      'background: #141210; color: #dfc7a7; padding: 4px 8px;');
  }

  /**
   * Initializes 5-Section New Arrivals:
   * - Category filter tabs
   * - Quick View Modal trigger & rich specs renderer
   * - Image scale & professional interactions without photo swap
   */
  initNewArrivals() {
    const filterButtons = document.querySelectorAll('.na-filter-btn');
    const cards = document.querySelectorAll('.na-card');

    // 1. Tab Filter Handling
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');

        filterButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        cards.forEach((card) => {
          const cardCat = card.getAttribute('data-category');
          if (cat === 'all' || cardCat === cat) {
            card.style.display = '';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });

    // 2. Quick View Modal Interaction
    const openModalButtons = document.querySelectorAll('.na-quick-view-btn, .na-action-text-btn');
    openModalButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = btn.getAttribute('data-id');
        if (pid && NEW_ARRIVALS_DATA[pid]) {
          this.openProductModal(NEW_ARRIVALS_DATA[pid]);
        }
      });
    });

    // 2b. Add To Bag Button on Cards
    document.querySelectorAll('.na-add-bag-btn, [data-action="add-bag"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = btn.getAttribute('data-id');
        const product = NEW_ARRIVALS_DATA[pid];
        if (product && window.addToBag) {
          window.addToBag(product);
        }
      });
    });

    // 2c. Wishlist Like Button on Cards
    document.querySelectorAll('.na-card-wishlist-btn, [data-action="wishlist"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = btn.getAttribute('data-id');
        const product = NEW_ARRIVALS_DATA[pid];
        if (product && window.toggleWishlist) {
          window.toggleWishlist(product);
        }
      });
    });

    // 2d. Modal Add to Bag Button
    const modalAddBtn = document.getElementById('na-modal-add-btn');
    if (modalAddBtn) {
      modalAddBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.activeModalProductId && NEW_ARRIVALS_DATA[this.activeModalProductId]) {
          const product = NEW_ARRIVALS_DATA[this.activeModalProductId];
          if (window.addToBag) {
            window.addToBag(product);
            this.closeProductModal();
          }
        }
      });
    }

    // Also clicking card opens modal directly
    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        const pid = card.getAttribute('data-id');
        if (pid && NEW_ARRIVALS_DATA[pid]) {
          this.openProductModal(NEW_ARRIVALS_DATA[pid]);
        }
      });
    });

    // 3. Modal Close Triggers
    const modalBackdrop = document.getElementById('na-modal-backdrop');
    const modalCloseBtn = document.getElementById('na-modal-close-btn');
    const modalOverlay = document.getElementById('na-modal-overlay');

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => this.closeProductModal());
    }
    if (modalOverlay) {
      modalOverlay.addEventListener('click', () => this.closeProductModal());
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
        this.closeProductModal();
      }
    });
  }

  openProductModal(product) {
    this.activeModalProductId = product.id;
    const modal = document.getElementById('na-modal-backdrop');
    if (!modal) return;

    // Elements
    const imgEl = document.getElementById('na-modal-img');
    const eyebrowEl = document.getElementById('na-modal-eyebrow');
    const titleEl = document.getElementById('na-modal-title');
    const priceEl = document.getElementById('na-modal-price');
    const skuEl = document.getElementById('na-modal-sku');
    const certEl = document.getElementById('na-modal-cert-text');
    const descEl = document.getElementById('na-modal-desc');
    const specsGrid = document.getElementById('na-modal-specs-grid');
    const inquireLink = document.getElementById('na-modal-inquire-link');
    const waLink = document.getElementById('na-modal-wa-link');

    if (imgEl) imgEl.src = product.image;
    if (eyebrowEl) eyebrowEl.textContent = product.eyebrow;
    if (titleEl) titleEl.textContent = product.title;
    if (priceEl) priceEl.textContent = formatPrice(product.usdPrice);
    if (skuEl) skuEl.textContent = `SKU: ${product.sku}`;
    if (certEl) certEl.textContent = product.cert;
    if (descEl) descEl.textContent = product.desc;

    // Build specs table
    if (specsGrid && Array.isArray(product.specs)) {
      specsGrid.innerHTML = product.specs.map((item) => `
        <div class="na-spec-row">
          <span class="na-spec-label">${item.label}</span>
          <span class="na-spec-val">${item.val}</span>
        </div>
      `).join('');
    }

    // Inquire links with prefilled subject
    if (inquireLink) {
      inquireLink.href = `contact.html?inquiry=${encodeURIComponent(product.title)}&sku=${product.sku}`;
    }
    if (waLink) {
      waLink.href = `https://wa.me/12125557890?text=${encodeURIComponent(`Hello AUM GROUP INC Atelier, I would like to inquire about ${product.title} (SKU: ${product.sku}).`)}`;
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeProductModal() {
    this.activeModalProductId = null;
    const modal = document.getElementById('na-modal-backdrop');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /**
   * Listens to Currency changes and formats all prices dynamically
   */
  initCurrencySync() {
    const updateAllPrices = () => {
      const activeCurr = getActiveCurrency();
      document.querySelectorAll('.product-price-val[data-usd], [data-usd]').forEach((el) => {
        const usd = parseFloat(el.getAttribute('data-usd')) || 0;
        el.textContent = formatPrice(usd, activeCurr);
      });

      if (this.activeModalProductId && NEW_ARRIVALS_DATA[this.activeModalProductId]) {
        const modalPrice = document.getElementById('na-modal-price');
        if (modalPrice) {
          modalPrice.textContent = formatPrice(NEW_ARRIVALS_DATA[this.activeModalProductId].usdPrice, activeCurr);
        }
      }

      if (this.navbar) {
        this.navbar.updateCurrencyUI(activeCurr);
        this.navbar.renderCartDrawer();
        this.navbar.renderWishlistDrawer();
      }
    };

    // Update on start
    updateAllPrices();

    // Update on currency change event
    window.addEventListener('currencyChanged', () => {
      updateAllPrices();
    });

    // Update on background rate sync
    window.addEventListener('currencyRatesUpdated', () => {
      updateAllPrices();
    });
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
