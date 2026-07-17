export type Service = {
  slug: string;
  title: string;
  teaser: string; // frase corta para las tarjetas numeradas de Inicio
  problem: string;
  outcome: string;
  icon: string;
};

export const services: Service[] = [
  {
    slug: "landing-page",
    title: "Landing page",
    teaser: "Una página enfocada en un solo objetivo: que el visitante te escriba.",
    problem:
      "Publicas en Instagram, pero cuando alguien quiere saber más de tu negocio no tiene dónde mirar ni por qué confiar.",
    outcome:
      "Una página que en 10 segundos explica qué haces y para quién, genera confianza y lleva directo a WhatsApp.",
    icon: "Rocket",
  },
  {
    slug: "hub-de-redes",
    title: "Hub de redes",
    teaser: "Un solo link para todas tus redes, con tu marca — no la de una app gratuita.",
    problem:
      "Tu Instagram, WhatsApp, Facebook y catálogo están repartidos en links distintos que nadie recuerda ni comparte bien.",
    outcome:
      "Un solo link profesional que reúne todo tu negocio en un lugar, fácil de poner en la bio y de compartir.",
    icon: "Link",
  },
  {
    slug: "agendador",
    title: "Agendador de horas",
    teaser: "Que tus clientes reserven solos, sin que estés respondiendo uno por uno.",
    problem:
      "Coordinas cada cita por WhatsApp uno a uno, y entre la ida y vuelta se enfrían los clientes o se te cruzan los horarios.",
    outcome:
      "Tus clientes reservan solos desde el celular, tu agenda queda ordenada y tú dejas de perseguir horarios.",
    icon: "CalendarCheck",
  },
  {
    slug: "web-informativa",
    title: "Web informativa",
    teaser: "Un catálogo claro con todo lo que vendes, listo para compartir.",
    problem:
      "No tienes dónde mostrar todos tus productos o servicios con el detalle, fotos y precios que la gente pide antes de comprar.",
    outcome:
      "Un catálogo claro y fácil de navegar que responde las preguntas típicas antes de que las hagan.",
    icon: "Store",
  },
  {
    slug: "seo-local",
    title: "Posicionamiento local",
    teaser: "Que te encuentren en Google cuando buscan tu rubro en tu ciudad.",
    problem:
      "Cuando alguien busca tu rubro en tu ciudad, tu negocio no aparece en Google y se lo lleva la competencia.",
    outcome:
      "Apareces en las búsquedas de tu zona y llegan clientes nuevos sin pagar publicidad todos los meses.",
    icon: "Search",
  },
];
