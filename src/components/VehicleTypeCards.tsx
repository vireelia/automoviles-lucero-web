import Link from "next/link";

const tarjetas = [
  {
    titulo: "Compramos coches",
    descripcion:
      "¿Quieres vender tu coche? Cuéntanos la marca, el modelo, el año y los kilómetros para estudiar una posible compra.",
    cta: "Quiero vender mi coche",
    href: "/compramos-tu-coche#formulario",
  },
  {
    titulo: "Compramos furgonetas",
    descripcion:
      "Si tienes una furgoneta particular o comercial, envíanos sus datos para que podamos valorar tu solicitud.",
    cta: "Quiero vender mi furgoneta",
    href: "/compramos-furgonetas#formulario",
  },
];

export function VehicleTypeCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">Elige tu vehículo</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {tarjetas.map((t) => (
          <div
            key={t.titulo}
            className="flex flex-col rounded-2xl border border-gray-border bg-white p-7 shadow-sm"
          >
            <h3 className="text-xl font-bold text-navy">{t.titulo}</h3>
            <p className="mt-3 flex-1 text-sm text-gray sm:text-base">{t.descripcion}</p>
            <Link
              href={t.href}
              className="mt-6 inline-block rounded-full bg-navy px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-navy-light sm:text-base"
            >
              {t.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
