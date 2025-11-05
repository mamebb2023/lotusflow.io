"use client";

import { motion } from "framer-motion";
import React from "react";
import Button from "../ui/Button";

const CTA = () => {
  return (
    <section className="relative h-[50vh] flex items-center justify-center text-white border-t border-white/10">
      <div className="max-w-2xl mx-auto text-center px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-3"
        >
          Be the first to experience{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">
            LotusFlow
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-8"
        >
          Join our pre-launch list and get early access to the AI component
          builder that changes how you design, generate, and deploy.
        </motion.p>

        {/* Sign-up form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-72 px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white 
                       placeholder-gray-500 focus:outline-none focus:border-pink-400 transition"
          />
          <Button type="submit">Notify Me</Button>
        </motion.form>

        {/* Optional small note */}
        <p className="text-xs text-gray-500 mt-4">
          No spam — only early access and launch updates.
        </p>
      </div>
    </section>
  );
};

export default CTA;
