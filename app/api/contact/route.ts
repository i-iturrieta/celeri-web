import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/content/site";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: firstIssue?.message ?? "Datos inválidos." },
      { status: 400 },
    );
  }

  const { nombre, email, mensaje, _honeypot } = parsed.data;

  // Los bots suelen rellenar campos ocultos: fingimos éxito sin enviar nada.
  if (_honeypot) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY no está configurada.");
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar" },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    // TODO: usar un remitente en un dominio verificado en Resend antes de publicar.
    from: `${site.name} <onboarding@resend.dev>`,
    to: site.email,
    replyTo: email,
    subject: `Nuevo mensaje de ${nombre} desde ${site.name}`,
    text: `Nombre: ${nombre}\nEmail: ${email}\n\n${mensaje}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
