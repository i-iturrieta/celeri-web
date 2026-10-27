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
};

export default nextConfig;
