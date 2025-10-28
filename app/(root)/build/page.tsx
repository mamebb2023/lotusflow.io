"use client";

import { Preview } from "@/components/build/Preview";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { IoCodeSlash } from "react-icons/io5";
import { MdOutlineMonitor } from "react-icons/md";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

const Page = () => {
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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: { role: "user" | "assistant"; text: string } = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
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
    <div className="flex h-screen overflow-hidden">
      {/* Left Section - Chat */}
      <motion.div
        animate={{ width: collapsed ? "70px" : "400px" }}
        transition={{ duration: 0.3 }}
        className="bg-[#151515] flex flex-col p-2 gap-4 overflow-hidden"
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
          {messages.map((m, i) => (
            <div
              key={i}
              className={`text-sm px-3 py-2  max-w-[90%] ${
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
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSend()
                }
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0"
            >
              <Preview code={generatedCode} activeTab={activeTab} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Page;
