import Component from "@/components/comp-577";
import Hero from "@/components/hero";
import Accompaniments from "@/components/accompaniments";
import Method from "@/components/method";
import Approach from "@/components/approach";
import ConferenceCta from "@/components/conference-cta";
import SiteFooter from "@/layout/site-footer";
import ContactForm from "@/components/contact-form";
import ScrollReveal from "@/components/scroll-reveal";

export default function Home() {
  return (
    <>
      <Component />
      <ScrollReveal />
      <Hero />
      <Accompaniments />
      <Method />
      <Approach />
      <ConferenceCta />
      <ContactForm />
      <SiteFooter />
    </>
  );
}
