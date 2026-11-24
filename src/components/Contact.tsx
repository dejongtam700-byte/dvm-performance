import { images } from "@/config/images";
import { site, whatsappLink } from "@/config/site";
import { CivicDrawing } from "./CivicDrawing";
import { ContactForm } from "./ContactForm";
import { ImageSlot } from "./ui/ImageSlot";
import { ArrowUpRight, WhatsApp } from "./ui/Icons";
import { RevealLines } from "./ui/Reveal";
import { SectionTag } from "./ui/SectionTag";

const pretty = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function ContactRow({ label, value, href, pending }: { label: string; value: string; href?: string | null; pending?: boolean }) {
  const inner = (
    <>
      <span className="tech text-[10px]">{label}</span>
      <span className={`mt-1 flex items-center justify-between gap-4 text-lg ${pending ? "text-mute/70" : "text-paper"}`}>
        {value}
        {href && <ArrowUpRight className="h-5 w-5 shrink-0 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-hi" />}
      </span>
    </>
  );
  return (
    <li className="border-b border-line">
      {href ? (
        <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group block py-5">{inner}</a>
      ) : (
        <div className="py-5">{inner}</div>
      )}
    </li>
  );
}

export function Contact() {
  const { phone, email, hours } = site.contact;
  const wa = whatsappLink();
  const { instagram, facebook } = site.socials;

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden border-t border-line bg-coal py-24 sm:py-32 lg:py-40">
      {/* donkere automotive achtergrond */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {images.contact.src ? (
          <>
            <ImageSlot image={images.contact} className="absolute inset-0 opacity-40" showInspirationTag={false} />
            <div className="absolute inset-0 bg-linear-to-b from-coal via-coal/80 to-coal" />
          </>
        ) : (
          <div className="absolute -right-[20%] top-10 w-[110%] text-paper/[0.05] lg:-right-[8%] lg:w-[75%]">
            <CivicDrawing crop="full" />
          </div>
        )}
      </div>

      <div className="wrap">
        <SectionTag index="06">Contact</SectionTag>
        <h2 id="contact-title" className="display mt-8 max-w-[14ch] text-[clamp(3rem,8.4vw,8.5rem)]">
          <RevealLines lines={["Wat wordt jouw", <span key="v"><span className="text-signal">volgende</span> build?</span>]} />
        </h2>
        <p className="mt-8 max-w-[44ch] text-lg leading-relaxed text-mute">
          Vertel ons wat je met jouw Honda wilt doen. Van een kleine aanpassing tot een compleet project.
        </p>

        <div className="grid-12 mt-16 gap-y-14 lg:mt-24">
          <div className="col-span-12 lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="col-span-12 lg:col-span-4 lg:col-start-9" aria-label="Andere contactmogelijkheden">
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="group flex min-h-[72px] items-center justify-between gap-4 bg-paper px-6 text-ink transition-colors hover:bg-white">
                <span className="flex items-center gap-4">
                  <WhatsApp className="h-7 w-7 text-[#1f8f4e]" />
                  <span>
                    <span className="block font-display text-xl font-bold uppercase tracking-[0.04em]">App ons direct</span>
                    <span className="block text-sm text-ink/60">Stuur ons een bericht</span>
                  </span>
                </span>
                <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ) : (
              <div className="flex min-h-[72px] items-center gap-4 border border-dashed border-line px-6 text-mute">
                <WhatsApp className="h-6 w-6 shrink-0" />
                <span className="text-sm">WhatsApp volgt binnenkort</span>
              </div>
            )}

            <ul className="mt-6 border-t border-line">
              <ContactRow label="Locatie" value={`${site.location.city}, ${site.location.region}`} />
              {phone && <ContactRow label="Telefoon" value={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`} />}
              {email && <ContactRow label="E-mail" value={email} href={`mailto:${email}`} />}
              {hours && <ContactRow label="Openingstijden" value={hours} />}
              <ContactRow label={instagram.label} value={instagram.url ? pretty(instagram.url) : "Volgt binnenkort"} href={instagram.url} pending={!instagram.url} />
              <ContactRow label={facebook.label} value={facebook.url ? pretty(facebook.url) : "Volgt binnenkort"} href={facebook.url} pending={!facebook.url} />
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
