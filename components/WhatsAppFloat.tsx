import { waLink } from "@/lib/whatsapp";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed right-7 bottom-7 z-50 flex h-14 w-[60px] items-center justify-center gap-[5px] rounded-tl-[28px] rounded-tr-[28px] rounded-br-[6px] rounded-bl-[28px] bg-accent-strong shadow-[0_14px_28px_-8px_oklch(0.22_0.03_60_/_0.4)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-ink-inverse" />
      <span className="h-1.5 w-1.5 rounded-full bg-ink-inverse" />
      <span className="h-1.5 w-1.5 rounded-full bg-ink-inverse" />
    </a>
  );
}
