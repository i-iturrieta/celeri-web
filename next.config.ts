import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /**
     * Habilita el <ViewTransition> de React en las navegaciones del App Router.
     *
     * Se usa para dos cosas y nada más: un crossfade entre páginas, y el morph
     * de la captura al entrar a un caso (ver components/CaseCard.tsx y
     * app/casos/[slug]/page.tsx). Las reglas viven en app/globals.css.
     *
     * Es una flag experimental, pero el modo de falla es benigno: sin soporte
     * del navegador o con la flag apagada, la navegación funciona igual — solo
     * no anima. Nada del contenido depende de que la transición corra.
     */
    viewTransition: true,
  },
  /**
   * La tarjeta de compartir de cada caso lee la captura desde public/cases/
   * con sharp (lib/og.tsx). En Vercel esa ruta corre como función, y public/
   * no viaja dentro de las funciones: sin esto, las cuatro tarjetas daban 500
   * en producción aunque en local funcionaban. Las fuentes de assets/fonts sí
   * las detecta solo, porque el path está escrito en el código.
   */
  outputFileTracingIncludes: {
    "/casos/**": ["./public/cases/**/*"],
  },
};

export default nextConfig;
