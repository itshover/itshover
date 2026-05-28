"use client";
import Container from "@/components/container";
import Hero from "@/components/hero-section";
import Features from "@/components/features";
import CTASection from "@/components/cta-section";
import BackedBy from "@/components/backed-by";
import TestimonialSection from "@/components/testimonials";

export default function Home() {
  return (
    <div>
      <Container>
        <Hero /> 
        <BackedBy />      
        <TestimonialSection />
        <Features />
        <CTASection />
      </Container>
    </div>
  );
}
