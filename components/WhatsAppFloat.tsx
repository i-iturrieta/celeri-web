import { waLink } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/**
 * Acceso flotante a WhatsApp, solo en móvil.
 *
 * En desktop el header ya tiene un botón de WhatsApp siempre visible, así que el
 * flotante solo tapaba contenido y sumaba un cuarto CTA idéntico a los otros
 * tres. En móvil, en cambio, el header se colapsa tras el menú y el botón sí
 * gana algo.
 */
export default function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="focus-ring transition-brand fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_28px_-8px_oklch(0.22_0.03_60_/_0.45)] hover:scale-105 md:hidden"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
