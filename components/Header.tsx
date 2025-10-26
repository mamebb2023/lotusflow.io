"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import { AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm w-[33%]">
            <Link
              href="#features"
              className="text-white/90 hover:text-white transition"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-white/80 hover:text-white transition"
            >
              Pricing
            </Link>
            <Link
              href="#docs"
              className="text-white/80 hover:text-white transition"
            >
              Docs
            </Link>
            <Link
              href="#company"
              className="text-white/80 hover:text-white transition"
            >
              Company
            </Link>
          </nav>

          <Link href="/" className="relative flex-center w-[33%]">
            <Logo />
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center justify-end w-[33%]">
            <div className="flex-center gap-3">
              <Link href="/login" className="text-sm">
                <Button variant="ghost">Login</Button>
              </Link>

              <Link href="/register">
                <Button>Try for free</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-white/90 hover:text-white focus:outline-none"
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed left-0 md:hidden bg-black/80 backdrop-blur-sm shadow-sm">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <Link href="#features" className="block text-white/90 py-2">
                Features
              </Link>
              <Link href="#pricing" className="block text-white/90 py-2">
                Pricing
              </Link>
              <Link href="#docs" className="block text-white/90 py-2">
                Docs
              </Link>
              <div className="pt-2 border-t border-white/5">
                <Link href="/signup" className="block py-2 text-white/90">
                  Sign up
                </Link>
                <Link
                  href="/trial"
                  className="block mt-2 py-2 font-semibold bg-white text-black rounded-md text-center"
                >
                  Try for free
                </Link>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
