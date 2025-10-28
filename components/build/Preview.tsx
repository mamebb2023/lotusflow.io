import React from "react";
import { LiveProvider, LiveError, LivePreview } from "react-live";

const extractReturnJSX = (code: string) => {
  const match = code.match(/return\s*\(([\s\S]*?)\);/);
  return match ? match[1].trim() : code;
};

export const Preview = ({ code }: { code: string }) => {
  if (!code?.trim()) return <p className="text-gray-400">No code yet</p>;

  const jsx = extractReturnJSX(code);

  return (
    <div className="border rounded-lg overflow-hidden">
      <LiveProvider code={jsx} scope={{ React }}>
        <div className="p-4">
          <LivePreview />
        </div>
        <LiveError className="text-red-500 text-sm p-2" />
      </LiveProvider>
    </div>
  );
};
