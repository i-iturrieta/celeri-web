/**
 * Íconos del sitio.
 *
 * La marca comprimida a su mínimo: la "c" del wordmark en Sora 700, blanca, y
 * el punto ámbar que la sigue, sobre tinta. Es la misma letra y el mismo punto
 * que el `Wordmark` del header — no un símbolo aparte.
 *
 * Son archivos estáticos y no `app/icon.tsx` a propósito. Los íconos generados
 * con `ImageResponse` salían del render de satori, que no hace hinting ni
 * conoce el tamaño final: a 16px la "c" quedaba borrosa y el punto se
 * fundía con ella. Acá cada tamaño pequeño se compone aparte (punto más grande,
 * un poco más de aire) en vez de achicar el grande, y se puede mirar antes de
 * subirlo.
 *
 * Los colores son copias en hex de los tokens de app/globals.css, igual que en
 * lib/og.tsx. Si cambia la paleta, se mueven los dos juntos.
 *
 * Uso: npm run icons
 *      npm run icons -- --sheet=/ruta/hoja.png   (además, una hoja de contacto
 *                                                 para revisar a ojo; no se
 *                                                 commitea)
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FONT = path.join(ROOT, "assets/fonts/sora-latin-700-normal.woff");

const INK = "#0a0a0c";
const WHITE = "#ffffff";
const AMBER = "#ffb020";

/* El mismo tracking que `tracking-tight` en el wordmark del header. */
const TRACKING_EM = -0.025;

const sheetArg = process.argv.find((a) => a.startsWith("--sheet="));
const SHEET = sheetArg ? sheetArg.slice("--sheet=".length) : null;

const fontB64 = (await readFile(FONT)).toString("base64");
const FONT_FACE = `@font-face{font-family:"Sora";font-weight:700;src:url(data:font/woff;base64,${fontB64}) format("woff")}`;

const browser = await chromium.launch();
const page = await browser.newPage();

/** Carga el HTML y espera a que Sora esté de verdad lista antes de capturar. */
async function load(html, width, height) {
  await page.setViewportSize({ width, height });
  await page.setContent(
    `<!doctype html><meta charset="utf-8"><style>${FONT_FACE}html,body{margin:0;background:transparent}*{box-sizing:border-box}</style>${html}`,
  );
  await page.evaluate(() => document.fonts.load('700 100px "Sora"'));
  await page.evaluate(() => document.fonts.ready);
}

/**
 * Mide la tinta real de la "c" y del punto, no la caja de texto. Centrar la
 * caja de texto deja el par corrido: la caja incluye aire de línea arriba y
 * abajo y el tracking negativo del final, y la "c" es una letra de altura de
 * x, sin ascendente.
 *
 * Se renderiza a 1000px con la "c" blanca y el punto ámbar, y se separan por
 * color (el blanco tiene azul alto, el ámbar no). Las medidas quedan en
 * milésimas de em, así que escalan a cualquier tamaño.
 */
async function measure() {
  const W = 1600;
  const H = 1400;
  const OX = 200;
  const OY = 100;
  await load(
    `<div style="position:absolute;left:${OX}px;top:${OY}px;font:700 1000px/1 Sora;letter-spacing:${TRACKING_EM}em;color:${WHITE};white-space:nowrap">c<span style="color:${AMBER}">.</span></div>`,
    W,
    H,
  );
  const png = await page.screenshot({ omitBackground: true });
  const { data, info } = await sharp(png)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const box = (test) => {
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -1;
    let y1 = -1;
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const i = (y * info.width + x) * 4;
        if (data[i + 3] > 128 && test(data[i], data[i + 1], data[i + 2])) {
          if (x < x0) x0 = x;
          if (y < y0) y0 = y;
          if (x > x1) x1 = x;
          if (y > y1) y1 = y;
        }
      }
    }
    /* Medidas relativas al origen del texto. x1/y1 son exclusivos. */
    return { x0: x0 - OX, y0: y0 - OY, x1: x1 + 1 - OX, y1: y1 + 1 - OY };
  };

  /* Blanco: azul alto. Ámbar: azul bajo. */
  return { c: box((_r, _g, b) => b > 160), dot: box((_r, _g, b) => b < 100) };
}

