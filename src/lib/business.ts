// Datos reales del negocio -- nunca inventados. Los campos marcados como
// pendientes vienen directamente de la sección 19 del encargo ("información
// pendiente de confirmación") y se usan tal cual en avisos legales y
// política de privacidad hasta que Eliud los confirme.

export const business = {
  nombreComercial: "Automóviles Lucero",
  telefonoContacto: "622 188 213",
  telefonoContactoHref: "tel:+34622188213",
  // Número real de WhatsApp del negocio, confirmado real (29/10/2026,
  // transcripción de audio con Ramón) -- distinto del teléfono principal de
  // arriba, es el mismo ya usado en el backend del CRM
  // (business-info.ts/whatsapp.number, owner_confirmed).
  whatsapp: "622 177 052",
  whatsappHref: "https://wa.me/34622177052",
  // Mismos sellos reales ya usados en la campaña de "Compramos tu coche,
  // furgoneta, camioneta y todoterreno" (imagen real proporcionada).
  sellos: ["Gestoría propia", "Trámites rápidos y seguros", "Entrega inmediata"],
} as const;

// Criterios reales de compra, confirmados por Ramón (29/10/2026,
// transcripción de audio -- preguntas preparadas y respondidas una por
// una). Nunca inventar nada fuera de esto.
export const comprasCriterios = {
  marcasModelos: "Cualquier marca y modelo, sin límites -- interés especial en furgonetas y vehículos industriales.",
  antiguedadMaxima: "Sin límite de antigüedad.",
  kilometrajeMaximo: "Sin límite de kilometraje.",
  averiadosOAccidentados: "Se estudia caso por caso.",
  financiados: "No se compran vehículos financiados ni con cargas pendientes.",
  zonaCompra: "Toda España. Si el vehículo está en Madrid, se desplazan al domicilio; fuera de Madrid (incluso fuera de España) también se recoge el vehículo si el precio lo justifica.",
  tasacion: "Tasación gratuita y sin compromiso.",
  pago: "Pago en el momento de la compra.",
  tramites: "Automóviles Lucero se encarga del cambio de titularidad y de todos los trámites.",
  tiempoHastaCompra: "Puede cerrarse en aproximadamente una hora desde el primer contacto.",
  ventajaFrenteAParticular: "Al vender a un profesional, el vendedor queda exento de dar garantía (obligación que sí tiene al vender a un particular).",
  datosParaTasar: ["Matrícula", "Marca", "Modelo", "Año", "Kilómetros", "Estado", "Fotografías"],
  aniosExperiencia: "Cerca de 20 años comprando vehículos.",
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
  correoContacto: "autolunaslagunamadrid@gmail.com",
  telefono: business.telefonoContacto,
  // Dato real de la propia tarjeta de identificación fiscal de la AEAT
  // (no hay un Registro Mercantil distinto en ese documento -- es lo que
  // hay, confirmado por Eliud).
  datosRegistrales: "NIF B88468749 (Agencia Tributaria), código electrónico de verificación 802729548286997A.",
} as const;
