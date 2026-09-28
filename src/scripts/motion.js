import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  document.documentElement.classList.add("motion-ready");

  const lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    syncTouch: false,
    anchors: { offset: -84 },
    prevent: (node) => Boolean(node.closest("textarea, select, [data-lenis-prevent]"))
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.addEventListener("hhb:menu", (event) => event.detail?.open ? lenis.stop() : lenis.start());

  gsap.from(".site-header", { yPercent: -110, duration: 0.85, ease: "power3.out" });

  const hero = document.querySelector("[data-hero]");
  if (hero) {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .from("[data-hero-copy] > *", { y: 48, autoAlpha: 0, duration: 0.85, stagger: 0.09 })
      .from("[data-hero-art]", { x: 90, rotate: 5, scale: 0.92, autoAlpha: 0, duration: 1.15 }, "-=0.72")
      .from(".hero-stamp", { scale: 0, rotate: -30, duration: 0.65, ease: "back.out(1.8)" }, "-=0.4")
      .from(".hero-note", { y: 32, rotate: 4, autoAlpha: 0, duration: 0.65 }, "-=0.45");

    gsap.to(".hero-art-frame img", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.7 }
    });
    gsap.to(".hero-sun", {
      xPercent: 20,
      yPercent: 28,
      scale: 1.2,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 }
    });
  }

  const revealItems = gsap.utils.toArray("[data-reveal], .page-intro h1, .page-intro .lede, .feature, .request-product, .contact-card, .product-grid > .product-card, .faq-list details, .development-list li");
  revealItems.forEach((element) => {
    const imageReveal = element.getAttribute?.("data-reveal") === "image";
    gsap.from(element, {
      y: imageReveal ? 40 : 62,
      x: imageReveal ? -32 : 0,
      rotate: imageReveal ? -1.5 : 0,
      autoAlpha: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: element, start: "top 88%", once: true }
    });
  });

  gsap.utils.toArray(".product-card > picture img, .location-photo img, .story-art img").forEach((image) => {
    gsap.fromTo(image, { scale: 1.08 }, {
      scale: 1,
      ease: "none",
      scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: 0.8 }
    });
  });

  gsap.utils.toArray(".step-number").forEach((number) => {
    gsap.from(number, {
      rotate: -70,
      scale: 0.55,
      duration: 0.75,
      ease: "back.out(1.9)",
      scrollTrigger: { trigger: number, start: "top 88%", once: true }
    });
  });

  const businessSection = document.querySelector(".business-section");
  if (businessSection) {
    gsap.to(".orbit-one", { rotate: 150, xPercent: -12, ease: "none", scrollTrigger: { trigger: businessSection, start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.to(".orbit-two", { rotate: -120, yPercent: -12, ease: "none", scrollTrigger: { trigger: businessSection, start: "top bottom", end: "bottom top", scrub: 1 } });
  }

  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".button").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const bounds = button.getBoundingClientRect();
        gsap.to(button, { x: (event.clientX - bounds.left - bounds.width / 2) * 0.12, y: (event.clientY - bounds.top - bounds.height / 2) * 0.16, duration: 0.35, ease: "power2.out" });
      });
      button.addEventListener("pointerleave", () => gsap.to(button, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.45)" }));
    });
  }
}
