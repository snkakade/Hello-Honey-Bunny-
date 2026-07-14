document.documentElement.classList.add("js");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
let lastFocused = null;

function focusableItems() { return nav ? [...nav.querySelectorAll("a[href], button:not([disabled])")] : []; }
function closeMenu({ returnFocus = false } = {}) {
  if (!toggle || !nav) return;
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.querySelector("span").textContent = "Open menu";
  document.body.classList.remove("menu-open");
  if (returnFocus) (lastFocused || toggle).focus();
}
function openMenu() {
  if (!toggle || !nav) return;
  lastFocused = toggle;
  nav.classList.add("open");
  toggle.setAttribute("aria-expanded", "true");
  toggle.querySelector("span").textContent = "Close menu";
  document.body.classList.add("menu-open");
  focusableItems()[0]?.focus();
}

toggle?.addEventListener("click", () => toggle.getAttribute("aria-expanded") === "true" ? closeMenu({ returnFocus: true }) : openMenu());
nav?.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
document.addEventListener("keydown", (event) => {
  if (!nav?.classList.contains("open")) return;
  if (event.key === "Escape") { event.preventDefault(); closeMenu({ returnFocus: true }); return; }
  if (event.key !== "Tab") return;
  const items = focusableItems(); const first = items[0]; const last = items.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
});
matchMedia("(min-width: 901px)").addEventListener("change", (event) => { if (event.matches) closeMenu(); });
