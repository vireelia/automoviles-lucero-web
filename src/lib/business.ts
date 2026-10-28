// Datos reales del negocio -- nunca inventados. Los campos marcados como
// pendientes vienen directamente de la sección 19 del encargo ("información
// pendiente de confirmación") y se usan tal cual en avisos legales y
// política de privacidad hasta que Eliud los confirme.

export const business = {
  nombreComercial: "Automóviles Lucero",
  telefonoContacto: "622 188 213",
  telefonoContactoHref: "tel:+34622188213",
  // Mismos sellos reales ya usados en la campaña de "Compramos tu coche,
  // furgoneta, camioneta y todoterreno" (imagen real proporcionada).
  sellos: ["Gestoría propia", "Trámites rápidos y seguros", "Entrega inmediata"],
} as const;

export const PENDIENTE = "[PENDIENTE DE CONFIRMAR]";

// Datos fiscales reales confirmados (tarjeta de identificación fiscal real,
// AEAT, 28/10/2026) -- razón social y NIF/CIF ya no están pendientes.
export const datosLegalesPendientes = {
  razonSocial: "Autolunas Laguna Madrid SL",
  nombreComercial: business.nombreComercial,
  nifCif: "B88468749",
  // Domicilio social real (el registrado en la tarjeta de la AEAT) --
  // distinto del domicilio fiscal/local real donde atiende el negocio
  // (Calle Cayetano Pando, 3, Madrid), que ya aparece en otras
  // comunicaciones reales del propio negocio.
  domicilioSocial: "Calle Cuart de Poblet, núm. 121, planta 2, puerta IZ, 28047 Madrid",
  domicilioFiscal: "Calle Cayetano Pando, núm. 3, planta BJ, 28047 Madrid",
  correoContacto: PENDIENTE,
  telefono: business.telefonoContacto,
  datosRegistrales: PENDIENTE,
} as const;
