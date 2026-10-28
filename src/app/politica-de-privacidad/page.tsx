import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { datosLegalesPendientes as d } from "@/lib/business";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad de Automóviles Lucero.",
  alternates: { canonical: "/politica-de-privacidad" },
  robots: { index: false, follow: true },
};

export default function PoliticaPrivacidadPage() {
  return (
    <LegalPage titulo="Política de privacidad" actualizado="28/10/2026" avisoBorrador>
      <section>
        <h2 className="text-lg font-bold text-navy">1. Responsable</h2>
        <p>
          {d.razonSocial} ({d.nombreComercial}), con NIF/CIF {d.nifCif} y domicilio en{" "}
          {d.domicilioSocial}, es el responsable del tratamiento de los datos personales que nos
          facilitas a través de este sitio web. Puedes contactar con nosotros en {d.correoContacto}{" "}
          o en el teléfono {d.telefono}.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">2. Datos tratados</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Nombre</li>
          <li>Teléfono</li>
          <li>Email, cuando lo facilitas</li>
          <li>Datos del vehículo que quieres vender (marca, modelo, año, kilómetros, estado, matrícula si la facilitas)</li>
          <li>Comentarios que añadas al formulario</li>
          <li>Datos del seguimiento comercial de tu solicitud</li>
          <li>Información técnica y de procedencia publicitaria (por ejemplo, la campaña desde la que accediste), cuando corresponda</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">3. Finalidades</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Atender tu solicitud de valoración</li>
          <li>Contactar contigo para ampliar información</li>
          <li>Estudiar una posible compraventa de tu vehículo</li>
          <li>Gestionar el seguimiento comercial</li>
          <li>Cumplir nuestras obligaciones legales</li>
          <li>Medir el rendimiento de nuestras campañas, cuando sea legal y cuentes con las cookies correspondientes activas</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">4. Bases jurídicas</h2>
        <p>
          Tratamos tus datos para atender tu solicitud de valoración como una actuación
          precontractual solicitada por ti. El cumplimiento de obligaciones legales es otra base
          del tratamiento cuando corresponde. Cuando usamos cookies analíticas o publicitarias,
          la base es tu consentimiento, que puedes retirar en cualquier momento desde{" "}
          <CookieSettingsLink />.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">5. Destinatarios</h2>
        <p>
          Tus datos se registran en nuestro sistema interno de gestión de clientes (CRM). Pueden
          acceder a ellos proveedores que nos prestan servicios de alojamiento, comunicaciones
          (email, WhatsApp) y analítica, actuando como encargados del tratamiento, bajo contrato.
          [PENDIENTE DE CONFIRMAR: listado concreto de proveedores reales y, si alguno implica
          una transferencia fuera de la Unión Europea, las garantías aplicables.]
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">6. Conservación</h2>
        <p>
          Conservamos tus datos mientras dure la relación comercial derivada de tu solicitud y,
          posteriormente, durante los plazos legales de prescripción que resulten de aplicación.
          [PENDIENTE DE CONFIRMAR: plazo concreto de conservación cuando no haya compraventa.]
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">7. Tus derechos</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación
          y portabilidad, así como retirar tu consentimiento en cualquier momento, escribiendo a{" "}
          {d.correoContacto}. También puedes presentar una reclamación ante la Agencia Española
          de Protección de Datos (www.aepd.es) si consideras que el tratamiento no se ajusta a
          la normativa.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">8. Seguridad</h2>
        <p>
          Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos. Ninguna
          medida de seguridad es absoluta; trabajamos para minimizar los riesgos de acceso no
          autorizado, pérdida o alteración de los datos.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy">9. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política para adaptarla a cambios legales o del propio
          servicio. Publicaremos la versión vigente en esta misma página, indicando la fecha de
          la última actualización.
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

function CookieSettingsLink() {
  return (
    <a href="/politica-de-cookies" className="underline">
      la configuración de cookies
    </a>
  );
}
