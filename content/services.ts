export type Service = {
  slug: string;
  title: string;
  problem: string;
  outcome: string;
  icon: string;
};

export const services: Service[] = [
  {
    slug: "landing-page",
    title: "Landing page",
    problem:
      "Publicas en Instagram, pero cuando alguien quiere saber más de tu negocio no tiene dónde mirar ni por qué confiar.",
    outcome:
      "Una página que en 10 segundos explica qué haces y para quién, genera confianza y lleva directo a WhatsApp.",
    icon: "Rocket",
  },
  {
    slug: "hub-de-redes",
    title: "Hub de redes",
    problem:
      "Tu Instagram, WhatsApp, Facebook y catálogo están repartidos en links distintos que nadie recuerda ni comparte bien.",
    outcome:
      "Un solo link profesional que reúne todo tu negocio en un lugar, fácil de poner en la bio y de compartir.",
    icon: "Link",
  },
  {
    slug: "agendador",
    title: "Agendador de horas",
    problem:
      "Coordinas cada cita por WhatsApp uno a uno, y entre la ida y vuelta se enfrían los clientes o se te cruzan los horarios.",
    outcome:
      "Tus clientes reservan solos desde el celular, tu agenda queda ordenada y tú dejas de perseguir horarios.",
    icon: "CalendarCheck",
  },
  {
    slug: "web-informativa",
    title: "Web informativa",
    problem:
      "No tienes dónde mostrar todos tus productos o servicios con el detalle, fotos y precios que la gente pide antes de comprar.",
    outcome:
      "Un catálogo claro y fácil de navegar que responde las preguntas típicas antes de que las hagan.",
    icon: "Store",
  },
  {
    slug: "seo-local",
    title: "Posicionamiento local",
    problem:
      "Cuando alguien busca tu rubro en tu ciudad, tu negocio no aparece en Google y se lo lleva la competencia.",
    outcome:
      "Apareces en las búsquedas de tu zona y llegan clientes nuevos sin pagar publicidad todos los meses.",
    icon: "Search",
  },
];
