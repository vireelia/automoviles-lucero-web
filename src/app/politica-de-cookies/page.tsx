import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Política de cookies de Automóviles Lucero.",
  alternates: { canonical: "/politica-de-cookies" },
  robots: { index: false, follow: true },
};

export default function PoliticaCookiesPage() {
  return (
    <LegalPage titulo="Política de cookies" actualizado="28/10/2026">
      <section>
        <h2 className="text-lg font-bold text-navy">¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos que un sitio web guarda en tu navegador para
          recordar información, como tus preferencias o tu elección sobre el uso de cookies.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">Cookies que usa este sitio ahora mismo</h2>
        <p>
          A fecha de hoy, este sitio solo utiliza una cookie técnica necesaria: la que recuerda
          tu elección sobre el banner de cookies (para no volver a preguntártelo en cada
          visita). No tenemos instalada ninguna herramienta de analítica (como Google Analytics)
          ni de publicidad (como Meta Pixel o Google Ads) todavía.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gray-border">
                <th className="py-2 pr-4 font-semibold text-navy">Nombre</th>
                <th className="py-2 pr-4 font-semibold text-navy">Tipo</th>
                <th className="py-2 pr-4 font-semibold text-navy">Finalidad</th>
                <th className="py-2 font-semibold text-navy">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-border">
                <td className="py-2 pr-4">lucero_cookie_consent</td>
                <td className="py-2 pr-4">Técnica (necesaria)</td>
                <td className="py-2 pr-4">Recordar tu elección sobre cookies</td>
                <td className="py-2">Hasta que la borres o cambie la política</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-gray">
          Si en el futuro se instalan herramientas de analítica o publicidad, se añadirán aquí
          antes de activarse, con su proveedor, finalidad y duración reales -- nunca se
          activarán sin que este inventario se actualice primero.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">Categorías de cookies</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Necesarias:</strong> imprescindibles para que la página funcione. No
            requieren tu consentimiento.
          </li>
          <li>
            <strong>Analíticas:</strong> nos ayudarían a entender cómo se usa la página. Solo se
            activarían si las aceptas.
          </li>
          <li>
            <strong>Publicitarias:</strong> permitirían medir y personalizar anuncios. Solo se
            activarían si las aceptas.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">Cómo aceptar, rechazar o configurar</h2>
        <p>
          Al entrar en la página por primera vez verás un banner donde puedes aceptar todas las
          cookies, rechazarlas (salvo las necesarias) o configurarlas una a una. Puedes cambiar
          tu elección cuando quieras pulsando &quot;Configurar cookies&quot; en el pie de página.
        </p>
      </section>
    </LegalPage>
  );
}
