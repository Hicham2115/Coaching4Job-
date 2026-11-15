import Component from "@/components/comp-577";
import Hero from "@/components/hero";
import Webinar from "@/components/webinar";
import Accompaniments from "@/components/accompaniments";
import Method from "@/components/method";
import Approach from "@/components/approach";
import AboutOwner from "@/components/about-owner";
import ConferenceCta from "@/components/conference-cta";
import SiteFooter from "@/layout/site-footer";
import ContactForm from "@/components/contact-form";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "fr-MA",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#business`,
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      image: `${siteUrl}/images/casablanca-method.jpg`,
      logo: `${siteUrl}/images/coaching4job-logo.png`,
      telephone: "+212661138432",
      areaServed: "MA",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Casablanca",
        addressCountry: "MA",
      },
      founder: { "@type": "Person", name: "Driss Benchekroun" },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Component />
      <Hero />
      <Accompaniments />
            <Webinar />

      <Method />
      <Approach />
      {/* <ConferenceCta /> */}
      <AboutOwner />
      <ContactForm />
      <SiteFooter />
    </>
  );
}
