"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import GradientText from "../ui/GradientText";
import { IoClose } from "react-icons/io5";
import { Input } from "../ui/Input";

const PreEmailSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  // Load saved preference
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("lotus_prelaunch_seen");

    if (hasSeenPopup) return; // already seen → never show again

    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowOverlay(true);
        localStorage.setItem("lotus_prelaunch_seen", "true"); // save immediately
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        setShowOverlay(false);
        localStorage.setItem("lotus_prelaunch_seen", "true");
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

  if (!showOverlay) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-999"
    >
      <div className="flex items-start gap-4">
        {/* Main box */}
        <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-10 max-w-lg w-[90%] text-center relative flex flex-col gap-2">
          <h2 className="text-3xl font-bold mb-3">
            Early Access to <GradientText>LotusFlow</GradientText>
          </h2>

          <p className="text-gray-400 mb-2">
            Join our pre-launch list and be one of the first to try the AI
            component generator.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit" disabled={loading}>
              Join Now
            </Button>
          </form>

          <p className="text-gray-500/70 text-sm mb-6">
            Help us shape the next generation of AI-powered UI building.
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={() => {
            setShowOverlay(false);
            localStorage.setItem("lotus_prelaunch_seen", "true");
          }}
          className="bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-200 transition"
        >
          <IoClose size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default PreEmailSignup;
