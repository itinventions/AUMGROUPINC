/**
 * AUM GROUP INC. LUXURY JEWELLERY — SHOPPING MART CONTROLLER
 * Architecture: Modular ES6 Class Orchestrator
 */

import { AUM_GROUP_PRODUCTS, ESCELI_PRODUCTS, CATEGORIES_DATA } from './shop-data.js';
import { formatPrice, getActiveCurrency, EXPORT_CURRENCIES, updateAllDomPrices } from './navbar.js';

class AumGroupShopApp {
  constructor() {
    this.products = AUM_GROUP_PRODUCTS || ESCELI_PRODUCTS;
    this.categories = CATEGORIES_DATA;

    // State
    this.cart = JSON.parse(localStorage.getItem('aum_group_cart') || localStorage.getItem('esceli_cart') || '[]');
    this.wishlist = JSON.parse(localStorage.getItem('aum_group_wishlist') || localStorage.getItem('esceli_wishlist') || '[]');
    
    // Detect dedicated department page or query param
    const bodyDept = document.body?.dataset?.department;
    const urlParams = new URLSearchParams(window.location.search);
    const queryDept = urlParams.get('department') || urlParams.get('category');
    
    this.currentDepartment = bodyDept || (queryDept && ['silver', 'gold', 'diamond', 'gems'].includes(queryDept.toLowerCase()) ? queryDept.toLowerCase() : 'all');

    this.activeFilters = {
      department: this.currentDepartment,
      category: 'all',
      metal: 'all',
      gemstone: 'all',
      price: 'all',
      priceMin: 0,
      priceMax: 50000,
      search: '',
      sort: 'featured'
    };
    this.currentQuickViewProduct = null;
    this.selectedSize = null;
    this.selectedQty = 1;

    this.ensureCartDrawerDOM();

    // DOM Elements Cache
    this.dom = {
      // Navbar
      navbar: document.querySelector('.navbar, .shop-navbar'),
      cartBtn: document.getElementById('cart-btn') || document.getElementById('shop-cart-btn'),
      cartBadge: document.getElementById('cart-counter') || document.getElementById('shop-cart-counter'),
      wishlistBtn: document.getElementById('wishlist-btn') || document.getElementById('shop-wishlist-btn'),
      wishlistBadge: document.getElementById('wishlist-counter') || document.getElementById('shop-wishlist-counter'),
      mobileToggle: document.getElementById('mobile-menu-toggle') || document.getElementById('shop-mobile-toggle'),
      mobileDrawer: document.getElementById('navbar-drawer'),
      drawerOverlay: document.getElementById('navbar-drawer-overlay'),
      drawerCloseBtn: document.getElementById('drawer-close-btn'),

      // Catalog & Left Sidebar Filter
      catalogGrid: document.getElementById('catalog-products-grid'),
      catalogCount: document.getElementById('catalog-count') || document.getElementById('catalog-results-count'),
      activeChips: document.getElementById('catalog-active-chips'),
      categoryFilter: document.getElementById('filter-category'),
      metalFilter: document.getElementById('filter-metal'),
      gemstoneFilter: document.getElementById('filter-gemstone'),
      priceFilter: document.getElementById('filter-price'),
      sortSelect: document.getElementById('sort-products'),
      searchInput: document.getElementById('catalog-search'),
      emptyState: document.getElementById('catalog-empty-state'),
      filterSidebar: document.getElementById('shop-filter-sidebar'),
      mobileFilterToggle: document.getElementById('btn-mobile-filter-toggle'),
      mobileFilterClose: document.getElementById('filter-sidebar-close-btn'),
      priceSliderMin: document.getElementById('price-min'),
      priceSliderMax: document.getElementById('price-max'),
      priceInputMin: document.getElementById('price-input-min'),
      priceInputMax: document.getElementById('price-input-max'),
      priceSliderFill: document.getElementById('price-slider-fill'),
      priceDisplay: document.getElementById('price-range-display'),
      sidebarResetBtn: document.getElementById('filter-sidebar-reset'),

      // Curated Sections
      newArrivalsGrid: document.getElementById('new-arrivals-grid'),
      bestsellersGrid: document.getElementById('bestsellers-grid'),
      categoriesGrid: document.getElementById('categories-grid'),

      // Quick View Modal
      modalBackdrop: document.getElementById('quickview-modal-backdrop'),
      modalCloseBtn: document.getElementById('quickview-close-btn'),
      modalMainImg: document.getElementById('qv-main-img'),
      modalThumbs: document.getElementById('qv-thumbs'),
      modalTag: document.getElementById('qv-tag'),
      modalTitle: document.getElementById('qv-title'),
      modalPrice: document.getElementById('qv-price'),
      modalCert: document.getElementById('qv-cert'),
      modalDesc: document.getElementById('qv-desc'),
      modalSizes: document.getElementById('qv-sizes'),
      modalQtyVal: document.getElementById('qv-qty-val'),
      modalQtyMinus: document.getElementById('qv-qty-minus'),
      modalQtyPlus: document.getElementById('qv-qty-plus'),
      modalAddBtn: document.getElementById('qv-add-btn') || document.getElementById('qv-add-bag-btn'),
      modalSpecDetails: document.getElementById('qv-specs-details'),

      // Cart Drawer
      cartDrawer: document.getElementById('cart-drawer'),
      drawerBackdrop: document.getElementById('drawer-backdrop'),
      cartCloseBtn: document.getElementById('cart-close-btn'),
      cartItemsList: document.getElementById('cart-items-list'),
      cartSubtotal: document.getElementById('cart-subtotal'),
      cartShippingProgress: document.getElementById('cart-shipping-tracker'),
      cartShippingFill: document.getElementById('cart-shipping-fill'),
      cartShippingPercent: document.getElementById('cart-shipping-percent'),

      // Wishlist Drawer
      wishlistDrawer: document.getElementById('wishlist-drawer'),
      wishlistCloseBtn: document.getElementById('wishlist-close-btn'),
      wishlistItemsList: document.getElementById('wishlist-items-list'),

      // Video Controls
      cinematicVideo: document.getElementById('cinematic-video'),
      videoPlayBtn: document.getElementById('video-play-btn'),
      videoPlayIcon: document.getElementById('video-play-icon'),
      videoMuteBtn: document.getElementById('video-mute-btn'),
      videoMuteIcon: document.getElementById('video-mute-icon'),
      videoTimelineWrap: document.getElementById('video-timeline-wrap'),
      videoProgressBar: document.getElementById('video-progress-bar'),
      videoTimeReadout: document.getElementById('video-time-readout'),
      videoSpeedBtn: document.getElementById('video-speed-btn'),
      videoFullscreenBtn: document.getElementById('video-fullscreen-btn'),
      chapterBtns: document.querySelectorAll('.chapter-btn'),

      // Toast
      toast: document.getElementById('shop-toast') || document.getElementById('toast-notification'),
      toastMessage: document.getElementById('toast-message')
    };

    this.init();
  }

  init() {
    this.updateBadges();
    this.renderCategoriesGrid();
    this.renderNewArrivals();
    this.renderBestsellers();
    this.renderCatalog();
    this.initPriceSlider();
    this.bindSidebarFilters();
    this.updateCategoryCounts();
    this.bindEvents();
    this.bindScrollEffects();
    this.bindHideOnScroll();
    this.initCurrencySelector();
    this.bindVideoPlayer();
    this.initScrollReveals();
    this.initHeroBackgroundLoop();
    
    // Deep Link Quick View support
    const urlParams = new URLSearchParams(window.location.search);
    const qvParam = urlParams.get('quickview');
    if (qvParam) {
      setTimeout(() => this.openQuickView(qvParam), 150);
    }
  }

  // =========================================================================
  // RENDERING METHODS
  // =========================================================================

