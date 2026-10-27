/**
 * Tarjetas de compartir de los casos, como archivos estáticos.
 *
 * Primero fueron un `opengraph-image.tsx` por caso. En local andaban, pero en
 * Vercel esa ruta corría como función y respondía 500 en los cuatro casos, sin
 * logs a la vista: un link de caso pegado en WhatsApp salía sin imagen. Una
 * tarjeta que cambia solo cuando cambia el caso no necesita servidor, así que
 * se generan acá, se guardan en public/og/casos/ y Vercel las sirve como
 * cualquier imagen. app/casos/[slug]/page.tsx las enlaza en su metadata.
 *
 * El diseño sigue viviendo en lib/og.tsx (renderCaseOgImage); este script solo
 * lo ejecuta. jiti es lo que permite importar ese .tsx y el alias "@/" desde
 * Node sin pasar por Next.
 *
 * Cuándo correrlo: al agregar un caso, al cambiar su captura (`npm run shots`)
 * o sus etiquetas. Uso: npm run og:cases            (todos)
 *                       npm run og:cases -- waiki   (los slugs que lo contengan)
 */
import { createJiti } from "jiti";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "og", "casos");

/* lib/og.tsx lee las fuentes y las capturas con rutas relativas a cwd. */
process.chdir(ROOT);

const jiti = createJiti(import.meta.url, {
  jsx: { runtime: "automatic" },
  alias: { "@": ROOT },
});
const { cases } = await jiti.import(path.join(ROOT, "content/cases.ts"));
const { renderCaseOgImage } = await jiti.import(path.join(ROOT, "lib/og.tsx"));

const filter = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const targets = filter.length
  ? cases.filter((c) => filter.some((f) => c.slug.includes(f)))
  : cases;

await mkdir(OUT_DIR, { recursive: true });
for (const c of targets) {
  const res = await renderCaseOgImage(c);
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = path.join(OUT_DIR, `${c.slug}.png`);
  await writeFile(dest, buf);
  /* WhatsApp deja sin imagen las vistas previas pesadas (~300KB). */
  const kb = Math.round(buf.length / 1024);
  console.log(`${kb > 290 ? "PESADA" : "ok"}  ${path.relative(ROOT, dest)}  ${kb}KB`);
}
