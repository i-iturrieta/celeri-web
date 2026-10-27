/**
 * Navaja: el proyecto propio, gratis, que se muestra aparte de los casos.
 *
 * No es un caso ni una demo: no hubo cliente y no es una vitrina de rubros. Por
 * eso no vive en `cases.ts` — mezclado con los clientes, "gratis" y "sin cuenta"
 * le restarían peso al trabajo pagado. Se muestra en su propia sección, y la
 * imagen la regenera `npm run shots -- navaja` (ver scripts/shots.mjs).
 *
 * El repo es privado: nunca se le llama "código abierto".
 */
export const navaja = {
  slug: "navaja",
  name: "Navaja",
  url: "https://navaja.celeri.cl",
  image: "/proyectos/navaja.webp",
  imageAlt:
    "Portada de Navaja: el buscador y el listado de herramientas, con PDF, sueldo líquido y RUT a la vista.",
  eyebrow: "Proyecto propio · gratis",
  title: "Navaja: las herramientas que hoy buscas en doscientos sitios, en uno",
  lead: "La construí para mí: estaba cansado de buscar un sitio distinto para unir un PDF o calcular un sueldo líquido, y de subir documentos con mi RUT a servidores que no conozco. Hoy son 220 herramientas en el navegador, sin cuenta y sin anuncios, y cualquiera puede usarlas.",
  points: [
    "La mayoría trabaja dentro de tu navegador: tus archivos no se suben a ningún lado.",
    "Pensada para Chile: RUT, UF, sueldo líquido, feriados y nota de 1 a 7.",
    "Un editor de PDF de verdad: corrige el texto que ya está, firma y reordena páginas.",
  ],
  closing:
    "Te la muestro porque dice cómo trabajo mejor que cualquier frase: es lo que construyo cuando nadie me lo encarga.",
  cta: "Abrir Navaja",
};
