import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Subida real de fotos/vídeo del vehículo (04/11/2026, "aqui pon una
// seccion para que se pueda añadir fotos o videos del coche"). Sube cada
// archivo a R2 (bucket real automoviles-lucero-fotos, ver wrangler.jsonc)
// y devuelve la URL pública real -- esa URL es lo único que se guarda
// junto al lead (en las notas, vía /api/leads), nunca el archivo entero
// pasa por el backend del CRM.
const MAX_FILES = 8;
const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25MB por archivo -- suficiente para fotos y vídeos cortos de móvil.
const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "image/heic", "video/mp4", "video/quicktime", "video/webm"];

export async function POST(req: NextRequest) {
  let env: { FOTOS_VEHICULOS?: R2Bucket; PUBLIC_FOTOS_BASE_URL?: string };
  try {
    env = getCloudflareContext().env as typeof env;
  } catch {
    return NextResponse.json({ ok: false, error: "No disponible en este entorno (solo funciona desplegado en Cloudflare)." }, { status: 503 });
  }
  if (!env.FOTOS_VEHICULOS) {
    return NextResponse.json({ ok: false, error: "El bucket de fotos todavía no está creado -- pendiente de crearlo con el token real de Cloudflare." }, { status: 503 });
  }

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false, error: "Formulario inválido." }, { status: 400 });

  const archivos = form.getAll("archivos").filter((f): f is File => f instanceof File);
  if (archivos.length === 0) return NextResponse.json({ ok: false, error: "No se recibió ningún archivo." }, { status: 400 });
  if (archivos.length > MAX_FILES) {
    return NextResponse.json({ ok: false, error: `Máximo ${MAX_FILES} archivos por solicitud.` }, { status: 400 });
  }

  const urls: string[] = [];
  for (const archivo of archivos) {
    if (archivo.size > MAX_FILE_BYTES) {
      return NextResponse.json({ ok: false, error: `${archivo.name} supera el tamaño máximo (25MB).` }, { status: 400 });
    }
    if (!TIPOS_PERMITIDOS.includes(archivo.type)) {
      return NextResponse.json({ ok: false, error: `${archivo.name}: tipo de archivo no permitido.` }, { status: 400 });
    }
    const extension = archivo.name.includes(".") ? archivo.name.slice(archivo.name.lastIndexOf(".")) : "";
    const clave = `leads/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}${extension}`;
    await env.FOTOS_VEHICULOS.put(clave, await archivo.arrayBuffer(), {
      httpMetadata: { contentType: archivo.type },
    });
    // PUBLIC_FOTOS_BASE_URL (04/11/2026): dominio público real del bucket
    // (r2.dev o un dominio propio conectado) -- variable de entorno real,
    // pendiente de configurar al crear el bucket, nunca inventada aquí.
    const base = env.PUBLIC_FOTOS_BASE_URL;
    urls.push(base ? `${base.replace(/\/$/, "")}/${clave}` : clave);
  }

  return NextResponse.json({ ok: true, urls });
}
