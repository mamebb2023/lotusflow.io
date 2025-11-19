import CookieNotice from "@/components/landing/CookieNotice";
import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import PreEmailSignup from "@/components/landing/PreEmailSignup";
import Pricing from "@/components/landing/Pricing";
import Texts from "@/components/landing/Texts";

export default function Page() {
  return (
    <div>
      <PreEmailSignup />
      <CookieNotice />
      <Hero />
      <div className="h-[50vh]"></div>
      <Texts />
      <Features />
      <Pricing />
      <CTA />
    </div>
  );
}
