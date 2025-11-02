"use client";

import { Preview } from "@/components/build/Preview";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, Suspense } from "react";
import { FiSend, FiZap } from "react-icons/fi";
import { IoCodeSlash } from "react-icons/io5";
import { MdOutlineMonitor } from "react-icons/md";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { RiSparklingFill } from "react-icons/ri";
import { useSearchParams } from "next/navigation";

// Separate component that uses useSearchParams
const BuildContent = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("preview");
  const [collapsed, setCollapsed] = useState(false);

  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "preview", label: "Preview", icon: MdOutlineMonitor },
    { id: "code", label: "Code", icon: IoCodeSlash },
  ];

  const examplePrompts = [
    "Create a modern hero section with gradient background",
    "Build a pricing card with 3 tiers",
    "Design a contact form with validation",
    "Make a testimonial carousel component",
  ];

  // Handle URL prompt on component mount
  useEffect(() => {
    const urlPrompt = searchParams.get("prompt");
    if (urlPrompt) {
      setInput(urlPrompt);
    }
  }, [searchParams]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: { role: "user" | "assistant"; text: string } = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: currentInput }),
      });

      const data = await res.json();

      const aiMsg: { role: "user" | "assistant"; text: string } = {
        role: "assistant",
        text: data.chatMsg,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setGeneratedCode(data.code);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-screen overflow-hidden"
    >
      {/* Left Section - Chat */}
      <motion.div
        animate={{ width: collapsed ? "70px" : "400px" }}
        transition={{ duration: 0.3 }}
        className="bg-[#151515] flex flex-col p-2 gap-4 overflow-hidden max-w-[400px]"
      >
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex gap-2 scale-90">
                  <Logo />
                  <p className="text-white text-2xl font-semibold">LotusFlow</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            className="px-2!"
            onClick={() => setCollapsed((v) => !v)}
          >
            <motion.div
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <TbLayoutSidebarLeftCollapse />
            </motion.div>
          </Button>
        </div>

        {/* 💬 Chat messages */}
        <motion.div
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className={`flex-1 overflow-y-auto flex flex-col gap-2 p-2 ${
            collapsed ? "pointer-events-none" : ""
          }`}
        >
          {messages.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                  <RiSparklingFill className="text-white text-3xl" />
                </div>
              </motion.div>

              <h2 className="text-white text-xl font-semibold mb-2">
                Start Building
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Describe any UI component and watch LotusFlow create it
                instantly
              </p>

              <div className="w-full space-y-2">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">
                  Try these examples
                </p>
                {examplePrompts.map((prompt, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => (prompt: string) => {
                      setInput(prompt);
                    }}
                    className="w-full text-left px-3 py-2 bg-[#1e1e1e] hover:bg-[#252525] border border-gray-800 hover:border-pink-500/30 rounded-lg text-sm text-gray-300 transition-all duration-200 group"
                  >
                    <span className="flex items-center gap-2">
                      <FiZap
                        className="text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        size={14}
                      />
                      {prompt}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm px-3 py-2 max-w-[90%] ${
                    m.role === "user"
                      ? "bg-pink-500/20 self-end text-pink-200 rounded-t-xl rounded-bl-xl"
                      : "text-gray-300"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {loading && (
                <p className="text-gray-400 text-xs px-3">
                  Generating component...
                </p>
              )}
            </>
          )}
        </motion.div>

        {/* ✏️ Input */}
        <motion.div
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <div className="bg-[#1e1e1e]/90 border border-pink-300 rounded-2xl overflow-hidden p-1">
            <div className="flex flex-col">
              <textarea
                placeholder="Ask LotusFlow to build a button, card, or footer..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 text-sm resize-none placeholder-gray-400 outline-none bg-transparent px-4 py-3"
              />
              <Button
                onClick={handleSend}
                disabled={loading}
                className="self-end px-2!"
              >
                <FiSend size={18} />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="bg-[#151515] p-2 flex items-center justify-between text-sm">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "outline" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className="py-1! gap-2"
              >
                <tab.icon size={16} />
                {tab.label}
              </Button>
            ))}
          </div>
          profile
        </div>

        {/* Content */}
        <div className="flex-1 relative overflow-hidden p-4">
          {messages.length === 0 && !generatedCode ? (
            <div className="h-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-md"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <IoCodeSlash className="text-pink-500 text-4xl" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Your Canvas Awaits
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Start a conversation to generate beautiful React components.
                  Describe what you need, and watch it come to life instantly.
                </p>
              </motion.div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 rounded-lg"
              >
                <Preview
                  code={generatedCode}
                  activeTab={activeTab as "preview" | "code"}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Main page component with Suspense boundary
const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-black">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      }
    >
      <BuildContent />
    </Suspense>
  );
};

export default Page;