  renderCategoriesGrid() {
    if (!this.dom.categoriesGrid) return;
    this.dom.categoriesGrid.innerHTML = this.categories
      .map(
        (cat) => `
      <article class="category-card" data-category="${cat.name}">
        <div class="category-img-wrap">
          <img src="${cat.image}" alt="${cat.name}" class="category-img" loading="lazy">
          <div class="category-overlay"></div>
        </div>
        <div class="category-body">
          <h3 class="category-title">
            <span>${cat.name}</span>
            <svg class="category-title-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </h3>
          <span class="category-count">${cat.count} Creations</span>
        </div>
      </article>
    `
      )
      .join('');
  }

  renderProductCardHTML(product) {
    const isWishlisted = this.wishlist.some((item) => item.id === product.id);
    const formattedPrice = formatPrice(product.price);

    return `
      <article class="product-card group" data-id="${product.id}">
        <div class="product-card-thumb-wrap" data-action="quickview" data-id="${product.id}">
          ${product.badge ? `<span class="product-badge ${product.badge.includes('Haute') || product.badge.includes('Rare') ? 'burgundy' : ''}">${product.badge}</span>` : ''}
          <button type="button" class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" data-action="wishlist" data-id="${product.id}" aria-label="Save ${product.name} to Wishlist">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <img src="${product.primaryImage}" alt="${product.name}" class="product-thumb-primary" loading="lazy">
          
          <div class="product-quick-actions">
            <button type="button" class="btn-card-quickview" data-action="quickview" data-id="${product.id}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span class="btn-text-full">Quick View</span><span class="btn-text-short">View</span>
            </button>
            <button type="button" class="btn-card-addbag" data-action="add-to-bag" data-id="${product.id}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span class="btn-text-full">Add to Bag</span><span class="btn-text-short">+ Bag</span>
            </button>
          </div>
        </div>

        <div class="product-card-body">
          <div class="product-meta-row">
            <span class="product-category-tag">${product.category}</span>
            <span class="product-metal-tag">${product.metal}</span>
          </div>
          <h4 class="product-name" data-action="quickview" data-id="${product.id}">${product.name}</h4>
          <p class="product-specs-line">${product.carat ? product.carat + ' • ' : ''}${product.colorClarity}</p>
          <div class="product-price-row">
            <span class="product-price">${formattedPrice}</span>
            <span class="product-cert-seal">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              ${product.certification.split(' ')[0]}
            </span>
          </div>
        </div>
      </article>
    `;
  }

  renderNewArrivals() {
    if (!this.dom.newArrivalsGrid) return;
    let pool = this.products;
    if (this.currentDepartment && this.currentDepartment !== 'all') {
      pool = pool.filter((p) => p.department.toLowerCase() === this.currentDepartment.toLowerCase());
    }
    let items = pool.filter((p) => p.isNew);
    if (!items.length) items = pool;
    this.dom.newArrivalsGrid.innerHTML = items.slice(0, 4).map((p) => this.renderProductCardHTML(p)).join('');
  }

  renderBestsellers(tab = 'all') {
    if (!this.dom.bestsellersGrid) return;
    let pool = this.products;
    if (this.currentDepartment && this.currentDepartment !== 'all') {
      pool = pool.filter((p) => p.department.toLowerCase() === this.currentDepartment.toLowerCase());
    }
    let items = pool.filter((p) => p.isBestseller);
    if (!items.length) items = pool;
    if (tab === 'rings') items = items.filter((p) => p.category === 'Rings');
    if (tab === 'diamond') items = items.filter((p) => p.gemstone === 'Diamond');
    if (tab === 'emerald') items = items.filter((p) => p.gemstone === 'Emerald' || p.gemstone === 'Sapphire');

    this.dom.bestsellersGrid.innerHTML = items.slice(0, 4).map((p) => this.renderProductCardHTML(p)).join('');
  }

