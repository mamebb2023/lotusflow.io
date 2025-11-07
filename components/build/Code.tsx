import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoLogoReact } from "react-icons/io5";

const Code = ({
  code,
  language = "jsx",
}: {
  code: string;
  language?: string;
}) => {
  // Calculate line numbers
  const lines = code.split("\n");
  const lineNumbers = lines.map((_, i) => i + 1);

  // Custom style to match VS Code dark theme
  const customStyle = {
    margin: 0,
    padding: "12px",
    background: "#1e1e1e",
    fontSize: "14px",
    lineHeight: "1.5",
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
              {code.trim() || "// No code provided"}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Code;
