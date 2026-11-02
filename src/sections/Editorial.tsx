import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { EDITORIAL } from "@/data/catalog";
import { CRAFT_STEPS, TRUST_POINTS } from "@/data/site";
import { BrassRule, Eyebrow, Reveal, SmartImage } from "@/components/ui";

/* ------------------------------------------------------------------ *
 * Brand story — asymmetrical editorial spread
 * ------------------------------------------------------------------ */
export function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-ivory py-20 sm:py-24 lg:py-32"
      aria-labelledby="story-title"
    >
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:px-12">
        {/* Image side */}
        <Reveal direction="left" className="relative">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-4 -top-4 hidden h-full w-full border border-brass/45 sm:block lg:-left-7 lg:-top-7"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-espresso/10 sm:aspect-[4/4.7]">
              <SmartImage
                src={EDITORIAL.story}
                alt="A leather craftsman in an apron holding a hand tool at a workbench"
                wrapperClassName="h-full w-full"
                className="motion-safe:animate-drift"
                eager
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent"
              />
              <p className="absolute bottom-5 left-5 right-5 font-display text-[1.05rem] italic leading-snug text-parchment">
                The bench, the blade, the buckle — every piece passes through one pair of
                hands.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 lg:absolute lg:-bottom-2 lg:-right-6 lg:mt-0 lg:flex-col lg:items-start lg:gap-2 lg:bg-ivory lg:p-5">
            {["Hand-tooled", "Hand-embossed", "Silver buckle closures"].map((f) => (
              <span
                key={f}
                className="flex items-center gap-2.5 text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-saddle"
              >
                <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-brass" />
                {f}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Text side */}
        <div className="relative">
          <Reveal>
            <Eyebrow>The Art of the West</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h2
              id="story-title"
              className="mt-6 font-display text-[clamp(2.2rem,5.4vw,4.1rem)] font-light leading-[1.02] tracking-[-0.015em] text-espresso"
            >
              More Than a Hat.
              <span className="block italic text-saddle">A Piece of Your Story.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <BrassRule className="mt-8 justify-start [&>span:first-child]:hidden" />
          </Reveal>
          <Reveal delay={200}>
            <p className="drop-cap mt-8 max-w-xl text-[1rem] leading-[1.95] text-charcoal/78">
              A great Western hat is more than something you wear. It reflects your style,
              your character, and the traditions you carry with you. Buckaroo Hatters
              celebrates the artistry and individuality that make Western hats special.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-[1.9] text-charcoal/65">
              The shop currently lists nine hand-tooled hat bands, a premium Herman Oak
              leather hat holder, and custom hat ear warmers made to work with your
              sweatband. Custom hat work is made to order — it starts with a conversation
              about the shape and details you want.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/our-craft"
                className="fill-btn group inline-flex items-center justify-center gap-3 bg-espresso px-7 py-4 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-parchment transition-colors duration-300 hover:text-brasslite"
                style={{ ["--fill" as string]: "#65432d" }}
              >
                <span className="relative z-10">Explore Our Craft</span>
                <ArrowRight
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
              <Link
                to="/collections/hat-bands"
                className="sweep-link inline-flex items-center justify-center gap-2 px-2 py-4 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-saddle transition-colors hover:text-brass sm:px-4"
              >
                Shop the hat bands
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * The craft / customer journey
 * ------------------------------------------------------------------ */
export function CraftProcess() {
  return (
    <section
      id="craft"
      className="leather grain relative overflow-hidden py-20 sm:py-24 lg:py-32"
      aria-labelledby="craft-title"
    >
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow tone="light">The Process</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="craft-title"
                className="mt-5 font-display text-[clamp(2.1rem,5vw,3.8rem)] font-light leading-[1.03] text-parchment"
              >
                From first look to
                <span className="italic text-brasslite"> worn every day.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="max-w-sm text-[0.9rem] leading-relaxed text-parchment/60">
              Four honest stages, whether you're picking a band off the shelf or asking for
              something made just for you.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {CRAFT_STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 110}
              className={i % 2 === 1 ? "lg:mt-14" : undefined}
            >
              <div className="group relative">
                <div className="relative aspect-[4/5] overflow-hidden bg-espresso">
                  <SmartImage
                    src={step.image}
                    alt={step.alt}
                    wrapperClassName="h-full w-full"
                    className="opacity-85 transition-all duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.08] group-hover:opacity-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/15 to-transparent"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-3 font-display text-[3.6rem] leading-none text-parchment/25 transition-colors duration-500 group-hover:text-brass/70"
                  >
                    {step.n}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-[1.5rem] leading-tight text-parchment">
                  {step.title}
                </h3>
                <span aria-hidden="true" className="mt-3 block h-px w-12 bg-brass/70" />
                <p className="mt-3 text-[0.86rem] leading-[1.8] text-parchment/60">
                  {step.body}
                </p>
                <Link
                  to={step.to}
                  className="sweep-link mt-4 inline-flex items-center gap-2 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-brass transition-colors hover:text-brasslite"
                >
                  {step.linkLabel}
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.2} />
                </Link>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Trust (verified facts only) + CTA panel
 * ------------------------------------------------------------------ */
export function TrustAndCta() {
  return (
    <section className="relative overflow-hidden bg-ivory py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:px-12">
        {/* CTA panel */}
        <Reveal direction="left">
          <div className="leather grain relative flex h-full flex-col justify-between overflow-hidden p-8 sm:p-11">
            <span
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-brass/20"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full border border-brass/10"
            />
            <div className="relative">
              <Eyebrow>Custom Work</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.04] text-parchment">
                Looking for Something
                <span className="block italic text-brasslite">Distinctly Yours?</span>
              </h2>
              <p className="mt-5 max-w-md text-[0.92rem] leading-[1.85] text-parchment/65">
                Tell us the shape, the brim, the colour and the details you have in mind.
                Custom hat work is quoted one hat at a time — there is no published online
                price for it.
              </p>
            </div>
            <div className="relative mt-9">
              <Link
                to="/contact"
                className="fill-btn group inline-flex items-center gap-3 bg-brass px-7 py-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-espresso transition-colors duration-300 hover:text-brasslite"
                style={{ ["--fill" as string]: "#211711" }}
              >
                <span className="relative z-10">Ask About a Custom Hat</span>
                <ArrowRight
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Trust list — divided rows, not a card grid */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <Eyebrow tone="dark">What You Can Count On</Eyebrow>
          </Reveal>
          <dl className="mt-6 divide-y divide-espresso/12 border-y border-espresso/12">
            {TRUST_POINTS.map((point, i) => (
              <Reveal as="div" key={point.title} delay={80 + i * 70}>
                <div className="group flex gap-6 py-6 transition-colors duration-300">
                  <span
                    aria-hidden="true"
                    className="w-8 shrink-0 pt-1 font-display text-[1.05rem] text-brass tabular"
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <dt className="font-display text-[1.45rem] leading-tight text-espresso transition-colors duration-300 group-hover:text-saddle">
                      {point.title}
                    </dt>
                    <dd className="mt-2 max-w-md text-[0.88rem] leading-[1.8] text-charcoal/65">
                      {point.body}
                    </dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>
          <Reveal delay={380}>
            <p className="mt-6 text-[0.72rem] leading-relaxed text-charcoal/45">
              No invented reviews, ratings or guarantees are shown here — only what the shop
              can stand behind today.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
