"use client";

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

  const tabs = [
    { id: "preview", label: "Preview", icon: MdOutlineMonitor },
    { id: "code", label: "Code", icon: IoCodeSlash },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Section */}
      <motion.div
        animate={{
          width: collapsed ? "70px" : "350px", // ✅ Animate width
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#151515] flex flex-col p-2 gap-4 overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`${collapsed ? "pointer-events-none" : ""}`}
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

        <motion.div
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className={`flex-1 ${collapsed ? "pointer-events-none" : ""}`}
        >
          chat
        </motion.div>

        <motion.div
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className={`${collapsed ? "pointer-events-none" : ""}`}
        >
          <div className="bg-[#1e1e1e]/90 backdrop-blur-sm border border-pink-300 rounded-2xl focus-within:ring-2 focus-within:ring-pink-300 transition-all overflow-hidden">
            <div className="flex flex-col">
              <div className="flex-1 px-5 pt-3 rounded-2xl">
                <textarea
                  placeholder="Type your message..."
                  className="w-full text-sm resize-none placeholder-gray-400 outline-none transition-all duration-200 bg-transparent"
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto"; // reset height
                    target.style.height = `${Math.min(
                      target.scrollHeight,
                      200
                    )}px`; // grow up to 200px
                  }}
                />
              </div>

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
        </motion.div>
      </motion.div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="bg-[#151515] p-2 flex items-center justify-between gap-2 text-sm">
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

        {/* Tab Content */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab} // 🔹 Important for exit animation
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 p-4 flex-center"
            >
              {activeTab === "preview" && "Overview Content"}
              {activeTab === "code" && "Components Content"}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Page;
