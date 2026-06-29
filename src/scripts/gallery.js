export function initGallery() {
  const items = [...document.querySelectorAll(".gallery-item")];
  const modal = document.querySelector("#gallery-modal");
  const body = modal?.querySelector("[data-modal-body]");
  const closeButton = modal?.querySelector(".modal-close");
  let trigger = null;

  document.querySelectorAll("[data-gallery-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-gallery-filter]").forEach((filter) => {
        filter.classList.remove("active");
        filter.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      items.forEach((item) => {
        item.classList.toggle("hidden", button.dataset.galleryFilter !== "all" && item.dataset.category !== button.dataset.galleryFilter);
      });
    });
  });

  const close = () => {
    if (!modal || !body) return;
    modal.classList.remove("open");
    modal.hidden = true;
    body.innerHTML = "";
    document.body.classList.remove("menu-open");
    trigger?.focus();
  };

  items.forEach((item) => {
    item.addEventListener("click", () => {
      if (!modal || !body) return;
      trigger = item;
      if (item.dataset.video === "true") {
        body.innerHTML = `<div class="modal-placeholder"><div><span class="play-icon modal-play-center"></span><h2>Film coming soon.</h2><p>This card is ready for your farm video. Replace it with a hosted MP4 or embed when footage is available.</p></div></div>`;
      } else {
        const image = item.querySelector("img");
        body.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
      }
      modal.classList.add("open");
      modal.hidden = false;
      document.body.classList.add("menu-open");
      closeButton?.focus();
    });
  });

  closeButton?.addEventListener("click", close);
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("open")) close();
  });
}