  renderCatalog() {
    if (!this.dom.catalogGrid) return;

    // Synchronize UI dropdowns with activeFilters
    if (this.dom.categoryFilter && this.dom.categoryFilter.value !== this.activeFilters.category) {
      this.dom.categoryFilter.value = this.activeFilters.category;
    }
    if (this.dom.metalFilter && this.dom.metalFilter.value !== this.activeFilters.metal) {
      this.dom.metalFilter.value = this.activeFilters.metal;
    }
    if (this.dom.gemstoneFilter && this.dom.gemstoneFilter.value !== this.activeFilters.gemstone) {
      this.dom.gemstoneFilter.value = this.activeFilters.gemstone;
    }
    if (this.dom.priceFilter && this.dom.priceFilter.value !== this.activeFilters.price) {
      this.dom.priceFilter.value = this.activeFilters.price;
    }

    // Synchronize department tabs
    document.querySelectorAll('.department-tab-btn').forEach((btn) => {
      const dept = btn.getAttribute('data-dept');
      if (dept === this.activeFilters.department) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    let filtered = [...this.products];

    // Filter by Department (Silver, Gold, Diamond, Gems)
    if (this.activeFilters.department && this.activeFilters.department !== 'all') {
      filtered = filtered.filter((p) => p.department.toLowerCase() === this.activeFilters.department.toLowerCase());
    }

    // Filter by Category
    if (this.activeFilters.category !== 'all') {
      if (this.activeFilters.category === 'Diamond Jewellery') {
        filtered = filtered.filter((p) => p.gemstone === 'Diamond');
      } else if (this.activeFilters.category === 'Gold Jewellery') {
        filtered = filtered.filter((p) => p.metal.includes('Gold'));
      } else if (this.activeFilters.category === 'Luxury Collections') {
        filtered = filtered.filter((p) => p.price >= 20000 || p.badge?.includes('Haute') || p.badge?.includes('Rare'));
      } else if (this.activeFilters.category === 'New Arrivals') {
        filtered = filtered.filter((p) => p.isNew);
      } else if (this.activeFilters.category === 'Gift Collections' || this.activeFilters.category === 'Gifts') {
        filtered = filtered.filter((p) => p.price <= 15000);
      } else {
        filtered = filtered.filter((p) => p.category.toLowerCase() === this.activeFilters.category.toLowerCase());
      }
    }

    // Filter by Metal
    if (this.activeFilters.metal !== 'all') {
      filtered = filtered.filter((p) => p.metal.toLowerCase().includes(this.activeFilters.metal.toLowerCase()));
    }

    // Filter by Gemstone
    if (this.activeFilters.gemstone !== 'all') {
      filtered = filtered.filter((p) => p.gemstone.toLowerCase() === this.activeFilters.gemstone.toLowerCase());
    }

    // Filter by Price Range Dropdown
    if (this.activeFilters.price !== 'all') {
      if (this.activeFilters.price === 'under-5000') filtered = filtered.filter((p) => p.price < 5000);
      else if (this.activeFilters.price === '5000-10000') filtered = filtered.filter((p) => p.price >= 5000 && p.price <= 10000);
      else if (this.activeFilters.price === '10000-25000') filtered = filtered.filter((p) => p.price > 10000 && p.price <= 25000);
      else if (this.activeFilters.price === '25000-plus') filtered = filtered.filter((p) => p.price > 25000);
    }

    // Filter by Scrollable Dual Price Slider ("From" — "To")
    if (typeof this.activeFilters.priceMin === 'number' || typeof this.activeFilters.priceMax === 'number') {
      const min = typeof this.activeFilters.priceMin === 'number' ? this.activeFilters.priceMin : 0;
      const max = typeof this.activeFilters.priceMax === 'number' ? this.activeFilters.priceMax : Infinity;
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    // Search Query
    if (this.activeFilters.search.trim()) {
      const q = this.activeFilters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.metal.toLowerCase().includes(q) ||
          p.gemstone.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (this.activeFilters.sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.activeFilters.sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.activeFilters.sort === 'newest') {
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (this.activeFilters.sort === 'bestseller') {
      filtered.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    // Update Counter
    if (this.dom.catalogCount) {
      this.dom.catalogCount.innerHTML = `Showing <strong>${filtered.length}</strong> creations`;
    }

    // Render Active Chips
    this.renderActiveChips();
    this.updateCategoryCounts();

    // Render Grid or Empty State
    if (filtered.length === 0) {
      this.dom.catalogGrid.style.display = 'none';
      if (this.dom.emptyState) this.dom.emptyState.style.display = 'block';
    } else {
      this.dom.catalogGrid.style.display = 'grid';
      if (this.dom.emptyState) this.dom.emptyState.style.display = 'none';
      this.dom.catalogGrid.innerHTML = filtered.map((p) => this.renderProductCardHTML(p)).join('');
    }
  }

  renderActiveChips() {
    if (!this.dom.activeChips) return;
    const chips = [];

    if (this.activeFilters.category !== 'all') {
      chips.push({ key: 'category', label: `Category: ${this.activeFilters.category}` });
    }
    if (this.activeFilters.metal !== 'all') {
      chips.push({ key: 'metal', label: `Metal: ${this.activeFilters.metal}` });
    }
    if (this.activeFilters.gemstone !== 'all') {
      chips.push({ key: 'gemstone', label: `Gem: ${this.activeFilters.gemstone}` });
    }
    if (this.activeFilters.price !== 'all') {
      const priceLabels = {
        'under-5000': 'Under $5,000',
        '5000-10000': '$5,000 – $10,000',
        '10000-25000': '$10,000 – $25,000',
        '25000-plus': '$25,000+'
      };
      chips.push({ key: 'price', label: priceLabels[this.activeFilters.price] || 'Price' });
    }
    if (this.activeFilters.priceMin > 0 || this.activeFilters.priceMax < 50000) {
      const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
      chips.push({ key: 'priceRange', label: `Price: ${fmt(this.activeFilters.priceMin)} – ${fmt(this.activeFilters.priceMax)}` });
    }
    if (this.activeFilters.search.trim()) {
      chips.push({ key: 'search', label: `"${this.activeFilters.search}"` });
    }

    if (chips.length === 0) {
      this.dom.activeChips.innerHTML = '';
      return;
    }

    this.dom.activeChips.innerHTML =
      chips
        .map(
          (c) => `
      <span class="active-chip">
        ${c.label}
        <button type="button" class="active-chip-remove" data-clear-key="${c.key}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </span>
    `
        )
        .join('') +
      `<button type="button" class="clear-all-btn" id="clear-all-filters-btn">Clear All</button>`;
  }

  filterCategory(cat) {
    this.activeFilters.category = cat;
    if (this.dom.categoryFilter) this.dom.categoryFilter.value = cat;
    document.querySelectorAll('.dept-cat-pill').forEach((pill) => {
      const pillCat = pill.getAttribute('data-cat') || 'all';
      if (pillCat.toLowerCase() === cat.toLowerCase()) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
    this.renderCatalog();
    document.getElementById('shop-catalog')?.scrollIntoView({ behavior: 'smooth' });
  }

  // =========================================================================
  // QUICK VIEW MODAL
  // =========================================================================

  openQuickView(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product || !this.dom.modalBackdrop) return;

    this.currentQuickViewProduct = product;
    this.selectedSize = product.sizes ? product.sizes[0] : null;
    this.selectedQty = 1;

    // Populate data safely
    if (this.dom.modalTag) this.dom.modalTag.textContent = product.collection || product.category || 'Fine Jewelry';
    if (this.dom.modalTitle) this.dom.modalTitle.textContent = product.name;
    if (this.dom.modalPrice) this.dom.modalPrice.textContent = formatPrice(product.price);
    if (this.dom.modalCert) this.dom.modalCert.textContent = product.certification || 'GIA Verified';
    if (this.dom.modalDesc) this.dom.modalDesc.textContent = product.description || '';
    if (this.dom.modalMainImg) {
      this.dom.modalMainImg.src = product.primaryImage;
      this.dom.modalMainImg.alt = product.name;
      this.dom.modalMainImg.onerror = () => {
        this.dom.modalMainImg.src = 'assets/images/products/Gold Section Image1.png';
      };
    }
    if (this.dom.modalQtyVal) this.dom.modalQtyVal.textContent = '1';

    // Thumbnails
    if (this.dom.modalThumbs) {
      const gallery = product.gallery || [product.primaryImage, product.hoverImage].filter(Boolean);
      this.dom.modalThumbs.innerHTML = gallery
        .map(
          (img, i) => `
        <div class="modal-thumb ${i === 0 ? 'active' : ''}" data-img="${img}">
          <img src="${img}" alt="${product.name} view ${i + 1}">
        </div>
      `
        )
        .join('');
    }

    // Sizes
    if (this.dom.modalSizes) {
      if (product.sizes && product.sizes.length > 0) {
        this.dom.modalSizes.innerHTML = product.sizes
          .map(
            (sz, i) => `
          <button type="button" class="size-pill ${i === 0 ? 'active' : ''}" data-size="${sz}">${sz}</button>
        `
          )
          .join('');
      } else {
        this.dom.modalSizes.innerHTML = '<span class="text-xs text-[#7A756D]">Standard Size</span>';
      }
    }

    // Specifications
    if (this.dom.modalSpecDetails) {
      const details = Array.isArray(product.details) && product.details.length > 0
        ? product.details
        : ['18K Solid Gold Atelier Craftsmanship', 'Conflict-Free Ethical Origin', 'Certified Natural Gemstones'];
      this.dom.modalSpecDetails.innerHTML = details.map((d) => `<li>${d}</li>`).join('');
    }

    // Show
    this.dom.modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeQuickView() {
    if (this.dom.modalBackdrop) {
      this.dom.modalBackdrop.classList.remove('active');
    }
    const allModals = document.querySelectorAll('.shop-modal-backdrop, .quickview-backdrop');
    allModals.forEach((m) => m.classList.remove('active'));
    document.body.style.overflow = '';
  }

  // =========================================================================
  // CART & WISHLIST LOGIC
  // =========================================================================

  ensureCartDrawerDOM() {
    if (document.getElementById('cart-drawer')) {
      this.refreshCartDOMRefs();
      return;
    }

    let root = document.getElementById('universal-cart-drawer-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'universal-cart-drawer-root';
      document.body.appendChild(root);
    }

    root.innerHTML = `
      <div class="shop-drawer-backdrop" id="drawer-backdrop"></div>

      <aside class="shop-cart-drawer" id="cart-drawer" aria-label="Shopping Bag">
        <div class="drawer-header">
          <h3 class="drawer-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span>Shopping Bag</span>
          </h3>
          <button type="button" class="drawer-close-btn" id="cart-close-btn" aria-label="Close Bag">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div class="cart-progress-box" id="cart-shipping-box">
          <div class="cart-progress-box-header">
            <span class="text-xs font-medium text-[#181715]" id="cart-shipping-tracker">Complimentary Armored Courier on orders over $5,000</span>
            <span class="text-xs font-bold text-aum-emerald" id="cart-shipping-percent">0%</span>
          </div>
          <div class="cart-progress-bar-track">
            <div class="cart-progress-bar-fill" id="cart-shipping-fill"></div>
          </div>
        </div>

        <div class="drawer-items-list" id="cart-items-list"></div>

        <div class="drawer-footer">
          <div class="drawer-subtotal-row">
            <span class="drawer-subtotal-lbl">Estimated Total</span>
            <span class="drawer-subtotal-val" id="cart-subtotal">$0</span>
          </div>
          <p class="drawer-subtotal-note">Sales taxes &amp; armored insurance calculated at checkout.</p>
          <button type="button" class="btn-drawer-checkout" id="cart-checkout-btn">
            Proceed To Secure Checkout
          </button>
          <div class="drawer-trust-badges">
            <span>GIA Verified</span>
            <span>•</span>
            <span>Armored Transit</span>
            <span>•</span>
            <span>30-Day Returns</span>
          </div>
        </div>
      </aside>

      <aside class="shop-cart-drawer" id="wishlist-drawer" aria-label="Curated Wishlist">
        <div class="drawer-header">
          <h3 class="drawer-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span>Curated Wishlist</span>
          </h3>
          <button type="button" class="drawer-close-btn" id="wishlist-close-btn" aria-label="Close Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div class="drawer-items-list" id="wishlist-items-list"></div>

        <div class="drawer-footer">
          <a href="shop.html" class="btn-drawer-checkout text-center block" id="wishlist-discover-btn">
            Discover Collections
          </a>
        </div>
      </aside>

      <div class="shop-toast" id="shop-toast" role="status" aria-live="polite">
        <div class="toast-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <span class="toast-message" id="toast-message">Creation added to bag</span>
        <button type="button" class="toast-view-bag" id="toast-view-bag-btn">View Bag &rarr;</button>
      </div>
    `;

    this.refreshCartDOMRefs();
  }

  refreshCartDOMRefs() {
    if (!this.dom) return;
    this.dom.cartDrawer = document.getElementById('cart-drawer');
    this.dom.drawerBackdrop = document.getElementById('drawer-backdrop');
    this.dom.cartCloseBtn = document.getElementById('cart-close-btn');
    this.dom.cartItemsList = document.getElementById('cart-items-list');
    this.dom.cartSubtotal = document.getElementById('cart-subtotal');
    this.dom.cartShippingProgress = document.getElementById('cart-shipping-tracker');
    this.dom.cartShippingFill = document.getElementById('cart-shipping-fill');
    this.dom.cartShippingPercent = document.getElementById('cart-shipping-percent');
    this.dom.wishlistDrawer = document.getElementById('wishlist-drawer');
    this.dom.wishlistCloseBtn = document.getElementById('wishlist-close-btn');
    this.dom.wishlistItemsList = document.getElementById('wishlist-items-list');
    this.dom.toast = document.getElementById('shop-toast') || document.getElementById('toast-notification');
    this.dom.toastMessage = document.getElementById('toast-message');
  }

  addToCart(productId, size = null, qty = 1, triggerBtn = null) {
    this.ensureCartDrawerDOM();

    if (triggerBtn && triggerBtn.classList) {
      const origHtml = triggerBtn.innerHTML;
      triggerBtn.classList.add('btn-added-feedback');
      triggerBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" style="display:inline-block; vertical-align:middle; margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg> Added to Bag!`;
      setTimeout(() => {
        triggerBtn.classList.remove('btn-added-feedback');
        triggerBtn.innerHTML = origHtml;
      }, 1800);
    }

    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const chosenSize = size || (product.sizes ? product.sizes[0] : 'Standard');
    const existingIndex = this.cart.findIndex(
      (item) => item.id === product.id && item.size === chosenSize
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].qty += qty;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.primaryImage,
        metal: product.metal,
        size: chosenSize,
        qty: qty
      });
    }

    this.saveCart();
    this.updateBadges();
    this.renderCartDrawer();
    this.openCartDrawer();
    this.showToast(`Added "${product.name}" to your Shopping Bag`);
  }

  updateCartQty(index, change) {
    if (!this.cart[index]) return;
    this.cart[index].qty += change;
    if (this.cart[index].qty <= 0) {
      this.cart.splice(index, 1);
    }
    this.saveCart();
    this.updateBadges();
    this.renderCartDrawer();
  }

  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.saveCart();
    this.updateBadges();
    this.renderCartDrawer();
  }

  saveCart() {
    localStorage.setItem('aum_group_cart', JSON.stringify(this.cart));
    localStorage.setItem('esceli_cart', JSON.stringify(this.cart));
  }

  toggleWishlist(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const index = this.wishlist.findIndex((item) => item.id === productId);
    let added = false;
    if (index > -1) {
      this.wishlist.splice(index, 1);
    } else {
      this.wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.primaryImage,
        metal: product.metal,
        category: product.category
      });
      added = true;
    }

    localStorage.setItem('aum_group_wishlist', JSON.stringify(this.wishlist));
    localStorage.setItem('esceli_wishlist', JSON.stringify(this.wishlist));
    this.updateBadges();

    // Update wishlist buttons across all visible cards
    document.querySelectorAll(`.product-wishlist-btn[data-id="${productId}"]`).forEach((btn) => {
      if (added) {
        btn.classList.add('active');
        btn.querySelector('svg').setAttribute('fill', 'currentColor');
      } else {
        btn.classList.remove('active');
        btn.querySelector('svg').setAttribute('fill', 'none');
      }
    });

    this.showToast(added ? `Saved "${product.name}" to Wishlist` : `Removed from Wishlist`);
  }

  updateBadges() {
    const totalCartCount = this.cart.reduce((acc, item) => acc + item.qty, 0);
    if (this.dom.cartBadge) {
      this.dom.cartBadge.textContent = totalCartCount;
    }
    if (this.dom.wishlistBadge) {
      this.dom.wishlistBadge.textContent = this.wishlist.length;
    }
  }

  openCartDrawer() {
    this.ensureCartDrawerDOM();
    this.closeWishlistDrawer();
    this.renderCartDrawer();
    if (this.dom.cartDrawer && this.dom.drawerBackdrop) {
      this.dom.cartDrawer.classList.add('active');
      this.dom.drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCartDrawer() {
    if (this.dom.cartDrawer && this.dom.drawerBackdrop) {
      this.dom.cartDrawer.classList.remove('active');
      this.dom.drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openWishlistDrawer() {
    this.closeCartDrawer();
    this.renderWishlistDrawer();
    if (this.dom.wishlistDrawer && this.dom.drawerBackdrop) {
      this.dom.wishlistDrawer.classList.add('active');
      this.dom.drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeWishlistDrawer() {
    if (this.dom.wishlistDrawer && this.dom.drawerBackdrop) {
      this.dom.wishlistDrawer.classList.remove('active');
      this.dom.drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  renderWishlistDrawer() {
    if (!this.dom.wishlistItemsList) return;

    if (this.wishlist.length === 0) {
      this.dom.wishlistItemsList.innerHTML = `
        <div class="text-center py-12">
          <svg class="w-12 h-12 mx-auto stroke-[#8C8C8C] mb-4" viewBox="0 0 24 24" fill="none" stroke-width="1.2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <p class="font-serif text-xl text-[#181715] mb-2">Your Wishlist is Empty</p>
          <p class="text-xs text-[#7A756D] mb-6">Tap the heart icon on any creation to save it to your personal curation.</p>
          <a href="#shop-catalog" class="shop-btn-primary" onclick="window.shopApp.closeWishlistDrawer();">Explore Catalog</a>
        </div>
      `;
      return;
    }

    this.dom.wishlistItemsList.innerHTML = this.wishlist
      .map(
        (item) => `
      <div class="drawer-item-row">
        <img src="${item.image}" alt="${item.name}" class="drawer-item-thumb">
        <div class="drawer-item-details">
          <h5 class="drawer-item-title">${item.name}</h5>
          <span class="drawer-item-meta">${item.metal} • ${item.category}</span>
          <div class="drawer-item-bottom">
            <span class="drawer-item-price">${formatPrice(item.price)}</span>
            <button type="button" class="btn-card-addbag text-[0.65rem] py-1 px-3 ml-2" data-action="add-to-bag" data-id="${item.id}">Add to Bag</button>
            <button type="button" class="drawer-item-remove ml-auto" data-action="wishlist" data-id="${item.id}">Remove</button>
          </div>
        </div>
      </div>
    `
      )
      .join('');
  }

  renderCartDrawer() {
    if (!this.dom.cartItemsList || !this.dom.cartSubtotal) return;

    if (this.cart.length === 0) {
      this.dom.cartItemsList.innerHTML = `
        <div class="text-center py-12">
          <svg class="w-12 h-12 mx-auto stroke-[#8C8C8C] mb-4" viewBox="0 0 24 24" fill="none" stroke-width="1.2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <p class="font-serif text-xl text-[#181715] mb-2">Your Shopping Bag is Empty</p>
          <p class="text-xs text-[#7A756D] mb-6">Discover timeless diamond creations and find your next signature piece.</p>
          <a href="#shop-catalog" class="shop-btn-primary" onclick="window.shopApp.closeCartDrawer();">Explore Catalog</a>
        </div>
      `;
      this.dom.cartSubtotal.textContent = formatPrice(0);
      if (this.dom.cartShippingProgress) {
        this.dom.cartShippingProgress.textContent = `Complimentary Armored Courier on orders over ${formatPrice(5000)}`;
      }
      if (this.dom.cartShippingFill) {
        this.dom.cartShippingFill.style.width = '0%';
      }
      if (this.dom.cartShippingPercent) {
        this.dom.cartShippingPercent.textContent = '0%';
      }
      return;
    }

    const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    this.dom.cartSubtotal.textContent = formatPrice(subtotal);

    const threshold = 5000;
    const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
    if (this.dom.cartShippingFill) {
      this.dom.cartShippingFill.style.width = `${pct}%`;
    }
    if (this.dom.cartShippingPercent) {
      this.dom.cartShippingPercent.textContent = `${pct}%`;
    }

    if (this.dom.cartShippingProgress) {
      if (subtotal >= threshold) {
        this.dom.cartShippingProgress.innerHTML = `✓ Qualified for <strong>Complimentary Armored Courier</strong>`;
      } else {
        const remaining = threshold - subtotal;
        this.dom.cartShippingProgress.innerHTML = `Add <strong>${formatPrice(remaining)}</strong> for Free Armored Courier`;
      }
    }

    this.dom.cartItemsList.innerHTML = this.cart
      .map(
        (item, index) => `
      <div class="drawer-item-row">
        <img src="${item.image}" alt="${item.name}" class="drawer-item-thumb">
        <div class="drawer-item-details">
          <h5 class="drawer-item-title">${item.name}</h5>
          <span class="drawer-item-meta">${item.metal} • ${item.size}</span>
          <div class="drawer-item-bottom">
            <span class="drawer-item-price">${formatPrice(item.price * item.qty)}</span>
            <div class="qty-stepper scale-90 origin-right">
              <button type="button" class="qty-btn" data-action="cart-minus" data-index="${index}">-</button>
              <span class="qty-val">${item.qty}</span>
              <button type="button" class="qty-btn" data-action="cart-plus" data-index="${index}">+</button>
            </div>
            <button type="button" class="drawer-item-remove" data-action="cart-remove" data-index="${index}">Remove</button>
          </div>
        </div>
      </div>
    `
      )
      .join('');
  }

  showToast(message) {
    this.ensureCartDrawerDOM();
    if (!this.dom.toast || !this.dom.toastMessage) return;
    this.dom.toastMessage.textContent = message;
    this.dom.toast.classList.add('active', 'show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.dom.toast.classList.remove('active', 'show');
    }, 3200);
  }

  // =========================================================================
  // VIDEO PLAYER
  // =========================================================================

  bindVideoPlayer() {
    if (!this.dom.cinematicVideo) return;

    // Time update listener for seekbar and readout
    this.dom.cinematicVideo.addEventListener('timeupdate', () => {
      const cur = this.dom.cinematicVideo.currentTime;
      const dur = this.dom.cinematicVideo.duration || 15;
      const pct = (cur / dur) * 100;
      if (this.dom.videoProgressBar) {
        this.dom.videoProgressBar.style.width = `${pct}%`;
      }
      if (this.dom.videoTimeReadout) {
        const curM = Math.floor(cur / 60);
        const curS = Math.floor(cur % 60).toString().padStart(2, '0');
        const durM = Math.floor(dur / 60);
        const durS = Math.floor(dur % 60).toString().padStart(2, '0');
        this.dom.videoTimeReadout.textContent = `${curM}:${curS} / ${durM}:${durS}`;
      }
    });

    // Timeline Scrubbing
    if (this.dom.videoTimelineWrap) {
      this.dom.videoTimelineWrap.addEventListener('click', (e) => {
        const rect = this.dom.videoTimelineWrap.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const dur = this.dom.cinematicVideo.duration || 15;
        this.dom.cinematicVideo.currentTime = Math.max(0, Math.min(dur, pos * dur));
      });
    }

    if (this.dom.videoPlayBtn) {
      this.dom.videoPlayBtn.addEventListener('click', () => {
        if (this.dom.cinematicVideo.paused) {
          this.dom.cinematicVideo.play();
          this.dom.videoPlayBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          `;
        } else {
          this.dom.cinematicVideo.pause();
          this.dom.videoPlayBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          `;
        }
      });
    }

    if (this.dom.videoMuteBtn) {
      this.dom.videoMuteBtn.addEventListener('click', () => {
        this.dom.cinematicVideo.muted = !this.dom.cinematicVideo.muted;
        this.dom.videoMuteBtn.innerHTML = this.dom.cinematicVideo.muted
          ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`
          : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
      });
    }

    // Playback Speed Toggle (1.0x -> 0.75x -> 1.25x)
    if (this.dom.videoSpeedBtn) {
      const speeds = [1.0, 0.75, 1.25];
      let speedIdx = 0;
      this.dom.videoSpeedBtn.addEventListener('click', () => {
        speedIdx = (speedIdx + 1) % speeds.length;
        const spd = speeds[speedIdx];
        this.dom.cinematicVideo.playbackRate = spd;
        const span = this.dom.videoSpeedBtn.querySelector('span');
        if (span) span.textContent = `${spd.toFixed(1)}x`;
      });
    }

    // Fullscreen Toggle
    if (this.dom.videoFullscreenBtn) {
      this.dom.videoFullscreenBtn.addEventListener('click', () => {
        const frame = document.querySelector('.cinematic-player-frame');
        if (!document.fullscreenElement) {
          frame?.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      });
    }

    // Chapters
    this.dom.chapterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.dom.chapterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const videoSrc = btn.getAttribute('data-video');
        if (videoSrc && this.dom.cinematicVideo) {
          this.dom.cinematicVideo.src = videoSrc;
          this.dom.cinematicVideo.play();
        }
      });
    });
  }

  // =========================================================================
  // EVENT BINDINGS
  // =========================================================================

  bindEvents() {
    // Delegated Modal Close
    document.addEventListener('click', (e) => {
      if (
        e.target.closest('#quickview-close-btn') ||
        e.target.closest('.modal-close-btn') ||
        e.target.closest('.quickview-close-btn')
      ) {
        this.closeQuickView();
      }
    });

    // Product card video play/pause on hover
    document.addEventListener('mouseover', (e) => {
      const card = e.target.closest('.product-card');
      if (card && !card.dataset.playing) {
        card.dataset.playing = 'true';
        const vid = card.querySelector('.card-video-loop');
        if (vid && vid.paused) {
          vid.play().catch(() => {});
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const card = e.target.closest('.product-card');
      if (card && !card.contains(e.relatedTarget)) {
        delete card.dataset.playing;
        const vid = card.querySelector('.card-video-loop');
        if (vid && !vid.paused) {
          vid.pause();
          vid.currentTime = 0;
        }
      }
    });

    // Delegated click handling across products & buttons
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;

      const action = target.getAttribute('data-action');
      const id = target.getAttribute('data-id');
      const index = target.getAttribute('data-index');

      if (action === 'quickview') {
        e.preventDefault();
        this.openQuickView(id);
      } else if (action === 'add-to-bag') {
        e.preventDefault();
        const btn = target.closest('button') || target;
        this.addToCart(id, null, 1, btn);
      } else if (action === 'inquire') {
        e.preventDefault();
        const prod = this.products.find(p => p.id === id);
        if (prod) {
          window.location.href = `contact.html?inquiry=${encodeURIComponent(prod.name)}`;
        }
      } else if (action === 'wishlist') {
        e.preventDefault();
        this.toggleWishlist(id);
      } else if (action === 'cart-minus') {
        this.updateCartQty(parseInt(index, 10), -1);
      } else if (action === 'cart-plus') {
        this.updateCartQty(parseInt(index, 10), 1);
      } else if (action === 'cart-remove') {
        this.removeFromCart(parseInt(index, 10));
      }
    });

    // Category Navigation Pills inside Department Pages
    document.querySelectorAll('.dept-cat-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        const cat = pill.getAttribute('data-cat') || 'all';
        document.querySelectorAll('.dept-cat-pill').forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        this.filterCategory(cat);
      });
    });

    // Department Filter Tab Switcher (All, Silver, Gold, Diamond, Gems)
    document.querySelectorAll('.department-tab-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const dept = btn.getAttribute('data-dept');
        document.querySelectorAll('.department-tab-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilters.department = dept;
        this.renderCatalog();
      });
    });

    // Category Card Clicks -> Jump to Catalog with filter
    if (this.dom.categoriesGrid) {
      this.dom.categoriesGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.category-card');
        if (!card) return;
        const categoryName = card.getAttribute('data-category');
        this.activeFilters.category = categoryName;
        if (this.dom.categoryFilter) this.dom.categoryFilter.value = categoryName;
        this.renderCatalog();
        const catalogEl = document.getElementById('shop-catalog');
        if (catalogEl) {
          catalogEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Filter controls change
    if (this.dom.categoryFilter) {
      this.dom.categoryFilter.addEventListener('change', (e) => {
        this.activeFilters.category = e.target.value;
        this.renderCatalog();
      });
    }
    if (this.dom.metalFilter) {
      this.dom.metalFilter.addEventListener('change', (e) => {
        this.activeFilters.metal = e.target.value;
        this.renderCatalog();
      });
    }
    if (this.dom.gemstoneFilter) {
      this.dom.gemstoneFilter.addEventListener('change', (e) => {
        this.activeFilters.gemstone = e.target.value;
        this.renderCatalog();
      });
    }
    if (this.dom.priceFilter) {
      this.dom.priceFilter.addEventListener('change', (e) => {
        this.activeFilters.price = e.target.value;
        this.renderCatalog();
      });
    }
    if (this.dom.sortSelect) {
      this.dom.sortSelect.addEventListener('change', (e) => {
        this.activeFilters.sort = e.target.value;
        this.renderCatalog();
      });
    }
    if (this.dom.searchInput) {
      this.dom.searchInput.addEventListener('input', (e) => {
        this.activeFilters.search = e.target.value;
        this.renderCatalog();
      });
    }

    // Clear filter chips
    if (this.dom.activeChips) {
      this.dom.activeChips.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('[data-clear-key]');
        if (removeBtn) {
          const key = removeBtn.getAttribute('data-clear-key');
          if (key === 'priceRange') {
            this.activeFilters.priceMin = 0;
            this.activeFilters.priceMax = 50000;
            if (this.dom.priceSliderMin) this.dom.priceSliderMin.value = 0;
            if (this.dom.priceSliderMax) this.dom.priceSliderMax.value = 50000;
            if (this.dom.priceInputMin) this.dom.priceInputMin.value = 0;
            if (this.dom.priceInputMax) this.dom.priceInputMax.value = 50000;
            if (this.dom.priceSliderFill) {
              this.dom.priceSliderFill.style.left = '0%';
              this.dom.priceSliderFill.style.width = '100%';
            }
            if (this.dom.priceDisplay) this.dom.priceDisplay.textContent = '$0 — $50,000';
            this.renderCatalog();
            return;
          }
          this.activeFilters[key] = key === 'search' ? '' : 'all';
          const inputMap = {
            category: this.dom.categoryFilter,
            metal: this.dom.metalFilter,
            gemstone: this.dom.gemstoneFilter,
            price: this.dom.priceFilter,
            search: this.dom.searchInput
          };
          if (inputMap[key]) inputMap[key].value = key === 'search' ? '' : 'all';
          this.renderCatalog();
        }

        if (e.target.closest('#clear-all-filters-btn')) {
          this.resetFilters();
        }
      });
    }

    // Quick View Thumbnail Click
    if (this.dom.modalThumbs) {
      this.dom.modalThumbs.addEventListener('click', (e) => {
        const thumb = e.target.closest('.modal-thumb');
        if (!thumb) return;
        this.dom.modalThumbs.querySelectorAll('.modal-thumb').forEach((t) => t.classList.remove('active'));
        thumb.classList.add('active');
        const src = thumb.getAttribute('data-img');
        if (src && this.dom.modalMainImg) this.dom.modalMainImg.src = src;
      });
    }

    // Quick View Size Selection
    if (this.dom.modalSizes) {
      this.dom.modalSizes.addEventListener('click', (e) => {
        const pill = e.target.closest('.size-pill');
        if (!pill) return;
        this.dom.modalSizes.querySelectorAll('.size-pill').forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        this.selectedSize = pill.getAttribute('data-size');
      });
    }

    // Quick View Stepper
    if (this.dom.modalQtyMinus) {
      this.dom.modalQtyMinus.addEventListener('click', () => {
        if (this.selectedQty > 1) {
          this.selectedQty--;
          this.dom.modalQtyVal.textContent = this.selectedQty;
        }
      });
    }
    if (this.dom.modalQtyPlus) {
      this.dom.modalQtyPlus.addEventListener('click', () => {
        this.selectedQty++;
        this.dom.modalQtyVal.textContent = this.selectedQty;
      });
    }

    // Quick View Add to Bag
    if (this.dom.modalAddBtn) {
      this.dom.modalAddBtn.addEventListener('click', () => {
        if (this.currentQuickViewProduct) {
          this.addToCart(this.currentQuickViewProduct.id, this.selectedSize, this.selectedQty, this.dom.modalAddBtn);
          this.closeQuickView();
        }
      });
    }

    // Modal Close
    if (this.dom.modalCloseBtn) {
      this.dom.modalCloseBtn.addEventListener('click', () => this.closeQuickView());
    }
    if (this.dom.modalBackdrop) {
      this.dom.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.dom.modalBackdrop) this.closeQuickView();
      });
    }

    // Cart Drawer Toggle
    if (this.dom.cartBtn) {
      this.dom.cartBtn.addEventListener('click', () => this.openCartDrawer());
    }
    if (this.dom.cartCloseBtn) {
      this.dom.cartCloseBtn.addEventListener('click', () => this.closeCartDrawer());
    }

    // Wishlist Drawer Toggle
    if (this.dom.wishlistBtn) {
      this.dom.wishlistBtn.addEventListener('click', () => this.openWishlistDrawer());
    }
    if (this.dom.wishlistCloseBtn) {
      this.dom.wishlistCloseBtn.addEventListener('click', () => this.closeWishlistDrawer());
    }

    if (this.dom.drawerBackdrop) {
      this.dom.drawerBackdrop.addEventListener('click', () => {
        this.closeCartDrawer();
        this.closeWishlistDrawer();
        if (this.dom.filterSidebar) {
          this.dom.filterSidebar.classList.remove('mobile-open');
        }
        this.dom.drawerBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Mobile Navbar Drawer Toggle
    if (this.dom.mobileToggle) {
      this.dom.mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.dom.mobileDrawer) this.dom.mobileDrawer.classList.add('open');
        if (this.dom.drawerOverlay) this.dom.drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (this.dom.drawerCloseBtn) {
      this.dom.drawerCloseBtn.addEventListener('click', () => {
        if (this.dom.mobileDrawer) this.dom.mobileDrawer.classList.remove('open');
        if (this.dom.drawerOverlay) this.dom.drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    if (this.dom.drawerOverlay) {
      this.dom.drawerOverlay.addEventListener('click', () => {
        if (this.dom.mobileDrawer) this.dom.mobileDrawer.classList.remove('open');
        if (this.dom.drawerOverlay) this.dom.drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Bestseller Category Tabs
    document.querySelectorAll('.bestseller-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bestseller-tab-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        this.renderBestsellers(tab);
      });
    });

    // Accordions
    document.querySelectorAll('.accordion-header').forEach((hdr) => {
      hdr.addEventListener('click', () => {
        const item = hdr.closest('.accordion-item');
        item.classList.toggle('open');
      });
    });

    // Toast "View Bag" shortcut
    const toastViewBag = document.getElementById('toast-view-bag-btn');
    if (toastViewBag) {
      toastViewBag.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCartDrawer();
      });
    }

    // Checkout Action (WhatsApp Concierge Atelier Inquiry)
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (this.cart.length === 0) {
          this.showToast('Your Shopping Bag is empty.');
          return;
        }
        this.proceedToCheckout();
      });
    }

    // Keyboard ESC to close modals/drawers
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeQuickView();
        this.closeCartDrawer();
        this.closeWishlistDrawer();
        if (this.dom.mobileDrawer) this.dom.mobileDrawer.classList.remove('open');
        if (this.dom.drawerOverlay) this.dom.drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  proceedToCheckout() {
    if (!this.cart || this.cart.length === 0) {
      this.showToast('Your Shopping Bag is empty.');
      return;
    }
    let subtotal = 0;
    const itemLines = this.cart.map((item, idx) => {
      const price = item.price || 0;
      const qty = item.qty || 1;
      const total = price * qty;
      subtotal += total;
      return `${idx + 1}. ${item.name} (Qty: ${qty}, Size: ${item.size || 'Standard'}) - ${formatPrice(total)}`;
    }).join('\n');

    const totalText = formatPrice(subtotal);
    const message = `Hello AUM GROUP INC. Atelier,\n\nI would like to acquire the following bespoke creations from my Shopping Bag:\n\n${itemLines}\n\nEstimated Subtotal: ${totalText}\n\nPlease confirm gemstone availability, bespoke sizing, and insured armored courier transit.`;

    const waUrl = `https://wa.me/918108070022?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  resetFilters() {
    this.activeFilters = {
      department: this.currentDepartment || 'all',
      category: 'all',
      metal: 'all',
      gemstone: 'all',
      price: 'all',
      priceMin: 0,
      priceMax: 50000,
      search: '',
      sort: 'featured'
    };
    if (this.dom.categoryFilter) this.dom.categoryFilter.value = 'all';
    if (this.dom.metalFilter) this.dom.metalFilter.value = 'all';
    if (this.dom.gemstoneFilter) this.dom.gemstoneFilter.value = 'all';
    if (this.dom.priceFilter) this.dom.priceFilter.value = 'all';
    if (this.dom.sortSelect) this.dom.sortSelect.value = 'featured';
    if (this.dom.searchInput) this.dom.searchInput.value = '';

    // Reset sidebar radios
    document.querySelectorAll('[data-sidebar-cat]').forEach((item) => {
      const isAll = item.getAttribute('data-sidebar-cat') === 'all';
      item.classList.toggle('active', isAll);
      const radio = item.querySelector('input[type="radio"]');
      if (radio) radio.checked = isAll;
    });

    document.querySelectorAll('[data-sidebar-metal]').forEach((item) => {
      const isAll = item.getAttribute('data-sidebar-metal') === 'all';
      item.classList.toggle('active', isAll);
      const radio = item.querySelector('input[type="radio"]');
      if (radio) radio.checked = isAll;
    });

    document.querySelectorAll('[data-sidebar-gemstone]').forEach((item) => {
      const isAll = item.getAttribute('data-sidebar-gemstone') === 'all';
      item.classList.toggle('active', isAll);
      const radio = item.querySelector('input[type="radio"]');
      if (radio) radio.checked = isAll;
    });

    // Reset Price Slider
    if (this.dom.priceSliderMin) this.dom.priceSliderMin.value = 0;
    if (this.dom.priceSliderMax) this.dom.priceSliderMax.value = 50000;
    if (this.dom.priceInputMin) this.dom.priceInputMin.value = 0;
    if (this.dom.priceInputMax) this.dom.priceInputMax.value = 50000;
    if (this.dom.priceSliderFill) {
      this.dom.priceSliderFill.style.left = '0%';
      this.dom.priceSliderFill.style.width = '100%';
    }
    this.updatePriceSliderDisplay();

    this.renderCatalog();
  }

  updatePriceSliderDisplay(code = null) {
    const activeCode = code || getActiveCurrency();
    const curr = EXPORT_CURRENCIES[activeCode] || EXPORT_CURRENCIES.USD;
    const minVal = this.activeFilters.priceMin || 0;
    const maxVal = this.activeFilters.priceMax || 50000;

    if (this.dom.priceDisplay) {
      this.dom.priceDisplay.textContent = `${formatPrice(minVal, activeCode)} — ${formatPrice(maxVal, activeCode)}`;
    }

    document.querySelectorAll('.price-box span:not(.price-box-separator), .currency-symbol').forEach((el) => {
      el.textContent = curr.symbol.trim();
    });
  }

  initPriceSlider() {
    const sliderMin = this.dom.priceSliderMin;
    const sliderMax = this.dom.priceSliderMax;
    const inputMin = this.dom.priceInputMin;
    const inputMax = this.dom.priceInputMax;
    const fill = this.dom.priceSliderFill;
    const display = this.dom.priceDisplay;

    if (!sliderMin || !sliderMax) return;

    const minGap = 500;
    const maxLimit = parseInt(sliderMax.max, 10) || 50000;

    const updateSlider = (minVal, maxVal) => {
      minVal = Math.max(0, Math.min(minVal, maxVal - minGap));
      maxVal = Math.min(maxLimit, Math.max(maxVal, minVal + minGap));

      sliderMin.value = minVal;
      sliderMax.value = maxVal;
      if (inputMin) inputMin.value = minVal;
      if (inputMax) inputMax.value = maxVal;

      const minPercent = (minVal / maxLimit) * 100;
      const maxPercent = (maxVal / maxLimit) * 100;

      if (fill) {
        fill.style.left = `${minPercent}%`;
        fill.style.width = `${maxPercent - minPercent}%`;
      }

      if (display) {
        display.textContent = `${formatPrice(minVal)} — ${formatPrice(maxVal)}`;
      }

      this.activeFilters.priceMin = minVal;
      this.activeFilters.priceMax = maxVal;
      this.renderCatalog();
    };

    sliderMin.addEventListener('input', () => {
      let minVal = parseInt(sliderMin.value, 10);
      let maxVal = parseInt(sliderMax.value, 10);
      if (maxVal - minVal < minGap) {
        sliderMin.value = maxVal - minGap;
        minVal = maxVal - minGap;
      }
      updateSlider(minVal, maxVal);
    });

    sliderMax.addEventListener('input', () => {
      let minVal = parseInt(sliderMin.value, 10);
      let maxVal = parseInt(sliderMax.value, 10);
      if (maxVal - minVal < minGap) {
        sliderMax.value = minVal + minGap;
        maxVal = minVal + minGap;
      }
      updateSlider(minVal, maxVal);
    });

    if (inputMin) {
      inputMin.addEventListener('change', () => {
        let minVal = parseInt(inputMin.value, 10) || 0;
        let maxVal = parseInt(sliderMax.value, 10);
        updateSlider(minVal, maxVal);
      });
    }

    if (inputMax) {
      inputMax.addEventListener('change', () => {
        let minVal = parseInt(sliderMin.value, 10);
        let maxVal = parseInt(inputMax.value, 10) || maxLimit;
        updateSlider(minVal, maxVal);
      });
    }

    // Initialize display with active currency
    this.updatePriceSliderDisplay();
  }

  bindSidebarFilters() {
    // Category click on sidebar
    document.querySelectorAll('[data-sidebar-cat]').forEach((el) => {
      el.addEventListener('click', () => {
        const cat = el.getAttribute('data-sidebar-cat');
        this.activeFilters.category = cat;

        document.querySelectorAll('[data-sidebar-cat]').forEach((item) => {
          const radio = item.querySelector('input[type="radio"]');
          if (item.getAttribute('data-sidebar-cat') === cat) {
            item.classList.add('active');
            if (radio) radio.checked = true;
          } else {
            item.classList.remove('active');
            if (radio) radio.checked = false;
          }
        });

        // Sync category select dropdown if present
        if (this.dom.categoryFilter) {
          this.dom.categoryFilter.value = cat;
        }

        // Sync department category pills if present
        document.querySelectorAll('.dept-cat-pill').forEach((pill) => {
          if (pill.getAttribute('data-cat') === cat) pill.classList.add('active');
          else pill.classList.remove('active');
        });

        this.renderCatalog();
      });
    });

    // Metal click on sidebar
    document.querySelectorAll('[data-sidebar-metal]').forEach((el) => {
      el.addEventListener('click', () => {
        const metal = el.getAttribute('data-sidebar-metal');
        this.activeFilters.metal = metal;

        document.querySelectorAll('[data-sidebar-metal]').forEach((item) => {
          const radio = item.querySelector('input[type="radio"]');
          if (item.getAttribute('data-sidebar-metal') === metal) {
            item.classList.add('active');
            if (radio) radio.checked = true;
          } else {
            item.classList.remove('active');
            if (radio) radio.checked = false;
          }
        });

        if (this.dom.metalFilter) {
          this.dom.metalFilter.value = metal;
        }

        this.renderCatalog();
      });
    });

    // Gemstone click on sidebar
    document.querySelectorAll('[data-sidebar-gemstone]').forEach((el) => {
      el.addEventListener('click', () => {
        const gem = el.getAttribute('data-sidebar-gemstone');
        this.activeFilters.gemstone = gem;

        document.querySelectorAll('[data-sidebar-gemstone]').forEach((item) => {
          const radio = item.querySelector('input[type="radio"]');
          if (item.getAttribute('data-sidebar-gemstone') === gem) {
            item.classList.add('active');
            if (radio) radio.checked = true;
          } else {
            item.classList.remove('active');
            if (radio) radio.checked = false;
          }
        });

        if (this.dom.gemstoneFilter) {
          this.dom.gemstoneFilter.value = gem;
        }

        this.renderCatalog();
      });
    });

    // Reset button
    if (this.dom.sidebarResetBtn) {
      this.dom.sidebarResetBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }

    // Mobile filter toggle
    if (this.dom.mobileFilterToggle && this.dom.filterSidebar) {
      this.dom.mobileFilterToggle.addEventListener('click', () => {
        const isOpen = this.dom.filterSidebar.classList.toggle('mobile-open');
        if (this.dom.drawerBackdrop) {
          this.dom.drawerBackdrop.classList.toggle('active', isOpen);
        }
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
    }
    if (this.dom.mobileFilterClose && this.dom.filterSidebar) {
      this.dom.mobileFilterClose.addEventListener('click', () => {
        this.dom.filterSidebar.classList.remove('mobile-open');
        if (this.dom.drawerBackdrop) {
          this.dom.drawerBackdrop.classList.remove('active');
        }
        document.body.style.overflow = '';
      });
    }
  }

  updateCategoryCounts() {
    let pool = [...this.products];
    if (this.activeFilters.department && this.activeFilters.department !== 'all') {
      pool = pool.filter((p) => p.department.toLowerCase() === this.activeFilters.department.toLowerCase());
    }
    const setTxt = (id, count) => {
      const el = document.getElementById(id);
      if (el) el.textContent = count;
    };
    setTxt('count-cat-all', pool.length);
    setTxt('count-cat-rings', pool.filter((p) => p.category.toLowerCase() === 'rings').length);
    setTxt('count-cat-necklaces', pool.filter((p) => p.category.toLowerCase() === 'necklaces').length);
    setTxt('count-cat-earrings', pool.filter((p) => p.category.toLowerCase() === 'earrings').length);
    setTxt('count-cat-bracelets', pool.filter((p) => p.category.toLowerCase().includes('bracelet') || p.category.toLowerCase().includes('brooch')).length);
    setTxt('count-cat-pendants', pool.filter((p) => p.category.toLowerCase() === 'pendants').length);
  }

  bindScrollEffects() {
    window.addEventListener(
      'scroll',
      () => {
        if (!this.dom.navbar) return;
        if (window.scrollY > 40) {
          this.dom.navbar.classList.add('scrolled');
        } else {
          this.dom.navbar.classList.remove('scrolled');
        }
      },
      { passive: true }
    );
  }

  bindHideOnScroll() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    const updateNavHeight = () => {
      const height = nav.offsetHeight || 136;
      document.documentElement.style.setProperty('--nav-h', `${height}px`);
    };
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight, { passive: true });

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const drawerOpen = this.dom.mobileDrawer && this.dom.mobileDrawer.classList.contains('open');

      if (drawerOpen) {
        nav.classList.remove('nav-hidden');
        return;
      }

      if (currentScrollY <= 30) {
        nav.classList.remove('nav-hidden');
      } else if (currentScrollY > lastScrollY + 8 && currentScrollY > 120) {
        nav.classList.add('nav-hidden');
      } else if (currentScrollY < lastScrollY - 6) {
        nav.classList.remove('nav-hidden');
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  onCurrencyChanged(code = null) {
    const activeCode = code || getActiveCurrency();
    const curr = EXPORT_CURRENCIES[activeCode] || EXPORT_CURRENCIES.USD;

    // 1. Update dropdown header UI
    const label = document.getElementById('currency-current');
    const flag = document.getElementById('currency-flag');
    if (label) label.textContent = curr.label;
    if (flag) flag.textContent = curr.flag;
    const selector = document.getElementById('currency-selector');
    if (selector) {
      selector.querySelectorAll('.currency-option').forEach((opt) => {
        opt.classList.toggle('active', opt.getAttribute('data-currency') === activeCode);
      });
    }

    // 2. Re-render all product grids
    this.renderCatalog();
    this.renderNewArrivals();
    this.renderBestsellers();

    // 3. Re-render drawers
    this.renderCartDrawer();
    this.renderWishlistDrawer();

    // 4. Update Quick View modal if open
    if (this.currentQuickViewProduct && this.dom.modalPrice) {
      this.dom.modalPrice.textContent = formatPrice(this.currentQuickViewProduct.price, activeCode);
    }

    // 5. Update price slider display & currency symbols
    this.updatePriceSliderDisplay(activeCode);

    // 6. Update any generic data-usd elements on page
    if (typeof updateAllDomPrices === 'function') {
      updateAllDomPrices(activeCode);
    }
  }

  initCurrencySelector() {
    const selector = document.getElementById('currency-selector');
    const btn = document.getElementById('currency-btn');
    if (!selector || !btn) return;

    this.onCurrencyChanged(getActiveCurrency());

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      selector.classList.toggle('open');
    });

    selector.querySelectorAll('.currency-option').forEach((opt) => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = opt.getAttribute('data-currency');
        if (code && EXPORT_CURRENCIES[code]) {
          localStorage.setItem('aum_selected_currency', code);
          selector.classList.remove('open');
          this.onCurrencyChanged(code);
          window.dispatchEvent(new CustomEvent('currencyChanged', { detail: { currency: code } }));
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!selector.contains(e.target)) {
        selector.classList.remove('open');
      }
    });

    window.addEventListener('currencyChanged', (e) => {
      this.onCurrencyChanged(e.detail?.currency);
    });

    window.addEventListener('currencyRatesUpdated', () => {
      this.onCurrencyChanged();
    });
  }

  initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove('pending-reveal');
              entry.target.classList.add('is-revealed');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: '100px 0px 100px 0px' }
      );
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top > window.innerHeight + 120) {
          el.classList.add('pending-reveal');
          observer.observe(el);
        } else {
          el.classList.add('is-revealed');
        }
      });
    } else {
      reveals.forEach((el) => el.classList.add('is-revealed'));
    }
  }

  initHeroBackgroundLoop() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-slide-dot');
    if (!slides.length) return;

    let currentIndex = 0;
    let timer = null;

    const showSlide = (idx) => {
      slides.forEach((s, i) => {
        if (i === idx) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
      dots.forEach((d, i) => {
        if (i === idx) {
          d.classList.add('active');
        } else {
          d.classList.remove('active');
        }
      });
      currentIndex = idx;
    };

    const nextSlide = () => {
      const next = (currentIndex + 1) % slides.length;
      showSlide(next);
    };

    const startTimer = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(nextSlide, 5500);
    };

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        startTimer();
      });
    });

    startTimer();
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.shopApp = window.aumGroupShopApp = new AumGroupShopApp();
});
