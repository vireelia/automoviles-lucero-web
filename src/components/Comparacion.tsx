// Patrón inspirado en la página de tasación de un competidor real
// (compramostucoche.es/tasar-coche/, 29/10/2026): contraste entre vender a
// un particular/tasador genérico y vender a Automóviles Lucero -- adaptado
// con datos 100% reales de Lucero (comprasCriterios en business.ts), nunca
// copiando su texto.
import { comprasCriterios } from "@/lib/business";

const problemas = [
  "Tienes que dar garantía al comprador, aunque sea un particular",
  "Te toca gestionar tú el cambio de titularidad y el papeleo",
  "El pago puede tardar días, o depender de que el comprador consiga financiación",
];

const ventajas = [
  comprasCriterios.ventajaFrenteAParticular,
  comprasCriterios.tramites,
  comprasCriterios.pago,
];

export function Comparacion() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">
        Vender a un particular no siempre compensa
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray sm:text-base">
        Vendernos tu vehículo directamente te quita de encima lo que de verdad da trabajo de una
        venta particular.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-border bg-gray-light p-6">
          <h3 className="text-base font-bold text-navy sm:text-lg">Vender a un particular</h3>
          <ul className="mt-4 space-y-3 text-sm text-gray sm:text-base">
            {problemas.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-border" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-gold bg-navy p-6 text-white">
          <h3 className="text-base font-bold text-gold sm:text-lg">Vendérnoslo a nosotros</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/90 sm:text-base">
            {ventajas.map((v) => (
              <li key={v} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
