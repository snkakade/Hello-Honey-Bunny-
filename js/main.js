/* Hello Honey Bunny shared interactions.
   Update the WhatsApp number below using country code and digits only. */
document.documentElement.classList.add("motion-ready");
const WHATSAPP_NUMBER = "918208665234";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

const closeMenu = () => {
  if (!nav || !navToggle) return;
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (nav.classList.contains("open") && !nav.contains(event.target) && !navToggle.contains(event.target)) closeMenu();
  });
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 12);
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
  header.style.setProperty("--scroll-progress", String(progress));
};
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

// Lightweight scroll reveals; content stays visible when IntersectionObserver is unsupported.
const revealItems = document.querySelectorAll("[data-reveal]");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13, rootMargin: "0px 0px -35px" });
  revealItems.forEach((item) => revealObserver.observe(item));
}

// Subtle desktop hero depth; no scroll handler and disabled for reduced motion.
const heroMedia = document.querySelector("[data-parallax]");
if (heroMedia && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  heroMedia.addEventListener("pointermove", (event) => {
    const bounds = heroMedia.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroMedia.style.transform = `perspective(1200px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translate3d(0, -2px, 0)`;
  });
  heroMedia.addEventListener("pointerleave", () => {
    heroMedia.style.transform = "perspective(1200px) rotateY(-2deg) rotateX(1deg)";
  });
}

// Scroll-linked media depth that works across browsers (not only CSS scroll-timeline).
const motionMedia = [...document.querySelectorAll("[data-motion-media]")];
const motionScenes = [...document.querySelectorAll("[data-motion-scene]")];
let motionFrame = 0;

const updateScrollMotion = () => {
  motionFrame = 0;
  if (reduceMotion) return;
  const viewportCenter = window.innerHeight / 2;

  motionMedia.forEach((media) => {
    const bounds = media.getBoundingClientRect();
    const distance = (bounds.top + bounds.height / 2 - viewportCenter) / (window.innerHeight + bounds.height);
    const shift = Math.max(-1, Math.min(1, distance)) * -38;
    media.style.setProperty("--media-shift", `${shift}px`);
  });

  motionScenes.forEach((scene) => {
    const bounds = scene.getBoundingClientRect();
    const distance = (bounds.top + bounds.height / 2 - viewportCenter) / (window.innerHeight + bounds.height);
    const shift = Math.max(-1, Math.min(1, distance)) * -18;
    scene.style.setProperty("--scene-scroll", `${shift}px`);
  });
};

const requestScrollMotion = () => {
  if (!motionFrame) motionFrame = requestAnimationFrame(updateScrollMotion);
};

updateScrollMotion();
window.addEventListener("scroll", requestScrollMotion, { passive: true });
window.addEventListener("resize", requestScrollMotion, { passive: true });

// Multi-layer hero parallax and the care-photo tilt respond directly to the visitor.
if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  motionScenes.forEach((scene) => {
    const layers = [...scene.querySelectorAll("[data-depth-layer]")];
    scene.addEventListener("pointermove", (event) => {
      const bounds = scene.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depthLayer || 1);
        layer.style.setProperty("--layer-x", `${x * depth * 7}px`);
        layer.style.setProperty("--layer-y", `${y * depth * 6}px`);
        layer.style.setProperty("--layer-z", `${depth * 7}px`);
      });
    });
    scene.addEventListener("pointerleave", () => {
      layers.forEach((layer) => {
        layer.style.setProperty("--layer-x", "0px");
        layer.style.setProperty("--layer-y", "0px");
        layer.style.setProperty("--layer-z", "0px");
      });
    });
  });

  motionMedia.forEach((media) => {
    media.addEventListener("pointermove", (event) => {
      const bounds = media.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      media.style.setProperty("--media-pan-x", `${x * -12}px`);
      media.style.setProperty("--media-rx", `${y * -5}deg`);
      media.style.setProperty("--media-ry", `${x * 7}deg`);
    });
    media.addEventListener("pointerleave", () => {
      media.style.setProperty("--media-pan-x", "0px");
      media.style.setProperty("--media-rx", "0deg");
      media.style.setProperty("--media-ry", "0deg");
    });
  });
}

// Accessible accordions.
document.querySelectorAll("[data-accordion] .faq-question").forEach((button, index) => {
  const item = button.closest(".faq-item");
  const answer = item?.querySelector(".faq-answer");
  if (!item || !answer) return;
  const answerId = answer.id || `faq-answer-${index + 1}`;
  answer.id = answerId;
  button.setAttribute("aria-controls", answerId);
  button.setAttribute("aria-expanded", "false");

  button.addEventListener("click", () => {
    const wasOpen = item.classList.contains("open");
    const group = item.closest("[data-accordion]");
    group.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      openItem.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      const openAnswer = openItem.querySelector(".faq-answer");
      if (openAnswer) openAnswer.style.maxHeight = "0px";
    });
    if (!wasOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

// Gallery filtering and accessible lightbox.
const galleryItems = [...document.querySelectorAll(".gallery-item")];
document.querySelectorAll("[data-gallery-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-gallery-filter]").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    const filter = button.dataset.galleryFilter;
    galleryItems.forEach((item) => {
      item.classList.toggle("hidden", filter !== "all" && item.dataset.category !== filter);
    });
  });
});

