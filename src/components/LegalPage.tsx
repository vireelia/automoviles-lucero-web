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
      <h1 className="text-3xl font-bold text-gold">{titulo}</h1>
      <p className="mt-2 text-sm text-gray">Última actualización: {actualizado}</p>
      {avisoBorrador && (
        <div className="mt-6 rounded-xl border border-gold bg-navy-light p-4 text-sm text-white">
          <strong>Borrador pendiente de revisión legal.</strong> Los datos reales del negocio ya
          están confirmados, pero este texto no ha sido revisado todavía por un profesional del
          derecho. No debe publicarse como versión definitiva sin esa revisión, y no constituye
          asesoramiento jurídico.
        </div>
      )}
      <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-white sm:text-base">
        {children}
      </div>
    </article>
  );
}