const M = await measure();
const cw = M.c.x1 - M.c.x0;
const ch = M.c.y1 - M.c.y0;
const dotW = M.dot.x1 - M.dot.x0;
const naturalGap = M.dot.x0 - M.c.x1;
/* Cuánto más abajo que la "c" termina el punto (la "c" rebasa la línea base). */
const dotDrop = M.dot.y1 - M.c.y1;

/**
 * Compone la marca en un cuadrado de `side` px (de render) y devuelve el HTML.
 *
 * `cap`    alto de la tinta de la "c" como fracción del lado.
 * `width`  tope del ancho de todo el par como fracción del lado. Manda sobre
 *          `cap` cuando el par no entra: el punto agrandado de los tamaños
 *          chicos lo ensancha, y en el maskable el tope es la zona segura.
 * `dot`    multiplicador del punto. 1 = el natural de Sora.
 * `gap`    multiplicador del aire entre la "c" y el punto.
 * `radius` esquina como fracción del lado (0 = sangrado completo).
 */
function markHTML({ side, cap, width = 0.72, dot = 1, gap = 1, radius = 0 }) {
  const dotD = dotW * dot; /* en milésimas de em; el punto es un círculo */
  const gapU = naturalGap * gap;
  const totalW = cw + gapU + dotD;
  const k = Math.min((cap * side) / ch, (width * side) / totalW);

  const left = (side - totalW * k) / 2;
  const top = (side - ch * k) / 2;

  /* La "c" se posiciona por su tinta: se resta el desfase medido. */
  const cLeft = left - M.c.x0 * k;
  const cTop = top - M.c.y0 * k;

  /* El punto crece hacia arriba: queda apoyado donde estaba. */
  const dotBottom = top + (ch + dotDrop) * k;
  const dotLeft = left + (cw + gapU) * k;
  const d = dotD * k;

  return `<div style="position:relative;width:${side}px;height:${side}px;background:${INK};border-radius:${radius * side}px;overflow:hidden">
    <div style="position:absolute;left:${cLeft}px;top:${cTop}px;font:700 ${1000 * k}px/1 Sora;color:${WHITE};white-space:nowrap">c</div>
    <div style="position:absolute;left:${dotLeft}px;top:${dotBottom - d}px;width:${d}px;height:${d}px;border-radius:50%;background:${AMBER}"></div>
  </div>`;
}

/**
 * Renderiza una variante a `size` px. Se compone en grande (SS veces) y se
 * baja con lanczos: el antialiasing del navegador a 16px reales dibuja la "c"
 * con grises sucios; a 8x y reducida queda limpia.
 */
async function render(size, params, { alpha }) {
  const SS = size <= 64 ? 8 : 4;
  const side = size * SS;
  await load(markHTML({ side, ...params }), side, side);
  const png = await page.screenshot({ omitBackground: alpha });
  let img = sharp(png).resize(size, size, { kernel: "lanczos3" });
  if (!alpha) img = img.flatten({ background: INK });
  return img.png({ compressionLevel: 9 }).toBuffer();
}

/*
 * Las recetas. Los tamaños chicos no son el grande reducido: a 16px el punto
 * natural mide ~2px y se pierde, así que sube (3px+) y la "c" le deja un poco
 * más de aire. Ver `npm run icons -- --sheet=...` para revisar el resultado.
 */
const RADIUS = 0.22;
const RECIPES = {
  16: { cap: 0.64, width: 0.78, dot: 1.7, gap: 1.5, radius: RADIUS },
  32: { cap: 0.62, width: 0.76, dot: 1.3, gap: 1.2, radius: RADIUS },
  48: { cap: 0.62, width: 0.74, dot: 1.1, gap: 1.1, radius: RADIUS },
  192: { cap: 0.62, radius: RADIUS },
  512: { cap: 0.62, radius: RADIUS },
};
/* iOS aplica su propia máscara redondeada: va a sangre, sin transparencia. */
const APPLE = { cap: 0.6, width: 0.7 };
/* La zona segura de un maskable es el 60% central; el par entero entra ahí. */
const MASKABLE = { cap: 1, width: 0.54 };

