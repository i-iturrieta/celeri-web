import { z } from "zod";

export const contactSchema = z.object({
  nombre: z.string().min(2, "Cuéntame tu nombre.").max(80),
  email: z.email("Ingresa un correo válido."),
  mensaje: z
    .string()
    .min(10, "Cuéntame un poco más (mínimo 10 caracteres).")
    .max(2000),
  _honeypot: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
