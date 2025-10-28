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

  // 🧠 NEW STATES
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

  // ⚙️ Send prompt to AI (this should hit your backend route /api/generate)
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
        animate={{ width: collapsed ? "70px" : "350px" }}
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

          <Button variant="ghost" onClick={() => setCollapsed((v) => !v)}>
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
          className={`flex-1 overflow-y-auto flex flex-col gap-2 ${
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
              {activeTab === "preview" && (
                <div className="h-full rounded-lg p-4 overflow-auto text-black">
                  {/* 🧩 Try to render generated JSX safely */}
                  <Preview code={generatedCode} />
                </div>
              )}
              {activeTab === "code" && (
                <pre className="bg-[#111] text-green-400 text-sm p-4 rounded-lg overflow-auto h-full">
                  {generatedCode || "No code generated yet."}
                </pre>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// 🧩 Renders JSX safely
// const Preview = ({ code }: { code: string }) => {
//   const { Comp, error } = React.useMemo(() => {
//     if (!code?.trim()) return { Comp: null, error: null };

//     try {
//       // 🧹 Step 1: Strip out imports/exports/comments
//       const cleaned = code
//         .replace(/import[^;]+;/g, "")
//         .replace(/export\s+default\s+[^;]+;/g, "")
//         .replace(/export\s+\{[^}]+\};/g, "")
//         .replace(/\/\*[\s\S]*?\*\//g, "") // remove /* comments */
//         .replace(/\/\/.*/g, ""); // remove // comments

//       // 🧠 Step 2: Extract content between return ( ... )
//       const match = cleaned.match(/return\s*\(([\s\S]*?)\);/);

//       if (!match || !match[1]) {
//         throw new Error("Could not extract JSX from return statement");
//       }

//       const jsxBody = match[1].trim();

//       // 🧩 Step 3: Wrap it into a simple functional component
//       const safeCode = `(function PreviewComponent() { return (${jsxBody}); })`;

//       // 🧪 Step 4: Evaluate safely
//       const componentFactory = new Function("React", `return ${safeCode}`)(
//         React
//       );

//       if (typeof componentFactory === "function") {
//         return { Comp: componentFactory, error: null };
//       }

//       throw new Error("Invalid component structure");
//     } catch (e) {
//       console.error("Preview error:", e);
//       return { Comp: null, error: e as Error };
//     }
//   }, [code]);

//   if (error || !Comp) {
//     return (
//       <p className="text-gray-500 text-center text-sm">
//         {error ? `Preview Error: ${error.message}` : "Preview unavailable."}
//       </p>
//     );
//   }

//   const RenderComp = Comp as React.ComponentType<unknown>;
//   return (
//     <div className="p-4 border rounded-lg bg-white text-black">
//       <RenderComp />
//     </div>
//   );
// };

export default Page;
