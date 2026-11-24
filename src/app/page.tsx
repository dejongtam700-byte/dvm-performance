import { About } from "@/components/About";
import { BuildGallery } from "@/components/BuildGallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InteractiveCivic } from "@/components/InteractiveCivic";
import { Introduction } from "@/components/Introduction";
import { Services } from "@/components/Services";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { localBusinessJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()).replace(/</g, "\\u003c") }} />
      <Header />
      <main id="main">
        <Hero />
        <Introduction />
        <Services />
        <InteractiveCivic />
        <BuildGallery />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
