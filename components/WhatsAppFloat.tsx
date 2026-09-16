import { waLink } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/**
 * Acceso flotante a WhatsApp, solo en móvil.
 *
 * En desktop el header ya tiene un botón de WhatsApp siempre visible, así que el
 * flotante solo tapaba contenido y sumaba un cuarto CTA idéntico a los otros
 * tres. En móvil, en cambio, el header se colapsa tras el menú y el botón sí
 * gana algo.
 *
 * Va en verde WhatsApp y no en un color del sistema a propósito: es el único
 * elemento del sitio cuyo trabajo es que lo reconozcan de reojo, y para eso el
 * color de la app dice más que cualquier token nuestro.
 */
export default function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      /* `vt-float` no pinta nada: le da un view-transition-name propio para
         que el botón no se desvanezca en cada navegación junto con el resto de
         la página. Ver "Transiciones de vista" en globals.css. */
      className="vt-float focus-ring transition-brand fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-10px_oklch(0.175_0.034_216_/_0.55)] hover:brightness-95 md:hidden"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
