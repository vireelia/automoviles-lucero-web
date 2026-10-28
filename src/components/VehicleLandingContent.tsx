import { ValuationForm } from "@/components/ValuationForm";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSection } from "@/components/TrustSection";
import { FAQ } from "@/components/FAQ";
import { business } from "@/lib/business";
import type { TipoVehiculo } from "@/lib/validation";

export function VehicleLandingContent({
  tipo,
  h1,
  subtitulo,
}: {
  tipo: TipoVehiculo;
  h1: string;
  subtitulo: string;
}) {
  return (
    <>
      <section className="bg-gradient-to-b from-navy to-navy-dark px-4 py-14 text-center text-white sm:px-6 sm:py-20">
        <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">{h1}</h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/85 sm:text-lg">{subtitulo}</p>
        <a
          href="#formulario"
          className="mt-8 inline-block rounded-full bg-gold px-7 py-3.5 text-base font-bold text-navy-dark transition hover:brightness-95"
        >
          Solicitar valoración
        </a>
        <ul className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/75">
          {business.sellos.map((sello) => (
            <li key={sello}>{sello}</li>
          ))}
        </ul>
      </section>

      <HowItWorks />

      <section id="formulario" className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">
          Cuéntanos qué {tipo === "coche" ? "coche" : "furgoneta"} quieres vender
        </h2>
        <p className="mt-3 text-center text-sm text-gray sm:text-base">
          Facilítanos los datos básicos y nos pondremos en contacto contigo para estudiar tu
          solicitud.
        </p>
        <div className="mt-8">
          <ValuationForm tipoVehiculoPorDefecto={tipo} />
        </div>
      </section>

      <TrustSection />
      <FAQ />
    </>
  );
}
