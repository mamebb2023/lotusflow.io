"use client";

import { Preview } from "@/components/build/Preview";
import Button from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { IoCodeSlash } from "react-icons/io5";
import { MdOutlineMonitor } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import Code from "@/components/build/Code";
import ChatSidebar from "@/components/build/ChatSidebar";

const Page = () => {
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
  useEffect(() => {
    const urlPrompt = searchParams.get("prompt");
    if (urlPrompt) {
      // Automatically send the prompt
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
        body: JSON.stringify({ prompt: promptText }),
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

  const handleSend = async () => {
    if (!input.trim()) return;
    setGeneratedCode("");

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

  // Handle example prompt click - run immediately
  const handleExampleClick = (prompt: string) => {
    handleSendWithPrompt(prompt);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-screen overflow-hidden"
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
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 rounded-lg overflow-hidden"
              >
                {activeTab === "preview" && <Preview code={generatedCode} />}
                {activeTab === "code" && <Code code={generatedCode} />}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Page;
