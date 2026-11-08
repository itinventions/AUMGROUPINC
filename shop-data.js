/**
 * ESCÉLI LUXURY JEWELLERY — MULTI-DEPARTMENT PRODUCT CATALOG DATA
 * Haute Joaillerie & Fine Jewellery Collections
 * Primary Departments: Silver | Gold | Diamond | Gems
 */

export const DEPARTMENTS_DATA = [
  {
    id: "silver",
    name: "Silver",
    title: "The Silver Atelier",
    subtitle: "Argentium 925 & Sculptural Silver Heirlooms",
    description: "Pure moonlight forged into contemporary heirlooms. Hypoallergenic Argentium 925 and rhodium-dipped sterling silver sculpted for modern sophistication.",
    url: "shop-silver.html",
    heroImage: "assets/images/shop/cat-luxury.jpg",
    accentColor: "#8C8C8C",
    badge: "Argentium 925 Pure",
    video: "assets/videos/craftsmanship.webm",
    count: 6
  },
  {
    id: "gold",
    name: "Gold",
    title: "The Gold Atelier",
    subtitle: "18K & Solid Gold Haute Creations",
    description: "The timeless warm fire of certified ethical gold. Solid 18K yellow, rose, and royal white gold sculpted by generation-trained French goldsmiths.",
    url: "shop-gold.html",
    heroImage: "assets/images/shop/collection-gold.jpg",
    accentColor: "#004438",
    badge: "18K Atelier Hallmarked",
    video: "assets/videos/craftsmanship.webm",
    count: 7
  },
  {
    id: "diamond",
    name: "Diamond",
    title: "The Diamond Vault",
    subtitle: "GIA Certified Natural White Solitaires",
    description: "The optical perfection of untamed brilliance. Only the top 0.01% of natural earth diamonds, triple-excellent cut and laser-inscribed by GIA.",
    url: "shop-diamond.html",
    heroImage: "assets/images/shop/hero-campaign.jpg",
    accentColor: "#002821",
    badge: "Triple Excellent GIA",
    video: "assets/videos/diamond-facet.webm",
    count: 7
  },
  {
    id: "gems",
    name: "Gems",
    title: "The Gemstone Archive",
    subtitle: "Rare Untreated Emeralds, Sapphires & Rubies",
    description: "Earth's rarest chromatic marvels. Muzo Colombian emeralds, Ceylon cornflower sapphires, and unheated Burmese rubies certified by SSEF and Gübelin.",
    url: "shop-gems.html",
    heroImage: "assets/images/shop/collection-emerald.jpg",
    accentColor: "#402020",
    badge: "SSEF & Gübelin Dossier",
    video: "assets/videos/diamond-facet.webm",
    count: 6
  }
];

