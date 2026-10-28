const pasos = [
  {
    numero: "1",
    titulo: "Cuéntanos qué vehículo tienes",
    texto: "El propietario facilita la información básica del vehículo y sus datos de contacto.",
  },
  {
    numero: "2",
    titulo: "Revisamos tu solicitud",
    texto: "El equipo comercial analiza los datos y contacta con el propietario para ampliar la información necesaria.",
  },
  {
    numero: "3",
    titulo: "Recibe una propuesta",
    texto:
      "Automóviles Lucero estudia la posible compra y explica las condiciones. La compraventa se realiza únicamente si ambas partes están de acuerdo.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-gray-light py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">Cómo funciona</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {pasos.map((p) => (
            <li key={p.numero} className="rounded-2xl border border-gray-border bg-white p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                {p.numero}
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy">{p.titulo}</h3>
              <p className="mt-2 text-sm text-gray sm:text-base">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
