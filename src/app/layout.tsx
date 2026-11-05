import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

// Tipografía real pedida (04/11/2026, copiar la paleta/tipografía de la otra
// web real de Automóviles Lucero, compramostufurgon.com -- confirmado en su
// propio CSS: font-family Archivo, Google Fonts, pesos 400-900).
const archivo = Archivo({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.automoviles-lucero.es";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Compramos tu Coche o Furgoneta en Madrid | Automóviles Lucero",
    template: "%s | Automóviles Lucero",
  },
  description:
    "¿Quieres vender tu coche o furgoneta? Solicita una valoración a Automóviles Lucero y recibe atención personalizada, sin compromiso de venta.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
