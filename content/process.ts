export type ProcessStep = {
  title: string;
  description: string;
};

/**
 * Cómo se trabaja, en cuatro pasos.
 *
 * Quien entra al home y no conoce el rubro necesita saber en qué se está
 * metiendo antes de escribir. Con Sobre mí fuera del sitio, este bloque es el
 * único lugar donde se explica cómo es trabajar conmigo.
 */
export const process: ProcessStep[] = [
  {
    title: "Conversamos",
    description:
      "Quince minutos, sin costo. Me cuentas cómo funciona tu negocio y qué te está costando hoy. Si creo que no necesitas un sitio web, te lo digo.",
  },
  {
    title: "Te propongo algo concreto",
    description:
      "Nada de un genérico “depende”. Te digo qué haría, en cuánto tiempo y por cuánto, para que decidas con la información sobre la mesa.",
  },
  {
    title: "Diseño y construyo",
    description:
      "Vas viendo avances reales, no maquetas. Corregimos sobre la marcha, cuando cambiar algo todavía es barato.",
  },
  {
    title: "Publicamos y te lo entrego",
    description:
      "El sitio queda en línea, con el dominio a tu nombre y con lo que necesites para administrarlo. El primer mes de ajustes va incluido.",
  },
];
