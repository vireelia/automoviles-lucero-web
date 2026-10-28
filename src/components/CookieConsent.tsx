"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { readConsent, writeConsent, subscribeToConsent, getConsentServerSnapshot } from "@/lib/cookie-consent";

export function CookieConsent() {
  // Sincroniza con el "sistema externo" real (localStorage) -- nunca
  // setState directo en un efecto: sin elección guardada real (o con la
  // política en otra versión), esto es null y el banner se muestra. El
  // simple desplazamiento o la navegación nunca cuenta como consentimiento
  // (sección 11, punto 7).
  const consentimiento = useSyncExternalStore(subscribeToConsent, readConsent, getConsentServerSnapshot);
  const [forzarAbierto, setForzarAbierto] = useState(false);
  const [configurando, setConfigurando] = useState(false);
  const [analiticas, setAnaliticas] = useState(() => consentimiento?.analiticas ?? false);
  const [publicidad, setPublicidad] = useState(() => consentimiento?.publicidad ?? false);

  const visible = consentimiento === null || forzarAbierto;

  useEffect(() => {
    function abrirConfiguracion() {
      const actual = readConsent();
      setAnaliticas(actual?.analiticas ?? false);
      setPublicidad(actual?.publicidad ?? false);
      setForzarAbierto(true);
      setConfigurando(true);
    }
    const botonesFooter = document.querySelectorAll<HTMLButtonElement>("[data-open-cookie-settings]");
    botonesFooter.forEach((b) => b.addEventListener("click", abrirConfiguracion));
    return () => botonesFooter.forEach((b) => b.removeEventListener("click", abrirConfiguracion));
  }, []);

  function cerrar(choice: { analiticas: boolean; publicidad: boolean }) {
    writeConsent(choice);
    setForzarAbierto(false);
    setConfigurando(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Configuración de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-border bg-white p-4 shadow-[0_-8px_24px_rgba(0,0,0,0.12)] sm:p-6"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-black sm:text-base">
          Usamos cookies técnicas necesarias para el funcionamiento de la página. Con tu
          permiso, también podríamos usar cookies analíticas y publicitarias. Puedes
          aceptarlas, rechazarlas o configurarlas. Más información en nuestra{" "}
          <Link href="/politica-de-cookies" className="underline">
            política de cookies
          </Link>
          .
        </p>

        {configurando && (
          <div className="mt-4 space-y-3 rounded-xl border border-gray-border bg-gray-light p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-navy">Cookies necesarias</p>
                <p className="text-xs text-gray">Siempre activas. Necesarias para que la página funcione.</p>
              </div>
              <input type="checkbox" checked disabled className="h-4 w-4" aria-label="Cookies necesarias, siempre activas" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-navy">Cookies analíticas</p>
                <p className="text-xs text-gray">Nos ayudan a entender cómo se usa la página.</p>
              </div>
              <input
                type="checkbox"
                checked={analiticas}
                onChange={(e) => setAnaliticas(e.target.checked)}
                className="h-4 w-4"
                aria-label="Cookies analíticas"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-navy">Cookies publicitarias</p>
                <p className="text-xs text-gray">Permiten medir y personalizar anuncios.</p>
              </div>
              <input
                type="checkbox"
                checked={publicidad}
                onChange={(e) => setPublicidad(e.target.checked)}
                className="h-4 w-4"
                aria-label="Cookies publicitarias"
              />
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => cerrar({ analiticas: false, publicidad: false })}
            className="flex-1 rounded-full border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-gray-light"
          >
            Rechazar
          </button>
          {configurando ? (
            <button
              type="button"
              onClick={() => cerrar({ analiticas, publicidad })}
              className="flex-1 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-light"
            >
              Guardar configuración
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setConfigurando(true)}
              className="flex-1 rounded-full border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-gray-light"
            >
              Configurar
            </button>
          )}
          <button
            type="button"
            onClick={() => cerrar({ analiticas: true, publicidad: true })}
            className="flex-1 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-light"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
