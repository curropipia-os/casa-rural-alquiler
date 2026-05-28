import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroText from "@/components/IntroText";
import SelectedStays from "@/components/SelectedStays";
import LogosMarquee from "@/components/LogosMarquee";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import AudienceAccordion from "@/components/AudienceAccordion";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <IntroText />
        <SelectedStays />
        <LogosMarquee />
        <Services />
        <Testimonials />
        <AudienceAccordion />
      </main>
      <Footer />
    </>
  );
}
