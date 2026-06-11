import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schema/contact";
import { FORM_SERVICE_OPTIONS } from "@/lib/services";
import { SITE } from "@/lib/site";

/* ============================================================
   POST /api/contact
   - validare Zod (aceeași schemă ca în client)
   - honeypot plin → {ok:true} silențios (botul nu află nimic)
   - rate limit naiv în memorie: 5 cereri / 10 min / IP
   - cu RESEND_API_KEY → trimite email (replyTo = clientul);
     fără → console.log + {ok:true, delivered:false} — UI-ul
     arată succes oricum (cererea nu se pierde: e în loguri).
   ============================================================ */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  /* honeypot: răspuns „de succes" fără nicio acțiune */
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "local")
    .split(",")[0]
    .trim();
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Prea multe cereri. Te rugăm să ne suni direct." },
      { status: 429 },
    );
  }

  const data = parsed.data;
  const serviceLabel =
    FORM_SERVICE_OPTIONS.find((o) => o.value === data.service)?.label ??
    data.service;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[contact] Cerere nouă (RESEND_API_KEY lipsește — doar log):", {
      ...data,
      service: serviceLabel,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO_EMAIL ?? SITE.email;

    const lines = [
      `Nume: ${data.name}`,
      `Telefon: ${data.phone}`,
      data.email ? `Email: ${data.email}` : null,
      data.car ? `Mașină: ${data.car}` : null,
      data.plate ? `Nr. înmatriculare: ${data.plate}` : null,
      `Serviciu: ${serviceLabel}`,
      data.message ? `\nMesaj:\n${data.message}` : null,
    ].filter(Boolean);

    await resend.emails.send({
      // TODO(client): după verificarea domeniului în Resend,
      // schimbă în "VP Service Auto <contact@vpserviceauto.ro>"
      from: "VP Service Auto <onboarding@resend.dev>",
      to: [to],
      replyTo: data.email || undefined,
      subject: `Cerere programare: ${serviceLabel} — ${data.name}`,
      text: lines.join("\n"),
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Eroare Resend:", err);
    return NextResponse.json(
      { ok: false, error: "Nu am putut trimite cererea. Te rugăm să ne suni." },
      { status: 502 },
    );
  }
}
