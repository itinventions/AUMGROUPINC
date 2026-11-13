/**
 * AUM GROUP INC / GEMORÉ FINE JEWELLERY & GEMS
 * Replicated 2-Tier Luxury Navbar Component & Interactive Controls (v2.0)
 */

export const EXPORT_CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, flag: '🇺🇸', label: 'USD ($)', country: 'USA' },
  EUR: { symbol: '€', rate: 0.90, flag: '🇪🇺', label: 'EUR (€)', country: 'Europe' },
  GBP: { symbol: '£', rate: 0.75, flag: '🇬🇧', label: 'GBP (£)', country: 'UK' },
  CAD: { symbol: 'CA$', rate: 1.42, flag: '🇨🇦', label: 'CAD (C$)', country: 'Canada' },
  AED: { symbol: 'AED ', rate: 3.67, flag: '🇦🇪', label: 'AED (د.إ)', country: 'UAE' },
  CHF: { symbol: 'CHF ', rate: 0.82, flag: '🇨🇭', label: 'CHF (Fr)', country: 'Switzerland' },
  THB: { symbol: '฿', rate: 33.6, flag: '🇹🇭', label: 'THB (฿)', country: 'Thailand' },
  IDR: { symbol: 'Rp ', rate: 18100, flag: '🇮🇩', label: 'IDR (Rp)', country: 'Indonesia' },
  INR: { symbol: '₹', rate: 93.9, flag: '🇮🇳', label: 'INR (₹)', country: 'India' }
};

export function getActiveCurrency() {
  return localStorage.getItem('aum_selected_currency') || 'USD';
}

export function formatPrice(usdAmount, currencyCode = null) {
  const code = currencyCode || getActiveCurrency();
  const curr = EXPORT_CURRENCIES[code] || EXPORT_CURRENCIES.USD;
  const num = Number(usdAmount) || 0;
  const converted = Math.round(num * curr.rate);

  const localeMap = {
    INR: 'en-IN',
    EUR: 'de-DE',
    GBP: 'en-GB',
    CAD: 'en-CA',
    USD: 'en-US',
    AED: 'en-AE',
    CHF: 'de-CH',
    THB: 'th-TH',
    IDR: 'id-ID'
  };

  let formattedNumber;
  try {
    formattedNumber = converted.toLocaleString(localeMap[code] || 'en-US');
  } catch (e) {
    formattedNumber = converted.toLocaleString();
  }
  return curr.symbol + formattedNumber;
}

export function updateAllDomPrices(currencyCode = null) {
  const code = currencyCode || getActiveCurrency();
  const curr = EXPORT_CURRENCIES[code] || EXPORT_CURRENCIES.USD;

  // 1. Update all elements with data-usd
  document.querySelectorAll('[data-usd]').forEach((el) => {
    const usd = parseFloat(el.getAttribute('data-usd'));
    if (!isNaN(usd)) {
      el.textContent = formatPrice(usd, code);
    }
  });

  // 2. Update all currency symbols in price inputs
  document.querySelectorAll('.price-box span:not(.price-box-separator), .currency-symbol').forEach((el) => {
    el.textContent = curr.symbol.trim();
  });

  // 3. Update cart shipping tracker if present
  const trackerEl = document.getElementById('cart-shipping-tracker');
  if (trackerEl) {
    try {
      const cart = JSON.parse(localStorage.getItem('aum_group_cart') || localStorage.getItem('esceli_cart') || '[]');
      const subtotal = cart.reduce((sum, item) => sum + (item.price || item.usdPrice || 0) * (item.qty || 1), 0);
      const threshold = 5000;
      if (subtotal >= threshold) {
        trackerEl.innerHTML = '✓ Qualified for <strong>Complimentary Armored Courier</strong>';
      } else if (subtotal > 0) {
        const remaining = threshold - subtotal;
        trackerEl.innerHTML = `Add <strong>${formatPrice(remaining, code)}</strong> for Free Armored Courier`;
      } else {
        trackerEl.textContent = `Complimentary Armored Courier on orders over ${formatPrice(threshold, code)}`;
      }
    } catch (e) {}
  }
}

