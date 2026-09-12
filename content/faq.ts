export type FaqItem = {
  question: string;
  /** Texto plano: se reutiliza tal cual en el JSON-LD de FAQPage. */
  answer: string;
};

/**
 * BORRADOR — revisar antes de dar por buenas las respuestas.
 *
 * Los plazos, las formas de pago y la política de cambios de abajo son un punto
 * de partida razonable, no un compromiso verificado. Cualquiera de estas
 * respuestas es una promesa pública una vez publicada, y además entra al
 * JSON-LD de FAQPage, así que Google puede mostrarla textual en los resultados.
 * Ajusta los números a cómo trabajas de verdad.
 */
export const faq: FaqItem[] = [
  {
    question: "¿Cuánto demora tener mi sitio listo?",
    answer:
      "Una landing page o un hub de redes toma entre una y dos semanas. Una web informativa con catálogo, entre dos y cuatro. Lo que más mueve el plazo no es el desarrollo: es cuánto demoras tú en pasarme los textos y las fotos. Si llegas con el material listo, los plazos se acortan.",
  },
  {
    question: "¿Quién paga el dominio y el hosting?",
    answer:
      "El dominio lo pagas tú y queda a tu nombre, no al mío — es tuyo aunque algún día trabajes con otra persona. Cuesta alrededor de 10.000 pesos al año en NIC Chile. El hosting de los sitios que hago no tiene costo mensual en la mayoría de los casos, porque uso infraestructura con plan gratuito que alcanza de sobra para el tráfico de una PyME.",
  },
  {
    question: "¿Puedo editar el sitio yo mismo después?",
    answer:
      "Depende de qué quieras editar y lo conversamos antes de empezar, no después. Si necesitas cambiar textos, fotos o productos con frecuencia, te dejo un panel de administración para hacerlo sin tocar código ni depender de mí. Si el sitio es estable y solo cambia una o dos veces al año, no vale la pena pagar por ese panel: me escribes y lo cambio yo.",
  },
  {
    question: "¿Qué pasa si necesito cambios dentro de unos meses?",
    answer:
      "El primer mes después de publicar, los ajustes van incluidos: es normal que aparezcan cosas cuando el sitio ya está en la calle. Después de eso, los cambios se cobran por separado y te paso el valor antes de hacer nada. No hay contrato de permanencia ni una mensualidad que se te siga cobrando por un sitio que ya está hecho.",
  },
  {
    question: "¿Cómo son los pagos?",
    answer:
      "La mitad al empezar y la mitad cuando el sitio queda publicado. Transferencia bancaria, con boleta. No pido el total por adelantado ni te entrego el sitio a medias.",
  },
  {
    question: "¿Qué necesito tener listo para empezar?",
    answer:
      "Menos de lo que crees: tu logo si tienes uno, fotos de tu negocio o tus productos, y media hora de conversación para contarme cómo funciona lo tuyo. Los textos los podemos escribir juntos — de hecho es mejor, porque escribir la página suele ordenar cómo explicas tu negocio.",
  },
  {
    question: "¿Trabajas con negocios de cualquier lugar?",
    answer:
      "Sí. Todo el proceso, desde la primera conversación hasta la entrega, funciona a distancia, así que dónde esté tu negocio no cambia nada.",
  },
];
