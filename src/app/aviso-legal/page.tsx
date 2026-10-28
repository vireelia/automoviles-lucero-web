import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { datosLegalesPendientes as d } from "@/lib/business";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal de Automóviles Lucero.",
  alternates: { canonical: "/aviso-legal" },
  robots: { index: false, follow: true },
};

export default function AvisoLegalPage() {
  return (
    <LegalPage titulo="Aviso legal" actualizado="28/10/2026" avisoBorrador>
      <section>
        <h2 className="text-lg font-bold text-navy">1. Datos identificativos del titular</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Razón social: {d.razonSocial}</li>
          <li>Nombre comercial: {d.nombreComercial}</li>
          <li>NIF/CIF: {d.nifCif}</li>
          <li>Domicilio social: {d.domicilioSocial}</li>
          <li>Domicilio donde atiende el negocio: {d.domicilioFiscal}</li>
          <li>Correo de contacto: {d.correoContacto}</li>
          <li>Teléfono: {d.telefono}</li>
          <li>Datos registrales (si corresponden): {d.datosRegistrales}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">2. Objeto del sitio web</h2>
        <p>
          Este sitio web tiene como finalidad informar sobre el servicio de compra de vehículos
          (coches y furgonetas) de {d.nombreComercial} y permitir a los propietarios solicitar
          una valoración de su vehículo.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">3. Condiciones de uso</h2>
        <p>
          El acceso y uso de este sitio web atribuye la condición de usuario e implica la
          aceptación de las condiciones aquí recogidas. El usuario se compromete a hacer un uso
          adecuado de los contenidos y servicios ofrecidos y a no emplearlos para incurrir en
          actividades ilícitas o contrarias a la buena fe.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">4. Propiedad intelectual e industrial</h2>
        <p>
          Los contenidos de este sitio web (textos, imágenes, diseño, logotipos) son propiedad
          de {d.nombreComercial} o de terceros que han autorizado su uso, y están protegidos por
          la normativa de propiedad intelectual e industrial.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">5. Responsabilidad</h2>
        <p>
          {d.nombreComercial} no garantiza la disponibilidad continuada del sitio web ni se hace
          responsable de los daños derivados de la falta de disponibilidad por causas ajenas a
          su control. Solicitar una valoración a través de este sitio web no constituye una
          oferta firme de compra: la operación dependerá de la revisión del vehículo, las
          condiciones comerciales y la aceptación expresa de ambas partes.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">6. Enlaces externos</h2>
        <p>
          Este sitio web no se hace responsable del contenido de los sitios web a los que pueda
          enlazar ni de los sitios web desde los que pueda ser enlazado.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">7. Protección de datos y cookies</h2>
        <p>
          El tratamiento de los datos personales facilitados a través de este sitio web se rige
          por nuestra{" "}
          <a href="/politica-de-privacidad" className="underline">
            política de privacidad
          </a>
          . El uso de cookies se rige por nuestra{" "}
          <a href="/politica-de-cookies" className="underline">
            política de cookies
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">8. Legislación aplicable y jurisdicción</h2>
        <p>
          Este aviso legal se rige por la legislación española, incluyendo la Ley 34/2002, de 11
          de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, y
          demás normativa que resulte de aplicación. Para cualquier controversia serán
          competentes los juzgados y tribunales que correspondan conforme a la normativa vigente
          de protección de consumidores, cuando el usuario tenga esa condición.
        </p>
      </section>

      <p className="text-xs text-gray">
        Este documento es un borrador de trabajo y no sustituye el asesoramiento de un
        profesional del derecho. Debe revisarse y completarse antes de su publicación
        definitiva.
      </p>
    </LegalPage>
  );
}