function applyApiRates(apiRates) {
  for (const code of Object.keys(EXPORT_CURRENCIES)) {
    if (apiRates[code] && typeof apiRates[code] === 'number') {
      EXPORT_CURRENCIES[code].rate = Number(apiRates[code].toFixed(3));
    }
  }
}

// Synchronously apply cached live rates if available
try {
  const cachedRates = localStorage.getItem('aum_live_exchange_rates');
  if (cachedRates) {
    const parsed = JSON.parse(cachedRates);
    if (parsed && parsed.rates) {
      applyApiRates(parsed.rates);
    }
  }
} catch (e) {}

// Background Live Rates Synchronization (open.er-api.com)
export async function syncLiveExchangeRates() {
  try {
    const cached = localStorage.getItem('aum_live_exchange_rates');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.rates && (Date.now() - parsed.timestamp < 1800000)) {
          applyApiRates(parsed.rates);
          return;
        }
      } catch (e) {}
    }

    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!res.ok) return;
    const data = await res.json();
    if (data && data.rates) {
      applyApiRates(data.rates);
      localStorage.setItem('aum_live_exchange_rates', JSON.stringify({
        rates: data.rates,
        timestamp: Date.now()
      }));
      window.dispatchEvent(new CustomEvent('currencyRatesUpdated', { detail: { rates: data.rates } }));
    }
  } catch (err) {
    // Offline / fallback to baseline rates
  }
}

if (typeof window !== 'undefined') {
  syncLiveExchangeRates();
}

export class Navbar {
  constructor() {
    this.navElement = document.querySelector('.navbar');
    this.navLinks = document.querySelectorAll('.nav-tier-link, .drawer-nav-link');
    this.mobileToggle = document.getElementById('mobile-menu-toggle');
    this.drawer = document.getElementById('navbar-drawer');
    this.drawerOverlay = document.getElementById('navbar-drawer-overlay');
    this.drawerCloseBtn = document.getElementById('drawer-close-btn');

    // Currency Selector
    this.currencySelector = document.getElementById('currency-selector');
    this.currencyBtn = document.getElementById('currency-btn');
    this.currencyMenu = document.getElementById('currency-menu');
    this.currencyLabel = document.getElementById('currency-current');
    this.currencyFlag = document.getElementById('currency-flag');

    // Wishlist & Cart elements
    this.wishlistBtn = document.getElementById('wishlist-btn');
    this.wishlistBadge = document.getElementById('wishlist-counter');
    this.cartBtn = document.getElementById('cart-btn');
    this.cartBadge = document.getElementById('cart-counter');

    this.cartCount = 0;
    this.wishlistCount = 0;
    this.isWishlisted = false;

    this.init();
  }

  init() {
    this.ensureCartDrawerDOM();
    this.updateNavHeight();
    window.addEventListener('resize', () => this.updateNavHeight(), { passive: true });

    this.bindHideOnScroll();
    this.bindCurrencySelector();
    this.bindWishlist();
    this.bindCartInteraction();
    this.bindMobileMenu();
    this.bindLinkInteractions();
    this.bindScrollSpy();

    // Initial DOM price synchronization
    updateAllDomPrices();
  }

  ensureCartDrawerDOM() {
    if (document.getElementById('cart-drawer')) return;

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
  }

  updateNavHeight() {
    if (this.navElement) {
      const height = this.navElement.offsetHeight || 96;
      document.documentElement.style.setProperty('--nav-h', `${height}px`);
    }
  }

