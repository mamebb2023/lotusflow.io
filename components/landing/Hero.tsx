"use client";

import Logo from "../ui/Logo";
import Lotus from "../ui/Lotus";
import { FiSend } from "react-icons/fi";
import Button from "../ui/Button";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import { ScrollParallax } from "react-just-parallax";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const handleSend = () => {
    if (!prompt.trim()) return;

    // Encode the prompt and redirect to /build with query parameter
    const encodedPrompt = encodeURIComponent(prompt.trim());
    router.push(`/build?prompt=${encodedPrompt}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative min-h-screen flex flex-col"
    >
      <ScrollParallax isAbsolutelyPositioned strength={-0.5}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-0 left-1/2  -translate-x-1/2 size-[600px] bg-pink-400/40 blur-3xl rounded-full"
        />
      </ScrollParallax>

      <ScrollParallax isAbsolutelyPositioned strength={0.1}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center h-[50vh]">
          <Lotus />
        </div>
      </ScrollParallax>

      <div className="relative h-[95vh] flex-center flex-col gap-5">
        <div className="flex gap-2">
          <Logo />
          <p className="text-white text-2xl font-semibold">LotusFlow</p>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-primary-light text-pink-300">
          {/* <GradientText> */}
          Craft Your{" "}
          <ReactTyped
            strings={[
              "Component",
              "Button",
              "Card",
              "Header",
              "Footer",
              "Input",
              "Hero",
            ]}
            typeSpeed={80}
            backSpeed={40}
            backDelay={3000}
            loop
          />
          {/* </GradientText> */}
        </h1>

        <p className="text-gray-200 text-md md:text-lg max-w-xl text-center">
          Create your custom, beautiful single components effortlessly <br />{" "}
          Then just copy & paste it
        </p>

        <div className="relative w-full max-w-2xl mt-3 p-4">
          <div className="bg-[#1e1e1e]/90 backdrop-blur-sm border border-pink-300 rounded-2xl focus-within:ring-2 focus-within:ring-pink-300 transition-all overflow-hidden">
            <div className="flex flex-col ">
              <div className="flex-1 px-5 pt-3 rounded-2xl">
                <textarea
                  placeholder="Ask LotusFlow to create your component..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full resize-y max-h-[180px] placeholder-gray-400 outline-none transition-all duration-200 bg-transparent text-white"
                />
              </div>

              <div className="flex items-center justify-between border-[#2b2b2b] px-3 py-2">
                <div className="flex items-center gap-2"></div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleSend}
                    disabled={!prompt.trim()}
                    className="px-2! border! border-gray-500/20"
                  >
                    <FiSend size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
