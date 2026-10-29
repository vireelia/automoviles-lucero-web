// Respuestas reales confirmadas por Ramón (29/10/2026, transcripción de
// audio) -- ver comprasCriterios en business.ts para el detalle completo.
const preguntas = [
  {
    q: "¿Qué vehículos compráis?",
    a: "Coches, furgonetas y vehículos industriales de cualquier marca y modelo, sin límite de antigüedad ni de kilometraje. Tenemos interés especial en furgonetas.",
  },
  {
    q: "¿Compráis vehículos averiados o accidentados?",
    a: "Se estudia caso por caso -- envíanos los datos y las fotografías y te decimos si encaja.",
  },
  {
    q: "¿Compráis vehículos financiados o con cargas pendientes?",
    a: "No, de momento no compramos vehículos financiados ni con cargas pendientes.",
  },
  {
    q: "¿Cómo se calcula el precio?",
    a: "Se consideran la marca, el modelo, el año, los kilómetros, el estado general y otros factores relevantes del mercado.",
  },
  {
    q: "¿Solicitar una tasación me obliga a vender?",
    a: "No. La tasación es gratuita y sin compromiso -- solicitarla no implica aceptar una propuesta de compra.",
  },
  {
    q: "¿Qué documentación necesito?",
    a: "Para tasar tu vehículo necesitamos: matrícula, marca, modelo, año, kilómetros, estado y fotografías.",
  },
  {
    q: "¿Cuándo y cómo me pagáis?",
    a: "El pago se realiza en el momento de la compra. Además, nos encargamos del cambio de titularidad y de todos los trámites.",
  },
  {
    q: "¿En qué zonas compráis?",
    a: "Compramos en toda España. Si estás en Madrid nos desplazamos a tu domicilio; fuera de Madrid también recogemos el vehículo si el precio lo justifica.",
  },
  {
    q: "¿Cómo puedo contactar con Automóviles Lucero?",
    a: "Puedes llamarnos al 622 188 213, escribirnos por WhatsApp al 622 177 052, o enviarnos tu solicitud desde el formulario de esta página.",
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
