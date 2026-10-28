import Link from "next/link";
import { business } from "@/lib/business";

export function Footer() {
  return (
    <footer className="border-t border-gray-border bg-navy-dark py-10 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-lg font-bold">{business.nombreComercial}</p>
        <p className="mt-1 text-sm text-white/70">
          Teléfono de contacto:{" "}
          <a href={business.telefonoContactoHref} className="underline">
            {business.telefonoContacto}
          </a>
        </p>
        <nav aria-label="Enlaces legales" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
          <Link href="/" className="hover:text-white hover:underline">
            Página principal
          </Link>
          <Link href="/aviso-legal" className="hover:text-white hover:underline">
            Aviso legal
          </Link>
          <Link href="/politica-de-privacidad" className="hover:text-white hover:underline">
            Política de privacidad
          </Link>
          <Link href="/politica-de-cookies" className="hover:text-white hover:underline">
            Política de cookies
          </Link>
          <button
            type="button"
            data-open-cookie-settings
            className="hover:text-white hover:underline"
          >
            Configurar cookies
          </button>
          <a href={business.telefonoContactoHref} className="hover:text-white hover:underline">
            Contacto
          </a>
        </nav>
        <p className="mt-6 text-xs text-white/50">
          Solicitar una valoración no constituye una oferta firme de compra. La operación
          dependerá de la revisión del vehículo, las condiciones comerciales y la aceptación de
          ambas partes.
        </p>
      </div>
    </footer>
  );
}
