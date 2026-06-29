export function initAccordions() {
  document.querySelectorAll("[data-accordion] .faq-question").forEach((button, index) => {
    const item = button.closest(".faq-item");
    const answer = item?.querySelector(".faq-answer");
    if (!item || !answer) return;

    answer.id ||= `faq-answer-${index + 1}`;
    button.setAttribute("aria-controls", answer.id);
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      item.closest("[data-accordion]").querySelectorAll(".faq-item.open").forEach((openItem) => {
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
}
