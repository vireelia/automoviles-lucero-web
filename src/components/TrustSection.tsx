const mensajes = [
  "Atención personalizada",
  "Estudio individual de cada vehículo",
  "Información clara sobre los siguientes pasos",
  "Sin compromiso por solicitar una valoración",
];

export function TrustSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">
        Vende tu vehículo con claridad
      </h2>
      <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
        {mensajes.map((m) => (
          <li
            key={m}
            className="flex items-start gap-3 rounded-xl border border-gray-border bg-white p-4 text-sm font-medium text-navy sm:text-base"
          >
            <span aria-hidden="true" className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gold" />
            {m}
          </li>
        ))}
      </ul>
    </section>
  );
}
