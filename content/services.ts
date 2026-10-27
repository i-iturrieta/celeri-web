export type Service = {
  slug: string;
  title: string;
  teaser: string; // frase corta para las tarjetas numeradas de Inicio
  problem: string;
  outcome: string;
  icon: string;
};

// El hub de redes salió como servicio suelto (octubre 2026) porque competía con
// Linktree y bajaba el precio percibido de todo lo demás; ahora va incluido en
// el plan Landing.
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
    teaser: "Que Google entienda qué haces y dónde, para mostrarte cuando buscan tu rubro.",
    problem:
      "Cuando alguien busca tu rubro en tu ciudad, tu negocio no aparece en Google y se lo lleva la competencia.",
    outcome:
      "Dejo tu ficha de Google, tu sitio y tus datos alineados para que Google te tome en serio en tu zona. No prometo el primer lugar: nadie honesto puede. Sí te digo qué hice y qué cambió.",
    icon: "Search",
  },
];
