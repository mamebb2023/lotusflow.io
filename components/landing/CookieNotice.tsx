"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";

const CookieNotice = () => {
  // Lazy initialization - only runs once on mount
  const [shouldShow, setShouldShow] = useState(() => {
    if (typeof window === "undefined") return false;
    const accepted = localStorage.getItem("lotus_cookie_notice");
    return !accepted;
  });

  const acceptCookies = () => {
    localStorage.setItem("lotus_cookie_notice", "true");
    setShouldShow(false);
  };

  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-[#111] border border-white/10 text-gray-300 text-sm p-4 rounded-xl max-w-xs shadow-lg z-998">
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
          aria-label="Close cookie notice"
        >
          <IoClose size={18} />
        </button>
      </div>
    </div>
  );
};

export default CookieNotice;