  /**
   * Smart Luxury Hide-on-Scroll:
   * - Shows naturally when scrolling upwards.
   * - Hides cleanly when scrolling downwards.
   * - Always visible at the very top of the page.
   */
  bindHideOnScroll() {
    if (!this.navElement) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const drawerOpen = this.drawer && this.drawer.classList.contains('open');

      if (drawerOpen) {
        this.navElement.classList.remove('nav-hidden');
        return;
      }

      if (currentScrollY <= 30) {
        this.navElement.classList.remove('nav-hidden');
      } else if (currentScrollY > lastScrollY + 8 && currentScrollY > 120) {
        // Scrolling down past threshold: hide
        this.navElement.classList.add('nav-hidden');
      } else if (currentScrollY < lastScrollY - 6) {
        // Scrolling up: reveal
        this.navElement.classList.remove('nav-hidden');
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /**
   * Currency Selector Dropdown (Exclusive to export countries)
   */
  bindCurrencySelector() {
    if (!this.currencySelector || !this.currencyBtn) return;

    // Initialize with stored currency or default USD
    const currentCode = getActiveCurrency();
    this.updateCurrencyUI(currentCode);

    // Toggle dropdown
    this.currencyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = this.currencySelector.classList.toggle('open');
      this.currencyBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Option selection
    const options = this.currencySelector.querySelectorAll('.currency-option');
    options.forEach((opt) => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = opt.getAttribute('data-currency');
        if (code && EXPORT_CURRENCIES[code]) {
          localStorage.setItem('aum_selected_currency', code);
          this.updateCurrencyUI(code);
          this.currencySelector.classList.remove('open');
          this.currencyBtn.setAttribute('aria-expanded', 'false');

          updateAllDomPrices(code);
          this.renderCartDrawer();
          this.renderWishlistDrawer();

          // Dispatch event so any page or shopping mart updates live
          window.dispatchEvent(new CustomEvent('currencyChanged', { detail: { currency: code } }));
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!this.currencySelector.contains(e.target)) {
        this.currencySelector.classList.remove('open');
        this.currencyBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.currencySelector.classList.contains('open')) {
        this.currencySelector.classList.remove('open');
        this.currencyBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  updateCurrencyUI(code) {
    const data = EXPORT_CURRENCIES[code] || EXPORT_CURRENCIES.USD;
    if (this.currencyLabel) {
      this.currencyLabel.textContent = data.label;
    }
    if (this.currencyFlag) {
      this.currencyFlag.textContent = data.flag;
    }
    const options = this.currencySelector ? this.currencySelector.querySelectorAll('.currency-option') : [];
    options.forEach((opt) => {
      if (opt.getAttribute('data-currency') === code) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });
  }

  bindWishlist() {
    this.updateBadges();

    // Global listener for currency updates to re-render drawer and update DOM
    window.addEventListener('currencyChanged', (e) => {
      const code = e.detail?.currency || getActiveCurrency();
      this.updateCurrencyUI(code);
      updateAllDomPrices(code);
      this.renderCartDrawer();
      this.renderWishlistDrawer();
    });

    // Global listener for background real-time rate updates
    window.addEventListener('currencyRatesUpdated', () => {
      const code = getActiveCurrency();
      this.updateCurrencyUI(code);
      updateAllDomPrices(code);
      this.renderCartDrawer();
      this.renderWishlistDrawer();
    });

    if (this.wishlistBtn) {
      this.wishlistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.shopApp?.openWishlistDrawer) {
          window.shopApp.openWishlistDrawer();
        } else {
          this.openWishlistDrawer();
        }
      });
    }

    // Wishlist close triggers
    const closeBtn = document.getElementById('wishlist-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeWishlistDrawer());
    }
  }

  bindCartInteraction() {
    if (this.cartBtn) {
      this.cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.shopApp?.openCartDrawer) {
          window.shopApp.openCartDrawer();
        } else {
          this.openCartDrawer();
        }
      });
    }

    // Cart close triggers
    const cartCloseBtn = document.getElementById('cart-close-btn');
    if (cartCloseBtn) {
      cartCloseBtn.addEventListener('click', () => this.closeCartDrawer());
    }

