import { business, datosLegalesPendientes } from "@/lib/business";

// Sección de ubicación real (04/11/2026, "quiere tambien abajo un mapa con
// la direccion" -- corregido después: "pon el mapa diferente mas bonito").
// Antes era un iframe suelto dentro del footer; ahora es su propia sección
// con tarjeta de contacto real al lado, en vez de solo el mapa pelado.
export function LocationSection() {
  const direccion = datosLegalesPendientes.domicilioFiscal;

  return (
    <section className="bg-navy py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-gold sm:text-3xl">Visítanos</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-gray sm:text-base">
          Estamos en Madrid, en Lucero. Ven a que valoremos tu vehículo en persona.
        </p>
        <div className="mt-10 grid gap-6 overflow-hidden rounded-2xl border border-gold/40 shadow-[0_10px_30px_-8px_rgba(201,168,76,0.25)] sm:grid-cols-5">
          <div className="flex flex-col justify-center gap-5 bg-navy-light p-7 sm:col-span-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">Dirección</p>
              <p className="mt-1 text-base font-semibold text-white">{direccion}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">Teléfono</p>
              <a href={business.telefonoContactoHref} className="mt-1 block text-base font-semibold text-white underline">
                {business.telefonoContacto}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">WhatsApp</p>
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-base font-semibold text-white underline"
              >
                {business.whatsapp}
              </a>
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(direccion)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block rounded-full bg-gold px-6 py-3 text-center text-sm font-bold text-navy-dark transition hover:bg-gold-glow"
            >
              Cómo llegar
            </a>
          </div>
          <div className="sm:col-span-3">
            <iframe
              title={`Ubicación de ${business.nombreComercial}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(direccion)}&output=embed`}
              className="h-[320px] w-full sm:h-full"
              style={{ border: 0, filter: "grayscale(0.15) contrast(1.05)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