const out = async (rel, buf) => {
  const dest = path.join(ROOT, rel);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  console.log(`  ${rel.padEnd(30)} ${buf.length} B`);
};

/** ICO con entradas PNG (válido desde Vista): cabecera + directorio + datos. */
function buildIco(entries) {
  const head = Buffer.alloc(6);
  head.writeUInt16LE(0, 0); /* reservado */
  head.writeUInt16LE(1, 2); /* tipo: ícono */
  head.writeUInt16LE(entries.length, 4);

  let offset = 6 + 16 * entries.length;
  const dir = [];
  for (const { size, png } of entries) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); /* sin paleta */
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4); /* planos */
    e.writeUInt16LE(32, 6); /* bits por píxel */
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    dir.push(e);
  }
  return Buffer.concat([head, ...dir, ...entries.map((e) => e.png)]);
}

console.log("\nGenerando íconos\n");

const png = {};
for (const size of [16, 32, 48, 192, 512])
  png[size] = await render(size, RECIPES[size], { alpha: true });
const apple = await render(180, APPLE, { alpha: false });
const maskable = await render(512, MASKABLE, { alpha: false });

await out("app/favicon.ico", buildIco([16, 32, 48].map((s) => ({ size: s, png: png[s] }))));
/* Dos PNG numerados en vez de uno de 512: Next emite un <link> por archivo con
 * su `sizes`, y el navegador elige. El de 32 es el compuesto para tamaño chico. */
await out("app/icon1.png", png[32]);
await out("app/icon2.png", png[192]);
await out("app/apple-icon.png", apple);
await out("public/icons/icon-192.png", png[192]);
await out("public/icons/icon-512.png", png[512]);
await out("public/icons/maskable-512.png", maskable);

/* Los que reemplazan los generados con ImageResponse. */
for (const old of ["app/icon.tsx", "app/apple-icon.tsx", "app/icon.png"])
  await rm(path.join(ROOT, old), { force: true });

if (SHEET) {
  /* Hoja de contacto: cada tamaño a 1x y 8x, sobre barra de pestañas clara y
   * oscura, más el apple y el maskable. Para mirar, no para commitear. */
  const uri = (b) => `data:image/png;base64,${b.toString("base64")}`;
  const row = (bg, label) => `
    <div style="background:${bg};padding:24px;display:flex;gap:48px;align-items:flex-end;margin-bottom:12px">
      <span style="font:12px monospace;color:#888;width:60px">${label}</span>
      ${[16, 32, 48]
        .map(
          (s) => `<div style="text-align:center;font:11px monospace;color:#888">
            <img src="${uri(png[s])}" width="${s}" height="${s}"><br>${s} @1x</div>`,
        )
        .join("")}
      ${[16, 32, 48]
        .map(
          (s) => `<div style="text-align:center;font:11px monospace;color:#888">
            <img src="${uri(png[s])}" width="${s * 8}" height="${s * 8}" style="image-rendering:pixelated"><br>${s} @8x</div>`,
        )
        .join("")}
    </div>`;
  const html = `<div style="width:1700px;background:#fff;padding:12px">
    ${row("#f1f3f4", "claro")}${row("#202124", "oscuro")}
    <div style="display:flex;gap:40px;padding:24px;background:#ddd;font:11px monospace;color:#444;align-items:flex-end">
      <div><img src="${uri(apple)}" width="180"><br>apple 180</div>
      <div><img src="${uri(maskable)}" width="256"><br>maskable (cuadrado)</div>
      <div><div style="width:256px;height:256px;border-radius:50%;overflow:hidden"><img src="${uri(maskable)}" width="256"></div>maskable (círculo)</div>
      <div><img src="${uri(png[192])}" width="192"><br>icon-192</div>
      <div><img src="${uri(png[512])}" width="256"><br>icon-512</div>
    </div></div>`;
  await load(html, 1724, 1100);
  await page.screenshot({ path: SHEET, fullPage: true });
  console.log(`\n  hoja de contacto → ${SHEET}`);
}

await browser.close();
console.log("\nListo.\n");
