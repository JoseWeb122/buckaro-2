import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertCircle, Check, Loader2, Send } from "lucide-react";
import { PRODUCTS, getProduct } from "@/data/catalog";
import { cn } from "@/utils/cn";

interface FormState {
  name: string;
  email: string;
  phone: string;
  interest: string;
  details: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  details: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const validate = (values: FormState): Errors => {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  else if (values.name.trim().length < 2) errors.name = "That looks a little short.";

  if (!values.email.trim()) errors.email = "An email address is required.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Enter a valid email address, e.g. name@example.com.";

  if (values.phone.trim() && values.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Enter a valid phone number, or leave it blank.";

  if (!values.interest) errors.interest = "Choose what you're interested in.";
  if (!values.message.trim()) errors.message = "Add a few words about what you're after.";
  else if (values.message.trim().length < 12)
    errors.message = "A little more detail helps — at least a sentence.";

  return errors;
};

const fieldClass = (hasError: boolean) =>
  cn(
    "w-full border-0 border-b bg-transparent px-0 py-3 font-sans text-[0.95rem] text-espresso placeholder:text-charcoal/35 transition-colors duration-300 focus:outline-none focus:ring-0",
    hasError ? "border-saddle" : "border-espresso/25 focus:border-brass",
  );

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-[0.72rem] text-saddle">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
      {children}
    </p>
  );
}

