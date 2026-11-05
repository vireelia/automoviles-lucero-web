// Ventajas reales confirmadas por Ramón (29/10/2026, transcripción de
// audio) -- ver comprasCriterios en business.ts para el detalle completo.
// aniosExperiencia añadido aquí (04/11/2026, "este es el audio" -- dato
// real ya guardado en business.ts desde el 29/10 pero nunca mostrado en la
// web hasta ahora).
import { comprasCriterios } from "@/lib/business";

const mensajes = [
  comprasCriterios.aniosExperiencia,
  "Tasación gratuita y sin compromiso",
  "Pago en el momento de la compra",
  "Nos encargamos del cambio de titularidad y de todos los trámites",
  "Al vendernos a nosotros, quedas exento de dar garantía (obligación que sí tienes al vender a un particular)",
];

export function TrustSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <h2 className="text-center text-2xl font-bold text-gold sm:text-3xl">
        Vende tu vehículo con claridad
      </h2>
      <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
        {mensajes.map((m) => (
          <li
            key={m}
            className="flex items-start gap-3 rounded-xl border border-gray-border bg-navy-light p-4 text-sm font-medium text-white sm:text-base"
          >
            <span aria-hidden="true" className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gold" />
            {m}
          </li>
        ))}
      </ul>
    </section>
  );
}
