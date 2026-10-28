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

export const datosLegalesPendientes = {
  razonSocial: PENDIENTE,
  nombreComercial: business.nombreComercial,
  nifCif: PENDIENTE,
  domicilioSocial: PENDIENTE,
  correoContacto: PENDIENTE,
  telefono: business.telefonoContacto,
  datosRegistrales: PENDIENTE,
} as const;
