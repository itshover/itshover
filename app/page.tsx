"use client";
import Container from "@/components/container";
import Hero from "@/components/hero-section";
import Features from "@/components/features";
import CTASection from "@/components/cta-section";
import BackedBy from "@/components/backed-by";

export default function Home() {
  return (
    <div>
      <Container>
        <Hero />
        <Features />
        <BackedBy />
        <CTASection />
      </Container>
    </div>
  );
}
