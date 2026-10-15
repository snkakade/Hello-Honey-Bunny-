const analytics = window.hhbAnalytics;

if (analytics) {
  const banner = document.querySelector("[data-cookie-banner]");
  const manager = document.querySelector("[data-cookie-manager]");
  const startedForms = new WeakSet();
  const viewedSections = new Set();
  const scrollMarks = new Set();
  const safeText = (value = "") => String(value).trim().replace(/\s+/g, " ").replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, "[email]").replace(/\+?\d[\d\s()-]{7,}\d/g, "[phone]").slice(0, 100);
  const destination = (url) => { try { const parsed = new URL(url, location.origin); return parsed.origin === location.origin ? parsed.pathname : parsed.hostname; } catch { return "unknown"; } };
  const track = (name, parameters = {}) => {
    if (typeof window.gtag !== "function") return;
    const clean = Object.fromEntries(Object.entries({ page_path: location.pathname, ...parameters }).filter(([, value]) => value !== undefined && value !== null && value !== ""));
    window.gtag("event", name, clean);
  };
  window.hhbTrack = track;
  // A future backend/CRM success callback may call this. A handoff alone is not a confirmed lead.
  window.hhbTrackConfirmedLead = (parameters = {}) => track("generate_lead", parameters);
  const readChoices = () => { try { return JSON.parse(localStorage.getItem(analytics.preferenceKey) || "null"); } catch { return null; } };
  function applyChoices(choices, source) {
    const normalized = { analytics: !!choices.analytics, advertising: !!choices.advertising, personalization: !!choices.personalization };
    try { localStorage.setItem(analytics.preferenceKey, JSON.stringify(normalized)); } catch { /* Applies for this page even without persistence. */ }
    window.gtag("consent", "update", {
      analytics_storage: normalized.analytics ? "granted" : "denied", ad_storage: normalized.advertising ? "granted" : "denied",
      ad_user_data: normalized.advertising ? "granted" : "denied", ad_personalization: normalized.personalization ? "granted" : "denied"
    });
    window.gtag("set", "allow_ad_personalization_signals", normalized.personalization);
    track("consent_update", { element_type: "consent_control", placement: source, analytics_consent: normalized.analytics ? "granted" : "denied", advertising_consent: normalized.advertising ? "granted" : "denied", personalization_consent: normalized.personalization ? "granted" : "denied" });
    banner.hidden = true;
    if (manager.open) manager.close();
  }
  function openManager() {
    const choices = readChoices() || {};
    const fields = manager.querySelector("form").elements;
    fields.analytics.checked = !!choices.analytics;
    fields.advertising.checked = !!choices.advertising;
    fields.personalization.checked = !!choices.personalization;
    manager.showModal();
  }
  banner.querySelector("[data-consent-accept]").addEventListener("click", () => applyChoices({ analytics: true, advertising: true, personalization: true }, "initial_banner"));
  banner.querySelector("[data-consent-manage]").addEventListener("click", openManager);
  document.querySelector("[data-consent-settings]").addEventListener("click", openManager);
  manager.querySelector("[data-consent-reject]").addEventListener("click", () => applyChoices({}, "cookie_manager"));
  manager.addEventListener("close", () => { if (!readChoices()) banner.hidden = false; });
  manager.querySelector("form").addEventListener("submit", (event) => {
    if (event.submitter?.value !== "save") return;
    event.preventDefault();
    const fields = manager.querySelector("form").elements;
    applyChoices({ analytics: fields.analytics.checked, advertising: fields.advertising.checked, personalization: fields.personalization.checked }, "cookie_manager");
  });
  if (!readChoices()) banner.hidden = false;

  const pageView = () => track("page_view", { element_type: "page" });
  pageView(); addEventListener("popstate", pageView); document.addEventListener("astro:page-load", pageView);
  document.addEventListener("focusin", (event) => { const form = event.target.closest("form"); if (form && !startedForms.has(form)) { startedForms.add(form); track("form_start", { element_type: "form", placement: form.id || "unnamed_form" }); } });
  document.addEventListener("click", (event) => {
    const target = event.target.closest("a[href],button");
    if (!target || target.matches("[data-consent-accept],[data-consent-manage],[data-consent-save],[data-consent-reject],[data-consent-settings],.cookie-manager-close")) return;
    const placement = target.dataset.analyticsLocation || (target.closest("header") ? "header" : target.closest("footer") ? "footer" : target.closest("form") ? "form" : "content");
    const base = { placement, link_text: safeText(target.dataset.analyticsLabel || target.textContent || target.getAttribute("aria-label")), element_type: target.tagName.toLowerCase() };
    track("ui_click", base); if (target.matches(".button,[data-analytics-label]")) track("cta_click", base);
    if (!target.matches("a[href]")) return;
    const href = target.getAttribute("href") || "";
    if (href.startsWith("mailto:")) track("email_click", base);
    else if (href.startsWith("tel:")) track("phone_click", base);
    else if (/wa\.me\//i.test(href)) track("whatsapp_click", { ...base, destination_hostname: "wa.me" });
    else if (/linkedin\.com|instagram\.com|facebook\.com|youtube\.com/i.test(href)) track("social_click", { ...base, destination_hostname: destination(href) });
    else if (/\.(pdf|docx?|xlsx?|csv|zip)(?:$|[?#])/i.test(href)) track("file_download", { ...base, destination_path: destination(href) });
    else if (/^https?:/i.test(href) && new URL(href).origin !== location.origin) track("outbound_click", { ...base, destination_hostname: destination(href) });
  });
  addEventListener("scroll", () => { const height = document.documentElement.scrollHeight - innerHeight; const percent = height <= 0 ? 100 : Math.min(100, Math.round((scrollY / height) * 100)); [25, 50, 75, 90, 100].forEach((mark) => { if (percent >= mark && !scrollMarks.has(mark)) { scrollMarks.add(mark); track("scroll_depth", { percent_scrolled: mark, element_type: "page" }); } }); }, { passive: true });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (!entry.isIntersecting) return; const section = entry.target; const label = section.id || section.getAttribute("aria-label") || section.querySelector("h1,h2")?.textContent; const sectionId = safeText(label).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""); if (sectionId && !viewedSections.has(sectionId)) { viewedSections.add(sectionId); track("section_view", { section_id: sectionId, element_type: "section" }); } }), { threshold: 0.5 });
    document.querySelectorAll("main section").forEach((section) => observer.observe(section));
  }
  document.querySelectorAll("video").forEach((video) => { let started = false; const progress = new Set(); video.addEventListener("play", () => { if (!started) { started = true; track("video_start", { element_type: "video", placement: video.id || "content_video" }); } }); video.addEventListener("timeupdate", () => { if (!video.duration) return; const percent = Math.floor((video.currentTime / video.duration) * 100); [25, 50, 75].forEach((mark) => { if (percent >= mark && !progress.has(mark)) { progress.add(mark); track("video_progress", { element_type: "video", percent_scrolled: mark }); } }); }); video.addEventListener("ended", () => track("video_complete", { element_type: "video", placement: video.id || "content_video" })); });
  [10, 30, 60].forEach((seconds) => setTimeout(() => { if (!document.hidden) track("engaged_view", { engagement_seconds: seconds, element_type: "page" }); }, seconds * 1000));
}
