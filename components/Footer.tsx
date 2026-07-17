import { Mail, MessageCircle, Camera } from "lucide-react";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-black/[.02]">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 text-sm text-black/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-base font-semibold text-brand">
            {site.name}
          </p>
          <p>{site.region}</p>
        </div>

        <div className="flex flex-wrap gap-5">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 hover:text-brand"
          >
            <Mail className="h-4 w-4" />
            {site.email}
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-brand"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-brand"
          >
            <Camera className="h-4 w-4" />
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
