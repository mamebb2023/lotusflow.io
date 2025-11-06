"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import GradientText from "../ui/GradientText";

const CTA = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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
        toast.success("Thank you for signing up!");
        setEmail(""); // clear input
      } else {
        toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Please try again later.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative h-[50vh] flex items-center justify-center text-white">
      <div className="max-w-2xl mx-auto text-center px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-3"
        >
          Be first to try <GradientText>LotusFlow</GradientText>
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
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full sm:w-72 px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white 
                       placeholder-gray-500 focus:outline-none focus:border-pink-400 transition"
          />
          <Button type="submit" disabled={loading}>
            Notify Me
          </Button>
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
