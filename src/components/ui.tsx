import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ *
 * Scroll reveal — degrades to "always visible" without JS animation.
 * ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as: Tag = "div",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  as?: ElementType;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", visible && "is-visible", className)}
      data-direction={direction}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * Image with graceful loading + fallback (never shows a broken icon)
 * ------------------------------------------------------------------ */
export function SmartImage({
  src,
  alt,
  className,
  wrapperClassName,
  eager = false,
  sizes,
  parallax = false,
}: {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  eager?: boolean;
  sizes?: string;
  parallax?: boolean;
}) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => setState("loading"), [src]);

  return (
    <span className={cn("relative block overflow-hidden bg-saddle/25", wrapperClassName)}>
      {state !== "error" ? (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setState("ready")}
          onError={() => setState("error")}
          className={cn(
            "h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]",
            state === "ready" ? "opacity-100" : "opacity-0 scale-105",
            parallax && "motion-safe:animate-drift",
            className,
          )}
        />
      ) : (
        <span className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-saddle/50 to-espresso px-4 text-center">
          <Monogram className="h-9 w-9 text-brass/70" />
          <span className="font-display text-sm italic text-parchment/70">
            Image unavailable
          </span>
        </span>
      )}
      {state === "loading" && (
        <span className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-br from-parchment/25 to-saddle/30" />
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Brand marks
 * ------------------------------------------------------------------ */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <path
        d="M8 32c5.5-2.2 9.8-3.2 16-3.2s10.5 1 16 3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M15 30.4c-.6-6.2.4-11.2 2.2-14.6C18.7 12.9 21 11 24 11s5.3 1.9 6.8 4.8c1.8 3.4 2.8 8.4 2.2 14.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M13.6 26.4h20.8" stroke="currentColor" strokeWidth="1.2" opacity=".65" />
      <circle cx="24" cy="26.4" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M14.5 8.5H16V6h-1.7c-2 0-3.3 1.3-3.3 3.3V11H9v2.5h2V21h2.6v-7.5H16l.4-2.5h-2.8V9.6c0-.7.3-1.1.9-1.1Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Typographic building blocks
 * ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  className,
  tone = "brass",
}: {
  children: ReactNode;
  className?: string;
  tone?: "brass" | "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.34em]",
        tone === "brass" && "text-brass",
        tone === "light" && "text-parchment/70",
        tone === "dark" && "text-saddle",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8",
          tone === "light" ? "bg-parchment/40" : "bg-current opacity-50",
        )}
      />
      {children}
    </span>
  );
}

export function BrassRule({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)} aria-hidden="true">
      <span className="h-px w-14 bg-brass/60" />
      <span className="h-1.5 w-1.5 rotate-45 border border-brass/80" />
      <span className="h-px w-14 bg-brass/60" />
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Buttons
 * ------------------------------------------------------------------ */
type BtnProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "solid" | "outline" | "brass" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Btn({
  children,
  to,
  href,
  variant = "solid",
  size = "md",
  className,
  external,
  ...rest
}: BtnProps) {
  const base = cn(
    "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden font-semibold uppercase tracking-[0.18em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-45",
    size === "sm" && "px-4 py-2.5 text-[0.62rem]",
    size === "md" && "px-6 py-3.5 text-[0.68rem]",
    size === "lg" && "px-8 py-4.5 text-[0.72rem]",
    variant === "solid" && "fill-btn bg-espresso text-parchment hover:text-espresso",
    variant === "brass" && "fill-btn bg-brass text-espresso hover:text-espresso",
    variant === "outline" &&
      "fill-btn border border-current/45 text-current hover:border-current",
    variant === "ghost" && "text-current hover:text-brass",
    className,
  );
  const style =
    variant === "solid"
      ? ({ ["--fill" as string]: "#b7975b" } as const)
      : variant === "brass"
        ? ({ ["--fill" as string]: "#211711", color: undefined } as const)
        : ({ ["--fill" as string]: "rgba(242,232,215,0.12)" } as const);

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={base} style={style as never}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={base}
        style={style as never}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button className={base} style={style as never} {...rest}>
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * Overlay shell: backdrop, focus trap, restore focus, aria wiring
 * ------------------------------------------------------------------ */
export function Overlay({
  open,
  onClose,
  label,
  children,
  className,
  align = "right",
  initialFocus,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
  align?: "right" | "center" | "top";
  initialFocus?: React.RefObject<HTMLElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement;
    const t = window.setTimeout(() => {
      if (initialFocus?.current) {
        initialFocus.current.focus();
        return;
      }
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])',
      );
      (focusables?.[0] ?? panelRef.current)?.focus();
    }, 60);
    return () => window.clearTimeout(t);
  }, [open, initialFocus]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([type="hidden"]),select,textarea,[tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) return;
    if (lastFocused.current && document.contains(lastFocused.current)) {
      lastFocused.current.focus({ preventScroll: true });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[90] flex",
        align === "right" && "justify-end",
        align === "center" && "items-center justify-center p-3 sm:p-6",
        align === "top" && "items-start justify-center",
      )}
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close overlay"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-espresso/80 backdrop-blur-[3px] animate-[fade-up_.3s_ease-out]"
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn("relative", className)}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Section heading
 * ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  tone = "dark",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <Reveal>
            <Eyebrow tone={tone === "dark" ? "brass" : "brass"}>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={80}>
          <h2
            className={cn(
              "mt-5 text-[clamp(2.1rem,5.2vw,3.9rem)] leading-[1.02] tracking-[-0.015em]",
              tone === "dark" ? "text-espresso" : "text-parchment",
            )}
          >
            {title}
          </h2>
        </Reveal>
        {copy && (
          <Reveal delay={150}>
            <p
              className={cn(
                "mt-5 max-w-xl text-[0.98rem] leading-relaxed",
                tone === "dark" ? "text-charcoal/75" : "text-parchment/70",
                align === "center" && "mx-auto",
              )}
            >
              {copy}
            </p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={200}>{action}</Reveal>}
    </div>
  );
}
