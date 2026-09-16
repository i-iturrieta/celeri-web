# Celeri — celeri.cl

Sitio de marca de **Celeri**: diseño y desarrollo de sitios web para PyMEs de la
Región de Los Lagos.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript. Desplegado en
Vercel; cada push a `master` publica a producción.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run lint
npm run typecheck
npm run smoke      # requiere un build previo
npm run shots      # regenera las capturas de los casos
```

`npm run shots` levanta Chromium y vuelve a capturar los sitios de los clientes
(`public/cases/*.webp`), todos con la misma receta: viewport 1440×810 a 2x, sin
scroll, salida WebP de 1920×1080. La lista sale de `content/cases.ts`, así que
un caso nuevo entra solo. Corrélo cuando un cliente cambie su sitio —
`npm run shots -- waiki` hace solo uno.

Al terminar imprime la dispersión de peso entre capturas. Que una pese mucho
más no es un problema por sí solo (un hero fotográfico comprime peor que uno
plano), pero sí es la señal de mirarla: el mismo síntoma lo da un sitio
capturado a medio cargar.

No hay variables de entorno: el sitio es completamente estático y todo el
contacto ocurre por WhatsApp y correo, sin backend.

## Estructura

| Ruta | Para qué |
| --- | --- |
| `app/` | Rutas del App Router, `sitemap.ts`, `robots.ts` y los iconos generados |
| `components/` | Componentes de página (Header, Hero, Pricing, CaseCard…) |
| `components/ui/` | Primitivos del design system — ver más abajo |
| `content/` | Contenido editable sin tocar componentes: `site`, `services`, `cases`, `faq`, `process`, `pricing` |
| `lib/` | Helpers: link de WhatsApp, JSON-LD, OG images, `cn` |
| `public/` | Imágenes de casos y OG images |

**Para editar el contenido del sitio, casi siempre basta con `content/`.**
`content/site.ts` es la única fuente de verdad para el teléfono, el correo y la
región: no repitas esos datos a mano en las páginas.

Páginas publicadas: `/`, `/servicios`, `/casos`, `/casos/[slug]` y `/contacto`.

## Design system

El sistema visual viene del proyecto de Claude Design **"Celeri Design System"**
y está bajado a este repo en dos lugares:

- **`app/globals.css`** — todos los tokens, en el bloque `@theme`. Colores,
  tipografía, espacio, radios, sombras y movimiento. Ningún componente inventa
  un valor.
- **`components/ui/`** — los 17 primitivos (Button, Input, Card, PricingCard,
  Dialog, Tabs…), portados a Tailwind + TypeScript.

Las reglas que hay que conocer antes de tocar UI están en
[`AGENTS.md`](./AGENTS.md). Las dos que más se rompen sin querer: el ámbar de
relleno no sirve como texto (para eso está `text-accent`), y el glow ámbar va en
un solo elemento por pantalla.

Diez de los primitivos todavía no los usa ninguna página. Están portados y
probados; existen porque el design system los define. No los borres pensando
que son código muerto — antes de escribir un control a mano, mirá si ya está.

## Precios

Viven en `content/pricing.ts`. Los montos se guardan como número (`basePrice`) y
se formatean con `formatCLP`; los descuentos se guardan como porcentaje
(`discountPct`) y el monto final lo calcula `finalPrice()`, para que la etiqueta
y el precio no puedan decir cosas distintas.

**Hay una promoción activa que no se apaga sola.** Es texto fijo, sin lógica de
fechas: en noviembre hay que borrar los `discountPct` de los planes y la
constante `PROMO_PERIOD`. Está anotado en el archivo.

## Contacto

El sitio no tiene formulario ni endpoints. Los CTA apuntan a `wa.me` (armado en
`lib/whatsapp.ts`) y a un `mailto:`.

Es una decisión tomada, no una tarea pendiente: un formulario propio agrega un
punto de falla que hay que vigilar, y un mensaje perdido es un cliente perdido
sin que nadie se entere. El UI kit del design system incluye un formulario de
contacto; **no se portó a propósito**. Si algún día vuelve, que sea por un
servicio externo.
