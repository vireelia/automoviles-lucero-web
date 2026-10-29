# Entrega — Landing "Compramos tu coche o furgoneta" (Automóviles Lucero)

Proyecto nuevo (Next.js 16 + TypeScript + Tailwind v4), separado del backend/CRM
(`automoviles-lucero`), que no tiene frontend propio. Los leads que entran por
aquí van al mismo CRM real que ya usa el equipo (Clientes/Contactos).

## 1. Qué se construyó

- Landing principal (`/`) con las 8 secciones del encargo: hero, elige tu
  vehículo, cómo funciona, formulario de tasación, confianza, FAQ, CTA final,
  footer.
- `/compramos-tu-coche` y `/compramos-furgonetas` — contenido propio, mismos
  componentes reutilizados (formulario, "cómo funciona", confianza, FAQ).
- `/aviso-legal`, `/politica-de-privacidad`, `/politica-de-cookies` —
  completas en estructura, con los datos legales reales marcados
  `[PENDIENTE DE CONFIRMAR]` donde de verdad faltan (ver sección 4). Llevan
  un aviso visible de "borrador pendiente de revisión legal" hasta que se
  confirmen y, si procede, las revise un profesional.
- Banner de cookies real y funcional: Rechazar/Configurar/Aceptar con el
  mismo peso visual, bloquea cookies no esenciales hasta el consentimiento,
  guarda la elección y la versión de la política, se puede reabrir desde
  "Configurar cookies" en el footer. Hoy no hay ningún script de
  analítica/publicidad instalado (ni Google Analytics, ni Meta Pixel, ni
  Google Ads) -- el inventario de `/politica-de-cookies` lo dice así, nunca
  se afirma que están activos sin estarlo.
- Formulario de tasación con validación real en cliente y servidor
  (`src/lib/validation.ts`, una sola fuente para los dos), protección
  honeypot, tiempo mínimo de relleno, límite de frecuencia por IP,
  deduplicación por clave de idempotencia (doble clic/reintento) y
  confirmación solo tras respuesta real del servidor.
- `src/app/api/leads/route.ts`: recibe el formulario, valida, y llama
  server-to-server al mismo endpoint real que ya usan los agentes de voz/
  chat (`/tools/create_lead` del CRM) -- mismo sistema de deduplicación por
  teléfono que ya existe, nada inventado.
- SEO técnico: metadatos/title/description reales de las 3 páginas
  (sección 5 del encargo), `sitemap.ts` y `robots.ts` reales (no estáticos
  a mano).
- Botón de llamada a la acción persistente en móvil.
- Accesibilidad: HTML semántico, etiquetas de formulario asociadas, foco
  visible, mensajes de error asociados a cada campo, navegación por
  teclado.

## 2. Pruebas reales ejecutadas (no simuladas)

- `npx tsc --noEmit` — limpio.
- `npx eslint .` — limpio (incluida una corrección real de una regla de
  React sobre `useSyncExternalStore` en el banner de cookies).
- `npm run build` (producción) — compila y pre-renderiza las 12 rutas sin
  error.
- Servidor real arrancado (`npm run start`) y probado con Playwright y
  `curl` contra la ruta de API real:
  - Formulario vacío → 7 errores de validación reales mostrados.
  - Honeypot relleno → se descarta en silencio (`ok:true`, nunca llega al
    CRM).
  - Envío en menos de 2s desde que se mostró el formulario → se descarta
    en silencio.
  - Datos inválidos (año/kilómetros/teléfono/email) → 400 con los errores
    reales.
  - Misma clave de idempotencia dos veces → la segunda no reintenta.
  - Banner de cookies: Rechazar guarda la elección real, no reaparece al
    recargar, se puede reabrir desde el footer.
- **Importante, ya solucionado**: durante estas pruebas, un servidor local
  antiguo que seguía corriendo apuntó por error al CRM real de producción
  y creó un lead de prueba (teléfono 600111222). Se detectó, se construyó
  un endpoint de limpieza real (mueve a la papelera, recuperable) y se
  verificó que el lead ya no aparece en el CRM activo.

## 3. Variables de entorno (ver `.env.example`, sin secretos reales)

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Dominio real de esta landing (sitemap, robots, URLs canónicas) -- pendiente de confirmar |
| `LUCERO_CRM_URL` | URL real del backend del CRM (ya puesta: producción real) |
| `LUCERO_ADMIN_TOKEN` | Opcional, solo si en el futuro se protege `/tools/create_lead` con token |

