import { z } from "zod";
import { FORM_SERVICE_OPTIONS } from "@/lib/services";

/* Schema partajată client (RHF) + server (API route) —
   mesajele de eroare sunt cele afișate inline, în română. */

const SERVICE_VALUES = FORM_SERVICE_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Te rugăm să ne spui cum te cheamă."),
  phone: z
    .string()
    .trim()
    .regex(
      /^(\+?4?0)[0-9\s.\-()]{8,12}$/,
      "Număr de telefon invalid — folosește formatul 07XX XXX XXX.",
    ),
  email: z
    .union([z.literal(""), z.email("Adresa de email nu pare corectă.")])
    .optional(),
  car: z.string().trim().max(80, "Maxim 80 de caractere.").optional(),
  plate: z.string().trim().max(16, "Maxim 16 caractere.").optional(),
  service: z.enum(SERVICE_VALUES, {
    error: "Alege serviciul de care ai nevoie.",
  }),
  message: z
    .string()
    .trim()
    .max(2000, "Mesajul e prea lung (maxim 2000 de caractere).")
    .optional(),
  gdpr: z.boolean().refine((v) => v === true, {
    message: "Pentru a trimite cererea, e nevoie de acordul tău.",
  }),
  /** honeypot — rămâne gol la oameni; boții îl completează */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
