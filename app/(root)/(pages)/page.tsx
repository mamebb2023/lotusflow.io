import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/Pricing";
import Texts from "@/components/landing/Texts";

export default function Page() {
  return (
    <div>
      <Hero />
      <div className="h-[50vh]"></div>
      <Texts />
      <Features />
      <Pricing />
      <CTA />
    </div>
  );
}
