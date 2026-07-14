const root = document.querySelector("[data-business-form]");
if (root) {
  const form = root.querySelector("#business-form"); const status = root.querySelector("#business-status"); const fallback = root.querySelector("[data-business-fallback]"); const output = root.querySelector("[data-business-text]");
  const required = ["business-contact", "business-name", "business-type", "business-location", "business-product", "business-message", "business-method"];
  form.addEventListener("submit", (event) => {
    event.preventDefault(); const data = new FormData(form); let valid = true;
    required.forEach((id) => { const input = document.getElementById(id); const error = document.getElementById(`${id}-error`); const message = String(data.get(input.name) || "").trim() ? "" : "This field is required."; input.setAttribute("aria-invalid", message ? "true" : "false"); error.textContent = message; if (message) valid = false; });
    if (!valid) { status.textContent = "Please correct the highlighted fields."; status.className = "form-status error"; root.querySelector("[aria-invalid='true']")?.focus(); return; }
    const message = ["Hello, I would like to start a food business conversation.", "", `Contact name: ${data.get("contact")}`, `Business name: ${data.get("business")}`, `Business type: ${data.get("type")}`, `Location: ${data.get("location")}`, `Product interest: ${data.get("product")}`, `Approximate requirement: ${String(data.get("requirement") || "").trim() || "Not specified"}`, `Message: ${data.get("message")}`, "", "I understand that this enquiry does not guarantee immediate supply."].join("\n");
    output.textContent = message; fallback.hidden = false;
    const url = data.get("method") === "email" ? `mailto:${root.dataset.email}?subject=${encodeURIComponent("Food business enquiry")}&body=${encodeURIComponent(message)}` : `https://wa.me/${root.dataset.whatsapp}?text=${encodeURIComponent(message)}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer"); status.textContent = opened ? "Your chosen service has been opened. Please review and send the enquiry there." : "The handoff could not be opened automatically. Copy the formatted enquiry below."; status.className = opened ? "form-status" : "form-status error";
  });
  root.querySelector("[data-copy-business]").addEventListener("click", async () => { const copyStatus = root.querySelector("[data-business-copy-status]"); try { await navigator.clipboard.writeText(output.textContent); copyStatus.textContent = "Enquiry copied."; } catch { copyStatus.textContent = "Copy was unavailable. Select the enquiry text and copy it manually."; } });
}
