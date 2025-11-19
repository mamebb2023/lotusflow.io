"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";

const CookieNotice = () => {
  const [open, setOpen] = useState<boolean>(() => {
    // Guard for environments where window/localStorage may not be available
    if (typeof window === "undefined") return false;
    const hasAccepted = localStorage.getItem("lotus_cookie_notice");
    return !hasAccepted;
  });

  const acceptCookies = () => {
    localStorage.setItem("lotus_cookie_notice", "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-[#111] border border-white/10 text-gray-300 text-sm p-4 rounded-xl max-w-xs shadow-lg z-998 animate-fade-in">
      <p>
        We use cookies to enhance your experience and understand how LotusFlow
        is used.
      </p>

      <div className="flex justify-between items-center mt-3">
        <button
          onClick={acceptCookies}
          className="px-3 py-1 rounded-lg bg-white text-black text-xs hover:bg-gray-200 transition"
        >
          Got it
        </button>

        <button
          onClick={acceptCookies}
          className="text-gray-400 hover:text-white"
        >
          <IoClose size={18} />
        </button>
      </div>
    </div>
  );
};

export default CookieNotice;
