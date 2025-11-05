import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/Pricing";

export default function Page() {
  return (
    <>
      <Hero />
      <div className="h-[50vh]"></div>
      <Features />
      <Pricing />
      <CTA />
    </>
  );
}
