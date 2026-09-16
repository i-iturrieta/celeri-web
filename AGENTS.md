<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design system

El sistema visual viene del proyecto de Claude Design **"Celeri Design System"**
(`6b056db9-2a2c-478b-bcc1-9e66e4569819`). Se sincroniza con la herramienta
DesignSync; el `readme.md` de allá es la fuente autoritativa y esto es su
bajada a este repo.

**Los tokens viven en `app/globals.css`, en el bloque `@theme`. Ningún
componente inventa un color, un tamaño ni una transición.** Si necesitás un
valor que no está, agregalo al theme primero y después usalo.

## La dirección, en una línea

Marca dark-forward: tinta casi negra en bloques macizos (hero, nav, footer)
contra un único acento ámbar usado con avaricia. El contenido largo va sobre
papel cálido, no blanco puro. **Un solo acento. Sin gradientes. Sin segundo
color de marca.**

## Reglas que se rompen sin querer

- **Ámbar de relleno ≠ ámbar de texto.** `surface-accent` (amber-500) es fondo,
  borde y regla; no llega a contraste como texto sobre claro. Para texto ámbar
  existe `text-accent` (amber-700). No escribas `text-amber-500`.
- **`primary` es uno por vista.** Dos botones ámbar en la misma pantalla es
  ninguno.
- **El glow ámbar es uno por pantalla.** `shadow-glow-amber` está reservado al
  elemento destacado (el plan recomendado). Repetido, deja de significar.
- **Hover y press son cambio de color sólido.** Nunca un fade de opacidad,
  nunca un `scale`. El press es el mismo tono, un paso más profundo.
- **Nada de borde de color a la izquierda en una tarjeta.** Ni icono dentro de
  un círculo. Los dos están prohibidos por nombre.
- **Sin gradientes, sin texturas, sin frosted glass.** La única transparencia
  del sistema es el scrim del modal.
- **El mono es solo etiqueta**, y siempre en mayúscula con tracking abierto:
  usá la utilidad `label-mono`, no `font-mono` suelto.
- **Copy sin emoji**, y en primera persona singular. Celeri es una persona, no
  una agencia: nunca "nuestro equipo".

## Las tres familias

| Rol | Familia | Cómo se usa |
|---|---|---|
| Display | Sora | Titulares, tight-tracked y grandes |
| Cuerpo/UI | IBM Plex Sans | Todo el texto corrido (`font-sans`, el default) |
| Etiqueta | Space Mono | Eyebrows y labels, vía `label-mono` |

Se cargan con `next/font` en `app/layout.tsx`, no por `@import` de Google
Fonts como en el proyecto de diseño.

## Primitivos

Están en `components/ui/`, portados de `components/**` del design system y
exportados desde `components/ui/index.ts`. Antes de escribir un botón, un
input o una tarjeta a mano, fijate si ya existe ahí.

Se portaron a Tailwind + TypeScript, no copiados: los originales usan estilos
inline y `useState` para el hover, lo que los volvería client components a
todos. Acá el hover es CSS, así que casi todos son Server Components — las
excepciones son `Input`, `Select`, `Dialog` y `Tabs`, que sí necesitan estado
o `useId`.

Los originales también tenían fallas de accesibilidad que acá están
corregidas; están anotadas en el comentario de cabecera de cada archivo. Si
alguna vez re-sincronizás desde el design system, **no pises estos archivos
sin releer esos comentarios** o volvés a meter los mismos bugs.

## Iconos

Lucide, stroke 1.5–2px, sin relleno. El proyecto ya tiene `lucide-react`, así
que se importan de ahí — no por el CDN que menciona el design system. Ningún
primitivo hardcodea un icono: todos reciben el nodo por prop.

## Superficies

El sitio alterna tres fondos y el orden importa:

```
nav          oscuro   surface-inverse
hero         oscuro   surface-inverse
contenido    papel    surface-page
banda cierre caliza   surface-sunken
pie          oscuro   surface-inverse
```

La banda de cierre es clara **porque** el pie es oscuro: cuando las dos eran
oscuras se fundían en un solo bloque negro de media pantalla y el llamado a la
acción no destacaba contra nada. Si alguna vez oscurecés la banda, el pie tiene
que volver a claro.

## El ámbar primario, por página

Uno en el contenido, más el del header, que es cromo persistente y se repite en
todas las páginas (es lo que hace el propio kit del design system):

- **Inicio** — el botón del hero.
- **Servicios** — el del plan recomendado.
- La banda de cierre va `secondary` a propósito: si fuera ámbar, habría dos en
  pantalla y ninguno diría "empezá por acá".

## Escala tipográfica

Usá los nombres por rol — `text-h1`, `text-h2`, `text-h3`, `text-lead`,
`text-body`, `text-small`, `text-micro` — antes que los crudos (`text-3xl`).
Los tamaños son los del design system; el nombre por rol además trae peso,
interlínea y tracking, que si se escriben sueltos en cada componente terminan
divergiendo.

## Decisiones tomadas (no las reabras sin preguntar)

Cosas que parecen faltantes y no lo son. Cada una se decidió a propósito:

- **No hay formulario de contacto.** El UI kit del design system trae uno
  (`Input` + `Select` + `Checkbox` + `Toast`), y por eso esos primitivos
  existen. No se portó: un formulario propio agrega un punto de falla que hay
  que vigilar, y un mensaje perdido es un cliente perdido sin que nadie se
  entere. `/contacto` son WhatsApp y `mailto:`, y no hay `app/api/`.
- **No existe `/sobre-mi`.** Se eliminó junto con sus referencias en nav, pie,
  sitemap, smoke y el nodo `Person` del JSON-LD.
- **El hero no tiene movimiento de fondo.** Tenía dos manchas de luz derivando;
  eran gradientes con blur y el sistema los prohíbe. Queda solo la entrada
  escalonada al cargar.
- **El `ChatAssistant` del UI kit quedó fuera**, para una V2.
- **Diez primitivos no los usa nadie todavía** (Card, Checkbox, Dialog,
  IconButton, Input, Radio, Select, Switch, Toast, Tooltip). No son código
  muerto: son el kit completo. Antes de escribir un control a mano, mirá si ya
  está en `components/ui/`.

## Contenido del design system vs. contenido real

El UI kit del proyecto de diseño trae copy de relleno — proyectos inventados
("Estudio Vela", "Tienda Lumen") y servicios genéricos de agencia ("React/Next.js
en el frontend"). El readme del propio design system dice que se reemplace por
contenido real.

**Se tomó el lenguaje visual del kit y se conservó todo lo de `content/`.** Si
re-sincronizás desde el design system, no traigas su copy.
