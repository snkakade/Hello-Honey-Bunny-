const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

function initReveals() {
  const items = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.13, rootMargin: "0px 0px -35px" });

  items.forEach((item) => observer.observe(item));
}

function initHeroDepth() {
  const hero = document.querySelector("[data-parallax]");
  if (!hero || reduceMotion || !finePointer) return;
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    hero.style.transform = `perspective(1200px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translate3d(0, -2px, 0)`;
  });
  hero.addEventListener("pointerleave", () => {
    hero.style.transform = "perspective(1200px) rotateY(-2deg) rotateX(1deg)";
  });
}

function initScrollDepth() {
  const mediaItems = [...document.querySelectorAll("[data-motion-media]")];
  const scenes = [...document.querySelectorAll("[data-motion-scene]")];
  let frame = 0;

  const update = () => {
    frame = 0;
    if (reduceMotion) return;
    const center = window.innerHeight / 2;
    mediaItems.forEach((media) => {
      const bounds = media.getBoundingClientRect();
      const distance = (bounds.top + bounds.height / 2 - center) / (window.innerHeight + bounds.height);
      media.style.setProperty("--media-shift", `${Math.max(-1, Math.min(1, distance)) * -38}px`);
    });
    scenes.forEach((scene) => {
      const bounds = scene.getBoundingClientRect();
      const distance = (bounds.top + bounds.height / 2 - center) / (window.innerHeight + bounds.height);
      scene.style.setProperty("--scene-scroll", `${Math.max(-1, Math.min(1, distance)) * -18}px`);
    });
  };

  const requestUpdate = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
}

function initPointerDepth() {
  if (reduceMotion || !finePointer) return;

  document.querySelectorAll("[data-motion-scene]").forEach((scene) => {
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

  document.querySelectorAll("[data-motion-media]").forEach((media) => {
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

function initInteractiveDepth() {
  if (reduceMotion || !finePointer) return;
  const selector = ".card, .product-card, .feature, .contact-card, .gallery-item, .shop-product, .stat";
  document.querySelectorAll(selector).forEach((card) => {
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
      button.style.setProperty("--magnet-x", `${(event.clientX - bounds.left - bounds.width / 2) * 0.08}px`);
      button.style.setProperty("--magnet-y", `${(event.clientY - bounds.top - bounds.height / 2) * 0.12}px`);
    });
    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--magnet-x", "0px");
      button.style.setProperty("--magnet-y", "0px");
    });
  });
}

export function initMotion() {
  document.documentElement.classList.add("motion-ready");
  initReveals();
  initHeroDepth();
  initScrollDepth();
  initPointerDepth();
  initInteractiveDepth();
}
