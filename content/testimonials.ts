export type Testimonial = {
  quote: string;
  author: string;
  /** Cargo y negocio: "Socia, Mirador Propiedades". */
  role: string;
  /** Caso relacionado, si existe, para enlazar la prueba con el trabajo. */
  caseSlug?: string;
};

/**
 * Testimonios de clientes reales.
 *
 * Está vacío a propósito. El componente <Testimonials /> ya está montado en el
 * home y en /casos, y no renderiza nada mientras esta lista esté vacía — así
 * que para publicar el testimonio de Alejandra basta con agregar el objeto
 * aquí, sin tocar una línea de JSX.
 *
 * No inventes uno de relleno: un testimonio falso es peor que ninguno.
 */
export const testimonials: Testimonial[] = [];
