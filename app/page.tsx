import Navbar from "@/components/navbar";
import Container from "@/components/container";
import Hero from "@/components/hero-section";
import Features from "@/components/features";
import CTASection from "@/components/cta-section";

export default function Home() {
  return (
    <div className="">
      <Container>
        <Hero />
        <Features />
        <CTASection />
      </Container>
    </div>
  );
}