export const ESCELI_PRODUCTS = [
  // ==========================================
  // DEPARTMENT: DIAMOND (7 CREATIONS)
  // ==========================================
  {
    id: "ESC-RN-001",
    name: "L'Étoile Solitaire Diamond Ring",
    subtitle: "Round Brilliant Cut in 950 Platinum",
    department: "Diamond",
    category: "Rings",
    collection: "L'Étoile Solitaire",
    metal: "950 Platinum",
    gemstone: "Diamond",
    price: 18500,
    carat: "2.50 ct",
    colorClarity: "D Color • VVS1 Clarity",
    certification: "GIA Certified #64829104",
    primaryImage: "assets/images/shop/products/prod-1-a.jpg",
    hoverImage: "assets/images/shop/products/prod-1-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-1-a.jpg",
      "assets/images/shop/products/prod-1-b.jpg",
      "assets/images/shop/cat-diamonds.jpg"
    ],
    description: "An extraordinary centrepiece of untamed optical brilliance. Hand-crafted in pure 950 Platinum with a bespoke six-prong crown engineered to capture ambient light from every facet.",
    details: [
      "2.50 Carat Natural Triple Excellent Round Brilliant Diamond",
      "D Color, VVS1 Clarity with Laser GIA Inscription",
      "Solid 950 Platinum setting with comfort-fit knife-edge band",
      "Complimentary bespoke engraving & lifetime cleaning"
    ],
    sizes: ["US 5", "US 5.5", "US 6", "US 6.5", "US 7", "US 7.5", "US 8"],
    inStock: true,
    isNew: true,
    isBestseller: true,
    badge: "Signature Solitaire"
  },
  {
    id: "ESC-NK-003",
    name: "Celestial Rivière Diamond Necklace",
    subtitle: "Graduated Round Brilliant Diamonds in 18K White Gold",
    department: "Diamond",
    category: "Necklaces",
    collection: "Celestial Diamonds",
    metal: "18K White Gold",
    gemstone: "Diamond",
    price: 46000,
    carat: "14.50 ct",
    colorClarity: "E-F Color • VVS2 Clarity",
    certification: "GIA Certified Parcel",
    primaryImage: "assets/images/shop/products/prod-3-a.jpg",
    hoverImage: "assets/images/shop/products/prod-3-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-3-a.jpg",
      "assets/images/shop/products/prod-3-b.jpg",
      "assets/images/shop/cat-necklaces.jpg"
    ],
    description: "A seamless cascade of pure diamond light. Ninety-eight meticulously matched diamonds graduated to drape flawlessly along the clavicle with fluid articulation.",
    details: [
      "14.50 Carats Total Diamond Weight (98 Matched Stones)",
      "E to F Color, VVS2 Clarity, Ideal Symmetry",
      "Double-safety concealed box clasp with diamond pavé latch",
      "Length: 16.5 inches (custom length upon atelier request)"
    ],
    sizes: ["16.0 inches", "16.5 inches", "18.0 inches"],
    inStock: true,
    isNew: true,
    isBestseller: false,
    badge: "Master Creation"
  },
  {
    id: "ESC-ER-004",
    name: "Vendôme Cascade Diamond Drop Earrings",
    subtitle: "Pear and Marquise Diamond Waterfall",
    department: "Diamond",
    category: "Earrings",
    collection: "Celestial Diamonds",
    metal: "950 Platinum",
    gemstone: "Diamond",
    price: 16800,
    carat: "4.20 ct",
    colorClarity: "D-E Color • VS1 Clarity",
    certification: "IGI Certified",
    primaryImage: "assets/images/shop/products/prod-4-a.jpg",
    hoverImage: "assets/images/shop/products/prod-4-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-4-a.jpg",
      "assets/images/shop/products/prod-4-b.jpg",
      "assets/images/shop/cat-earrings.jpg"
    ],
    description: "Evoking evening elegance on Place Vendôme, these kinetic earrings dance with every gesture, catching illumination through delicate articulated platinum links.",
    details: [
      "4.20 Carats Total Weight (Pear, Marquise & Brilliant Cuts)",
      "Platinum 950 with secure threaded post & luxury clutch backs",
      "Dimensions: 48mm drop length",
      "Articulated multi-point kinetic movement"
    ],
    sizes: ["Standard Drop (48mm)"],
    inStock: true,
    isNew: true,
    isBestseller: true,
    badge: "New Arrival"
  },
  {
    id: "ESC-RN-007",
    name: "Constellation Pavé Diamond Eternity Band",
    subtitle: "Continuous Full Eternity in 950 Platinum",
    department: "Diamond",
    category: "Rings",
    collection: "L'Étoile Solitaire",
    metal: "950 Platinum",
    gemstone: "Diamond",
    price: 6800,
    carat: "2.10 ct",
    colorClarity: "F Color • VVS2 Clarity",
    certification: "IGI Certificate & Laser Seal",
    primaryImage: "assets/images/shop/products/prod-7-a.jpg",
    hoverImage: "assets/images/shop/products/prod-7-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-7-a.jpg",
      "assets/images/shop/products/prod-7-b.jpg",
      "assets/images/shop/cat-rings.jpg"
    ],
    description: "Unbroken fire that circles the finger endlessly. Shared-prong micro-scalloped platinum setting designed for optimal light ingress and supreme tactile smoothness.",
    details: [
      "2.10 Carats Total Weight (Calculated based on size 6)",
      "Consistent F Color, VVS2 clarity round brilliant stones",
      "Heavy 950 Platinum shared-prong construction",
      "Pairs impeccably with solitaire engagement creations"
    ],
    sizes: ["US 5", "US 5.5", "US 6", "US 6.5", "US 7", "US 8"],
    inStock: true,
    isNew: true,
    isBestseller: true,
    badge: "Iconic Eternity"
  },
  {
    id: "ESC-RN-010",
    name: "Heritage Cushion Cut Halo Ring",
    subtitle: "Old Mine Cushion Centre with French Pavé",
    department: "Diamond",
    category: "Rings",
    collection: "L'Étoile Solitaire",
    metal: "18K White Gold",
    gemstone: "Diamond",
    price: 14700,
    carat: "2.15 ct Centre",
    colorClarity: "F Color • VS1 Clarity",
    certification: "GIA Certified #31829471",
    primaryImage: "assets/images/shop/products/prod-10-a.jpg",
    hoverImage: "assets/images/shop/products/prod-10-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-10-a.jpg",
      "assets/images/shop/products/prod-10-b.jpg",
      "assets/images/shop/cat-diamonds.jpg"
    ],
    description: "Romance reincarnated. An antique-inspired modified cushion cut diamond enveloped in a delicate halo of micro-brilliants that accentuate its pillowy silhouette.",
    details: [
      "2.15 Carat Cushion Modified Brilliant Diamond",
      "0.60 Carat Micro-pavé accents along halo and split shank",
      "18K White Gold setting with filigree gallery peekaboo diamond",
      "Includes complimentary bespoke velvet keepsake jewel box"
    ],
    sizes: ["US 5", "US 5.5", "US 6", "US 6.5", "US 7"],
    inStock: true,
    isNew: false,
    isBestseller: true,
    badge: "Bestseller"
  },
  {
    id: "ESC-BR-012",
    name: "Infinite Line Diamond Tennis Bracelet",
    subtitle: "Four-Prong Articulated Line in 18K White Gold",
    department: "Diamond",
    category: "Bracelets",
    collection: "Celestial Diamonds",
    metal: "18K White Gold",
    gemstone: "Diamond",
    price: 15400,
    carat: "7.50 ct",
    colorClarity: "F-G Color • VS2 Clarity",
    certification: "IGI Appraisal Certificate",
    primaryImage: "assets/images/shop/products/prod-12-a.jpg",
    hoverImage: "assets/images/shop/products/prod-12-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-12-a.jpg",
      "assets/images/shop/products/prod-12-b.jpg",
      "assets/images/shop/cat-bracelets.jpg"
    ],
    description: "The quintessential luxury staple. Fifty-four individually set round brilliant diamonds moving in supple harmony with double-lock safety clasp.",
    details: [
      "7.50 Carats Total Diamond Weight (Round Brilliant Cut)",
      "F-G Color, VS2 Clarity, calibrated to exact millimeter tolerance",
      "Solid 18K White Gold four-prong link setting",
      "Standard 7.0 inch length with custom resizing available"
    ],
    sizes: ["6.5 inches", "7.0 inches", "7.5 inches"],
    inStock: true,
    isNew: false,
    isBestseller: true,
    badge: "Everyday Icon"
  },
  {
    id: "ESC-RN-013",
    name: "Lumina Emerald Cut Diamond Solitaire",
    subtitle: "Step-Cut Purity in 950 Platinum",
    department: "Diamond",
    category: "Rings",
    collection: "L'Étoile Solitaire",
    metal: "950 Platinum",
    gemstone: "Diamond",
    price: 26500,
    carat: "3.10 ct",
    colorClarity: "E Color • VVS1 Clarity",
    certification: "GIA Certified #72819482",
    primaryImage: "assets/images/shop/products/prod-13-a.jpg",
    hoverImage: "assets/images/shop/products/prod-13-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-13-a.jpg",
      "assets/images/shop/products/prod-13-b.jpg",
      "assets/images/shop/cat-rings.jpg"
    ],
    description: "Architectural grandeur and hypnotic hall-of-mirrors reflection. An exceptional 3.10 carat emerald-cut diamond mounted in minimalist four corner claws.",
    details: [
      "3.10 Carat Natural Emerald Cut Diamond",
      "E Color, VVS1 Clarity, Excellent Polish & Symmetry",
      "Subtle hidden diamond halo under the gallery bar (0.12 ct)",
      "Custom hand-forged 950 Platinum shank"
    ],
    sizes: ["US 5", "US 5.5", "US 6", "US 6.5", "US 7", "US 8"],
    inStock: true,
    isNew: true,
    isBestseller: true,
    badge: "Solitaire Masterpiece"
  },

  // ==========================================
  // DEPARTMENT: GOLD (7 CREATIONS)
  // ==========================================
  {
    id: "ESC-BR-005",
    name: "Aura Royale Sculpted Gold Bangle",
    subtitle: "Heavy Fluted 18K Yellow Gold with Pavé Accents",
    department: "Gold",
    category: "Bracelets",
    collection: "Aura Royale",
    metal: "18K Yellow Gold",
    gemstone: "Diamond",
    price: 9400,
    carat: "0.95 ct",
    colorClarity: "F Color • VS1 Pavé",
    certification: "ESCÉLI Atelier Hallmark",
    primaryImage: "assets/images/shop/products/prod-5-a.jpg",
    hoverImage: "assets/images/shop/products/prod-5-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-5-a.jpg",
      "assets/images/shop/products/prod-5-b.jpg",
      "assets/images/shop/cat-bracelets.jpg"
    ],
    description: "A modern talisman of bold architectural luxury. Hand-fluted 18K yellow gold kissed with subtle ribbons of micro-pavé diamonds, engineered with an invisible push-hinge.",
    details: [
      "Solid 18K Yellow Gold (approx. 42 grams gold weight)",
      "0.95 Carat Micro-pavé Brilliant Diamonds",
      "Precision engineered push-release hinge mechanism",
      "Satin hand-finished fluting with high-polish interior"
    ],
    sizes: ["Small (15.5 cm)", "Medium (16.5 cm)", "Large (18.0 cm)"],
    inStock: true,
    isNew: false,
    isBestseller: true,
    badge: "Bestseller"
  },
  {
    id: "ESC-PD-008",
    name: "Sillage Pear Cut Solitaire Pendant",
    subtitle: "Teardrop Diamond in 18K Rose Gold Chain",
    department: "Gold",
    category: "Pendants",
    collection: "Aura Royale",
    metal: "18K Rose Gold",
    gemstone: "Diamond",
    price: 8900,
    carat: "1.75 ct",
    colorClarity: "E Color • VS1 Clarity",
    certification: "GIA Certified #52194821",
    primaryImage: "assets/images/shop/products/prod-8-a.jpg",
    hoverImage: "assets/images/shop/products/prod-8-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-8-a.jpg",
      "assets/images/shop/products/prod-8-b.jpg",
      "assets/images/shop/cat-pendants.jpg"
    ],
    description: "An elongated pear brilliant diamond suspended effortlessly in warm 18K rose gold. Minimalist three-prong V-tip setting hung from a delicate diamond-cut wheat chain.",
    details: [
      "1.75 Carat Natural Pear Brilliant Cut Diamond",
      "E Color, VS1 Clarity with Excellent Polish and Symmetry",
      "18K Rose Gold delicate 1.1mm wheat chain with lobster lock",
      "Adjustable loop at 16, 17, and 18 inches"
    ],
    sizes: ["Adjustable 16 - 18 in"],
    inStock: true,
    isNew: true,
    isBestseller: false,
    badge: "Rose Gold Edition"
  },
  {
    id: "ESC-NK-014",
    name: "Opulent Ribbon Gold Collar Necklace",
    subtitle: "Silken Graduated Mesh in 18K Yellow Gold",
    department: "Gold",
    category: "Necklaces",
    collection: "Aura Royale",
    metal: "18K Yellow Gold",
    gemstone: "Diamond",
    price: 19800,
    carat: "1.10 ct Accents",
    colorClarity: "F Color • VS1 Accents",
    certification: "ESCÉLI Atelier Certificate",
    primaryImage: "assets/images/shop/products/prod-14-a.jpg",
    hoverImage: "assets/images/shop/products/prod-14-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-14-a.jpg",
      "assets/images/shop/products/prod-14-b.jpg",
      "assets/images/shop/cat-gold.jpg"
    ],
    description: "Draping like fluid satin against the skin. Woven 18K yellow gold mesh collar finished with diamond-pavé terminals that clasp securely at the nape.",
    details: [
      "78 grams of Certified Ethical Recycled 18K Yellow Gold",
      "1.10 Carat Diamond Pavé on decorative clasp",
      "Concealed pressure-lock mechanism with dual safety ears",
      "Supple hand-assembled link structure conforms to contour"
    ],
    sizes: ["16.0 inches", "17.0 inches"],
    inStock: true,
    isNew: false,
    isBestseller: false,
    badge: "Atelier Signature"
  },
  {
    id: "ESC-RN-015",
    name: "Eclipse Midnight & White Diamond Band",
    subtitle: "Black Diamond Pavé Channel with Rose Gold",
    department: "Gold",
    category: "Rings",
    collection: "Aura Royale",
    metal: "18K Rose Gold",
    gemstone: "Diamond",
    price: 5200,
    carat: "1.90 ct",
    colorClarity: "Natural Black & F Color White Diamonds",
    certification: "ESCÉLI Authenticity Seal",
    primaryImage: "assets/images/shop/products/prod-15-a.jpg",
    hoverImage: "assets/images/shop/products/prod-15-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-15-a.jpg",
      "assets/images/shop/products/prod-15-b.jpg",
      "assets/images/shop/cat-rings.jpg"
    ],
    description: "A dramatic study in light and shadow. A central channel of deep obsidian black diamonds bordered by brilliant white diamond micro-pavé in 18K rose gold.",
    details: [
      "1.25 Carat Natural Opaque Black Diamonds",
      "0.65 Carat F-G Color White Brilliant Diamonds",
      "18K Rose Gold with brushed matte interior bevel",
      "Width: 6.2mm, ideal for statement band or wedding band"
    ],
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
    inStock: true,
    isNew: true,
    isBestseller: false,
    badge: "Contemporary"
  },
  {
    id: "ESC-ER-016",
    name: "Reine Diamond Huggie Hoop Earrings",
    subtitle: "Inside-Out Pavé Diamonds in 18K Yellow Gold",
    department: "Gold",
    category: "Earrings",
    collection: "Aura Royale",
    metal: "18K Yellow Gold",
    gemstone: "Diamond",
    price: 4800,
    carat: "1.60 ct",
    colorClarity: "F-G Color • VS1 Clarity",
    certification: "IGI Certificate",
    primaryImage: "assets/images/shop/products/prod-16-a.jpg",
    hoverImage: "assets/images/shop/products/prod-16-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-16-a.jpg",
      "assets/images/shop/products/prod-16-b.jpg",
      "assets/images/shop/cat-earrings.jpg"
    ],
    description: "Everyday brilliance engineered to perfection. Inside-out diamond placement ensures continuous sparkle from both the front and inside curve.",
    details: [
      "1.60 Carats Total Weight (Inside-Out Setting)",
      "F-G Color, VS1 Clarity Round Brilliant Cuts",
      "18K Yellow Gold click-in clasp mechanism with auditory snap",
      "Diameter: 18mm, Width: 2.8mm"
    ],
    sizes: ["18mm Diameter"],
    inStock: true,
    isNew: false,
    isBestseller: true,
    badge: "Daily Luxury"
  },
  {
    id: "ESC-GD-017",
    name: "Sovereign Fluted 18K Gold Signet Ring",
    subtitle: "Mirror-Polished Crown with Micro-Pavé Trim",
    department: "Gold",
    category: "Rings",
    collection: "Aura Royale",
    metal: "18K Yellow Gold",
    gemstone: "Diamond",
    price: 7600,
    carat: "0.45 ct",
    colorClarity: "F Color • VVS2",
    certification: "ESCÉLI Atelier Seal",
    primaryImage: "assets/images/shop/collection-gold.jpg",
    hoverImage: "assets/images/shop/cat-gold.jpg",
    gallery: [
      "assets/images/shop/collection-gold.jpg",
      "assets/images/shop/cat-gold.jpg"
    ],
    description: "A monumental heritage signet forged from solid 18K yellow gold, featuring classical hand-carved gadrooning along the flanks and a mirror table framed in diamond pavé.",
    details: [
      "28 grams Solid 18K Yellow Gold Atelier Casting",
      "0.45 Carat Micro-pavé halo framing mirror crest",
      "Available with bespoke complimentary seal engraving",
      "Hand-polished satin fluted sides"
    ],
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
    inStock: true,
    isNew: true,
    isBestseller: true,
    badge: "Haute Or"
  },
  {
    id: "ESC-GD-018",
    name: "Aura Royale Chained Link 18K Bracelet",
    subtitle: "Interlocking Oval Cable in Solid Yellow Gold",
    department: "Gold",
    category: "Bracelets",
    collection: "Aura Royale",
    metal: "18K Yellow Gold",
    gemstone: "Diamond",
    price: 11800,
    carat: "0.80 ct",
    colorClarity: "G Color • VS1",
    certification: "ESCÉLI Atelier Hallmark",
    primaryImage: "assets/images/shop/cat-bracelets.jpg",
    hoverImage: "assets/images/shop/products/prod-5-b.jpg",
    gallery: [
      "assets/images/shop/cat-bracelets.jpg",
      "assets/images/shop/products/prod-5-b.jpg"
    ],
    description: "Bold sensual links articulated for supreme wrist contouring. Cast in radiant 18K yellow gold with an oversized pavé lobster clasp.",
    details: [
      "46 grams pure 18K Yellow Gold",
      "0.80 Carat Diamond Pavé clasp terminal",
      "Interlocking high-gauge links with semi-matte interior",
      "Length: 7.25 inches"
    ],
    sizes: ["7.0 inches", "7.5 inches"],
    inStock: true,
    isNew: false,
    isBestseller: false,
    badge: "Signature Link"
  },

  // ==========================================
  // DEPARTMENT: GEMS (6 CREATIONS)
  // ==========================================
  {
    id: "ESC-RN-002",
    name: "Sovereign Colombian Emerald Ring",
    subtitle: "Octagonal Emerald Cut with Tapered Baguettes",
    department: "Gems",
    category: "Rings",
    collection: "Sovereign Emeralds",
    metal: "18K Yellow Gold",
    gemstone: "Emerald",
    price: 24200,
    carat: "3.80 ct",
    colorClarity: "Muzo Green • Minor Cedar Oil",
    certification: "SSEF & GIA Certified",
    primaryImage: "assets/images/shop/products/prod-2-a.jpg",
    hoverImage: "assets/images/shop/products/prod-2-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-2-a.jpg",
      "assets/images/shop/products/prod-2-b.jpg",
      "assets/images/shop/collection-emerald.jpg"
    ],
    description: "An intense, glowing Colombian emerald from legendary Muzo mines, cradled between architectural step-cut diamond baguettes in rich 18K yellow gold.",
    details: [
      "3.80 Carat Natural Colombian Emerald",
      "0.85 Carat Total Weight Tapered Baguette Diamonds (F/VS1)",
      "Recycled 18K Yellow Gold Atelier Cast",
      "Individual Origin Report by Swiss Gemmological Institute (SSEF)"
    ],
    sizes: ["US 5.5", "US 6", "US 6.5", "US 7", "US 7.5"],
    inStock: true,
    isNew: false,
    isBestseller: true,
    badge: "Haute Joaillerie"
  },
  {
    id: "ESC-RN-006",
    name: "Royal Ceylon Sapphire Cocktail Ring",
    subtitle: "Unheated Cornflower Sapphire & Diamond Halo",
    department: "Gems",
    category: "Rings",
    collection: "Heritage Archive",
    metal: "18K White Gold",
    gemstone: "Sapphire",
    price: 21500,
    carat: "4.50 ct",
    colorClarity: "Cornflower Blue • Unheated",
    certification: "GIA Certified Gemstone #22019482",
    primaryImage: "assets/images/shop/products/prod-6-a.jpg",
    hoverImage: "assets/images/shop/products/prod-6-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-6-a.jpg",
      "assets/images/shop/products/prod-6-b.jpg",
      "assets/images/shop/gift-anniversary.jpg"
    ],
    description: "An unheated natural Ceylon sapphire exhibiting the coveted velvety cornflower saturation, encircled by brilliant-cut diamond petals in 18K white gold.",
    details: [
      "4.50 Carat Natural Ceylon Blue Sapphire (No heat indication)",
      "1.30 Carats Total Weight Brilliant Halo & Shank Diamonds",
      "Hand-finished in solid 18K White Gold with gallery openwork",
      "Comprehensive GIA Identification and Origin Dossier"
    ],
    sizes: ["US 6", "US 6.5", "US 7", "US 7.5"],
    inStock: true,
    isNew: false,
    isBestseller: true,
    badge: "Rare Sourcing"
  },
  {
    id: "ESC-ER-009",
    name: "Palais Royale South Sea Pearl Drops",
    subtitle: "13mm Golden South Sea Pearls & Diamond Cap",
    department: "Gems",
    category: "Earrings",
    collection: "Heritage Archive",
    metal: "18K Yellow Gold",
    gemstone: "Pearl",
    price: 11200,
    carat: "1.20 ct Diamonds",
    colorClarity: "Champagne Gold Pearl • AAA Luster",
    certification: "ESCÉLI Pearl Dossier",
    primaryImage: "assets/images/shop/products/prod-9-a.jpg",
    hoverImage: "assets/images/shop/products/prod-9-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-9-a.jpg",
      "assets/images/shop/products/prod-9-b.jpg",
      "assets/images/shop/cat-earrings.jpg"
    ],
    description: "Hand-harvested in the pristine waters of the South Pacific, these rare 13mm golden cultured pearls are crowned with diamond-pavé palmettes.",
    details: [
      "Pair of matched 13mm Natural Color Golden South Sea Cultured Pearls",
      "1.20 Carat Total Weight Brilliant Round Diamonds (G/VS)",
      "18K Yellow Gold lever-back mechanism for total security",
      "Flawless surface grade with mirror-like metallic overtone"
    ],
    sizes: ["Standard Drop"],
    inStock: true,
    isNew: false,
    isBestseller: false,
    badge: "Curated Gem"
  },
  {
    id: "ESC-RN-011",
    name: "Imperial Pigeon Blood Ruby Solitaire",
    subtitle: "Oval Burmese Ruby with Trillion Diamond Flanks",
    department: "Gems",
    category: "Rings",
    collection: "Heritage Archive",
    metal: "18K Yellow Gold",
    gemstone: "Ruby",
    price: 32000,
    carat: "3.20 ct",
    colorClarity: "Pigeon Blood Red • Unheated",
    certification: "Gübelin & GIA Certified",
    primaryImage: "assets/images/shop/products/prod-11-a.jpg",
    hoverImage: "assets/images/shop/products/prod-11-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-11-a.jpg",
      "assets/images/shop/products/prod-11-b.jpg",
      "assets/images/shop/gift-luxury.jpg"
    ],
    description: "The pinnacle of coloured gemstones. An unheated natural ruby displaying intense fluorescence and the signature 'Pigeon Blood' hue, flanked by matched trillion diamonds.",
    details: [
      "3.20 Carat Natural Burma (Myanmar) Ruby with No Thermal Treatment",
      "1.05 Carat Matched Triangular Brilliant Cut Diamonds (D/VVS2)",
      "Two-tone 18K Yellow Gold claws with Platinum bridge",
      "Official Gübelin Gem Lab Gemstone Profile Included"
    ],
    sizes: ["US 6", "US 6.5", "US 7"],
    inStock: true,
    isNew: true,
    isBestseller: false,
    badge: "Museum Grade"
  },
  {
    id: "ESC-GM-019",
    name: "Lumina Colombian Emerald Royale Pendant",
    subtitle: "Step-Cut Emerald with Geometric Diamond Aura",
    department: "Gems",
    category: "Pendants",
    collection: "Sovereign Emeralds",
    metal: "18K Yellow Gold",
    gemstone: "Emerald",
    price: 27800,
    carat: "4.20 ct",
    colorClarity: "Muzo Vivid Green",
    certification: "GIA Report #6192840",
    primaryImage: "assets/images/shop/collection-emerald.jpg",
    hoverImage: "assets/images/shop/products/prod-2-b.jpg",
    gallery: [
      "assets/images/shop/collection-emerald.jpg",
      "assets/images/shop/products/prod-2-b.jpg"
    ],
    description: "A glowing Colombian emerald displaying intense natural crystalline verdancy, suspended within an architectural halo of calibré baguette and brilliant diamonds.",
    details: [
      "4.20 Carat Natural Colombian Emerald (Minor clarity enhancement)",
      "1.45 Carats Diamond Baguette & Round Frame (E/VS1)",
      "18K Yellow Gold hand-cast basket with double bail",
      "Accompanied by silk-lined presentation dossier"
    ],
    sizes: ["18.0 in Chain"],
    inStock: true,
    isNew: true,
    isBestseller: true,
    badge: "Rare Gem"
  },
  {
    id: "ESC-GM-020",
    name: "Ceylon Star Sapphire & Diamond Cluster Brooch",
    subtitle: "Natural 6-Ray Asterism in Platinum & 18K Gold",
    department: "Gems",
    category: "Bracelets",
    collection: "Heritage Archive",
    metal: "18K White Gold",
    gemstone: "Sapphire",
    price: 29500,
    carat: "6.10 ct",
    colorClarity: "Natural Star Sapphire • Unheated",
    certification: "SSEF Certified Masterpiece",
    primaryImage: "assets/images/shop/gift-anniversary.jpg",
    hoverImage: "assets/images/shop/products/prod-6-b.jpg",
    gallery: [
      "assets/images/shop/gift-anniversary.jpg",
      "assets/images/shop/products/prod-6-b.jpg"
    ],
    description: "A rare phenomenon of nature. An unheated Ceylon star sapphire exhibiting a sharp, perfectly centred six-ray asterism floating across a velvety midnight dome.",
    details: [
      "6.10 Carat Natural Untreated Star Blue Sapphire",
      "2.20 Carats Marquise and Brilliant Diamonds",
      "Concealed dual brooch pin with safety latch mechanism",
      "Swiss Gemmological Institute (SSEF) Special Letter"
    ],
    sizes: ["Brooch / Pendant Convertible"],
    inStock: true,
    isNew: false,
    isBestseller: false,
    badge: "Phenomenal Gem"
  },

  // ==========================================
  // DEPARTMENT: SILVER (6 CREATIONS)
  // ==========================================
  {
    id: "ESC-SV-021",
    name: "Argentium Moonlit Solitaire Ring",
    subtitle: "Faceted Cushion Cut in Anti-Tarnish 925 Argentium",
    department: "Silver",
    category: "Rings",
    collection: "Moonlight Silver",
    metal: "Argentium Silver 925",
    gemstone: "Diamond",
    price: 3200,
    carat: "2.00 ct Eq",
    colorClarity: "D Color • Flawless Luster",
    certification: "ESCÉLI Silver Hallmark 925",
    primaryImage: "assets/images/shop/products/prod-1-a.jpg",
    hoverImage: "assets/images/shop/cat-luxury.jpg",
    gallery: [
      "assets/images/shop/products/prod-1-a.jpg",
      "assets/images/shop/cat-luxury.jpg"
    ],
    description: "Pure lunar radiance. Crafted from superior Argentium 925 silver—renowned for exceptional fire, brightness, and natural tarnish resistance—embracing an icy brilliant stone in a scalloped four-claw gallery.",
    details: [
      "Solid Argentium 925 Silver (higher purity than traditional sterling)",
      "Natural Germanium alloy formulation prevents discoloration",
      "Heavy mirror hand-buffed finish with platinum micro-flash",
      "Hypoallergenic and 100% nickel-free certified"
    ],
    sizes: ["US 5", "US 6", "US 7", "US 8"],
    inStock: true,
    isNew: true,
    isBestseller: true,
    badge: "Argentium 925"
  },
  {
    id: "ESC-SV-022",
    name: "Luminescence Sculpted Silver Bangle",
    subtitle: "Heavy Fluted Torque in Rhodium-Plated Sterling",
    department: "Silver",
    category: "Bracelets",
    collection: "Moonlight Silver",
    metal: "Sterling Silver 925",
    gemstone: "None",
    price: 2450,
    carat: "Pure Silver",
    colorClarity: "Mirror Bright Silver Luster",
    certification: "ESCÉLI Silversmith Hallmark",
    primaryImage: "assets/images/shop/products/prod-5-a.jpg",
    hoverImage: "assets/images/shop/cat-bracelets.jpg",
    gallery: [
      "assets/images/shop/products/prod-5-a.jpg",
      "assets/images/shop/cat-bracelets.jpg"
    ],
    description: "A heavy architectural torque bangle forged in pure 925 sterling silver, electro-plated with three layers of lustrous white rhodium for enduring mirror brightness.",
    details: [
      "52 grams Solid 925 Sterling Silver Weight",
      "Triple Rhodium Barrier Plating prevents oxidation",
      "Flexible tension hinge ensures effortless wear",
      "Satin fluted outer channel with mirror-polished interior"
    ],
    sizes: ["Small (15.5 cm)", "Medium (16.5 cm)", "Large (18 cm)"],
    inStock: true,
    isNew: true,
    isBestseller: false,
    badge: "Sculptural Silver"
  },
  {
    id: "ESC-SV-023",
    name: "Étoile Silver Line Tennis Bracelet",
    subtitle: "Bezel-Set Articulated Links in 925 Fine Silver",
    department: "Silver",
    category: "Bracelets",
    collection: "Moonlight Silver",
    metal: "Sterling Silver 925",
    gemstone: "Diamond",
    price: 2850,
    carat: "5.00 ct Eq",
    colorClarity: "D Color White Stones",
    certification: "ESCÉLI Fine Silver Assay",
    primaryImage: "assets/images/shop/products/prod-12-a.jpg",
    hoverImage: "assets/images/shop/products/prod-12-b.jpg",
    gallery: [
      "assets/images/shop/products/prod-12-a.jpg",
      "assets/images/shop/products/prod-12-b.jpg"
    ],
    description: "Fluid, supple, and endlessly wearable. Individually cast sterling silver collets set with brilliant stones that articulate gently with every motion.",
    details: [
      "Sterling Silver 925 with Platinum Protective Flash",
      "Fifty-two seamless box links with dual figure-eight safety catches",
      "Length: 7.0 inches (comfort fit link)",
      "Double-action security clasp mechanism"
    ],
    sizes: ["6.5 in", "7.0 in", "7.5 in"],
    inStock: true,
    isNew: false,
    isBestseller: true,
    badge: "Daily Icon"
  },
  {
    id: "ESC-SV-024",
    name: "Cascade Argentium Chandelier Drop Earrings",
    subtitle: "Articulated Starlight Drops in 925 Silver",
    department: "Silver",
    category: "Earrings",
    collection: "Moonlight Silver",
    metal: "Argentium Silver 925",
    gemstone: "Diamond",
    price: 3600,
    carat: "3.50 ct Eq",
    colorClarity: "Pure White Brightness",
    certification: "Argentium Flying Unicorn Hallmark",
    primaryImage: "assets/images/shop/products/prod-4-a.jpg",
    hoverImage: "assets/images/shop/cat-earrings.jpg",
    gallery: [
      "assets/images/shop/products/prod-4-a.jpg",
      "assets/images/shop/cat-earrings.jpg"
    ],
    description: "Kinetic drama inspired by Parisian chandeliers. Interlinked Argentium silver droplets that catch every beam of light with dazzling cold optical fire.",
    details: [
      "Solid Argentium 925 Silver construction",
      "Tarnish-resistant natural silver oxide barrier",
      "46mm articulated drop length",
      "Comfort french-wire with safety safety lock"
    ],
    sizes: ["Standard Drop (46mm)"],
    inStock: true,
    isNew: true,
    isBestseller: false,
    badge: "Argentium 925"
  },
  {
    id: "ESC-SV-025",
    name: "Minimalist Silver Bar Collar Necklace",
    subtitle: "Curved Tubular Silver Torc in Mirror Finish",
    department: "Silver",
    category: "Necklaces",
    collection: "Moonlight Silver",
    metal: "Sterling Silver 925",
    gemstone: "None",
    price: 2100,
    carat: "Pure Silver",
    colorClarity: "High Polish Rhodium White",
    certification: "ESCÉLI Assay Certificate",
    primaryImage: "assets/images/shop/products/prod-3-a.jpg",
    hoverImage: "assets/images/shop/cat-necklaces.jpg",
    gallery: [
      "assets/images/shop/products/prod-3-a.jpg",
      "assets/images/shop/cat-necklaces.jpg"
    ],
    description: "An homage to modern Scandinavian minimalism. Hand-formed sterling silver neck collar that rests flush along the collarbone with architectural precision.",
    details: [
      "38 grams solid Sterling Silver 925",
      "High-luster white rhodium finish prevents daily scratching",
      "Seamless hinged back closure for seamless appearance",
      "Contoured elliptical shape tailored to neckline"
    ],
    sizes: ["16.0 inches"],
    inStock: true,
    isNew: false,
    isBestseller: false,
    badge: "Minimalist"
  },
  {
    id: "ESC-SV-026",
    name: "Sculpted Silver Statement Dome Ring",
    subtitle: "Heavy Volumetric Dome in Solid Argentium 925",
    department: "Silver",
    category: "Rings",
    collection: "Moonlight Silver",
    metal: "Argentium Silver 925",
    gemstone: "Diamond",
    price: 2750,
    carat: "0.50 ct Eq Accents",
    colorClarity: "F Color Micro-Pavé",
    certification: "ESCÉLI Silver Hallmark 925",
    primaryImage: "assets/images/shop/products/prod-10-a.jpg",
    hoverImage: "assets/images/shop/cat-rings.jpg",
    gallery: [
      "assets/images/shop/products/prod-10-a.jpg",
      "assets/images/shop/cat-rings.jpg"
    ],
    description: "Sensual volumetric curve that commands attention. A bold dome of mirror-buffed Argentium 925 silver intersected by a delicate diagonal meridian of micro-brilliant stones.",
    details: [
      "22 grams heavy solid Argentium 925 Silver",
      "Comfort-fit curved inner contour",
      "Anti-tarnish natural Germanium alloy",
      "Hand-set pavé stones with micro-bead prongs"
    ],
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    inStock: true,
    isNew: true,
    isBestseller: true,
    badge: "Statement Dome"
  }
];

