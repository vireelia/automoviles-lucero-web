import type { Metadata } from "next";
import { VehicleLandingContent } from "@/components/VehicleLandingContent";

export const metadata: Metadata = {
  title: "Compramos Coches en Madrid | Automóviles Lucero",
  description:
    "¿Quieres vender tu coche en Madrid? Cuéntanos la marca, el modelo, el año y los kilómetros y solicita una valoración sin compromiso.",
  alternates: { canonical: "/compramos-tu-coche" },
};

export default function CompramosTuCochePage() {
  return (
    <VehicleLandingContent
      tipo="coche"
      h1="¿Quieres vender tu coche en Madrid?"
      subtitulo="Cuéntanos la marca, el modelo, el año y los kilómetros de tu coche para que podamos estudiar una posible compra."
    />
  );
}
