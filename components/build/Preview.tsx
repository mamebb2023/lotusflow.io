import React from "react";
import { LiveProvider, LiveError, LivePreview, LiveEditor } from "react-live";
import { IoLogoReact } from "react-icons/io5";

interface Props {
  code: string;
  activeTab?: string;
}

export const Preview = ({ code, activeTab }: Props) => {
  // Handle empty or invalid code
  const safeCode =
    code?.trim() ||
    "() => <div className='text-gray-400 p-2'>No component generated yet. Start a conversation!</div>";

  return (
    <LiveProvider code={safeCode} scope={{ React }}>
      {activeTab === "preview" && (
        <div className="rounded-lg overflow-hidden h-full">
          <div className="p-2 h-full overflow-auto flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <LivePreview />
            </div>
          </div>
          <LiveError className="text-red-500 text-sm p-4" />
        </div>
      )}
      {activeTab === "code" && (
        <div className="h-full bg-[#1e1e1e] rounded-lg overflow-hidden flex flex-col">
          {/* File Tab */}
          <div className="bg-[#151515] border-b border-[#333] flex items-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-r border-[#333] text-sm text-gray-300 ml-10">
              <IoLogoReact className="text-[#61dafb]" size={16} />
              <span className="flex-1">component.jsx</span>
            </div>
            <div className="flex-1 bg-[#151515]" />
          </div>

          <style jsx global>{`
            .npm__react-simple-code-editor__textarea,
            .npm__react-simple-code-editor__textarea:focus {
              outline: none !important;
              padding-left: 60px !important;
              font-family: "Fira Code", "Consolas", "Monaco", monospace !important;
              font-size: 14px !important;
              line-height: 1.6 !important;
            }

            .prism-code {
              padding-left: 60px !important;
              font-family: "Fira Code", "Consolas", "Monaco", monospace !important;
              font-size: 14px !important;
              line-height: 1.6 !important;
              background: #1e1e1e !important;
              color: #d4d4d4 !important;
              counter-reset: line !important;
            }

            .react-live-editor {
              position: relative;
              background: #1e1e1e !important;
              overflow: auto !important;
            }

            /* Line numbers sidebar */
            .react-live-editor::before {
              content: "";
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              width: 50px;
              background: #151515;
              border-right: 1px solid #333;
              z-index: 1;
            }

            /* Line numbers */
            .token-line {
              position: relative;
            }

            .token-line::before {
              counter-increment: line;
              content: counter(line);
              position: absolute;
              left: -60px;
              width: 50px;
              text-align: right;
              padding-right: 12px;
              color: #858585;
              user-select: none;
              font-size: 13px;
            }
          `}</style>

          <div className="flex-1 overflow-hidden">
            <LiveEditor className="h-full" />
          </div>

          <LiveError className="text-red-500 text-sm p-4 bg-red-900/20 border-t border-red-500/30" />
        </div>
      )}
    </LiveProvider>
  );
};
