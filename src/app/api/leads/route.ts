import { NextRequest, NextResponse } from "next/server";
import { validarFormulario, type ValoracionFormData } from "@/lib/validation";

// Backend real de Automóviles Lucero -- el mismo CRM que ya usa el equipo
// (Clientes/Contactos), nunca uno inventado para esta landing. El lead
// entra por el mismo endpoint real que ya usan los agentes de voz/chat
// (/tools/create_lead), server-to-server (nunca desde el navegador: evita
// problemas de CORS y no expone la URL real del CRM en el bundle público).
const LUCERO_CRM_URL = process.env.LUCERO_CRM_URL ?? "https://virelia-hub-lucero.lzc0bh.easypanel.host";

// Protección real contra envíos automáticos/duplicados (sección 4 y 12 del
// encargo: "protección contra spam", "límites de frecuencia", "evitar que
// los reintentos creen contactos adicionales") -- en memoria del propio
// proceso, suficiente para el tráfico real de una landing, sin añadir
// infraestructura nueva (Redis, etc.) que el encargo no pide.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestsByIp = new Map<string, number[]>();
const seenIdempotencyKeys = new Map<string, number>();
const IDEMPOTENCY_TTL_MS = 10 * 60_000;

function limpiarMapasViejos() {
  const now = Date.now();
  for (const [key, ts] of seenIdempotencyKeys) {
    if (now - ts > IDEMPOTENCY_TTL_MS) seenIdempotencyKeys.delete(key);
  }
}

function dentroDelLimite(ip: string): boolean {
  const now = Date.now();
  const anteriores = (requestsByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  anteriores.push(now);
  requestsByIp.set(ip, anteriores);
  return anteriores.length <= RATE_LIMIT_MAX;
}

type SolicitudBody = ValoracionFormData & {
  idempotencyKey?: string;
  renderedAt?: number;
  origen?: { utm_source?: string; utm_medium?: string; utm_campaign?: string; utm_content?: string; pagina?: string };
};

function construirNotas(data: SolicitudBody): string {
  const partes = [
    `Quiere vender su ${data.tipoVehiculo === "furgoneta" ? "furgoneta" : "coche"}: ${data.marca} ${data.modelo} (${data.anio}), ${data.kilometraje} km.`,
    data.estado ? `Estado: ${data.estado}.` : null,
    data.combustible ? `Combustible: ${data.combustible}.` : null,
    data.matricula ? `Matrícula: ${data.matricula}.` : null,
    data.disponibleLlamada ? "Disponible para recibir una llamada." : null,
    data.comentarios ? `Comentarios del propietario: ${data.comentarios}` : null,
    data.origen?.pagina ? `Página de origen: ${data.origen.pagina}.` : null,
    data.origen?.utm_source ? `Procedencia: ${data.origen.utm_source}/${data.origen.utm_medium ?? ""}/${data.origen.utm_campaign ?? ""}.` : null,
  ].filter(Boolean);
  return partes.join(" ");
}

export async function POST(req: NextRequest) {
  limpiarMapasViejos();

  let data: SolicitudBody;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Petición no válida." }, { status: 400 });
  }

  // Honeypot: un bot rellena cualquier campo que encuentre, una persona
  // real nunca ve ni rellena este (está oculto por CSS, nunca con
  // display:none ni type=hidden -- algunos bots los detectan e ignoran).
  if (data.sitioWeb && data.sitioWeb.trim() !== "") {
    return NextResponse.json({ ok: true }); // Respuesta normal, nunca se delata al bot.
  }

  // Tiempo mínimo de relleno real (mismo patrón ya usado en otros
  // formularios públicos del negocio): un envío en menos de 2 segundos
  // desde que se mostró el formulario no lo ha rellenado una persona.
  if (data.renderedAt && Date.now() - data.renderedAt < 2000) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "desconocida";
  if (!dentroDelLimite(ip)) {
    return NextResponse.json({ ok: false, error: "Demasiadas solicitudes. Inténtalo de nuevo en un minuto." }, { status: 429 });
  }

  if (data.idempotencyKey) {
    if (seenIdempotencyKeys.has(data.idempotencyKey)) {
      return NextResponse.json({ ok: true }); // Mismo envío (doble clic/reintento) -- ya se procesó.
    }
    seenIdempotencyKeys.set(data.idempotencyKey, Date.now());
  }

  const errores = validarFormulario(data);
  if (Object.keys(errores).length > 0) {
    return NextResponse.json({ ok: false, error: "Revisa los datos del formulario.", errores }, { status: 400 });
  }

  const adminToken = process.env.LUCERO_ADMIN_TOKEN;
  try {
    const res = await fetch(`${LUCERO_CRM_URL}/tools/create_lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(adminToken ? { "x-admin-token": adminToken } : {}),
      },
      body: JSON.stringify({
        phone: data.telefono,
        name: data.nombre,
        email: data.email || undefined,
        channel: "WEB",
        intent: "vender_vehiculo",
        notes: construirNotas(data),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "No se pudo registrar la solicitud. Inténtalo de nuevo." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "No se pudo registrar la solicitud. Inténtalo de nuevo." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
