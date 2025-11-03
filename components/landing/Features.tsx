"use client";

import { motion } from "framer-motion";
import { AiFillRocket } from "react-icons/ai";
import { BsFillPaletteFill, BsStars } from "react-icons/bs";
import { FiZap, FiStar } from "react-icons/fi";

const features = [
  {
    icon: BsStars,
    title: "AI-Powered Generation",
    desc: "Instantly generate clean React + Tailwind components with natural language.",
  },
  {
    icon: FiZap,
    title: "Live Preview",
    desc: "See real-time updates as you tweak your code and design.",
  },
  {
    icon: BsFillPaletteFill,
    title: "Custom Styling",
    desc: "Easily adjust color, layout, and motion — all within one interface.",
  },
  {
    icon: FiStar,
    title: "Smart Suggestions",
    desc: "Get instant improvements for UX, accessibility, and performance.",
  },
  {
    icon: AiFillRocket,
    title: "Deploy Ready",
    desc: "Export ready-to-use components straight into your Next.js or Vite project.",
  },
];

export default function Features() {
  return (
    <section className="relative py-20 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-3"
        >
          Build Faster with{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">
            LotusFlow
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-12"
        >
          Everything you need to design, generate, and deploy components
        </motion.p>

        <div className="flex-center gap-5 flex-wrap max-w-3xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col items-center justify-center p-8 rounded-2xl bg-[#111] border border-white/10
                         size-60
                         shadow-[0_-4px_15px_-8px_#ec4899,0_-4px_15px_-8px_#a855f7]
                         hover:shadow-[0_-8px_25px_-6px_#ec4899,0_-8px_25px_-6px_#a855f7]
                         hover:border-pink-400/40
                         transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center mb-4">
                <f.icon className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm text-center">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
