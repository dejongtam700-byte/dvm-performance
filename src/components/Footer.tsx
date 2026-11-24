import Link from "next/link";
import { services } from "@/config/services";
import { activeSocials, site, whatsappLink } from "@/config/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const socials = activeSocials();
  const wa = whatsappLink();
  const { phone, email } = site.contact;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink pt-20">
      <div className="wrap grid-12 gap-y-10 text-[15px]">
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <p className="tech mb-5 text-[10px]">Navigatie</p>
          <ul className="space-y-1">
            {site.nav.map((n) => (
              <li key={n.href}><Link className="inline-block py-1.5 text-mute transition-colors hover:text-paper" href={`/${n.href}`}>{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <p className="tech mb-5 text-[10px]">Diensten</p>
          <ul className="space-y-1">
            {services.map((s) => (
              <li key={s.id}><Link className="inline-block py-1.5 text-mute transition-colors hover:text-paper" href="/#diensten">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <p className="tech mb-5 text-[10px]">Vestiging</p>
          <address className="not-italic text-mute">
            {site.location.street && <>{site.location.street}<br /></>}
            {site.location.postalCode && <>{site.location.postalCode} </>}
            {site.location.city}<br />
            {site.location.region}, {site.location.country}
          </address>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <p className="tech mb-5 text-[10px]">Contact</p>
          <ul className="space-y-1 text-mute">
            {wa && <li><a className="inline-block py-1.5 hover:text-paper" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>}
            {phone && <li><a className="inline-block py-1.5 hover:text-paper" href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a></li>}
            {email && <li><a className="inline-block py-1.5 hover:text-paper" href={`mailto:${email}`}>{email}</a></li>}
            <li><Link className="inline-block py-1.5 hover:text-paper" href="/#contact">Contactformulier</Link></li>
            {socials.map((s) => (
              <li key={s.label}><a className="inline-block py-1.5 hover:text-paper" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap mt-20">
        <Wordmark size="xl" className="text-paper" />
      </div>

      <div className="wrap mt-8 flex flex-col gap-3 border-t border-line py-6 text-[13px] text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {site.name}. Alle rechten voorbehouden.</p>
        <div className="flex gap-6">
          <Link href="/privacyverklaring" className="hover:text-paper">Privacyverklaring</Link>
          <Link href="/#top" className="hover:text-paper">Terug naar boven ↑</Link>
        </div>
      </div>
    </footer>
  );
}
