"use client";

import { motion } from "framer-motion";
import GradientText from "../ui/GradientText";
import Button from "../ui/Button";
import { FiZap, FiCpu } from "react-icons/fi";

const CTA = () => {
  return (
    <section className="relative h-[55vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-6 flex flex-col gap-3">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold"
        >
          Build Faster with <GradientText>LotusFlow</GradientText>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-6 text-lg"
        >
          Generate production-ready React components, preview instantly, and
          accelerate your workflow with AI.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex-center"
        >
          <Button>Explore LotusFlow</Button>
        </motion.div>

        {/* Small Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-3 mb-10"
        >
          {/* Tag 1 */}
          <div className="flex items-center gap-2 text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            <FiZap className="text-pink-400" size={14} />
            <span>AI-Powered Generation</span>
          </div>

          {/* Tag 2 */}
          <div className="flex items-center gap-2 text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            <FiCpu className="text-pink-400" size={14} />
            <span>Instant Live Preview</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