const modal = document.querySelector("#gallery-modal");
const modalBody = modal?.querySelector("[data-modal-body]");
const modalClose = modal?.querySelector(".modal-close");
let modalTrigger = null;

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("open");
  modal.hidden = true;
  modalBody.innerHTML = "";
  document.body.classList.remove("menu-open");
  modalTrigger?.focus();
};

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (!modal || !modalBody) return;
    modalTrigger = item;
    if (item.dataset.video === "true") {
      modalBody.innerHTML = `<div class="modal-placeholder"><div><span class="play-icon modal-play-center"></span><h2>Film coming soon.</h2><p>This card is ready for your farm video. Replace it with a hosted MP4 or embed when footage is available.</p></div></div>`;
    } else {
      const image = item.querySelector("img");
      modalBody.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
    }
    modal.classList.add("open");
    modal.hidden = false;
    document.body.classList.add("menu-open");
    modalClose?.focus();
  });
});

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("open")) closeModal();
});

// WhatsApp order cart. This is intentionally isolated for easy future backend replacement.
const shop = document.querySelector("[data-shop]");
if (shop) {
  const quantities = {};
  const orderList = document.querySelector("[data-order-list]");
  const emptyState = document.querySelector("[data-order-empty]");
  const orderForm = document.querySelector("#order-form");
  const orderStatus = document.querySelector("#order-status");

  const getProductData = (card) => ({
    id: card.dataset.productId,
    name: card.dataset.productName,
    size: card.dataset.productSize
  });

  const renderOrder = () => {
    const cards = [...shop.querySelectorAll("[data-product-id]")];
    const selected = cards
      .map((card) => ({ ...getProductData(card), quantity: quantities[card.dataset.productId] || 0 }))
      .filter((product) => product.quantity > 0);
    orderList.innerHTML = selected.map((product) => (
      `<div class="order-line"><span>${product.name}<small>${product.size}</small></span><strong>× ${product.quantity}</strong></div>`
    )).join("");
    emptyState.hidden = selected.length > 0;
  };

  shop.querySelectorAll("[data-quantity-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-product-id]");
      const id = card.dataset.productId;
      const delta = button.dataset.quantityAction === "increase" ? 1 : -1;
      quantities[id] = Math.max(0, Math.min(12, (quantities[id] || 0) + delta));
      card.querySelector("output").textContent = quantities[id];
      renderOrder();
    });
  });

  orderForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = [...shop.querySelectorAll("[data-product-id]")]
      .map((card) => ({ ...getProductData(card), quantity: quantities[card.dataset.productId] || 0 }))
      .filter((product) => product.quantity > 0);
    const formData = new FormData(orderForm);
    const name = String(formData.get("name") || "").trim();
    const location = String(formData.get("location") || "").trim();

    if (!selected.length) {
      orderStatus.textContent = "Choose at least one product to continue.";
      orderStatus.className = "form-status error";
      shop.querySelector("[data-quantity-action='increase']")?.focus();
      return;
    }
    if (!name || !location) {
      orderStatus.textContent = "Please add your name and delivery location.";
      orderStatus.className = "form-status error";
      orderForm.reportValidity();
      return;
    }

    const productLines = selected.map((product, index) => `${index + 1}. ${product.name} (${product.size}) x ${product.quantity}`);
    const message = [
      "Hello Hello Honey Bunny,",
      "I'd like to place an order:",
      "",
      ...productLines,
      "",
      `Name: ${name}`,
      `Delivery location: ${location}`,
      `Preferred date: ${formData.get("date") || "Flexible"}`,
      `Notes: ${formData.get("notes") || "None"}`,
      "",
      "Please confirm availability."
    ].join("\n");

    orderStatus.textContent = "Your order is ready. Opening WhatsApp for confirmation…";
    orderStatus.className = "form-status success";
    const orderUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(orderUrl, "_blank", "noopener,noreferrer");
  });
}

// Contact form uses WhatsApp until a backend is connected.
const contactForm = document.querySelector("#contact-form");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const status = document.querySelector("#contact-status");
  const name = String(formData.get("name") || "").trim();
  const messageText = String(formData.get("message") || "").trim();
  if (!name || !messageText) {
    status.textContent = "Please add your name and a short message.";
    status.className = "form-status error";
    contactForm.reportValidity();
    return;
  }
  const message = [
    "Hello Hello Honey Bunny,",
    "",
    `Name: ${name}`,
    `Email: ${formData.get("email") || "Not provided"}`,
    `Enquiry type: ${formData.get("type") || "General"}`,
    "",
    messageText
  ].join("\n");
  status.textContent = "Opening your enquiry in WhatsApp…";
  status.className = "form-status success";
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

// A restrained 3D layer for fine pointers. CSS variables keep the effect GPU-friendly.
if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".card, .product-card, .feature, .contact-card, .gallery-item, .shop-product, .stat").forEach((card) => {
    card.classList.add("depth-card");
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty("--rotate-x", `${(0.5 - y) * 7}deg`);
      card.style.setProperty("--rotate-y", `${(x - 0.5) * 10}deg`);
      card.style.setProperty("--glow-x", `${x * 100}%`);
      card.style.setProperty("--glow-y", `${y * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rotate-x", "0deg");
      card.style.setProperty("--rotate-y", "0deg");
    });
  });

  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const bounds = button.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      button.style.setProperty("--magnet-x", `${x * 0.08}px`);
      button.style.setProperty("--magnet-y", `${y * 0.12}px`);
    });
    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--magnet-x", "0px");
      button.style.setProperty("--magnet-y", "0px");
    });
  });
}
