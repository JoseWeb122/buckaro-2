import { ArrowUpRight, Info, MapPin, Clock, Mail, Phone } from "lucide-react";
import { BUSINESS, SOCIALS } from "@/data/site";
import { CustomInquiry } from "@/sections/CustomInquiry";
import { Eyebrow, FacebookIcon, InstagramIcon, Reveal } from "@/components/ui";

const PLACEHOLDER_ROWS = [
  {
    icon: Phone,
    label: "Phone",
    value: BUSINESS.phone,
    note: "Not published on the current storefront — add the confirmed number in src/data/site.ts.",
  },
  {
    icon: Mail,
    label: "Email",
    value: BUSINESS.email,
    note: "Not published on the current storefront — add the confirmed address in src/data/site.ts.",
  },
  {
    icon: MapPin,
    label: "Shop / studio",
    value: BUSINESS.address,
    note: "No physical address is published. Add it here once confirmed.",
  },
  {
    icon: Clock,
    label: "Hours",
    value: BUSINESS.hours,
    note: "Opening hours are not published. Add them here once confirmed.",
  },
];

export function Contact() {
  return (
    <>
      <CustomInquiry id="contact-form" padTop />

      <section className="parchment-wash grain relative overflow-hidden py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-12">
          <Reveal direction="left">
            <div>
              <Eyebrow tone="dark">Ways to Reach the Shop</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,4.2vw,3rem)] font-light leading-[1.05] text-espresso">
                Direct lines,
                <span className="italic text-saddle"> no call centre.</span>
              </h2>
              <p className="mt-5 max-w-md text-[0.93rem] leading-[1.9] text-charcoal/72">
                The fastest way to reach Buckaroo Hatters today is through the shop's social
                pages or the live Shopify store. Both links below open the real profiles.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex flex-1 items-center gap-3 border border-espresso/20 bg-ivory/60 px-5 py-4 transition-all duration-300 hover:border-brass hover:bg-brass"
                >
                  <InstagramIcon className="h-5 w-5 text-saddle transition-colors group-hover:text-espresso" />
                  <span className="min-w-0">
                    <span className="block text-[0.55rem] uppercase tracking-[0.24em] text-charcoal/50">
                      Instagram
                    </span>
                    <span className="block truncate text-[0.86rem] text-espresso">
                      @buckaroohatterscustom
                    </span>
                  </span>
                  <ArrowUpRight
                    className="ml-auto h-4 w-4 shrink-0 text-charcoal/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-espresso"
                    strokeWidth={2}
                  />
                </a>
                <a
                  href={SOCIALS.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex flex-1 items-center gap-3 border border-espresso/20 bg-ivory/60 px-5 py-4 transition-all duration-300 hover:border-brass hover:bg-brass"
                >
                  <FacebookIcon className="h-5 w-5 text-saddle transition-colors group-hover:text-espresso" />
                  <span className="min-w-0">
                    <span className="block text-[0.55rem] uppercase tracking-[0.24em] text-charcoal/50">
                      Facebook
                    </span>
                    <span className="block truncate text-[0.86rem] text-espresso">
                      Buckaroo Hatters Custom Hats
                    </span>
                  </span>
                  <ArrowUpRight
                    className="ml-auto h-4 w-4 shrink-0 text-charcoal/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-espresso"
                    strokeWidth={2}
                  />
                </a>
              </div>

              <a
                href={SOCIALS.shopify}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-3 flex items-center gap-3 border border-espresso/20 bg-ivory/60 px-5 py-4 transition-all duration-300 hover:border-brass hover:bg-brass"
              >
                <span className="min-w-0">
                  <span className="block text-[0.55rem] uppercase tracking-[0.24em] text-charcoal/50">
                    Live store
                  </span>
                  <span className="block truncate text-[0.86rem] text-espresso">
                    buckaroo-hatters-custom-hand-made-hats.myshopify.com
                  </span>
                </span>
                <ArrowUpRight
                  className="ml-auto h-4 w-4 shrink-0 text-charcoal/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-espresso"
                  strokeWidth={2}
                />
              </a>
            </div>
          </Reveal>

          <Reveal direction="right" delay={90}>
            <div className="h-full border border-espresso/12 bg-ivory/70 p-7 sm:p-9">
              <p className="flex items-center gap-2.5 text-[0.58rem] font-bold uppercase tracking-[0.26em] text-saddle">
                <Info className="h-4 w-4 text-brass" strokeWidth={1.8} />
                Development placeholders
              </p>
              <p className="mt-4 text-[0.9rem] leading-[1.85] text-charcoal/70">
                Nothing below has been invented. Each row shows what still needs to be
                confirmed with the business, and where it is edited in the codebase.
              </p>

              <dl className="mt-7 divide-y divide-espresso/12 border-y border-espresso/12">
                {PLACEHOLDER_ROWS.map((row) => (
                  <div key={row.label} className="flex gap-4 py-5">
                    <row.icon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brass" strokeWidth={1.5} />
                    <div>
                      <dt className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-espresso">
                        {row.label}
                      </dt>
                      <dd className="mt-1.5 text-[0.85rem] leading-relaxed text-charcoal/65">
                        {row.value ?? row.note}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>

              <p className="mt-7 border-l-2 border-brass pl-4 text-[0.78rem] leading-relaxed text-charcoal/62">
                <strong className="font-semibold">Demo notice:</strong> the inquiry form on
                this page validates and shows a labelled confirmation, but does not send
                mail. Live delivery needs a backend or form service (Shopify contact form,
                Formspree, or an email API) connected during production.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