## 4. Datos legales — ya confirmados (28/10/2026)

Razón social, NIF/CIF, domicilio social, domicilio real de atención al
público, correo de contacto y datos registrales ya están rellenados con
datos reales (tarjeta de identificación fiscal de la AEAT + confirmación
directa de Eliud) en `src/lib/business.ts`, aviso legal y política de
privacidad.

## 4bis. Criterios reales de compra — confirmados (29/10/2026)

Ramón respondió en audio un cuestionario real preparado por ti sobre qué
compran, condiciones, zona, pago y diferenciación. Ya está todo en
`src/lib/business.ts` (`comprasCriterios`) y usado en FAQ/Confianza:
cualquier marca/modelo/antigüedad/km (sin límite), averiados/accidentados
caso por caso, **no** financiados ni con cargas pendientes, compran en
toda España (recogida incluida), tasación gratuita y sin compromiso, pago
en el momento, se encargan de titularidad y trámites, ~20 años de
experiencia, y la ventaja real frente a un particular: al vendernos a
nosotros, el vendedor queda exento de dar garantía. WhatsApp real
confirmado: 622 177 052 (ya añadido al footer, junto al teléfono
622 188 213 que ya se usaba).

Dato estratégico para más adelante (fuera del alcance de esta landing):
quieren especializarse en comprar **furgonetas y flotas de empresas** --
Eliud mencionó un posible agente aparte que mapee webs/LinkedIn/Maps de
empresas de compraventa para alimentar un funnel B2B en el CRM. No
construido todavía, es una idea para un proyecto propio.

## 5. Datos que todavía necesito que me confirmes

- Dominio definitivo de la landing.
- Fotografías reales (propias o con licencia) de un coche y una furgoneta
  para el hero -- hoy hay un recuadro honesto de "Fotografía de un coche/
  una furgoneta" en su lugar, nunca una imagen de archivo sin confirmar.
- Proveedores reales de analítica/publicidad que se vayan a instalar
  (Google Analytics, Meta Pixel, Google Ads...), para añadirlos al
  inventario de cookies ANTES de activarlos.
- Política de privacidad, sección "Destinatarios": listado concreto de
  proveedores reales (hosting, CRM, comunicaciones) y plazo exacto de
  conservación de datos cuando no hay compraventa -- quedan marcados
  [PENDIENTE DE CONFIRMAR] dentro del propio texto.

## 6. Despliegue (mismo patrón ya usado en el resto de proyectos de Vireliab)

1. Crear el repositorio en GitHub (`vireelia/automoviles-lucero-landing` o
   el nombre que prefieras) y hacer push de este proyecto.
2. En EasyPanel: nuevo servicio tipo "app" en el proyecto `virelia-hub`
   (o uno propio), origen GitHub, build con Dockerfile o Nixpacks
   (Next.js detecta el build automáticamente).
3. Variables de entorno reales: las de la sección 3 de arriba, con el
   dominio real ya confirmado.
4. Conectar el dominio real y esperar a que el certificado quede activo.
5. Verificar en real: cargar la página, enviar el formulario de prueba
   con un teléfono real tuyo, confirmar que aparece en Clientes del CRM,
   y borrarlo desde ahí si era solo una prueba.

## 7. Campañas publicitarias — pendiente de tu confirmación, nada activado

El encargo ya trae las palabras clave, negativas y los copys reales de
Google Ads/Meta Ads/OpenAI Ads escritos por ti -- no hace falta que los
reescriba, ya están listos para pegar en cada plataforma cuando decidas
lanzarlas. No he creado ni activado ninguna campaña real ni gastado nada
(tal y como pedía el encargo).

## 8. Lo que falta para producción (de lo que SÍ es código)

- Fotografías reales del hero.
- Decidir si las páginas legales deben indexarse en buscadores (hoy llevan
  `noindex` por defecto, criterio habitual, pero no pedido explícitamente).
- Imagen de vista previa para redes sociales (Open Graph) -- no incluida
  todavía, depende de tener una fotografía/diseño real.
- Revisión legal real del aviso legal y la política de privacidad una vez
  rellenados los datos pendientes.
