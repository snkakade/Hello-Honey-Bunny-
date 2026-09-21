const analytics = window.hhbAnalytics;

if (analytics) {
  const preferenceKey = analytics.preferenceKey || "hhb_analytics_consent";
  const banner = document.querySelector("[data-analytics-consent]");
  const settings = document.querySelector("[data-analytics-settings]");
  const validPreferences = new Set(["granted", "denied"]);
  let preference;

  try { preference = localStorage.getItem(preferenceKey); } catch { preference = null; }

  const commonParameters = () => ({
    event_source: "website",
    page_path: window.location.pathname,
    page_title: document.title,
    transport_type: "beacon"
  });

  const track = (eventName, parameters = {}) => {
    if (typeof window.gtag !== "function") return;
    const cleanParameters = Object.fromEntries(Object.entries({ ...commonParameters(), ...parameters }).filter(([, value]) => value !== undefined && value !== null && value !== ""));
    window.gtag("event", eventName, cleanParameters);
  };

  window.hhbTrack = track;
  window.hhbTrackLead = (parameters = {}) => track("generate_lead", parameters);

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
      allow_ad_personalization_signals: false,
      send_page_view: true,
      debug_mode: new URLSearchParams(window.location.search).get("analytics_debug") === "1"
    });
  }

  function savePreference(value) {
    preference = value;
    try { localStorage.setItem(preferenceKey, value); } catch { /* Continue without persistence. */ }
    window.gtag("consent", "update", {
      analytics_storage: value,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    banner.hidden = true;
    settings.hidden = false;
  }

  banner.querySelector("[data-analytics-accept]").addEventListener("click", () => savePreference("granted"));
  banner.querySelector("[data-analytics-decline]").addEventListener("click", () => savePreference("denied"));
  settings.addEventListener("click", () => {
    banner.hidden = false;
    settings.hidden = true;
  });

  loadGoogleTag();

  if (preference === "granted") settings.hidden = false;
  else if (preference === "denied") settings.hidden = false;
  else if (!validPreferences.has(preference)) banner.hidden = false;

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    const linkLocation = link.closest("header") ? "header" : link.closest("footer") ? "footer" : "content";
    const ctaName = (link.dataset.analyticsLabel || link.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100);

    if (href.includes("wa.me/")) {
      const parameters = { lead_type: "whatsapp_handoff", contact_method: "whatsapp", link_location: linkLocation, cta_name: ctaName };
      track("whatsapp_click", parameters);
      window.hhbTrackLead(parameters);
    } else if (href.startsWith("mailto:") || href.startsWith("tel:")) {
      const contactMethod = href.startsWith("mailto:") ? "email" : "phone";
      const parameters = { lead_type: `${contactMethod}_handoff`, contact_method: contactMethod, link_location: linkLocation, cta_name: ctaName };
      track("contact_click", parameters);
      window.hhbTrackLead(parameters);
    }
  });
}
