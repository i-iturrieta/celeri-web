/**
 * Capturas de los casos.
 *
 * Las tres capturas de `public/cases/` se habían tomado a mano y sin un
 * criterio común: mismo alto nominal pero encuadres y compresiones distintas,
 * con pesos que iban de 51KB a 222KB. Tres capturas que no se parecen entre sí
 * hacen que la sección de casos se lea barata por mucho que el resto del sitio
 * esté cuidado.
 *
 * Esto las regenera todas con la misma receta. No es una tarea de una vez:
 * cuando un cliente cambie su sitio, `npm run shots` y listo.
 *
 * La lista de sitios NO se escribe acá: sale de content/cases.ts, que es la
 * única fuente de verdad de los casos. Node 24 importa el .ts directo.
 *
 * Uso: npm run shots            (todos)
 *      npm run shots -- waiki   (solo los slugs que contengan "waiki")
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { cases } from "../content/cases.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "cases");

/**
 * La receta. Todo lo que hace que las tres capturas sean comparables está acá
 * arriba, en un solo lugar — si mañana el sitio pide otra proporción, se
 * cambia este bloque y se vuelve a correr.
 *
 * El viewport es 16:9 exacto y es la misma proporción en la que se muestran:
 * la tarjeta de caso y la imagen a sangre del detalle son las dos `aspect-16/9`.
 * Capturar en una proporción y mostrar en otra es lo que hacía que `object-cover`
 * les recortara un pedazo distinto a cada una.
 *
 * `deviceScaleFactor: 2` captura al doble y `sharp` baja a 1920x1080, que es lo
 * que se sirve. Capturar a 1x y escalar hacia arriba da texto con bordes sucios;
 * capturar a 2x y bajar da texto limpio, que es de lo que depende que una
 * captura de un sitio web se vea cara.
 */
const VIEWPORT = { width: 1440, height: 810 };
const SCALE = 2;
const OUTPUT = { width: 1920, height: 1080 };
const WEBP_QUALITY = 80;

/** Cuánto esperamos a que un sitio ajeno termine de acomodarse. */
const NAV_TIMEOUT = 45_000;
const SETTLE_MS = 1_500;

const filter = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const targets = filter.length
  ? cases.filter((c) => filter.some((f) => c.slug.includes(f)))
  : cases;

if (targets.length === 0) {
  console.error(
    `Ningún caso coincide con ${filter.join(", ")}. Slugs: ${cases
      .map((c) => c.slug)
      .join(", ")}`,
  );
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: SCALE,
  /* Sin esto, cada sitio queda capturado en el fotograma donde lo pilló su
   * propia animación de entrada — uno a medio fade, otro ya asentado. */
  reducedMotion: "reduce",
  locale: "es-CL",
});

const results = [];
let failures = 0;

console.log(
  `\nCapturando ${targets.length} sitio(s) a ${VIEWPORT.width}x${VIEWPORT.height} @${SCALE}x → ${OUTPUT.width}x${OUTPUT.height} webp\n`,
);

for (const caseStudy of targets) {
  const page = await context.newPage();
  const dest = path.join(ROOT, "public", caseStudy.image.replace(/^\//, ""));

  try {
    await page.goto(caseStudy.url, {
      waitUntil: "networkidle",
      timeout: NAV_TIMEOUT,
    });

    /* `networkidle` dice que dejó de pedir cosas, no que dejó de moverse.
     * Las fuentes web en particular se asientan después. */
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(SETTLE_MS);

    /* Solo el viewport, sin scroll: la portada es lo único comparable entre
     * tres sitios de largos distintos. Y es lo que el visitante reconoce. */
    const png = await page.screenshot({ type: "png", fullPage: false });

    await sharp(png)
      .resize(OUTPUT.width, OUTPUT.height, { fit: "cover" })
      .webp({ quality: WEBP_QUALITY })
      .toFile(dest);

    const { size } = await stat(dest);
    results.push({ slug: caseStudy.slug, kb: Math.round(size / 1024) });
    console.log(
      `  ok     ${caseStudy.slug.padEnd(22)} ${String(Math.round(size / 1024)).padStart(4)}KB  ${caseStudy.url}`,
    );
  } catch (error) {
    failures += 1;
    console.error(`  FALLA  ${caseStudy.slug} — ${error.message.split("\n")[0]}`);
  } finally {
    await page.close();
  }
}

await context.close();
await browser.close();

/* El punto de todo esto es que las tres se parezcan.
 *
 * La dispersión de peso NO es por sí sola un problema: un hero fotográfico de
 * agua picada comprime mucho peor que uno de un atardecer con degradado suave,
 * y los dos pueden estar perfectos. Lo que el aviso pide es que MIRES la más
 * pesada — porque el mismo síntoma lo da un sitio capturado a medio cargar. */
if (results.length > 1) {
  const weights = results.map((r) => r.kb);
  const spread = Math.max(...weights) / Math.min(...weights);
  const heaviest = results.reduce((a, b) => (a.kb > b.kb ? a : b));
  console.log(
    `\nDispersión de peso: ${spread.toFixed(1)}x (${Math.min(...weights)}–${Math.max(...weights)}KB)`,
  );
  if (spread > 3) {
    console.log(
      `  Abrí public/cases/ y mirá ${heaviest.slug}: si es una foto a sangre,`,
    );
    console.log(
      "  está bien. Si se ve a medio cargar, corré el script de nuevo.",
    );
  }
}

console.log(
  failures === 0
    ? "\nListo.\n"
    : `\n${failures} captura(s) fallaron. Las demás se escribieron.\n`,
);

process.exit(failures === 0 ? 0 : 1);
