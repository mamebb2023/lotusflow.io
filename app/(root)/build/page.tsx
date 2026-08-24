"use client";

import { Preview } from "@/components/build/Preview";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef, Suspense } from "react";
import toast from "react-hot-toast";
import { IoCodeSlash } from "react-icons/io5";
import { MdOutlineMonitor } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import Code from "@/components/build/Code";
import ChatSidebar from "@/components/build/ChatSidebar";
import { FaUser } from "react-icons/fa6";
import Lotus from "@/components/ui/Lotus";

// Separate component that uses useSearchParams
const BuildPageContent = () => {
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

  // Handle URL prompt on component mount - run immediately
  const hasRunFromUrl = useRef(false);
  useEffect(() => {
    if (hasRunFromUrl.current) return;
    const urlPrompt = searchParams.get("prompt");
    if (urlPrompt) {
      hasRunFromUrl.current = true;
      handleSendWithPrompt(urlPrompt);
    }
  }, [searchParams]);

  // Function to send prompt programmatically
  const handleSendWithPrompt = async (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: { role: "user" | "assistant"; text: string } = {
      role: "user",
      text: promptText,
    };

    setMessages([userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          history: messages,
          previousCode: generatedCode,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.code) {
        toast.error(data.chatMsg || "Generation failed. Please try again.");
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.chatMsg },
      ]);
      setGeneratedCode(data.code);
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    // setGeneratedCode("");

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
        body: JSON.stringify({
          prompt: currentInput,
          history: messages,
          previousCode: generatedCode,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.code) {
        toast.error(data.chatMsg || "Generation failed. Please try again.");
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.chatMsg },
      ]);
      setGeneratedCode(data.code);
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Handle example prompt click - run immediately
  const handleExampleClick = (prompt: string) => {
    handleSendWithPrompt(prompt);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col-reverse md:flex-row h-screen overflow-hidden"
    >
      {/* Left Section - Chat */}
      <ChatSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        messages={messages}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        handleExampleClick={handleExampleClick}
        loading={loading}
        examplePrompts={examplePrompts}
      />

      {/* Right Section */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="bg-[#151515] p-2 flex items-center justify-between text-sm">
          <div className="flex items-center md:hidden">
            <Lotus size="h-6 w-4" animatePetals={false} />
          </div>

          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "outline" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className="py-1! gap-3!"
              >
                <tab.icon size={16} /> {tab.label}
              </Button>
            ))}
          </div>
          <Button variant="ghost">
            <FaUser />
          </Button>
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
                <div className="w-20 h-20 bg-linear-to-br from-pink-500/20 to-purple-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
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
            <>
              <div
                className={`absolute inset-0 rounded-lg overflow-hidden ${
                  activeTab === "preview" ? "" : "hidden"
                }`}
              >
                <Preview code={generatedCode} loading={loading} />
              </div>
              <div
                className={`absolute inset-0 rounded-lg overflow-hidden ${
                  activeTab === "code" ? "" : "hidden"
                }`}
              >
                <Code code={generatedCode} />
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Main page component with Suspense wrapper
const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="text-gray-400 p-4 flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <BuildPageContent />
    </Suspense>
  );
};

export default Page;
