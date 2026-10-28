import Link from "next/link";
import { business } from "@/lib/business";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-navy sm:text-xl">
          {business.nombreComercial}
        </Link>
        <a
          href={business.telefonoContactoHref}
          className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-light sm:px-5 sm:py-2.5 sm:text-base"
        >
          {business.telefonoContacto}
        </a>
      </div>
    </header>
  );
}
