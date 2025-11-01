import React from "react";
import { motion } from "framer-motion";
import { IoLogoReact } from "react-icons/io5";

const Code = ({ code }: { code: string }) => {
  // Calculate line numbers
  const lines = code.split("\n");
  const lineNumbers = lines.map((_, i) => i + 1);

  return (
    <motion.div
      key="code"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 flex flex-col"
    >
      {/* File Tab Header */}
      <div className="bg-[#151515] flex items-center shrink-0 border-b border-[#333]">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] text-sm text-gray-300">
          <IoLogoReact className="text-[#61dafb]" size={16} />
          <span>component.jsx</span>
        </div>
        <div className="flex-1 bg-[#151515]" />
      </div>

      {/* Code Editor */}
      <div className="flex-1 overflow-auto ">
        <div className="flex min-h-full">
          {/* Line Numbers */}
          <div className="bg-[#1e1e1e] border-r border-[#333] px-4 py-3 select-none shrink-0">
            {lineNumbers.map((num) => (
              <div
                key={num}
                className="text-[#858585] text-right font-mono text-sm leading-6"
                style={{ height: "24px" }}
              >
                {num}
              </div>
            ))}
          </div>

          {/* Code Content */}
          <pre className="flex-1 p-3 text-sm font-mono text-gray-200 leading-6 overflow-x-auto">
            <code>{code.trim() || "// No code provided"}</code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
};

export default Code;
