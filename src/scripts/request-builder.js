const root = document.querySelector("[data-request-builder]");

if (root) {
  const form = root.querySelector("#batch-form");
  const status = root.querySelector("#request-status");
  const fallback = root.querySelector("[data-fallback]");
  const requestText = root.querySelector("[data-request-text]");
  const maxQuantity = Number(root.dataset.maxQuantity) || 24;
  const quantities = new Map();
  const dateInput = root.querySelector("#request-date");
  const localToday = new Date();
  const offsetToday = new Date(localToday.getTime() - localToday.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = offsetToday;

  const keyFor = (control) => `${control.closest("[data-product-id]").dataset.productId}|${control.closest("[data-size]").dataset.size}`;
  const chosen = () => [...root.querySelectorAll("[data-size]")].map((control) => {
    const product = control.closest("[data-product-id]");
    return { name: product.dataset.productName, size: control.dataset.size, quantity: quantities.get(keyFor(control)) || 0 };
  }).filter((item) => item.quantity > 0);

  root.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => {
    const control = button.closest("[data-size]");
    const key = keyFor(control);
    const change = button.dataset.action === "increase" ? 1 : -1;
    const value = Math.max(0, Math.min(maxQuantity, (quantities.get(key) || 0) + change));
    quantities.set(key, value);
    control.querySelector("output").textContent = String(value);
  }));

  const requestedProduct = new URLSearchParams(window.location.search).get("product");
  if (requestedProduct) {
    const matchingCard = [...root.querySelectorAll("[data-product-id]")].find((card) => card.dataset.productId === requestedProduct);
    matchingCard?.querySelector("[data-action='increase']")?.click();
  }

  function setError(input, message) {
    const error = document.getElementById(`${input.id}-error`);
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
  }

  function validate(data) {
    let valid = true;
    ["request-name", "request-area", "request-arrangement"].forEach((id) => {
      const input = document.getElementById(id);
      const message = String(data.get(input.name) || "").trim() ? "" : "This field is required.";
      setError(input, message); if (message) valid = false;
    });
    const pastDate = data.get("date") && String(data.get("date")) < offsetToday;
    setError(dateInput, pastDate ? "Choose today or a future date." : "");
    return valid && !pastDate;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const products = chosen();
    if (!products.length) {
      status.textContent = "Choose at least one product and pack size.";
      status.className = "form-status error";
      root.querySelector("[data-action='increase']")?.focus();
      return;
    }
    if (!validate(data)) {
      status.textContent = "Please correct the highlighted fields.";
      status.className = "form-status error";
      root.querySelector("[aria-invalid='true']")?.focus();
      return;
    }
    const lines = products.map((product, index) => `${index + 1}. ${product.name} (${product.size}) x ${product.quantity}`);
    const message = ["Hello, I would like to check availability for the following:", "", ...lines, "", `Name: ${String(data.get("name")).trim()}`, `Area or postcode: ${String(data.get("area")).trim()}`, `Preferred arrangement: ${data.get("arrangement")}`, `Preferred date: ${data.get("date") || "Flexible"}`, `Notes: ${String(data.get("notes") || "").trim() || "None"}`, "", "Please confirm current batch availability, final pricing and the available pickup or delivery option."].join("\n");
    requestText.textContent = message;
    fallback.hidden = false;
    window.hhbTrack?.("generate_lead", { lead_type: "batch_request", contact_method: "whatsapp" });
    const opened = window.open(`https://wa.me/${root.dataset.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    status.textContent = opened ? "WhatsApp has been opened. Please review and send the message there." : "WhatsApp could not be opened automatically. Copy the formatted request below and send it to the displayed number.";
    status.className = opened ? "form-status" : "form-status error";
  });

  root.querySelector("[data-copy-request]").addEventListener("click", async () => {
    const copyStatus = root.querySelector("[data-copy-status]");
    try { await navigator.clipboard.writeText(requestText.textContent); copyStatus.textContent = "Request copied."; }
    catch { copyStatus.textContent = "Copy was unavailable. Select the request text and copy it manually."; }
  });
}
