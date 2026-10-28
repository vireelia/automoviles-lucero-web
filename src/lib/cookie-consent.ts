"use client";

// Consentimiento de cookies real (sección 11 del encargo) -- esto no es
// solo un banner visual: guarda la elección real y la versión de la
// política, y cualquier script no esencial debe comprobar este estado
// antes de cargarse (ver loadScriptIfConsented más abajo). Hoy no hay
// ningún script de analítica/publicidad instalado todavía (Google
// Analytics, Meta Pixel, Google Ads) -- cuando se instalen, deben pasar
// por esta misma comprobación, nunca cargarse sin consentimiento.

export type CookieCategory = "necesarias" | "analiticas" | "publicidad";

export type ConsentState = {
  version: number;
  decidedAt: string;
  analiticas: boolean;
  publicidad: boolean;
};

// Subir este número invalida el consentimiento guardado y vuelve a pedirlo
// -- úsalo cuando cambie de verdad la política de cookies.
export const CONSENT_POLICY_VERSION = 1;
const STORAGE_KEY = "lucero_cookie_consent";

// Cachea la última lectura real para que getSnapshot (useSyncExternalStore,
// más abajo) devuelva la MISMA referencia mientras el valor guardado no
// cambie de verdad -- si devolviera un objeto nuevo en cada llamada,
// useSyncExternalStore entraría en un bucle de renders.
let cachedRaw: string | null | undefined;
let cachedState: ConsentState | null = null;

export function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedState;
    cachedRaw = raw;
    if (!raw) {
      cachedState = null;
      return null;
    }
    const parsed = JSON.parse(raw) as ConsentState;
    cachedState = parsed.version === CONSENT_POLICY_VERSION ? parsed : null;
    return cachedState;
  } catch {
    return null;
  }
}

// Para useSyncExternalStore (componente CookieConsent) -- sincroniza con el
// "sistema externo" real (localStorage), tal y como recomienda React en vez
// de usar un efecto con setState directo.
export function subscribeToConsent(callback: () => void): () => void {
  window.addEventListener("lucero-consent-changed", callback);
  return () => window.removeEventListener("lucero-consent-changed", callback);
}

export function getConsentServerSnapshot(): ConsentState | null {
  return null; // En el servidor nunca hay un consentimiento real que leer.
}

export function writeConsent(choice: { analiticas: boolean; publicidad: boolean }): ConsentState {
  const state: ConsentState = {
    version: CONSENT_POLICY_VERSION,
    decidedAt: new Date().toISOString(),
    ...choice,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Si el almacenamiento no está disponible (modo privado, etc.), el
    // banner simplemente volverá a aparecer -- nunca se cargan scripts no
    // esenciales sin poder confirmar un consentimiento real guardado.
  }
  window.dispatchEvent(new CustomEvent("lucero-consent-changed", { detail: state }));
  return state;
}

export function hasConsent(category: CookieCategory): boolean {
  if (category === "necesarias") return true;
  const state = readConsent();
  if (!state) return false;
  return category === "analiticas" ? state.analiticas : state.publicidad;
}

// Para cuando de verdad se instale un script real (GA/Meta Pixel/Ads):
// nunca insertarlo directamente, pasar siempre por esto -- así respeta el
// consentimiento real de cada visitante, no solo el aspecto visual del
// banner.
export function loadScriptIfConsented(category: CookieCategory, src: string, attrs: Record<string, string> = {}) {
  if (!hasConsent(category)) return;
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  for (const [key, value] of Object.entries(attrs)) script.setAttribute(key, value);
  document.head.appendChild(script);
}
