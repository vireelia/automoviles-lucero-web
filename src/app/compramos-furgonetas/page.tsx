import type { Metadata } from "next";
import { VehicleLandingContent } from "@/components/VehicleLandingContent";

export const metadata: Metadata = {
  title: "Compramos Furgonetas en Madrid | Automóviles Lucero",
  description:
    "¿Quieres vender tu furgoneta en Madrid? Facilítanos sus datos y estudiaremos tu solicitud de compra, sin compromiso.",
  alternates: { canonical: "/compramos-furgonetas" },
};

export default function CompramosFurgonetasPage() {
  return (
    <VehicleLandingContent
      tipo="furgoneta"
      h1="¿Quieres vender tu furgoneta en Madrid?"
      subtitulo="Tanto si es una furgoneta particular como comercial, envíanos sus datos para que podamos valorar tu solicitud."
    />
  );
}
