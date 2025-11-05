"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import Loading from "@/components/ui/Loading";
import { FiZap, FiSend } from "react-icons/fi";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { RiSparklingFill } from "react-icons/ri";

interface Message {
  role: "user" | "assistant";
  text: string;
}

interface ChatSidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  messages: Message[];
  input: string;
  setInput: (v: string) => void;
  handleSend: () => void;
  handleExampleClick: (prompt: string) => void;
  loading: boolean;
  examplePrompts: string[];
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  collapsed,
  setCollapsed,
  messages,
  input,
  setInput,
  handleSend,
  handleExampleClick,
  loading,
  examplePrompts,
}) => {
  return (
    <motion.div
      animate={{ width: collapsed ? "50px" : "400px" }}
      transition={{ duration: 0.3 }}
      className="bg-[#151515] flex flex-col p-2 gap-4 max-w-[400px] overflow-y-hidden"
    >
      {/* Header */}
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
          onClick={() => setCollapsed((v: boolean) => !v)}
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <TbLayoutSidebarLeftCollapse />
          </motion.div>
        </Button>
      </div>

      {/* Messages / Examples */}
      <motion.div
        animate={{ opacity: collapsed ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        className={`flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-2 p-2 ${
          collapsed ? "pointer-events-none" : ""
        }`}
        style={{ minHeight: 0 }}
      >
        {messages.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <div className="w-16 h-16 bg-linear-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <RiSparklingFill className="text-white text-3xl" />
              </div>
            </motion.div>

            <h2 className="text-white text-xl font-semibold mb-2">
              Start Building
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Describe any UI component and watch LotusFlow create it instantly
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
                  onClick={() => handleExampleClick(prompt)}
                  className="w-full text-left px-3 py-2 bg-[#1e1e1e] hover:bg-[#252525] border border-gray-800 hover:border-pink-500/30 rounded-lg text-sm text-gray-300 transition-all duration-200 group"
                >
                  <span className="flex items-center gap-2">
                    <FiZap
                      className="text-pink-500 opacity-20 group-hover:opacity-100 transition-opacity"
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
              <motion.div
                key={i}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`text-sm px-3 py-2 max-w-[90%] ${
                  m.role === "user"
                    ? "bg-pink-500/20 self-end text-pink-200 rounded-t-xl rounded-bl-xl"
                    : "text-gray-300"
                }`}
              >
                {m.text}
              </motion.div>
            ))}
            {loading && (
              <p className="text-gray-400 text-xs px-3 flex items-center">
                <Loading />{" "}
                <span className="ml-2">Generating component...</span>
              </p>
            )}
          </>
        )}
      </motion.div>

      {/* Input */}
      <motion.div
        animate={{ opacity: collapsed ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className="bg-[#1e1e1e]/90 border border-pink-300 rounded-2xl p-1">
          <div className="flex flex-col">
            <textarea
              placeholder="Ask LotusFlow to build a button, card, or footer..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="w-full text-sm resize-none overflow-hidden placeholder-gray-400 outline-none bg-transparent px-4 py-3 min-h-10 max-h-[200px]"
            />
            <Button
              onClick={handleSend}
              loading={loading}
              disabled={loading}
              className="self-end px-2!"
            >
              <FiSend size={18} />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatSidebar;
