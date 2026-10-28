export function LegalPage({
  titulo,
  actualizado,
  avisoBorrador,
  children,
}: {
  titulo: string;
  actualizado: string;
  avisoBorrador?: boolean;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-navy">{titulo}</h1>
      <p className="mt-2 text-sm text-gray">Última actualización: {actualizado}</p>
      {avisoBorrador && (
        <div className="mt-6 rounded-xl border border-gold bg-gray-light p-4 text-sm text-navy">
          <strong>Borrador pendiente de revisión legal.</strong> Este texto todavía tiene datos
          marcados como [PENDIENTE DE CONFIRMAR] y no debe publicarse como versión definitiva
          hasta confirmarlos y, si procede, hacerlo revisar por un profesional. No constituye
          asesoramiento jurídico.
        </div>
      )}
      <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-black sm:text-base">
        {children}
      </div>
    </article>
  );
}
