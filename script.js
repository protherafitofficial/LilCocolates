/* ══════════════════════════════════════
   HERO VIDEO — auto switch mobile / desktop
   (mobile ≤ 640px → hero_video_mobile.mp4)
   (desktop  > 640px → hero_video2.mp4)
══════════════════════════════════════ */
(function () {
  const heroVideo   = document.getElementById("heroVideo");
  if (!heroVideo) return;

  const MOBILE_SRC  = "images/hero_video_mobile.mp4";
  const DESKTOP_SRC = "images/hero_video2.mp4";
  const BREAKPOINT  = 640; // px, matches CSS breakpoint

  let currentMode = null; // "mobile" | "desktop"

  function setHeroVideo(forceReload) {
    const isMobile = window.innerWidth <= BREAKPOINT;
    const mode = isMobile ? "mobile" : "desktop";

    if (mode === currentMode && !forceReload) return; // already correct, avoid reload flicker

    currentMode = mode;
    const src = isMobile ? MOBILE_SRC : DESKTOP_SRC;
    const wasPlaying = !heroVideo.paused;

    heroVideo.src = src;
    heroVideo.load();

    if (wasPlaying || heroVideo.autoplay) {
      heroVideo.play().catch(() => {
        /* autoplay may be blocked until user interacts — safe to ignore */
      });
    }
  }

  /* Set correct video immediately on first load */
  setHeroVideo(true);

  /* Re-check on resize (debounced) and on orientation change */
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => setHeroVideo(false), 200);
  });
  window.addEventListener("orientationchange", () => setHeroVideo(true));
})();

/* ── Click ANYWHERE outside the navbar → close dropdown ── */
document.addEventListener('click', function (e) {
  const navbar   = document.querySelector('.choc-navbar');
  const collapse = document.getElementById('chocNav');
  if (!navbar.contains(e.target) && collapse.classList.contains('show')) {
    bootstrap.Collapse.getInstance(collapse)?.hide();
  }
});

/* ── Clicking a nav link / Order btn also closes menu ── */
document.querySelectorAll('#chocNav .nav-link, #chocNav .nav-order-btn').forEach(el => {
  el.addEventListener('click', () => {
    const collapse = document.getElementById('chocNav');
    if (collapse.classList.contains('show')) {
      bootstrap.Collapse.getInstance(collapse)?.hide();
    }
  });
});

/* ── Press Escape to close ── */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const collapse = document.getElementById('chocNav');
    if (collapse.classList.contains('show')) {
      bootstrap.Collapse.getInstance(collapse)?.hide();
    }
  }
});

/* ── About section scroll reveal ── */
const aboutContent = document.querySelector('.about-content');
const aboutPillars = document.querySelectorAll('.about-pillars li');

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

if (aboutContent) aboutObserver.observe(aboutContent);

const pillarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

aboutPillars.forEach(el => pillarObserver.observe(el));

/* ══════════════════════════════════════
   MENU SECTION
══════════════════════════════════════ */

/* Replace with the brand's actual WhatsApp number, country code first, no + or spaces */
const WHATSAPP_NUMBER = "8903466217";

