import { site } from "../config/site.js";

function openWhatsApp(message) {
  window.open(`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

function initShop() {
  const shop = document.querySelector("[data-shop]");
  if (!shop) return;

  const quantities = {};
  const list = document.querySelector("[data-order-list]");
  const empty = document.querySelector("[data-order-empty]");
  const form = document.querySelector("#order-form");
  const status = document.querySelector("#order-status");
  const getData = (card) => ({
    id: card.dataset.productId,
    name: card.dataset.productName,
    size: card.dataset.productSize
  });

  const selectedProducts = () => [...shop.querySelectorAll("[data-product-id]")]
    .map((card) => ({ ...getData(card), quantity: quantities[card.dataset.productId] || 0 }))
    .filter((product) => product.quantity > 0);

  const render = () => {
    const selected = selectedProducts();
    list.innerHTML = selected.map((product) => (
      `<div class="order-line"><span>${product.name}<small>${product.size}</small></span><strong>× ${product.quantity}</strong></div>`
    )).join("");
    empty.hidden = selected.length > 0;
  };

  shop.querySelectorAll("[data-quantity-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-product-id]");
      const id = card.dataset.productId;
      const delta = button.dataset.quantityAction === "increase" ? 1 : -1;
      quantities[id] = Math.max(0, Math.min(12, (quantities[id] || 0) + delta));
      card.querySelector("output").textContent = quantities[id];
      render();
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = selectedProducts();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const location = String(data.get("location") || "").trim();

    if (!selected.length) {
      status.textContent = "Choose at least one product to continue.";
      status.className = "form-status error";
      shop.querySelector("[data-quantity-action='increase']")?.focus();
      return;
    }
    if (!name || !location) {
      status.textContent = "Please add your name and delivery location.";
      status.className = "form-status error";
      form.reportValidity();
      return;
    }

    const lines = selected.map((product, index) => `${index + 1}. ${product.name} (${product.size}) x ${product.quantity}`);
    const message = [
      "Hello Hello Honey Bunny,",
      "I'd like to place an order:",
      "",
      ...lines,
      "",
      `Name: ${name}`,
      `Delivery location: ${location}`,
      `Preferred date: ${data.get("date") || "Flexible"}`,
      `Notes: ${data.get("notes") || "None"}`,
      "",
      "Please confirm availability."
    ].join("\n");

    status.textContent = "Your order is ready. Opening WhatsApp for confirmation…";
    status.className = "form-status success";
    openWhatsApp(message);
  });
}

function initContact() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const status = document.querySelector("#contact-status");
    const name = String(data.get("name") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !message) {
      status.textContent = "Please add your name and a short message.";
      status.className = "form-status error";
      form.reportValidity();
      return;
    }
    status.textContent = "Opening your enquiry in WhatsApp…";
    status.className = "form-status success";
    openWhatsApp([
      "Hello Hello Honey Bunny,",
      "",
      `Name: ${name}`,
      `Email: ${data.get("email") || "Not provided"}`,
      `Enquiry type: ${data.get("type") || "General"}`,
      "",
      message
    ].join("\n"));
  });
}

export function initCommerce() {
  initShop();
  initContact();
}
