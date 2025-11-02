import React, { useEffect, useRef, useState } from "react";
import * as Babel from "@babel/standalone";
import { motion } from "framer-motion";

interface Props {
  code: string;
}

export const Preview = ({ code }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [previewHtml, setPreviewHtml] = useState("");
  const [error, setError] = useState<string>("");

  // Compile code once when it changes
  useEffect(() => {
    if (!code) {
      setTimeout(() => {
        setPreviewHtml("");
      });
      return;
    }

    try {
      setTimeout(() => {
        setError("");
      });

      // Clean up the code - remove imports and exports properly
      let cleanedCode = (code || "() => <div>No code provided.</div>").trim();

      // Remove all import statements
      cleanedCode = cleanedCode.replace(
        /import\s+.*?from\s+['"].*?['"];?\s*/g,
        ""
      );

      // Remove export default statements (entire line)
      cleanedCode = cleanedCode.replace(/export\s+default\s+\w+;?\s*/g, "");

      // Remove just "export default " prefix (for inline exports like "export default function...")
      cleanedCode = cleanedCode.replace(/export\s+default\s+/g, "");

      // Remove standalone "export" keywords
      cleanedCode = cleanedCode.replace(/export\s+/g, "");

      cleanedCode = cleanedCode.trim();

      // Check if the code is a function component or needs wrapping
      const needsWrapping =
        !cleanedCode.startsWith("(") &&
        !cleanedCode.startsWith("function") &&
        !cleanedCode.match(/^const\s+\w+\s*=/);

      const wrappedCode = needsWrapping
        ? `
        const { useState, useEffect, useRef, useCallback, useMemo } = React;
        const Comp = (${cleanedCode});
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(Comp));
      `
        : `
        const { useState, useEffect, useRef, useCallback, useMemo } = React;
        ${cleanedCode}
        const Comp = typeof ${
          cleanedCode.match(/(?:function|const)\s+(\w+)/)?.[1] || "Component"
        } !== 'undefined' 
          ? ${
            cleanedCode.match(/(?:function|const)\s+(\w+)/)?.[1] || "Component"
          }
          : eval('(' + ${JSON.stringify(cleanedCode)} + ')');
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(Comp));
      `;

      const compiled = Babel.transform(wrappedCode, {
        filename: "file.tsx",
        presets: ["react", "typescript"],
      }).code;

      const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preview</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              html, body, #root {
                width: 100%;
                height: 100%;
              }
              body {
                font-family: system-ui, -apple-system, sans-serif;
                background: transparent;
                overflow: auto;
              }
              #root {
                // display: flex;
                // align-items: center;
                // justify-content: center;
                shrink: 0;
                paddding: 4px;
              }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script src="https://cdn.tailwindcss.com"></script>
            <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script type="text/javascript">
              try {
                ${compiled}
              } catch (err) {
                document.getElementById('root').innerHTML = 
                  '<div style="color:red;padding:2rem;font-family:monospace;max-width:600px;">' + 
                  '<strong>Runtime Error:</strong><br/><br/>' + 
                  err.message + 
                  '</div>';
                console.error(err);
              }
            </script>
          </body>
        </html>
      `;

      setTimeout(() => {
        setPreviewHtml(html);
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : String(err ?? "Babel compilation failed.");
      setTimeout(() => {
        setError(message);
      });
    }
  }, [code]);

  return (
    <div className="relative h-full w-full">
      <motion.div
        key="preview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0"
      >
        {error ? (
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl">
              <h3 className="text-red-800 font-semibold mb-2 flex items-center gap-2">
                Compilation Error
              </h3>
              <pre className="text-sm text-red-700 whitespace-pre-wrap font-mono">
                {error}
              </pre>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            srcDoc={previewHtml}
            title="Component Preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </motion.div>
    </div>
  );
};
