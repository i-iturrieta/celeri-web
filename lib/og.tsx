import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { site } from "@/content/site";
import type { CaseStudy } from "@/content/cases";

/** Tamaño estándar de Open Graph. Se reexporta desde cada opengraph-image. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/*
 * Los colores van en hex y no en tokens de Tailwind a propósito: esto se
 * renderiza fuera del navegador, sin la hoja de estilos del sitio. Son los
 * mismos valores que los tokens de app/globals.css — si cambias la paleta allá,
 * estos hay que moverlos a mano (y los de scripts/icons.mjs, que son los mismos).
 *
 * Eso fue exactamente lo que pasó: se quedaron en la paleta "petróleo y latón"
 * cuando el sitio ya había pasado a tinta y ámbar, y las cuatro tarjetas de
 * compartir estuvieron mostrando una marca que ya no existe. Si volvés a mover
 * la rampa en globals.css, volvé acá en el mismo commit.
 */
const INK = "#0a0a0c";
const ON_DARK = "#ffffff";
const ON_DARK_SUBTLE = "#a8acb3";
const AMBER = "#ffb020";
/* El borde de la captura: una línea apenas más clara que la tinta, para que el
 * sitio del cliente no se funda con el fondo cuando su propia portada es oscura. */
const HAIRLINE = "#2a2c31";

/*
 * Las fuentes. Antes la tarjeta pedía "sans-serif" y satori no trae ninguna:
 * caía en la de reserva, y las tarjetas de compartir salían en una tipografía
 * que no es la del sitio. Se cargan de assets/fonts (woff: satori no lee woff2)
 * y se leen una sola vez por proceso — en el build se generan varias tarjetas
 * seguidas y no hay por qué abrir los mismos tres archivos cada vez.
 *
 * Sora titula, Plex lee, Space Mono etiqueta: el mismo reparto que el sitio.
 */
const fontsPromise = (async () => {
  const dir = join(process.cwd(), "assets/fonts");
  const [sora, plex, mono] = await Promise.all([
    readFile(join(dir, "sora-latin-700-normal.woff")),
    readFile(join(dir, "ibm-plex-sans-latin-400-normal.woff")),
    readFile(join(dir, "space-mono-latin-700-normal.woff")),
  ]);
  return [
    { name: "Sora", data: sora, weight: 700 as const, style: "normal" as const },
    { name: "Plex", data: plex, weight: 400 as const, style: "normal" as const },
    { name: "Mono", data: mono, weight: 700 as const, style: "normal" as const },
  ];
})();

/**
 * El eyebrow: el `label-mono` del sitio, pero sobre tinta. Mayúscula con
 * tracking abierto, siempre — el mono suelto no es parte del sistema. El ámbar
 * sobre tinta sí llega a contraste como texto, al revés que sobre papel.
 */
function Eyebrow({
  children,
  size = 22,
}: {
  children: string;
  size?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        marginTop: 30,
        fontFamily: "Mono",
        fontWeight: 700,
        fontSize: size,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: AMBER,
      }}
    >
      {children}
    </div>
  );
}

/** La regla ámbar: la misma marca que en el sitio señala dónde empieza algo.
 *  Ni degradado ni sombra detrás: la tarjeta tiene que parecerse al bloque
 *  oscuro macizo que el visitante abre al hacer clic. */
function Rule() {
  return <div style={{ width: 84, height: 3, backgroundColor: AMBER }} />;
}

/** El wordmark real, igual que el del header: "celeri" en minúscula y el punto
 *  ámbar. No `site.name`, que lleva mayúscula y no es lo que se ve en el sitio. */
function Wordmark() {
  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Sora",
        fontWeight: 700,
        fontSize: 40,
        lineHeight: 1,
        letterSpacing: "-0.025em",
        color: ON_DARK,
      }}
    >
      {site.name.toLowerCase()}
      <span style={{ color: AMBER }}>.</span>
    </div>
  );
}