    const backdrop = document.getElementById('drawer-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        this.closeCartDrawer();
        this.closeWishlistDrawer();
      });
    }

    // Attach delegated cart actions (qty, remove)
    const cartList = document.getElementById('cart-items-list');
    if (cartList) {
      cartList.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('[data-cart-action="remove"]');
        if (removeBtn) {
          const id = removeBtn.getAttribute('data-id');
          this.removeFromCart(id);
          return;
        }

        const qtyMinus = e.target.closest('[data-cart-action="minus"]');
        if (qtyMinus) {
          const id = qtyMinus.getAttribute('data-id');
          this.updateCartQty(id, -1);
          return;
        }

        const qtyPlus = e.target.closest('[data-cart-action="plus"]');
        if (qtyPlus) {
          const id = qtyPlus.getAttribute('data-id');
          this.updateCartQty(id, 1);
          return;
        }
      });
    }

    // Attach delegated wishlist actions (remove, move to bag)
    const wishlistList = document.getElementById('wishlist-items-list');
    if (wishlistList) {
      wishlistList.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('[data-wishlist-action="remove"]');
        if (removeBtn) {
          const id = removeBtn.getAttribute('data-id');
          this.removeFromWishlist(id);
          return;
        }

        const addBtn = e.target.closest('[data-wishlist-action="add-to-cart"]');
        if (addBtn) {
          const id = addBtn.getAttribute('data-id');
          this.moveWishlistToCart(id);
          return;
        }
      });
    }

    // Checkout Action (WhatsApp Concierge Atelier Inquiry)
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.onclick = (e) => {
        e.preventDefault();
        this.proceedToCheckout();
      };
    }

    // Toast "View Bag" shortcut
    const toastViewBag = document.getElementById('toast-view-bag-btn');
    if (toastViewBag) {
      toastViewBag.onclick = (e) => {
        e.preventDefault();
        if (window.shopApp?.openCartDrawer) {
          window.shopApp.openCartDrawer();
        } else {
          this.openCartDrawer();
        }
      };
    }

    // Wishlist Discover Button
    const wishlistDiscover = document.getElementById('wishlist-discover-btn');
    if (wishlistDiscover) {
      wishlistDiscover.onclick = () => {
        this.closeWishlistDrawer();
      };
    }

    // Global helpers
    window.addToBag = (product, size = 'Standard', qty = 1, triggerBtn = null) => this.addToCart(product, size, qty, triggerBtn);
    window.toggleWishlist = (product) => this.toggleWishlist(product);
    window.openCartDrawer = () => this.openCartDrawer();
    window.closeCartDrawer = () => this.closeCartDrawer();
    window.openWishlistDrawer = () => this.openWishlistDrawer();
    window.closeWishlistDrawer = () => this.closeWishlistDrawer();
  }

  proceedToCheckout() {
    const cart = this.getCart();
    if (!cart || cart.length === 0) {
      this.showToast('Your Shopping Bag is empty');
      return;
    }
    const curr = getActiveCurrency();
    let subtotal = 0;
    const itemLines = cart.map((item, idx) => {
      const price = item.usdPrice || item.price || 0;
      const qty = item.qty || 1;
      const total = price * qty;
      subtotal += total;
      return `${idx + 1}. ${item.name || item.title} (Qty: ${qty}, Size: ${item.size || 'Standard'}) - ${formatPrice(total, curr.code)}`;
    }).join('\n');

    const totalText = formatPrice(subtotal, curr.code);
    const message = `Hello AUM GROUP INC. Atelier,\n\nI would like to acquire the following bespoke creations from my Shopping Bag:\n\n${itemLines}\n\nEstimated Subtotal: ${totalText}\n\nPlease confirm gemstone availability, bespoke sizing, and insured armored courier transit.`;

    const waUrl = `https://wa.me/918108070022?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  getCart() {
    try {
      return JSON.parse(localStorage.getItem('aum_group_cart') || localStorage.getItem('esceli_cart') || '[]');
    } catch {
      return [];
    }
  }

  saveCart(cart) {
    localStorage.setItem('aum_group_cart', JSON.stringify(cart));
    localStorage.setItem('esceli_cart', JSON.stringify(cart));
    this.updateBadges();
  }

  getWishlist() {
    try {
      return JSON.parse(localStorage.getItem('aum_group_wishlist') || localStorage.getItem('esceli_wishlist') || '[]');
    } catch {
      return [];
    }
  }

  saveWishlist(list) {
    localStorage.setItem('aum_group_wishlist', JSON.stringify(list));
    localStorage.setItem('esceli_wishlist', JSON.stringify(list));
    this.updateBadges();
  }

  updateBadges() {
    const cart = this.getCart();
    const wishlist = this.getWishlist();

    const totalCartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const totalWishCount = wishlist.length;

    if (this.cartBadge) {
      this.cartBadge.textContent = totalCartCount;
      if (totalCartCount > 0) {
        this.cartBadge.classList.add('visible');
      } else {
        this.cartBadge.classList.remove('visible');
      }
    }

    if (this.wishlistBadge) {
      this.wishlistBadge.textContent = totalWishCount;
      if (totalWishCount > 0) {
        this.wishlistBadge.classList.add('visible');
      } else {
        this.wishlistBadge.classList.remove('visible');
      }
    }
  }

  openCartDrawer() {
    this.ensureCartDrawerDOM();
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (!drawer) return;

    this.closeWishlistDrawer();
    this.renderCartDrawer();
    drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  openWishlistDrawer() {
    this.ensureCartDrawerDOM();
    const drawer = document.getElementById('wishlist-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (!drawer) return;

    this.closeCartDrawer();
    this.renderWishlistDrawer();
    drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeWishlistDrawer() {
    const drawer = document.getElementById('wishlist-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  renderCartDrawer() {
    const cart = this.getCart();
    const listEl = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal');
    const fillEl = document.getElementById('cart-shipping-fill');
    const pctEl = document.getElementById('cart-shipping-percent');
    if (!listEl) return;

    if (cart.length === 0) {
      listEl.innerHTML = `
        <div class="drawer-empty-state text-center py-12 px-4">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[#f0ece4] text-[#004438]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <h4 class="font-serif text-xl font-medium text-[#181715] mb-1">Your Shopping Bag is Empty</h4>
          <p class="font-sans text-xs text-[#7A756D] mb-6">Discover timeless fine jewellery and certified gemstones in our Haute Collections.</p>
          <a href="shop.html" class="inline-block px-6 py-2.5 bg-[#004438] text-white text-xs tracking-wider uppercase font-medium hover:bg-[#065b4c] transition-colors" onclick="window.closeCartDrawer?.();">
            Explore Collections
          </a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = formatPrice(0);
      if (fillEl) fillEl.style.width = '0%';
      if (pctEl) pctEl.textContent = '0%';
      const trackerEl = document.getElementById('cart-shipping-tracker');
      if (trackerEl) {
        trackerEl.textContent = `Complimentary Armored Courier on orders over ${formatPrice(5000)}`;
      }
      return;
    }

    let subtotal = 0;
    listEl.innerHTML = cart.map(item => {
      const price = item.usdPrice || item.price || 0;
      const qty = item.qty || 1;
      const itemTotal = price * qty;
      subtotal += itemTotal;

      return `
        <div class="drawer-item-row flex gap-4 pb-4 border-b border-[#F0ECE4]" data-id="${item.id}">
          <img src="${item.image || 'assets/images/shop/products/prod-1-a.jpg'}" alt="${item.name || item.title}" class="drawer-item-thumb w-20 h-20 object-cover border border-[#E4DFD5]">
          <div class="drawer-item-details flex-1 flex flex-col justify-between">
            <div class="flex items-start justify-between gap-2">
              <div>
                <h5 class="drawer-item-title font-serif text-sm font-medium text-[#181715] leading-snug">${item.name || item.title}</h5>
                <span class="drawer-item-meta text-[11px] text-[#7A756D] block mt-0.5">${item.metal || item.category || 'Fine Jewellery'} • Size: ${item.size || 'Standard'}</span>
              </div>
              <button type="button" class="text-[#7A756D] hover:text-[#402020] p-1 transition-colors" data-cart-action="remove" data-id="${item.id}" aria-label="Remove item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center border border-[#D6D1C4] rounded-none">
                <button type="button" class="w-6 h-6 flex items-center justify-center text-xs text-[#181715] hover:bg-[#F0ECE4]" data-cart-action="minus" data-id="${item.id}">-</button>
                <span class="w-6 text-center text-xs font-mono font-medium">${qty}</span>
                <button type="button" class="w-6 h-6 flex items-center justify-center text-xs text-[#181715] hover:bg-[#F0ECE4]" data-cart-action="plus" data-id="${item.id}">+</button>
              </div>
              <span class="drawer-item-price font-serif text-sm font-semibold text-[#004438]">${formatPrice(itemTotal)}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    const threshold = 5000;
    const progress = Math.min(100, Math.round((subtotal / threshold) * 100));
    if (fillEl) fillEl.style.width = `${progress}%`;
    if (pctEl) pctEl.textContent = `${progress}%`;

    const trackerEl = document.getElementById('cart-shipping-tracker');
    if (trackerEl) {
      if (subtotal >= threshold) {
        trackerEl.innerHTML = '✓ Qualified for <strong>Complimentary Armored Courier</strong>';
      } else {
        const remaining = threshold - subtotal;
        trackerEl.innerHTML = `Add <strong>${formatPrice(remaining)}</strong> for Free Armored Courier`;
      }
    }
  }

  renderWishlistDrawer() {
    const list = this.getWishlist();
    const listEl = document.getElementById('wishlist-items-list');
    if (!listEl) return;

    if (list.length === 0) {
      listEl.innerHTML = `
        <div class="drawer-empty-state text-center py-12 px-4">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[#f0ece4] text-[#402020]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <h4 class="font-serif text-xl font-medium text-[#181715] mb-1">Your Curated Wishlist is Empty</h4>
          <p class="font-sans text-xs text-[#7A756D] mb-6">Save your cherished creations while browsing our high jewellery and gemstone archives.</p>
          <a href="shop.html" class="inline-block px-6 py-2.5 bg-[#402020] text-white text-xs tracking-wider uppercase font-medium hover:bg-[#592b2b] transition-colors" onclick="window.closeWishlistDrawer?.();">
            Discover Collections
          </a>
        </div>
      `;
      return;
    }

    listEl.innerHTML = list.map(item => {
      const price = item.usdPrice || item.price || 0;
      return `
        <div class="drawer-item-row flex gap-4 pb-4 border-b border-[#F0ECE4]" data-id="${item.id}">
          <img src="${item.image || 'assets/images/shop/products/prod-1-a.jpg'}" alt="${item.name || item.title}" class="drawer-item-thumb w-20 h-20 object-cover border border-[#E4DFD5]">
          <div class="drawer-item-details flex-1 flex flex-col justify-between">
            <div class="flex items-start justify-between gap-2">
              <div>
                <h5 class="drawer-item-title font-serif text-sm font-medium text-[#181715] leading-snug">${item.name || item.title}</h5>
                <span class="drawer-item-meta text-[11px] text-[#7A756D] block mt-0.5">${item.metal || item.category || 'Haute Joaillerie'}</span>
              </div>
              <button type="button" class="text-[#7A756D] hover:text-[#402020] p-1 transition-colors" data-wishlist-action="remove" data-id="${item.id}" aria-label="Remove from wishlist">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div class="flex items-center justify-between mt-2">
              <span class="drawer-item-price font-serif text-sm font-semibold text-[#004438]">${formatPrice(price)}</span>
              <button type="button" class="px-3 py-1 bg-[#004438] text-white text-[11px] font-medium tracking-wide hover:bg-[#065b4c] transition-colors" data-wishlist-action="add-to-cart" data-id="${item.id}">
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  addToCart(product, size = 'Standard', qty = 1, triggerBtn = null) {
    if (!product) return;
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

    const cart = this.getCart();
    const pid = product.id;
    const existing = cart.find(it => it.id === pid && it.size === size);

    if (existing) {
      existing.qty = (existing.qty || 1) + qty;
    } else {
      cart.push({
        id: pid,
        name: product.title || product.name,
        price: product.usdPrice || product.price,
        image: product.image || product.primaryImage,
        metal: product.metal || product.eyebrow || 'Fine Gold',
        size: size,
        qty: qty
      });
    }

    this.saveCart(cart);
    this.showToast(`"${product.title || product.name}" added to shopping bag`);
    this.openCartDrawer();

    if (this.cartBadge) {
      this.cartBadge.style.transform = 'scale(1.4)';
      setTimeout(() => this.cartBadge.style.transform = '', 260);
    }
  }

  removeFromCart(id) {
    let cart = this.getCart();
    cart = cart.filter(it => it.id !== id);
    this.saveCart(cart);
    this.renderCartDrawer();
  }

  updateCartQty(id, delta) {
    const cart = this.getCart();
    const item = cart.find(it => it.id === id);
    if (!item) return;

    item.qty = (item.qty || 1) + delta;
    if (item.qty <= 0) {
      this.removeFromCart(id);
    } else {
      this.saveCart(cart);
      this.renderCartDrawer();
    }
  }

  toggleWishlist(product) {
    if (!product) return;
    let list = this.getWishlist();
    const pid = product.id;
    const idx = list.findIndex(it => it.id === pid);

    if (idx > -1) {
      list.splice(idx, 1);
      this.saveWishlist(list);
      this.showToast('Removed from Curated Wishlist');
    } else {
      list.push({
        id: pid,
        name: product.title || product.name,
        price: product.usdPrice || product.price,
        image: product.image || product.primaryImage,
        metal: product.metal || product.eyebrow || 'Haute Joaillerie',
        category: product.category || 'Jewellery'
      });
      this.saveWishlist(list);
      this.showToast(`"${product.title || product.name}" saved to Wishlist`);
    }

    this.renderWishlistDrawer();
    this.syncWishlistIcons();
  }

  removeFromWishlist(id) {
    let list = this.getWishlist();
    list = list.filter(it => it.id !== id);
    this.saveWishlist(list);
    this.renderWishlistDrawer();
    this.syncWishlistIcons();
  }

  moveWishlistToCart(id) {
    const list = this.getWishlist();
    const item = list.find(it => it.id === id);
    if (!item) return;

    this.addToCart(item);
    this.removeFromWishlist(id);
  }

  syncWishlistIcons() {
    const list = this.getWishlist();
    document.querySelectorAll('[data-action="wishlist"], .product-wishlist-btn, .na-card-wishlist-btn').forEach(btn => {
      const pid = btn.getAttribute('data-id');
      const isSaved = list.some(it => it.id === pid);
      if (isSaved) {
        btn.classList.add('active');
        btn.querySelector('svg path')?.setAttribute('fill', '#402020');
      } else {
        btn.classList.remove('active');
        btn.querySelector('svg path')?.setAttribute('fill', 'none');
      }
    });
  }

  showToast(message) {
    this.ensureCartDrawerDOM();
    const toast = document.getElementById('shop-toast');
    const msgEl = document.getElementById('toast-message');
    if (!toast) return;

    if (msgEl) msgEl.textContent = message;
    toast.classList.add('show', 'active');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove('show', 'active');
    }, 3200);
  }

  bindMobileMenu() {
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleDrawer(true);
      });
    }

    if (this.drawerCloseBtn) {
      this.drawerCloseBtn.addEventListener('click', () => {
        this.toggleDrawer(false);
      });
    }

    if (this.drawerOverlay) {
      this.drawerOverlay.addEventListener('click', () => {
        this.toggleDrawer(false);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.drawer && this.drawer.classList.contains('open')) {
        this.toggleDrawer(false);
      }
    });
  }

  toggleDrawer(open) {
    if (!this.drawer) return;
    if (open) {
      this.drawer.classList.add('open');
      if (this.drawerOverlay) this.drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (this.mobileToggle) this.mobileToggle.setAttribute('aria-expanded', 'true');
      // Always reveal navbar when drawer opens
      if (this.navElement) this.navElement.classList.remove('nav-hidden');
    } else {
      this.drawer.classList.remove('open');
      if (this.drawerOverlay) this.drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (this.mobileToggle) this.mobileToggle.setAttribute('aria-expanded', 'false');
      // Keep navbar visible when closing drawer so user doesn't experience a sudden jump
      if (this.navElement) {
        this.navElement.classList.remove('nav-hidden');
      }
    }
  }

  bindLinkInteractions() {
    this.navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        this.navLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');

        // Also sync mobile drawer link with desktop link
        const href = link.getAttribute('href');
        document.querySelectorAll(`.nav-tier-link[href="${href}"], .drawer-nav-link[href="${href}"]`).forEach((matched) => {
          matched.classList.add('active');
        });

        this.toggleDrawer(false);
      });
    });
  }

  bindScrollSpy() {
    const isStandalonePage = window.location.pathname.includes('about.html') || window.location.pathname.includes('contact.html');
    if (isStandalonePage) return;

    const sectionIds = ['home', 'categories', 'specialities', 'new-arrivals'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const navH = this.navElement ? this.navElement.offsetHeight : 96;
      let currentSectionId = '#home';

      sections.forEach((section) => {
        const top = section.offsetTop - navH - 120;
        if (scrollY >= top) {
          currentSectionId = `#${section.id}`;
        }
      });

      this.navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('#') || href.includes('index.html#'))) {
          const targetId = href.split('#')[1];
          if (targetId && `#${targetId}` === currentSectionId) {
            link.classList.add('active');
          } else if (targetId) {
            link.classList.remove('active');
          }
        }
      });
    }, { passive: true });
  }
}
