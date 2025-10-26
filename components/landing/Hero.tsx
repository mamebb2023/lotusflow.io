"use client";

import Logo from "../ui/Logo";
import Lotus from "../ui/Lotus";
import { FiSend } from "react-icons/fi";
import Button from "../ui/Button";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Lotus background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center h-[50vh]">
        <Lotus />
      </div>

      {/* Main content */}
      <div className="relative h-[90vh] flex-center flex-col gap-5">
        {/* Logo */}
        <div className="flex gap-2">
          <Logo />
          <p className="text-white text-2xl font-semibold">LotusFlow</p>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-300">
          Craft Your Component
        </h1>
        <p className="text-gray-300 text-lg max-w-xl">
          Create your beautiful single components effortlessly
        </p>

        {/* Input area */}
        <div className="relative w-full max-w-2xl mt-6">
          <div className="bg-[#1e1e1e]/95 backdrop-blur-sm border border-pink-300 rounded-2xl focus-within:ring-2 focus-within:ring-pink-300 transition-all overflow-hidden">
            <div className="flex flex-col ">
              {/* Top: text area, add bg-[#303030] */}
              <div className="flex-1 px-4 pt-3 rounded-2xl">
                <textarea
                  placeholder="Ask LotusFlow to create a componet..."
                  rows={1}
                  className="w-full resize-none bg-transparent text-sm text-white placeholder-gray-400 outline-none overflow-x-auto overflow-y-hidden max-h-[180px] transition-all duration-200"
                />
              </div>

              {/* Bottom: buttons row */}
              <div className="flex items-center justify-between border-[#2b2b2b] px-3 py-2">
                <div className="flex items-center gap-2"></div>

                <div className="flex items-center gap-2">
                  <Button className="px-2! border! border-gray-500/20">
                    <FiSend size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
