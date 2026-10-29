"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Arrow } from "./ui";

/**
 * Contact form.
 *
 * The form posts JSON to NEXT_PUBLIC_CONTACT_ENDPOINT (e.g. a Formspree,
 * Basin, HubSpot or custom serverless endpoint). Until that variable is set,
 * the form validates input but clearly states that nothing is sent — it never
 * shows a fake success message.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "";

const TYPES = [
  { value: "project", label: "Project" },
  { value: "careers", label: "Careers" },
  { value: "general", label: "General" },
] as const;

type Fields = { name: string; email: string; company: string; type: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "submitting" | "success" | "error" | "not-connected";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!f.email.trim()) e.email = "Please enter your work email.";
  else if (!emailOk(f.email.trim())) e.email = "Please enter a valid email address, e.g. name@company.com.";
  if (!f.type) e.type = "Please choose an inquiry type.";
  if (f.message.trim().length < 10) e.message = "Please add a short message (at least 10 characters).";
  return e;
}

export function ContactForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const uid = useId();
  const [fields, setFields] = useState<Fields>({ name: "", email: "", company: "", type: "project", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-select inquiry type from ?type=project|careers|general
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (t && TYPES.some((x) => x.value === t)) setFields((f) => ({ ...f, type: t }));
  }, []);

  const set = (k: keyof Fields, v: string) => {
    const next = { ...fields, [k]: v };
    setFields(next);
    if (touched[k]) setErrors(validate(next));
    if (status !== "idle" && status !== "submitting") setStatus("idle");
  };

  const blur = (k: keyof Fields) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(fields));
  };

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    if (fd.get("website")) return; // honeypot

    const errs = validate(fields);
    setErrors(errs);
    setTouched({ name: true, email: true, type: true, message: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    if (!ENDPOINT) {
      setStatus("not-connected");
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          company: fields.company.trim(),
          inquiryType: fields.type,
          message: fields.message.trim(),
          page: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setFields({ name: "", email: "", company: "", type: fields.type, message: "" });
      setTouched({});
    } catch {
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const dark = tone === "dark";
  const labelCls = `eyebrow ${dark ? "text-steel-light" : "text-steel-dark"}`;
  const inputBase = `mt-2 block w-full border-0 border-b bg-transparent px-0 py-3 text-[1.05rem] outline-none transition-colors duration-300 placeholder:opacity-40 focus-visible:outline-none ${
    dark ? "text-paper border-paper/30 focus:border-paper" : "text-graphite border-graphite/30 focus:border-graphite"
  }`;
  const errCls = "border-red focus:border-red";

  const field = (k: keyof Fields) => ({
    id: `${uid}-${k}`,
    name: k,
    value: fields[k],
    "aria-invalid": errors[k] && touched[k] ? true : undefined,
    "aria-describedby": errors[k] && touched[k] ? `${uid}-${k}-err` : undefined,
    onBlur: () => blur(k),
  });

  const Err = ({ k }: { k: keyof Fields }) =>
    errors[k] && touched[k] ? (
      <p id={`${uid}-${k}-err`} className={`mt-2 flex items-start gap-2 text-sm ${dark ? "text-[#ff8a8e]" : "text-red-dark"}`}>
        <span aria-hidden="true" className="mt-[0.45rem] inline-block h-1.5 w-1.5 shrink-0 bg-red" />
        {errors[k]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={dark ? "on-dark" : ""} aria-describedby={!ENDPOINT ? `${uid}-preview` : undefined}>
      {!ENDPOINT && (
        <div
          id={`${uid}-preview`}
          className={`mb-10 border-l-2 border-red py-1 pl-4 text-sm leading-relaxed ${dark ? "text-paper/80" : "text-graphite/80"}`}
        >
          <strong className="font-semibold">Preview version.</strong> The form handler is not connected yet, so messages
          submitted here are not sent. Fields and validation work as they will on the live site.
        </div>
      )}

      <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className={labelCls}>
            Name <span aria-hidden="true" className="text-red">*</span>
          </label>
          <input
            {...field("name")}
            type="text"
            autoComplete="name"
            required
            onChange={(e) => set("name", e.target.value)}
            className={`${inputBase} ${errors.name && touched.name ? errCls : ""}`}
          />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={labelCls}>
            Work email <span aria-hidden="true" className="text-red">*</span>
          </label>
          <input
            {...field("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            onChange={(e) => set("email", e.target.value)}
            className={`${inputBase} ${errors.email && touched.email ? errCls : ""}`}
          />
          <Err k="email" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-company`} className={labelCls}>
            Company <span className="normal-case tracking-normal opacity-70">— optional</span>
          </label>
          <input
            {...field("company")}
            type="text"
            autoComplete="organization"
            onChange={(e) => set("company", e.target.value)}
            className={inputBase}
          />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={labelCls}>
            Inquiry type <span aria-hidden="true" className="text-red">*</span>
          </legend>
          <div className="mt-4 grid grid-cols-3 gap-px">
            {TYPES.map((t) => {
              const on = fields.type === t.value;
              return (
                <label
                  key={t.value}
                  className={`relative flex min-h-12 cursor-pointer items-center justify-center border px-2 text-[0.95rem] transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 ${
                    dark ? "has-[:focus-visible]:outline-white" : "has-[:focus-visible]:outline-red"
                  } ${
                    on
                      ? "border-red bg-red text-white"
                      : dark
                        ? "border-paper/25 text-paper/80 hover:border-paper/60"
                        : "border-graphite/25 text-graphite/80 hover:border-graphite/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={t.value}
                    checked={on}
                    onChange={() => set("type", t.value)}
                    className="sr-only"
                  />
                  {t.label}
                </label>
              );
            })}
          </div>
          <Err k="type" />
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-message`} className={labelCls}>
            Message <span aria-hidden="true" className="text-red">*</span>
          </label>
          <textarea
            {...field("message")}
            rows={5}
            required
            onChange={(e) => set("message", e.target.value)}
            className={`${inputBase} resize-y leading-relaxed ${errors.message && touched.message ? errCls : ""}`}
            placeholder={
              fields.type === "careers"
                ? "Which role or discipline are you interested in?"
                : fields.type === "project"
                  ? "Facility type, location, scope and timing."
                  : "How can we help?"
            }
          />
          <Err k="message" />
        </div>

        {/* Honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm ${dark ? "text-steel-light" : "text-steel-dark"}`}>
          <span aria-hidden="true" className="text-red">*</span> Required fields
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex min-h-13 items-center justify-between gap-10 bg-red px-6 py-3.5 text-base font-medium text-white transition-colors duration-300 hover:bg-red-dark disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
          <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        {status === "not-connected" && (
          <div className={`mt-8 border px-5 py-4 text-sm leading-relaxed ${dark ? "border-paper/25 text-paper" : "border-graphite/25 text-graphite"}`}>
            <p className="font-semibold">Your message was not sent.</p>
            <p className="mt-1 opacity-80">
              This is a preview and the form is not yet connected to VECHTEL’s inbox. Your details have been kept in the
              form — nothing was submitted or stored.
            </p>
          </div>
        )}
        {status === "error" && (
          <div className="mt-8 border border-red px-5 py-4 text-sm leading-relaxed">
            <p className="font-semibold">Something went wrong — your message was not sent.</p>
            <p className="mt-1 opacity-80">Please check your connection and try again. Your details are still in the form.</p>
          </div>
        )}
        {status === "success" && (
          <div className={`mt-8 border-l-2 border-red py-2 pl-5 ${dark ? "text-paper" : "text-graphite"}`}>
            <p className="font-semibold">Thank you — your message has been sent.</p>
            <p className="mt-1 text-sm opacity-80">A member of the VECHTEL team will review it and reply to the email address you provided.</p>
          </div>
        )}
      </div>
    </form>
  );
}
