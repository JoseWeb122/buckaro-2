import { EDITORIAL } from "@/data/catalog";
import { SOCIALS } from "@/data/site";
import { InquiryForm } from "@/components/InquiryForm";
import { Eyebrow, FacebookIcon, InstagramIcon, Reveal, SmartImage } from "@/components/ui";
import { cn } from "@/utils/cn";

export function CustomInquiry({
  id = "inquiry",
  padTop = false,
}: {
  id?: string;
  /** Adds clearance for the fixed header when this section tops a page. */
  padTop?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 bg-parchment",
        padTop && "pt-24 sm:pt-28 lg:pt-[7.5rem]",
      )}
      aria-labelledby="inquiry-title"
    >
      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        {/* Dramatic image panel */}
        <div
          className={cn(
            "relative h-[56vh] min-h-[22rem] overflow-hidden bg-espresso sm:h-[64vh] lg:sticky",
            padTop ? "lg:top-[7.5rem] lg:h-[calc(100vh-7.5rem)]" : "lg:top-0 lg:h-screen",
          )}
        >
          <div className="absolute inset-0">
            <SmartImage
              src={EDITORIAL.inquiry}
              alt="A western felt hat and leather gear resting on a rustic wooden table in warm light"
              wrapperClassName="h-full w-full"
              className="motion-safe:animate-drift"
            />
          </div>
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/45 to-espresso/25"
          />
          <span
            aria-hidden="true"
            className="grain absolute inset-0 opacity-60"
          />

          <div className="relative flex h-full flex-col justify-end p-6 sm:p-10 lg:p-14">
            <Reveal>
              <Eyebrow tone="light">Custom Hat Inquiry</Eyebrow>
            </Reveal>
            <Reveal delay={90}>
              <h2
                id="inquiry-title"
                className="mt-6 font-display text-[clamp(2.3rem,5.6vw,4.4rem)] font-light leading-[0.98] text-parchment"
              >
                Your Style.
                <span className="block italic text-brasslite">Your Hat.</span>
                <span className="block">Your Story.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-[0.95rem] leading-[1.85] text-parchment/72">
                Looking for a particular shape or style? Tell us what you have in mind, and
                we can start a conversation about your custom hat.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-parchment/15 pt-6">
                <span className="text-[0.55rem] uppercase tracking-[0.26em] text-parchment/45">
                  Prefer to message directly?
                </span>
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brass transition-colors hover:text-brasslite"
                >
                  <InstagramIcon className="h-4 w-4" /> Instagram
                </a>
                <a
                  href={SOCIALS.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brass transition-colors hover:text-brasslite"
                >
                  <FacebookIcon className="h-4 w-4" /> Facebook
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Form panel */}
        <div className="parchment-wash grain relative px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <div className="flex items-baseline justify-between gap-4 border-b border-espresso/12 pb-5">
                <p className="font-display text-[1.6rem] leading-none text-espresso">
                  Start the conversation
                </p>
                <span className="text-[0.55rem] uppercase tracking-[0.24em] text-charcoal/45">
                  Fields marked <span className="text-brass">*</span> required
                </span>
              </div>
              <div className="mt-9">
                <InquiryForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
