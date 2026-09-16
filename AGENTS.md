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
  nunca un `scale`. El press es el mismo tono, un paso más profundo. La única
  excepción es el contorno de la tarjeta de caso — ver más abajo; es una
  excepción nombrada, no una puerta abierta.
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

## Ritmo de sección

El espaciado vertical **no es parejo, y es a propósito**. Cuando todas las
secciones corrían al mismo `py-24 sm:py-28`, el scroll sonaba a metrónomo — y
un metrónomo se lee como plantilla.

Hay cuatro utilidades en `globals.css` y se elige por el **rol** de la sección,
no por cuánto espacio parece necesitar:

| Utilidad | Cuándo |
|---|---|
| `section-tight` | Continúa el tema anterior, no abre uno nuevo |
| `section-base` | Sección normal, o una ya separada por su propio fondo |
| `section-loose` | La vitrina de la página, lo que se quiere mirar |
| `section-open` | La primera después de un `PageHeader` o de una imagen a sangre |

**No escribas el `py-` suelto en el componente.** Si necesitás un quinto paso,
agregalo allá con un nombre que diga su rol.

En el home: servicios `tight` (sigue al hero), proceso `base` (su banda caliza
ya lo separa), casos `loose`.

## Transiciones de vista

Habilitadas por `experimental.viewTransition` en `next.config.ts`. **Hay dos y
no debería haber una tercera.** Las reglas viven en `globals.css`, bajo
"Transiciones de vista".

1. **El crossfade entre páginas.** No lo declara ningún componente: es la
   transición de raíz del navegador, o sea todo lo que no tenga un
   `view-transition-name` propio. Por eso el header, el pie y el botón flotante
   se anclan por nombre — son idénticos en todas las páginas y si parpadean con
   el contenido, el visitante pierde su único punto fijo.
2. **El morph de la captura** al entrar a un caso. La imagen de `CaseCard` y la
   imagen a sangre de `/casos/[slug]` comparten `name={`case-${slug}`}`, así que
   la captura crece en vez de cambiar. Dice "la misma cosa, más cerca", que es
   información.

**Se descartaron a propósito** los slides direccionales, los `transitionTypes`
y las transiciones de Suspense que documenta Next: mueven cosas en pantalla sin
decir nada que el visitante no sepa ya. El movimiento es terminación, no
contenido.

Tres cosas que se rompen sin querer:

- **El morph depende de que origen y destino sean la misma proporción.** Los dos
  son `aspect-[16/9]`, igual que la captura que produce `scripts/shots.mjs`. Si
  cambiás uno de los tres, la imagen se deforma a mitad de camino.
- **`prefers-reduced-motion` necesita apagarlas aparte.** Las pseudo-clases
  `::view-transition-*` viven fuera del árbol del documento y el `*` del bloque
  de reduced-motion no las alcanza.
- **Ese bloque no apaga las transiciones de color, y es a propósito.** Tenía el
  `transition-duration: 0.01ms !important` sobre `*` que se copia y pega en
  todos lados, y era más de lo que la preferencia pide: un cambio de color no
  es movimiento, y apagarlo dejaba todo el sistema de hover seco sin que nadie
  ganara nada. Lo que sí se apaga es lo que se desplaza, crece o viaja. Si
  agregás una transición de posición, apagala ahí por nombre — `transition-brand`
  deja `transform` fuera justamente para que no haya ninguna.

## El contorno de la tarjeta de caso

La única interacción con movimiento del sitio. Al pasar el cursor sobre la
captura de un caso, una línea ámbar se dibuja desde la esquina superior
izquierda y recorre el contorno; al salir, se repliega por donde vino. Vive en
`components/CaseOutline.tsx` y en la utilidad `case-outline` de `globals.css`.

**Por qué se permite** pese a la regla de arriba: no es un estado decorado, es
una línea que aparece donde no había nada — la misma clase de señal que el
subrayado de un link. Lo que la regla prohíbe, el fade de opacidad y el
`scale`, sigue prohibido. **No extiendas esto a los botones ni a las tarjetas
de servicio.** Una interacción de firma deja de serlo cuando está en todas
partes.

Cuatro cosas que se rompen sin querer:

- **El SVG no lleva viewBox.** Con uno cuadrado y `preserveAspectRatio="none"`,
  la escala no uniforme rompe el cálculo de guiones y la línea se dibuja en un
  tramo suelto en vez de recorrer el perímetro. Fue el primer intento y no
  funcionó.
- **El trazo va `--ease-in`, no `--ease-out` ni `linear`.** Es la única
  animación del sitio que es un recorrido y no un cambio de estado: sale medido
  desde la esquina y acelera hasta cerrar el circuito, en un segundo. Con
  `--ease-out` se cerraba de un salto; con `linear` viajaba pero se leía como
  barra de progreso. La curva está elegida contra números —la tabla está en el
  comentario de `--ease-in` en `globals.css`— y el criterio fue que se moviera
  en el primer octavo de segundo: si no, el hover parece no haber respondido.
  **`--ease-in` es solo para esto.** Los estados van con `--ease-out`.
- **También responde al foco** (`group-focus-within`), no solo al hover. La
  imagen es `aria-hidden` con `tabIndex={-1}`, así que quien navega con teclado
  nunca la toca: sin eso, la interacción de firma del sitio sería exclusiva de
  quien usa mouse.
- **El `<CaseOutline>` va FUERA del `<ViewTransition>`.** Adentro, el contorno
  viaja en el morph junto con la captura y se ve una línea ámbar estirándose
  por la pantalla.

**Si el contorno aparece de golpe en vez de dibujarse, no es un bug**: es
`prefers-reduced-motion`. En Windows lo activa *Configuración → Accesibilidad →
Efectos visuales → Efectos de animación* apagado, que en muchas máquinas viene
así de fábrica — y con eso tampoco se ven la entrada del hero, el crossfade
entre páginas ni el morph. Para comprobarlo sin tocar el sistema: DevTools →
Rendering → *Emulate prefers-reduced-motion*.

**La vuelta extra mientras se espera** (`useLinkStatus`) casi nunca se ve, y
está bien así. Las páginas de caso son estáticas y prefetcheadas, así que al
hacer click no hay nada que esperar; la vuelta es para la conexión mala. Es
tentador forzarla con `prefetch={false}` o con un retardo artificial para que
se luzca: las dos hacen el sitio más lento a cambio de un efecto. Para verla,
estrangulá la red en DevTools.

## Escala tipográfica

Usá los nombres por rol — `text-h1`, `text-h2`, `text-h3`, `text-lead`,
`text-body`, `text-small`, `text-micro` — antes que los crudos (`text-3xl`).
Los tamaños son los del design system; el nombre por rol además trae peso,
interlínea y tracking, que si se escriben sueltos en cada componente terminan
divergiendo.

Dos detalles que sostienen la escala:

- **`tracking-tighter` (-0.03em) es solo del titular del hero.** Es el único
  texto que llega a 4rem, y el tracking óptico tiene que cerrarse a medida que
  el tamaño sube. De `h2` para abajo, `tracking-tight`.
- **Los precios van `tabular-nums`.** Sin eso los dígitos tienen anchos
  distintos y las tres tarjetas de plan no alinean entre sí — justo mientras el
  visitante las está comparando.

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
