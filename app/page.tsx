import { Capabilities } from "@/components/Capabilities";
import { Close } from "@/components/Close";
import { Haven } from "@/components/Haven";
import { Hero } from "@/components/Hero";
import { Kit } from "@/components/Kit";
import { Quote } from "@/components/Quote";
import { Rooms } from "@/components/Rooms";
import { Rules } from "@/components/Rules";
import { site } from "@/data/content";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.fullName,
  description: site.description,
  telephone: "+917907246109",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kochi",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  areaServed: "Kochi",
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Shooting floor rental" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Podcast studio rental" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Full day studio hire" },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main id="main">
        <Hero />
        <Capabilities />
        <Rooms />
        <Quote />
        <Kit />
        <Haven />
        <Rules />
        <Close />
      </main>
    </>
  );
}
