import React from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Offline app shell. Skipped in dev, inside iframes and on editor preview hosts, where a
// service worker would serve stale builds while you are iterating.
const isPreviewHost =
  window.location.hostname.includes("id-preview--") || window.location.hostname.endsWith("lovableproject.com");
const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();
if (import.meta.env.PROD && "serviceWorker" in navigator && !isPreviewHost && !isInIframe) {
  registerSW({ immediate: true });
} else if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister())).catch(() => undefined);
}
