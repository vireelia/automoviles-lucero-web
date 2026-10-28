// Validación compartida entre el formulario (cliente) y la ruta de API
// (servidor) -- misma función, dos sitios, para que nunca se desincronicen
// (sección 4 del encargo: "validación en cliente y servidor").

export type TipoVehiculo = "coche" | "furgoneta";

export type ValoracionFormData = {
  tipoVehiculo: TipoVehiculo | "";
  marca: string;
  modelo: string;
  anio: string;
  kilometraje: string;
  nombre: string;
  telefono: string;
  email: string;
  estado: string;
  combustible: string;
  matricula: string;
  comentarios: string;
  disponibleLlamada: boolean;
  // Honeypot real (28/10/2026, mismo patrón ya usado en otros formularios
  // públicos de Vireliab): un campo que una persona real nunca rellena,
  // pero que un bot de envío automático sí. Si llega relleno, se descarta
  // en silencio, nunca se guarda como lead real.
  sitioWeb: string;
};

export const CURRENT_YEAR = new Date().getFullYear();
export const MIN_YEAR = 1970;

export type ValidationErrors = Partial<Record<keyof ValoracionFormData, string>>;

export function validarFormulario(data: ValoracionFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (data.tipoVehiculo !== "coche" && data.tipoVehiculo !== "furgoneta") {
    errors.tipoVehiculo = "Elige si es un coche o una furgoneta.";
  }
  if (!data.marca.trim()) errors.marca = "Indica la marca.";
  if (data.marca.length > 60) errors.marca = "La marca es demasiado larga.";
  if (!data.modelo.trim()) errors.modelo = "Indica el modelo.";
  if (data.modelo.length > 60) errors.modelo = "El modelo es demasiado largo.";

  const anioNum = Number(data.anio);
  if (!data.anio.trim() || !Number.isInteger(anioNum) || anioNum < MIN_YEAR || anioNum > CURRENT_YEAR + 1) {
    errors.anio = `Introduce un año real (entre ${MIN_YEAR} y ${CURRENT_YEAR + 1}).`;
  }

  const kmNum = Number(data.kilometraje);
  if (!data.kilometraje.trim() || !Number.isFinite(kmNum) || kmNum < 0 || kmNum > 1_500_000) {
    errors.kilometraje = "Introduce un kilometraje real, en números.";
  }

  if (!data.nombre.trim()) errors.nombre = "Indica tu nombre.";
  if (data.nombre.length > 80) errors.nombre = "El nombre es demasiado largo.";

  // Formato razonable para un teléfono español real (fijo o móvil, con o
  // sin prefijo +34) -- nunca una validación estricta de operador real,
  // solo descarta lo que claramente no es un teléfono.
  const telefonoLimpio = data.telefono.replace(/[\s-]/g, "");
  if (!/^(\+?\d{9,15})$/.test(telefonoLimpio)) {
    errors.telefono = "Introduce un teléfono válido.";
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Introduce un email válido, o déjalo en blanco.";
  }

  if (data.matricula && data.matricula.length > 15) {
    errors.matricula = "La matrícula no puede ser tan larga.";
  }
  if (data.comentarios && data.comentarios.length > 1000) {
    errors.comentarios = "Los comentarios no pueden superar los 1000 caracteres.";
  }

  return errors;
}

export function esFormularioValido(data: ValoracionFormData): boolean {
  return Object.keys(validarFormulario(data)).length === 0;
}
