"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/schema/contact";
import { FORM_SERVICE_OPTIONS } from "@/lib/services";
import { SITE } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full rounded-lg border border-coal-600 bg-coal-900 px-4 py-3 text-[15px] text-paper placeholder:text-steel-400 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/40";
const labelCls = "mb-1.5 block text-sm font-semibold text-steel-200";
const errCls = "mt-1.5 block text-[13px] font-medium text-red-bright";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: "constatare-daune", website: "" },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("loading");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string }
        | null;
      if (res.ok && json?.ok) {
        setStatus("success");
      } else {
        setServerError(json?.error ?? null);
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="led-frame flex flex-col items-start gap-4 p-8"
        data-testid="contact-success"
        role="status"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red text-white">
          <Icon name="check" size={24} />
        </span>
        <h3>Cerere trimisă!</h3>
        <p className="text-steel-300">
          Te sunăm în cel mai scurt timp ca să confirmăm programarea. Dacă e
          urgent, ne găsești direct la{" "}
          <a href={SITE.phoneHref} className="font-bold text-red-bright">
            {SITE.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
      data-testid="contact-form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Nume *
          </label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            placeholder="Numele tău"
            className={inputCls}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <span role="alert" className={errCls}>
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelCls}>
            Telefon *
          </label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            placeholder="07XX XXX XXX"
            className={inputCls}
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <span role="alert" className={errCls}>
              {errors.phone.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Email <span className="font-normal text-steel-400">(opțional)</span>
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            placeholder="nume@exemplu.ro"
            className={inputCls}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <span role="alert" className={errCls}>
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="cf-service" className={labelCls}>
            Serviciu *
          </label>
          <select
            id="cf-service"
            className={inputCls}
            aria-invalid={!!errors.service}
            {...register("service")}
          >
            {FORM_SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <span role="alert" className={errCls}>
              {errors.service.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-car" className={labelCls}>
            Marcă și model{" "}
            <span className="font-normal text-steel-400">(opțional)</span>
          </label>
          <input
            id="cf-car"
            type="text"
            placeholder="ex. VW Golf 7"
            className={inputCls}
            {...register("car")}
          />
        </div>
        <div>
          <label htmlFor="cf-plate" className={labelCls}>
            Nr. înmatriculare{" "}
            <span className="font-normal text-steel-400">(opțional)</span>
          </label>
          <input
            id="cf-plate"
            type="text"
            placeholder="ex. B 123 ABC"
            className={inputCls}
            {...register("plate")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>
          Mesaj <span className="font-normal text-steel-400">(opțional)</span>
        </label>
        <textarea
          id="cf-message"
          rows={4}
          placeholder="Spune-ne pe scurt ce s-a întâmplat sau ce are nevoie mașina…"
          className={inputCls}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <span role="alert" className={errCls}>
            {errors.message.message}
          </span>
        )}
      </div>

      {/* honeypot — invizibil pentru oameni */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-steel-300">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-red"
            aria-invalid={!!errors.gdpr}
            {...register("gdpr")}
          />
          <span>
            Sunt de acord ca datele mele să fie folosite pentru a fi
            contactat, conform{" "}
            <Link
              href="/politica-de-confidentialitate"
              className="text-red-bright underline underline-offset-2"
            >
              politicii de confidențialitate
            </Link>
            . *
          </span>
        </label>
        {errors.gdpr && (
          <span role="alert" className={errCls}>
            {errors.gdpr.message}
          </span>
        )}
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red/50 bg-red/10 px-4 py-3 text-sm text-red-bright"
        >
          {serverError ??
            "Ceva n-a mers. Încearcă din nou sau sună-ne direct la "}{" "}
          {!serverError && (
            <a href={SITE.phoneHref} className="font-bold underline">
              {SITE.phoneDisplay}
            </a>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Se trimite…" : "Trimite cererea"}
        {status !== "loading" && <Icon name="arrow-right" size={17} />}
      </button>
    </form>
  );
}