export function InquiryForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [params] = useSearchParams();
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const interestOptions = useMemo(() => {
    const names = PRODUCTS.filter((p) => p.kind === "product").map((p) => p.name);
    return [
      "Custom hat — made to order",
      ...names,
      "A hat band not listed in the shop",
      "Leather accessory or repair",
      "Something else entirely",
    ];
  }, []);

  /* Deep links such as /contact?interest=the-bandera-hat-band pre-fill the select. */
  useEffect(() => {
    const interest = params.get("interest");
    if (!interest) return;
    const product = getProduct(interest);
    const label = product ? product.name : interest;
    setValues((v) => ({ ...v, interest: label }));
  }, [params]);

  const set = (key: keyof FormState) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (touched[key] || errors[key]) {
      setErrors((e) => ({ ...e, [key]: validate({ ...values, [key]: value })[key] }));
    }
  };

  const blur = (key: keyof FormState) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: validate(values)[key] }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      interest: true,
      details: true,
      message: true,
    });
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`inquiry-${firstKey}`)?.focus();
      return;
    }
    setStatus("sending");
    /* Demo only — no backend or form service is wired up. */
    window.setTimeout(() => setStatus("sent"), 1150);
  };

  const label = (tone === "dark" ? "text-parchment/70" : "text-charcoal/70") as string;

  if (status === "sent") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "border p-8 sm:p-10 animate-[fade-up_.5s_cubic-bezier(.22,1,.36,1)]",
          tone === "dark" ? "border-brass/35 bg-espresso/50" : "border-brass/45 bg-ivory/80",
        )}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brass bg-brass/15">
          <Check className="h-6 w-6 text-brass" strokeWidth={1.8} />
        </span>
        <h3
          className={cn(
            "mt-6 font-display text-[2rem] leading-tight",
            tone === "dark" ? "text-parchment" : "text-espresso",
          )}
        >
          Inquiry captured — <span className="italic text-brass">demo only.</span>
        </h3>
        <p
          className={cn(
            "mt-4 text-[0.92rem] leading-[1.85]",
            tone === "dark" ? "text-parchment/70" : "text-charcoal/70",
          )}
        >
          Thanks, {values.name.split(" ")[0] || "friend"}. This is a front-end concept, so
          <strong className="font-semibold"> nothing has actually been sent</strong> and no
          order has been created. Here is exactly what was captured:
        </p>
        <dl
          className={cn(
            "mt-6 divide-y text-[0.85rem]",
            tone === "dark"
              ? "divide-parchment/12 border-y border-parchment/12"
              : "divide-espresso/12 border-y border-espresso/12",
          )}
        >
          {[
            ["Name", values.name],
            ["Email", values.email],
            ["Phone", values.phone || "—"],
            ["Interest", values.interest],
            ["Colours / details", values.details || "—"],
            ["Message", values.message],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-4 py-3">
              <dt
                className={cn(
                  "w-36 shrink-0 text-[0.58rem] font-bold uppercase tracking-[0.2em]",
                  tone === "dark" ? "text-parchment/45" : "text-charcoal/45",
                )}
              >
                {k}
              </dt>
              <dd className={tone === "dark" ? "text-parchment/85" : "text-charcoal/85"}>{v}</dd>
            </div>
          ))}
        </dl>
        <p
          className={cn(
            "mt-6 border-l-2 border-brass pl-4 text-[0.78rem] leading-relaxed",
            tone === "dark" ? "text-parchment/60" : "text-charcoal/60",
          )}
        >
          <strong className="font-semibold">Integration note:</strong> live inquiry delivery
          requires a backend or a form service (Shopify contact form, Formspree, or an
          email API) connected during production.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setErrors({});
            setTouched({});
            setStatus("idle");
          }}
          className={cn(
            "mt-7 inline-flex items-center gap-2 px-6 py-3.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] transition-colors duration-300",
            tone === "dark"
              ? "border border-parchment/30 text-parchment hover:border-brass hover:text-brasslite"
              : "border border-espresso/30 text-espresso hover:bg-espresso hover:text-brasslite",
          )}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label
            htmlFor="inquiry-name"
            className={cn("text-[0.58rem] font-bold uppercase tracking-[0.24em]", label)}
          >
            Full name <span className="text-brass">*</span>
          </label>
          <input
            id="inquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            onBlur={blur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "err-name" : undefined}
            placeholder="Your name"
            className={cn(fieldClass(!!errors.name), tone === "dark" && "text-parchment placeholder:text-parchment/30")}
          />
          <FieldError id="err-name">{errors.name}</FieldError>
        </div>

        <div>
          <label
            htmlFor="inquiry-email"
            className={cn("text-[0.58rem] font-bold uppercase tracking-[0.24em]", label)}
          >
            Email address <span className="text-brass">*</span>
          </label>
          <input
            id="inquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            onBlur={blur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "err-email" : undefined}
            placeholder="name@example.com"
            className={cn(fieldClass(!!errors.email), tone === "dark" && "text-parchment placeholder:text-parchment/30")}
          />
          <FieldError id="err-email">{errors.email}</FieldError>
        </div>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label
            htmlFor="inquiry-phone"
            className={cn("text-[0.58rem] font-bold uppercase tracking-[0.24em]", label)}
          >
            Phone <span className="opacity-50">(optional)</span>
          </label>
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone")(e.target.value)}
            onBlur={blur("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "err-phone" : undefined}
            placeholder="Only if you'd rather talk"
            className={cn(fieldClass(!!errors.phone), tone === "dark" && "text-parchment placeholder:text-parchment/30")}
          />
          <FieldError id="err-phone">{errors.phone}</FieldError>
        </div>

        <div>
          <label
            htmlFor="inquiry-interest"
            className={cn("text-[0.58rem] font-bold uppercase tracking-[0.24em]", label)}
          >
            Hat style or product of interest <span className="text-brass">*</span>
          </label>
          <select
            id="inquiry-interest"
            name="interest"
            value={values.interest}
            onChange={(e) => set("interest")(e.target.value)}
            onBlur={blur("interest")}
            aria-invalid={!!errors.interest}
            aria-describedby={errors.interest ? "err-interest" : undefined}
            className={cn(
              fieldClass(!!errors.interest),
              "appearance-none pr-8",
              tone === "dark" ? "text-parchment" : "text-espresso",
              !values.interest && "text-charcoal/40",
            )}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23b7975b' stroke-width='1.6' fill='none'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 2px center",
            }}
          >
            <option value="">Select one…</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError id="err-interest">{errors.interest}</FieldError>
        </div>
      </div>

      <div>
        <label
          htmlFor="inquiry-details"
          className={cn("text-[0.58rem] font-bold uppercase tracking-[0.24em]", label)}
        >
          Preferred colours or style details <span className="opacity-50">(optional)</span>
        </label>
        <input
          id="inquiry-details"
          name="details"
          type="text"
          value={values.details}
          onChange={(e) => set("details")(e.target.value)}
          placeholder="e.g. chocolate brown leather, basket weave, silver buckle"
          className={cn(
            fieldClass(false),
            tone === "dark" && "text-parchment placeholder:text-parchment/30",
          )}
        />
      </div>

      <div>
        <label
          htmlFor="inquiry-message"
          className={cn("text-[0.58rem] font-bold uppercase tracking-[0.24em]", label)}
        >
          Tell us what you have in mind <span className="text-brass">*</span>
        </label>
        <textarea
          id="inquiry-message"
          name="message"
          rows={4}
          maxLength={600}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          onBlur={blur("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "err-message" : undefined}
          placeholder="Shape, brim, occasion, timeline — whatever you already know."
          className={cn(
            fieldClass(!!errors.message),
            "resize-y",
            tone === "dark" && "text-parchment placeholder:text-parchment/30",
          )}
        />
        <div className="mt-2 flex items-start justify-between gap-4">
          <FieldError id="err-message">{errors.message}</FieldError>
          <span className="ml-auto shrink-0 text-[0.65rem] text-charcoal/40 tabular">
            {values.message.length}/600
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="fill-btn group inline-flex items-center justify-center gap-3 bg-espresso px-8 py-4.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-parchment transition-colors duration-300 hover:text-brasslite disabled:cursor-wait"
          style={{ ["--fill" as string]: "#65432d" }}
        >
          <span className="relative z-10">
            {status === "sending" ? "Preparing your inquiry…" : "Send Inquiry"}
          </span>
          {status === "sending" ? (
            <Loader2 className="relative z-10 h-4 w-4 animate-spin" strokeWidth={2} />
          ) : (
            <Send
              className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.8}
            />
          )}
        </button>
        <p className={cn("text-[0.7rem] leading-relaxed", tone === "dark" ? "text-parchment/50" : "text-charcoal/50")}>
          Demo form — submitting shows a labelled confirmation only. Nothing is sent and no
          order is created.
        </p>
      </div>
    </form>
  );
}
