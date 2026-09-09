/**
 * Smoke test: levanta el build de producción y comprueba que cada ruta
 * responde lo que debe.
 *
 * No reemplaza a un test de verdad: solo atrapa el fallo más caro y más fácil
 * de no notar, que es publicar con una ruta rota. Requiere `npm run build`
 * antes. Uso: `npm run smoke`.
 */
import { spawn, spawnSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = process.env.SMOKE_PORT ?? "3123";
const BASE = `http://127.0.0.1:${PORT}`;

/** [ruta, status esperado] */
const CHECKS = [
  ["/", 200],
  ["/servicios", 200],
  ["/casos", 200],
  ["/casos/mirador-propiedades", 200],
  ["/casos/waiki-chile", 200],
  ["/casos/boat-market", 200],
  ["/sobre-mi", 200],
  ["/contacto", 200],
  ["/sitemap.xml", 200],
  ["/robots.txt", 200],
  ["/opengraph-image", 200],
  // El 404 personalizado tiene que responder 404 de verdad, no 200 con cara de
  // error: si responde 200, Google indexa páginas inexistentes.
  ["/esta-ruta-no-existe", 404],
];

/** Cadenas que deben aparecer en el HTML de una ruta. */
const CONTENT_CHECKS = [
  ["/", "application/ld+json"],
  ["/servicios", "FAQPage"],
  ["/", "Saltar al contenido"],
];

const isWindows = process.platform === "win32";

// stdout va a "ignore", no a "pipe": un pipe que nadie lee se llena y deja a
// next start bloqueado escribiendo, con el test esperando para siempre.
const server = spawn(
  isWindows ? "npx.cmd" : "npx",
  ["next", "start", "--port", PORT],
  { stdio: "ignore", shell: isWindows, detached: !isWindows },
);

/** En Windows, kill() no se lleva a los hijos del shell; hay que matar el árbol. */
function stopServer() {
  if (server.exitCode !== null || server.signalCode !== null) return;
  if (isWindows) {
    try {
      spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], {
        stdio: "ignore",
      });
    } catch {
      server.kill();
    }
  } else {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {
      server.kill();
    }
  }
}

let failures = 0;
const fail = (msg) => {
  failures += 1;
  console.error(`  FALLA  ${msg}`);
};

async function waitForServer() {
  for (let i = 0; i < 60; i += 1) {
    try {
      await fetch(BASE, { signal: AbortSignal.timeout(1000) });
      return true;
    } catch {
      await sleep(500);
    }
  }
  return false;
}

try {
  if (!(await waitForServer())) {
    console.error("El servidor no respondió en 30s. ¿Corriste `npm run build`?");
    process.exit(1);
  }

  console.log(`\nSmoke test contra ${BASE}\n`);

  for (const [path, expected] of CHECKS) {
    const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
    if (res.status === expected) {
      console.log(`  ok     ${path} → ${res.status}`);
    } else {
      fail(`${path} → ${res.status}, se esperaba ${expected}`);
    }
  }

  for (const [path, needle] of CONTENT_CHECKS) {
    const html = await fetch(`${BASE}${path}`).then((r) => r.text());
    if (html.includes(needle)) {
      console.log(`  ok     ${path} contiene "${needle}"`);
    } else {
      fail(`${path} no contiene "${needle}"`);
    }
  }

  console.log(
    failures === 0
      ? "\nTodo en orden.\n"
      : `\n${failures} comprobación(es) fallaron.\n`,
  );
} finally {
  stopServer();
}

process.exit(failures === 0 ? 0 : 1);
