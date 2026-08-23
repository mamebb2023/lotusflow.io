"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import Tag from "../ui/Tag";
import Link from "next/link";
import Button from "../ui/Button";
import GradientText from "../ui/GradientText";
import { Input } from "../ui/Input";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Perfect for trying out LotusFlow and exploring AI generation.",
    features: [
      "3 component generations / day",
      "Basic templates",
      "Community support",
      "Live preview access",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12/mo",
    desc: "Unlock unlimited creativity with premium features and faster AI generation.",
    features: [
      "Unlimited generations",
      "All templates unlocked",
      "Faster AI response",
      "Export to Next.js / Vite",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Tailored solutions for teams and large-scale projects.",
    features: [
      "Team collaboration",
      "Custom templates & branding",
      "Advanced deployment options",
      "Dedicated support",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("You're on the list!");
        setEmail("");
        setJoined(true);
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Network error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="relative py-24 text-white overflow-hidden">
      <div className="absolute inset-0 z-10 backgrop-blur-[120px] bg-linear-to-t from-primary/10 via-primary-dark/20 to-transparent flex-center flex-col gap-4 px-6">
        <p className="text-center text-3xl">
          We are at pre-launch stage.
          <br /> Pricing will be integrated soon.
        </p>

        <div className="text-center max-w-lg">
          <p className="text-gray-400 mb-4">
            Want <GradientText>early access</GradientText>? Join our pre-launch
            list and be one of the first to try the AI component generator.
          </p>

          {joined ? (
            <p className="text-sm text-pink-400 font-medium">
              You&apos;re on the list — we&apos;ll let you know when we launch!
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" loading={loading}>
                Join Now
              </Button>
            </form>
          )}
        </div>

        <div className="flex-center mt-2">
          <Link href="/build">
            <Button variant="outline">Try Now</Button>
          </Link>
        </div>
      </div>
      <Tag>Pricing</Tag>

      <div className="max-w-6xl mx-auto px-6 text-center blur-sm">
        {/* Title + Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-3"
        >
          Simple, transparent pricing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Choose a plan that fits your workflow and scale effortlessly as you
          grow.
        </motion.p>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col justify-between p-8 rounded-2xl border backdrop-blur-sm 
                ${
                  plan.highlighted
                    ? "border-pink-400/40 shadow-[0_-8px_25px_-6px_#ec4899,0_-8px_25px_-6px_#a855f7]"
                    : "border-white/10 shadow-[0_-4px_15px_-8px_#ec4899,0_-4px_15px_-8px_#a855f7] hidden md:flex"
                } transition-all duration-300 hover:shadow-[0_-8px_25px_-6px_#ec4899,0_-8px_25px_-6px_#a855f7]`}
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>

                <div className="text-4xl font-bold mb-6">{plan.price}</div>

                <ul className="space-y-3 text-sm text-gray-300">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 justify-center md:justify-start"
                    >
                      <FaCheck className="text-pink-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`mt-8 py-2 px-6 rounded-lg text-sm font-medium transition 
                  ${
                    plan.highlighted
                      ? "bg-linear-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
                      : "border border-white/20 hover:border-pink-400/40"
                  }`}
              >
                {plan.highlighted ? "Get Started" : "Learn More"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
