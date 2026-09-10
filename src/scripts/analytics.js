const analytics = window.hhbAnalytics;

if (analytics) {
  const preferenceKey = "hhb_analytics_consent";
  const banner = document.querySelector("[data-analytics-consent]");
  const settings = document.querySelector("[data-analytics-settings]");
  const validPreferences = new Set(["granted", "denied"]);
  let preference;

  try { preference = localStorage.getItem(preferenceKey); } catch { preference = null; }

  const track = (eventName, parameters = {}) => {
    if (preference === "granted" && typeof window.gtag === "function") {
      window.gtag("event", eventName, parameters);
    }
  };

  window.hhbTrack = track;

  function loadGoogleTag() {
    if (document.querySelector("script[data-google-tag]")) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analytics.measurementId)}`;
    script.dataset.googleTag = "true";
    document.head.append(script);
    window.gtag("js", new Date());
    window.gtag("config", analytics.measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
  }

  function savePreference(value) {
    preference = value;
    try { localStorage.setItem(preferenceKey, value); } catch { /* Continue without persistence. */ }
    banner.hidden = true;
    settings.hidden = false;
    if (value === "granted") loadGoogleTag();
  }

  banner.querySelector("[data-analytics-accept]").addEventListener("click", () => savePreference("granted"));
  banner.querySelector("[data-analytics-decline]").addEventListener("click", () => savePreference("denied"));
  settings.addEventListener("click", () => {
    banner.hidden = false;
    settings.hidden = true;
  });

  if (preference === "granted") { settings.hidden = false; loadGoogleTag(); }
  else if (preference === "denied") settings.hidden = false;
  else if (!validPreferences.has(preference)) banner.hidden = false;

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href*='wa.me/']");
    if (!link) return;
    track("whatsapp_click", {
      link_location: link.closest("header") ? "header" : link.closest("footer") ? "footer" : "content",
      link_text: (link.textContent || "").trim().slice(0, 100)
    });
  });
}
