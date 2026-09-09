# Celeri — celeri.cl

Sitio de marca de **Celeri**: diseño y desarrollo de sitios web para PyMEs de la
Región de Los Lagos.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript. Desplegado en
Vercel; cada push a `master` publica a producción.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm run lint
```

No hay variables de entorno: el sitio es completamente estático y todo el
contacto ocurre por WhatsApp y correo, sin backend.

## Estructura

| Ruta | Para qué |
| --- | --- |
| `app/` | Rutas del App Router, `sitemap.ts`, `robots.ts` y los iconos generados |
| `components/` | Componentes de UI compartidos |
| `content/` | Contenido editable sin tocar componentes: `site`, `services`, `cases`, `faq` |
| `lib/` | Helpers: link de WhatsApp y JSON-LD |
| `public/` | Imágenes de casos y OG images |

**Para editar el contenido del sitio, casi siempre basta con `content/`.**
`content/site.ts` es la única fuente de verdad para el teléfono, el correo y la
región: no repitas esos datos a mano en las páginas.

## Contacto

El sitio no tiene formulario ni endpoints. Los CTA apuntan a `wa.me` (armado en
`lib/whatsapp.ts`) y a un `mailto:`. Si algún día vuelve un formulario, que sea
por un servicio externo — no por un endpoint propio que haya que vigilar.
