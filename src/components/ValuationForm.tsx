"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  validarFormulario,
  type ValoracionFormData,
  type ValidationErrors,
  type TipoVehiculo,
} from "@/lib/validation";

const initialData = (tipo: TipoVehiculo | ""): ValoracionFormData => ({
  tipoVehiculo: tipo,
  marca: "",
  modelo: "",
  anio: "",
  kilometraje: "",
  nombre: "",
  telefono: "",
  email: "",
  estado: "",
  combustible: "",
  matricula: "",
  comentarios: "",
  disponibleLlamada: false,
  sitioWeb: "",
});

function leerUtms() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    pagina: window.location.pathname,
  };
}

export function ValuationForm({ tipoVehiculoPorDefecto, id }: { tipoVehiculoPorDefecto?: TipoVehiculo; id?: string }) {
  const [data, setData] = useState<ValoracionFormData>(() => initialData(tipoVehiculoPorDefecto ?? ""));
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [estado, setEstado] = useState<"idle" | "enviando" | "exito" | "error">("idle");
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const renderedAtRef = useRef<number>(0);
  const idempotencyKeyRef = useRef<string>("");
  const formId = useId();
  const primerCampoRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    renderedAtRef.current = Date.now();
    idempotencyKeyRef.current =
      typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  }, []);

  function set<K extends keyof ValoracionFormData>(key: K, value: ValoracionFormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const erroresNuevos = validarFormulario(data);
    setErrors(erroresNuevos);
    if (Object.keys(erroresNuevos).length > 0) {
      setEstado("idle");
      return;
    }
    setEstado("enviando");
    setMensajeError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          renderedAt: renderedAtRef.current,
          idempotencyKey: idempotencyKeyRef.current,
          origen: leerUtms(),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setEstado("error");
        setMensajeError(json.error ?? "No se pudo enviar la solicitud. Inténtalo de nuevo.");
        return;
      }
      setEstado("exito");
    } catch {
      setEstado("error");
      setMensajeError("No se pudo enviar la solicitud. Comprueba tu conexión e inténtalo de nuevo.");
    }
  }

  if (estado === "exito") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-gray-border bg-gray-light p-8 text-center"
        id={id}
      >
        <p className="text-lg font-semibold text-navy">
          Hemos recibido tu solicitud. El equipo de Automóviles Lucero revisará los datos y
          contactará contigo para continuar con la valoración.
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-gray-border bg-white p-6 shadow-sm sm:p-8"
    >
      {/* Honeypot real: oculto por CSS (no display:none/type=hidden), nunca
          lo ve ni lo rellena una persona real. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-sitio-web`}>No rellenar este campo</label>
        <input
          id={`${formId}-sitio-web`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data.sitioWeb}
          onChange={(e) => set("sitioWeb", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-tipo`} className="mb-1 block text-sm font-medium text-navy">
            Tipo de vehículo *
          </label>
          <select
            ref={primerCampoRef}
            id={`${formId}-tipo`}
            required
            value={data.tipoVehiculo}
            onChange={(e) => set("tipoVehiculo", e.target.value as TipoVehiculo)}
            className="w-full rounded-lg border border-gray-border px-3 py-2.5 text-black focus:border-navy"
          >
            <option value="">Selecciona una opción</option>
            <option value="coche">Coche</option>
            <option value="furgoneta">Furgoneta</option>
          </select>
          {errors.tipoVehiculo && <p className="mt-1 text-sm text-red-600">{errors.tipoVehiculo}</p>}
        </div>

        <Campo id={`${formId}-marca`} label="Marca *" value={data.marca} onChange={(v) => set("marca", v)} error={errors.marca} />
        <Campo id={`${formId}-modelo`} label="Modelo *" value={data.modelo} onChange={(v) => set("modelo", v)} error={errors.modelo} />
        <Campo
          id={`${formId}-anio`}
          label="Año de matriculación *"
          value={data.anio}
          onChange={(v) => set("anio", v)}
          error={errors.anio}
          inputMode="numeric"
        />
        <Campo
          id={`${formId}-km`}
          label="Kilometraje *"
          value={data.kilometraje}
          onChange={(v) => set("kilometraje", v)}
          error={errors.kilometraje}
          inputMode="numeric"
        />

        <Campo id={`${formId}-nombre`} label="Nombre *" value={data.nombre} onChange={(v) => set("nombre", v)} error={errors.nombre} />
        <Campo
          id={`${formId}-telefono`}
          label="Teléfono de contacto *"
          value={data.telefono}
          onChange={(v) => set("telefono", v)}
          error={errors.telefono}
          inputMode="tel"
        />

        <Campo id={`${formId}-email`} label="Email (opcional)" value={data.email} onChange={(v) => set("email", v)} error={errors.email} />
        <Campo id={`${formId}-estado`} label="Estado general (opcional)" value={data.estado} onChange={(v) => set("estado", v)} />
        <Campo id={`${formId}-combustible`} label="Combustible (opcional)" value={data.combustible} onChange={(v) => set("combustible", v)} />
        <Campo
          id={`${formId}-matricula`}
          label="Matrícula (opcional)"
          value={data.matricula}
          onChange={(v) => set("matricula", v)}
          error={errors.matricula}
        />

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-comentarios`} className="mb-1 block text-sm font-medium text-navy">
            Comentarios (opcional)
          </label>
          <textarea
            id={`${formId}-comentarios`}
            rows={3}
            value={data.comentarios}
            onChange={(e) => set("comentarios", e.target.value)}
            className="w-full rounded-lg border border-gray-border px-3 py-2.5 text-black focus:border-navy"
          />
          {errors.comentarios && <p className="mt-1 text-sm text-red-600">{errors.comentarios}</p>}
        </div>

        <div className="flex items-center gap-2 sm:col-span-2">
          <input
            id={`${formId}-llamada`}
            type="checkbox"
            checked={data.disponibleLlamada}
            onChange={(e) => set("disponibleLlamada", e.target.checked)}
            className="h-4 w-4 rounded border-gray-border"
          />
          <label htmlFor={`${formId}-llamada`} className="text-sm text-black">
            Estoy disponible para recibir una llamada
          </label>
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-gray">
        Los datos que nos facilites se usarán para atender tu solicitud de valoración. Puedes
        consultar cómo los tratamos en nuestra{" "}
        <a href="/politica-de-privacidad" className="underline">
          política de privacidad
        </a>
        .
      </p>

      {mensajeError && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {mensajeError}
        </p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="mt-6 w-full rounded-full bg-navy px-8 py-3.5 text-base font-semibold text-white transition hover:bg-navy-light disabled:opacity-60 sm:w-auto"
      >
        {estado === "enviando" ? "Enviando…" : "Enviar mi solicitud de valoración"}
      </button>
    </form>
  );
}

function Campo({
  id,
  label,
  value,
  onChange,
  error,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  inputMode?: "numeric" | "tel";
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-navy">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-lg border border-gray-border px-3 py-2.5 text-black focus:border-navy"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