const MENU_DATA = [
  {
    id: "regulars",
    label: "Regulars",
    note: "",
    groups: [
      {
        name: "Nut collection",
        note: "Dark · Milk · White",
        items: [
          { name: "Nut bites", variants: [{ label: "4 pcs", price: 240 }, { label: "6 pcs", price: 330 }, { label: "9 pcs", price: 460 }] },
          { name: "Classic nut bar", variants: [{ label: "1 pc", price: 380 }] },
          { name: "Duo nut slabs", variants: [{ label: "2 pcs", price: 620 }] },
          { name: "Nut heart bites", variants: [{ label: "4 pcs", price: 280 }, { label: "6 pcs", price: 380 }] },
          { name: "Nut heart bar", variants: [{ label: "1 pc", price: 420 }] }
        ]
      },
      {
        name: "Bonbon",
        note: "Rich coconut filling · Dark · Milk · White",
        items: [
          { name: "Classic bonbon", variants: [{ label: "4 pcs", price: 300 }, { label: "6 pcs", price: 420 }] },
          { name: "Bonbon blocks", variants: [{ label: "3 pcs", price: 480 }] }
        ]
      },
      {
        name: "Plain bar",
        note: "1 pc",
        items: [
          { name: "Plain bar", variants: [{ label: "Dark", price: 180 }, { label: "Milk", price: 145 }, { label: "White", price: 135 }, { label: "Triple flavour", price: 199 }] }
        ]
      }
    ]
  },
  {
    id: "treat-boxes",
    label: "Treat boxes",
    note: "",
    groups: [
      {
        name: "Strawberry treat box",
        items: [
          { name: "Classic — 9 pcs", variants: [{ label: "Dark", price: 980 }, { label: "Milk", price: 950 }, { label: "White", price: 950 }, { label: "Triple flavour", price: 1050 }] },
          { name: "Petite — 4 pcs", variants: [{ label: "Dark", price: 450 }, { label: "Milk", price: 420 }, { label: "White", price: 420 }] }
        ]
      },
      {
        name: "Pomegranate treat box",
        items: [
          { name: "Classic — 6 pcs", variants: [{ label: "Dark", price: 550 }, { label: "Milk", price: 520 }, { label: "White", price: 520 }, { label: "Triple flavour", price: 580 }] },
          { name: "Petite — 4 pcs", variants: [{ label: "Dark", price: 400 }, { label: "Milk", price: 380 }, { label: "White", price: 360 }] }
        ]
      }
    ]
  },
  {
    id: "luxury",
    label: "Luxury launch",
    note: "The house's most elaborate pieces — arranged, not just boxed.",
    badge: true,
    groups: [
      {
        name: "Crown royale",
        items: [
          { name: "Iconic crown", note: "Single flavour selection", variants: [{ label: "Dark", price: 4199 }, { label: "Milk", price: 3799 }, { label: "White", price: 3999 }] },
          { name: "Classic crown", note: "Dual flavour · choose an arrangement", variants: [{ label: "White – Milk – White", price: 3699 }, { label: "Milk – White – Milk", price: 3699 }, { label: "Dark – Milk – Dark", price: 3699 }, { label: "Milk – Dark – Milk", price: 3699 }] },
          { name: "Signature crown", note: "Triple flavour", variants: [{ label: "Dark – White – Milk", price: 3899 }] }
        ]
      },
      {
        name: "Bouquet",
        note: "Dark · Milk · White",
        items: [
          { name: "Signature bouquet", variants: [{ label: "Dark", price: 1299 }, { label: "Milk", price: 1199 }, { label: "White", price: 1299 }] },
          { name: "Classic bouquet", variants: [{ label: "Dark", price: 2599 }, { label: "Milk", price: 2399 }, { label: "White", price: 2199 }] },
          { name: "Petite bouquet", variants: [{ label: "Standard", price: 1299 }] }
        ]
      }
    ]
  },
  {
    id: "valentine",
    label: "Valentine's special",
    note: "Fresh roses and coco-strawberries, boxed for the occasion.",
    badge: true,
    valentine: true,
    groups: [
      {
        name: "Gift box",
        note: "Roses available in red, baby pink, blue, or white",
        items: [
          { name: "Classic box", note: "Single flavour selection", variants: [{ label: "Dark", price: 2699 }, { label: "Milk", price: 2499 }, { label: "White", price: 2399 }] },
          { name: "Blend box", note: "Dual flavour selection", variants: [{ label: "Dark and milk", price: 2399 }, { label: "Dark and white", price: 2499 }] },
          { name: "Signature box", note: "Triple flavour", variants: [{ label: "Standard", price: 3299 }] }
        ]
      }
    ]
  }
];

let menuActiveCategory = MENU_DATA[0].id;
const menuSelections = {};
let menuRowObserver = null;

function menuItemKey(catId, groupName, itemName) {
  return catId + "|" + groupName + "|" + itemName;
}

function renderMenuTabs() {
  const tabsEl = document.getElementById("menuTabs");
  if (!tabsEl) return;
  tabsEl.innerHTML = MENU_DATA.map(cat =>
    `<button class="menu-tab ${cat.id === menuActiveCategory ? "active" : ""}" data-cat="${cat.id}">${cat.label}</button>`
  ).join("");
  tabsEl.querySelectorAll(".menu-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      menuActiveCategory = btn.dataset.cat;
      renderMenuTabs();
      renderMenuContent();
    });
  });
}

