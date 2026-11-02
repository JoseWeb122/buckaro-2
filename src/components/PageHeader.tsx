import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Eyebrow, Reveal, SmartImage } from "@/components/ui";

export function Breadcrumbs({
  trail,
  tone = "light",
}: {
  trail: { label: string; to?: string }[];
  tone?: "light" | "dark";
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-[0.58rem] uppercase tracking-[0.22em]">
        {trail.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-2">
            {crumb.to ? (
              <Link
                to={crumb.to}
                className={
                  tone === "light"
                    ? "text-parchment/55 transition-colors hover:text-brasslite"
                    : "text-charcoal/50 transition-colors hover:text-brass"
                }
              >
                {crumb.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className={tone === "light" ? "text-brass" : "text-saddle"}
              >
                {crumb.label}
              </span>
            )}
            {i < trail.length - 1 && (
              <ChevronRight
                aria-hidden="true"
                className={
                  tone === "light"
                    ? "h-3 w-3 text-parchment/30"
                    : "h-3 w-3 text-charcoal/30"
                }
                strokeWidth={2}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  eyebrow,
  title,
  copy,
  image,
  imageAlt,
  trail,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  image: string;
  imageAlt: string;
  trail: { label: string; to?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="grain relative isolate flex min-h-[52vh] items-end overflow-hidden bg-espresso pt-40 sm:min-h-[58vh] lg:pt-48">
      <div className="absolute inset-0 -z-10">
        <SmartImage
          src={image}
          alt={imageAlt}
          wrapperClassName="h-full w-full"
          className="motion-safe:animate-drift"
          eager
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/35"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-espresso/85 via-espresso/25 to-transparent"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
        <Reveal>
          <Breadcrumbs trail={trail} />
        </Reveal>
        <Reveal delay={80}>
          <Eyebrow tone="light" className="mt-6">
            {eyebrow}
          </Eyebrow>
        </Reveal>
        <Reveal delay={140}>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.4rem,6.6vw,5.2rem)] font-light leading-[0.98] tracking-[-0.015em] text-parchment">
            {title}
          </h1>
        </Reveal>
        {copy && (
          <Reveal delay={210}>
            <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.85] text-parchment/70">
              {copy}
            </p>
          </Reveal>
        )}
        {children && <Reveal delay={260}>{children}</Reveal>}
      </div>
    </section>
  );
}
