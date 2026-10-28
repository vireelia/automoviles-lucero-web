import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { VehicleTypeCards } from "@/components/VehicleTypeCards";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSection } from "@/components/TrustSection";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { ValuationForm } from "@/components/ValuationForm";

export const metadata: Metadata = {
  title: "Compramos tu Coche o Furgoneta en Madrid | Automóviles Lucero",
  description:
    "¿Quieres vender tu coche o furgoneta? Solicita una valoración a Automóviles Lucero y recibe atención personalizada, sin compromiso de venta.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <VehicleTypeCards />
      <HowItWorks />

      <section id="formulario" className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">
          Cuéntanos qué vehículo quieres vender
        </h2>
        <p className="mt-3 text-center text-sm text-gray sm:text-base">
          Facilítanos los datos básicos y nos pondremos en contacto contigo para estudiar tu
          solicitud.
        </p>
        <div className="mt-8">
          <ValuationForm />
        </div>
      </section>

      <TrustSection />
      <FAQ />
      <FinalCTA />
      <StickyMobileCTA />
    </>
  );
}
