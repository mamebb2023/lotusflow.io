"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoLogoReact } from "react-icons/io5";
import { FiCheck, FiCopy } from "react-icons/fi";

const Code = ({
  code,
  language = "jsx",
}: {
  code: string;
  language?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const displayCode = code.trim() || "// No code provided";

  // Calculate line numbers from the exact string being displayed
  const lineNumbers = displayCode.split("\n").map((_, i) => i + 1);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Custom style to match VS Code dark theme
  const customStyle = {
    margin: 0,
    padding: "12px",
    background: "#1e1e1e",
    fontSize: "14px",
    lineHeight: "24px",
    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-[#1e1e1e]">
      {/* File Tab Header */}
      <div className="bg-[#151515] flex items-center shrink-0 border-b border-[#333]">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] text-sm text-gray-300">
          <IoLogoReact className="text-[#61dafb]" size={16} />
          <span>component.jsx</span>
        </div>
        <div className="flex-1 bg-[#151515]" />
        <button
          onClick={handleCopy}
          disabled={!code.trim()}
          className={`flex items-center gap-1.5 mr-3 px-2.5 py-1 rounded-md text-xs transition-all ${
            copied
              ? "text-green-400 bg-green-500/10"
              : "text-gray-400 hover:text-white hover:bg-white/10"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code Editor */}
      <div className="flex-1 overflow-auto">
        <div className="flex min-h-full">
          {/* Line Numbers */}
          <div className="bg-[#1e1e1e] border-r border-[#333] px-4 py-3 select-none shrink-0">
            {lineNumbers.map((num) => (
              <div
                key={num}
                className="text-[#858585] text-right font-mono text-sm"
                style={{ height: "24px", lineHeight: "24px" }}
              >
                {num}
              </div>
            ))}
          </div>

          {/* Code Content with Syntax Highlighting */}
          <div className="flex-1 overflow-x-auto">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={customStyle}
              showLineNumbers={false}
              wrapLines={true}
            >
              {displayCode}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Code;
