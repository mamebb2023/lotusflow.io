import React, { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 no-underline">
              {/* simple inline SVG lotus mark */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                className="flex-shrink-0"
                aria-hidden
              >
                <path
                  d="M12 2s3 3.5 3 6-1.5 4-3 4-3-2-3-4 3-6 3-6z"
                  fill="currentColor"
                  opacity="0.95"
                />
                <path
                  d="M12 2s-3 3.5-3 6 1.5 4 3 4 3-2 3-4-3-6-3-6z"
                  fill="currentColor"
                  opacity="0.75"
                />
                <circle
                  cx="12"
                  cy="14"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="0.6"
                  fill="none"
                  opacity="0.06"
                />
              </svg>

              <span className="text-white font-semibold text-lg">
                LotusFlow
              </span>
            </a>
          </div>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-white/90 hover:text-white transition"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-white/80 hover:text-white transition"
            >
              Pricing
            </a>
            <a
              href="#docs"
              className="text-white/80 hover:text-white transition"
            >
              Docs
            </a>
            <a
              href="#company"
              className="text-white/80 hover:text-white transition"
            >
              Company
            </a>
          </nav>

          {/* actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#signup"
              className="px-3 py-1.5 rounded-md text-sm font-medium border border-white/20 text-white/90 hover:bg-white/5 transition"
            >
              Sign up
            </a>

            <a
              href="#trial"
              className="inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold bg-white text-black shadow-sm hover:opacity-95 transition"
            >
              Try for free
            </a>
          </div>

          {/* mobile toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-white/90 hover:text-white/100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-sm shadow-sm">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a href="#features" className="block text-white/90 py-2">
              Features
            </a>
            <a href="#pricing" className="block text-white/90 py-2">
              Pricing
            </a>
            <a href="#docs" className="block text-white/90 py-2">
              Docs
            </a>
            <div className="pt-2 border-t border-white/5">
              <a href="#signup" className="block py-2 text-white/90">
                Sign up
              </a>
              <a
                href="#trial"
                className="block mt-2 py-2 font-semibold bg-white text-black rounded-md text-center"
              >
                Try for free
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
