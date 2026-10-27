import type { MetadataRoute } from "next";

/**
 * `display: "browser"` y no `standalone`: esto es un sitio de presentación, no
 * una app. Con `standalone`, quien lo agregara a su pantalla de inicio lo
 * abriría sin barra de direcciones ni botón de volver, y una página de
 * servicios que se comparte por WhatsApp tiene que poder abrirse y cerrarse
 * como cualquier enlace. El manifest está para que los íconos y el color
 * sean los correctos, no para instalar nada.
 *
 * Los colores son hex copiados de los tokens de app/globals.css (tinta).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Celeri — Diseño y desarrollo web",
    short_name: "celeri",
    start_url: "/",
    display: "browser",
    background_color: "#0a0a0c",
    theme_color: "#0a0a0c",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
