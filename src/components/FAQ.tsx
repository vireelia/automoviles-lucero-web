const preguntas = [
  {
    q: "¿Qué vehículos compráis?",
    a: "Estudiamos solicitudes de coches y furgonetas. La aceptación depende de la valoración y de las condiciones de compra.",
  },
  {
    q: "¿Cómo se calcula el precio?",
    a: "Se consideran la marca, el modelo, el año, los kilómetros, el estado general y otros factores relevantes.",
  },
  {
    q: "¿Solicitar una tasación me obliga a vender?",
    a: "No. Solicitar una valoración no implica aceptar una propuesta de compra.",
  },
  {
    q: "¿Qué documentación necesito?",
    a: "El equipo comercial te indicará qué documentación es necesaria para comprobar los datos y formalizar la operación.",
  },
  {
    q: "¿Puedo vender una furgoneta de trabajo?",
    a: "Puedes enviar una solicitud indicando el tipo de furgoneta y su estado. Automóviles Lucero estudiará si encaja en sus criterios de compra.",
  },
  {
    q: "¿Cómo puedo contactar con Automóviles Lucero?",
    a: "Puedes llamarnos al 622 188 213, o enviarnos tu solicitud desde el formulario de esta página.",
  },
];

export function FAQ() {
  return (
    <section className="bg-gray-light py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-8 divide-y divide-gray-border rounded-2xl border border-gray-border bg-white">
          {preguntas.map((p) => (
            <details key={p.q} className="group p-5">
              <summary className="cursor-pointer list-none text-base font-semibold text-navy marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {p.q}
                  <span aria-hidden="true" className="text-gold transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray sm:text-base">{p.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
