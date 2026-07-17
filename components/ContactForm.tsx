"use client";

import { useState, type FormEvent } from "react";
import { contactSchema } from "@/lib/contact-schema";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const parsed = contactSchema.safeParse({
      nombre: formData.get("nombre"),
      email: formData.get("email"),
      mensaje: formData.get("mensaje"),
      _honeypot: formData.get("_honeypot"),
    });

    if (!parsed.success) {
      setStatus("error");
      setErrorMessage(
        parsed.error.issues[0]?.message ?? "Revisa los datos del formulario.",
      );
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json()) as {
        ok: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        setStatus("error");
        setErrorMessage(result.error ?? "No se pudo enviar. Intenta de nuevo.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("No se pudo enviar. Intenta de nuevo.");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-xl bg-brand/10 p-4 text-center text-sm font-medium text-brand">
        ¡Listo! Recibí tu mensaje y te voy a responder pronto.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-black">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-black">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-black">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          required
          className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
      </div>

      {/* Honeypot anti-spam: oculto para personas, visible para bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_honeypot">No completar este campo</label>
        <input
          id="_honeypot"
          name="_honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && errorMessage && (
        <p role="alert" className="text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