export const CATEGORIES_DATA = [
  { id: "Rings", name: "Rings", count: 11, image: "assets/images/shop/cat-rings.jpg", description: "Solitaires, eternity bands, and cocktail creations" },
  { id: "Necklaces", name: "Necklaces", count: 4, image: "assets/images/shop/cat-necklaces.jpg", description: "Graduated rivières, chokers, and delicate chains" },
  { id: "Earrings", name: "Earrings", count: 5, image: "assets/images/shop/cat-earrings.jpg", description: "Diamond drops, chandeliers, and huggie hoops" },
  { id: "Bracelets", name: "Bracelets", count: 5, image: "assets/images/shop/cat-bracelets.jpg", description: "Tennis line bracelets and sculptural gold cuffs" },
  { id: "Pendants", name: "Pendants", count: 3, image: "assets/images/shop/cat-pendants.jpg", description: "Solitaire pear, emerald, and talisman pendants" },
  { id: "Diamond Jewellery", name: "Diamond Jewellery", count: 12, image: "assets/images/shop/cat-diamonds.jpg", description: "Exceptional GIA certified natural white diamonds" },
  { id: "Gold Jewellery", name: "Gold Jewellery", count: 8, image: "assets/images/shop/cat-gold.jpg", description: "Hand-finished 18K yellow, white, and rose gold" },
  { id: "Gift Collections", name: "Gift Collections", count: 8, image: "assets/images/shop/cat-gifts.jpg", description: "Treasured expressions for timeless milestones" }
];