function renderMenuContent() {
  const cat = MENU_DATA.find(c => c.id === menuActiveCategory);
  const noteEl = document.getElementById("menuCategoryNote");
  if (noteEl) noteEl.textContent = cat.note || "";

  const contentEl = document.getElementById("menuContent");
  if (!contentEl) return;

  let itemIndex = 0;

  contentEl.innerHTML = cat.groups.map(group => {
    const itemsHtml = group.items.map((item, idxInGroup) => {
      const key = menuItemKey(cat.id, group.name, item.name);
      if (!(key in menuSelections)) menuSelections[key] = 0;
      const selectedIdx = menuSelections[key];
      const variant = item.variants[selectedIdx];
      const hasMultiple = item.variants.length > 1;

      itemIndex++;
      const number = String(itemIndex).padStart(2, "0");

      const optionsHtml = item.variants.map((v, i) =>
        `<div class="menu-variant-option ${i === selectedIdx ? "selected" : ""}" data-idx="${i}" role="option" aria-selected="${i === selectedIdx}">${v.label}</div>`
      ).join("");

      const dropdownHtml = `
        <div class="menu-variant-dropdown" data-key="${key}">
          <button type="button" class="menu-variant-toggle" data-key="${key}" aria-haspopup="listbox" aria-expanded="false">
            <span class="menu-variant-toggle-label">${variant.label}</span>
            <svg viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L4.5 5L8 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="menu-variant-menu" role="listbox" data-key="${key}">${optionsHtml}</div>
        </div>
      `;

      const itemClasses = ["menu-item"];
      if (cat.badge) itemClasses.push("is-luxury");
      if (cat.valentine) itemClasses.push("is-valentine");

      return `
        <div class="${itemClasses.join(" ")}" data-item-key="${key}">
          <div class="menu-item-head">
            <span class="menu-item-number">${number}</span>
            <div class="menu-item-titleblock">
              <h4 class="menu-item-name">${item.name}${cat.badge ? `<span class="lux-dot"></span>` : ""}</h4>
            </div>
            <div class="menu-item-preview">
              <span class="menu-item-price-tag" data-price-key="${key}">₹${variant.price.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <div class="menu-item-body">
            <div class="menu-item-body-inner">
              ${item.note ? `<p class="menu-item-note">${item.note}</p>` : ""}
              <div class="menu-item-controls">
                ${hasMultiple ? dropdownHtml : `<span></span>`}
                <button class="menu-cta" data-order-key="${key}">Order <i class="bi bi-arrow-right"></i></button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="menu-group">
        <div class="menu-group-header">
          <h3 class="menu-group-name">${group.name}</h3>
        </div>
        ${group.note ? `<p class="menu-group-note">${group.note}</p>` : ""}
        <div class="menu-columns">${itemsHtml}</div>
      </div>
    `;
  }).join("");

  attachMenuHandlers(cat);
  observeMenuRows();
}

function menuCloseAllDropdowns(exceptKey) {
  document.querySelectorAll(".menu-variant-dropdown.open").forEach(dd => {
    if (dd.dataset.key === exceptKey) return;
    dd.classList.remove("open");
    const toggle = dd.querySelector(".menu-variant-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    dd.closest(".menu-item")?.classList.remove("dropdown-active");
  });
}

function attachMenuHandlers(cat) {
  /* ── Premium custom pcs / variant dropdown ── */
  document.querySelectorAll(".menu-variant-dropdown").forEach(dropdown => {
    const key = dropdown.dataset.key;
    const toggle = dropdown.querySelector(".menu-variant-toggle");

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains("open");
      menuCloseAllDropdowns();
      if (!isOpen) {
        dropdown.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
        dropdown.closest(".menu-item")?.classList.add("dropdown-active");
      }
    });

    dropdown.querySelectorAll(".menu-variant-option").forEach(optionEl => {
      optionEl.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(optionEl.dataset.idx, 10);
        menuSelections[key] = idx;

        const { item } = menuFindGroupAndItemByKey(cat, key);
        const variant = item.variants[idx];

        dropdown.querySelectorAll(".menu-variant-option").forEach(o => o.classList.remove("selected"));
        optionEl.classList.add("selected");
        toggle.querySelector(".menu-variant-toggle-label").textContent = variant.label;

        const priceEl = document.querySelector(`.menu-item-price-tag[data-price-key="${key}"]`);
        priceEl.classList.add("fade");
        setTimeout(() => {
          priceEl.textContent = "₹" + variant.price.toLocaleString("en-IN");
          priceEl.classList.remove("fade");
        }, 140);

        menuCloseAllDropdowns();
      });
    });
  });

  document.querySelectorAll("[data-order-key]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const key = btn.dataset.orderKey;
      const { item } = menuFindGroupAndItemByKey(cat, key);
      const variant = item.variants[menuSelections[key]];
      const message = `Hi Lil' Cocolates, I'd like to order: ${item.name} (${variant.label}) — ₹${variant.price}`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    });
  });
}

function menuFindGroupAndItemByKey(cat, key) {
  const [, groupName, itemName] = key.split("|");
  const group = cat.groups.find(g => g.name === groupName);
  const item = group.items.find(i => i.name === itemName);
  return { group, item };
}

function observeMenuRows() {
  if (menuRowObserver) menuRowObserver.disconnect();
  menuRowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        menuRowObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".menu-item").forEach((item, i) => {
    item.style.transitionDelay = (i % 6) * 60 + "ms";
    menuRowObserver.observe(item);
  });
}

if (document.getElementById("menuTabs")) {
  renderMenuTabs();
  renderMenuContent();
}

/* ── Close variant dropdowns on outside click / Escape ── */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-variant-dropdown")) menuCloseAllDropdowns();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") menuCloseAllDropdowns();
});

/* ── Menu heading scroll reveal ── */
const menuHeadingBlock = document.querySelector(".menu-heading-block");
if (menuHeadingBlock) {
  const menuHeadingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });
  menuHeadingObserver.observe(menuHeadingBlock);
}

/* -- Footer: auto-update copyright year -- */
const footerYearEl = document.getElementById("footerYear");
if (footerYearEl) {
  footerYearEl.textContent = new Date().getFullYear();
}