/**
 * Genera la imagen de compartir de una página.
 *
 * Va en oscuro, al revés que el sitio. No es inconsistencia: estas imágenes
 * compiten dentro de una conversación de WhatsApp, que es por donde llega la
 * mayoría de la gente, y ahí casi todas las tarjetas de enlace son claras. Una
 * oscura con una regla de ámbar se distingue del resto del hilo.
 */
export async function renderOgImage({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          padding: "76px 84px",
          fontFamily: "Plex",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Rule />
          <Eyebrow>{eyebrow}</Eyebrow>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontFamily: "Sora",
              fontWeight: 700,
              fontSize: 70,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: ON_DARK,
              maxWidth: 940,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 40,
            fontSize: 24,
            color: ON_DARK_SUBTLE,
          }}
        >
          <Wordmark />
          {/* El dominio y no el tagline: el tagline repetía el titular de la
              tarjeta del inicio palabra por palabra, y en un chat lo que sirve
              es saber adónde lleva el link. */}
          <span>{site.domain.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fontsPromise },
  );
}


/**
 * La tarjeta de un caso: la captura del sitio y quién es el cliente.
 *
 * Mismo fondo y mismas piezas que la genérica, pero con la captura a la derecha
 * y sangrando por el borde: el visitante de WhatsApp ve el sitio antes de
 * abrir nada, que es todo el argumento de la sección de casos.
 */
export async function renderCaseOgImage(c: CaseStudy) {
  /* satori no decodifica webp, que es lo que son las capturas. Se pasa a PNG y
   * se baja al tamaño en que se muestra: embeber 1920x1080 para dibujar 700px
   * de ancho solo infla el archivo, y WhatsApp descarta las vistas previas
   * pesadas. Mismo 16:9 que las capturas, así no se recorta nada. */
  const SHOT_W = 700;
  const SHOT_H = Math.round((SHOT_W * 9) / 16);
  const shot = await sharp(join(process.cwd(), "public", c.image))
    .resize(SHOT_W, SHOT_H, { fit: "cover" })
    .png()
    .toBuffer();

  const card = new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: INK,
          fontFamily: "Plex",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 560,
            height: "100%",
            padding: "76px 0 76px 84px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Rule />
            {/* 19 y no 22: la columna es angosta y "corredora de propiedades"
                a 22 se partía en dos líneas, que es justo lo que un eyebrow
                no debe hacer. */}
            <Eyebrow size={19}>{`Caso · ${c.sector}`}</Eyebrow>
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontFamily: "Sora",
                fontWeight: 700,
                fontSize: 64,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: ON_DARK,
              }}
            >
              {c.client}
            </div>
            {/* Los tres primeros "qué incluyó" y no la bajada: las bajadas
                tienen entre 135 y 232 caracteres, y cualquier recorte que cupiera
                acá las dejaba a media frase ("…y la…"). Las etiquetas son cortas,
                concretas y se leen completas. */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginTop: 26,
                fontSize: 23,
                lineHeight: 1.35,
                color: ON_DARK_SUBTLE,
              }}
            >
              {c.tags.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <Wordmark />
        </div>

        {/* La captura sangra por la derecha: 1200 − 604 = 596 visibles de 700.
            Es un <img> con data URL y no un fondo, que satori recorta peor. */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: (OG_SIZE.height - SHOT_H) / 2,
            left: 604,
            width: SHOT_W,
            height: SHOT_H,
            border: `1px solid ${HAIRLINE}`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse, no hay next/image */}
          <img
            src={`data:image/png;base64,${shot.toString("base64")}`}
            width={SHOT_W - 2}
            height={SHOT_H - 2}
            alt=""
          />
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fontsPromise },
  );

  /* La captura mete miles de colores y el PNG que arma ImageResponse sale sin
   * recomprimir: 300-450KB, por encima de lo que WhatsApp acepta en una vista
   * previa (se queda sin imagen). Se recodifica con paleta de 256 colores, que
   * en una tarjeta de tinta plana con una captura al lado no se nota. */
  const small = await sharp(Buffer.from(await card.arrayBuffer()))
    .png({ palette: true, quality: 90, effort: 10 })
    .toBuffer();
  return new Response(new Uint8Array(small), {
    headers: { "Content-Type": OG_CONTENT_TYPE },
  });
}
