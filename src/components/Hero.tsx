import Image from "next/image";
import { business } from "@/lib/business";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-navy to-navy-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            ¿Quieres vender tu coche o furgoneta en Madrid?
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
            En {business.nombreComercial} estudiamos tu vehículo y te ayudamos a conocer las
            posibilidades de una compraventa. Cuéntanos qué vehículo tienes y solicita una
            valoración sin compromiso.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#formulario"
              className="rounded-full bg-gold px-7 py-3.5 text-center text-base font-bold text-navy-dark transition hover:brightness-95"
            >
              Quiero tasar mi vehículo
            </a>
            <a
              href={business.telefonoContactoHref}
              className="rounded-full border border-white/40 px-7 py-3.5 text-center text-base font-semibold text-white transition hover:bg-white/10"
            >
              Hablar con {business.nombreComercial}
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
            {business.sellos.map((sello) => (
              <li key={sello} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                {sello}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl">
          <Image
            src="/hero-compramos-tu-coche.jpg"
            alt={`${business.nombreComercial} compra coches, furgonetas, camionetas y todoterrenos -- tasación gratuita y entrega inmediata`}
            width={750}
            height={750}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
