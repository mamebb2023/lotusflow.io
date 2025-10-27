"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔹 Navigation data arrays
  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#docs", label: "Docs" },
    { href: "#company", label: "Company" },
  ];

  const mobileActions = [
    { href: "/signup", label: "Sign up", variant: "ghost" },
    { href: "/trial", label: "Try for free", variant: "solid" },
  ];

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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo Center */}
          <Link href="/" className="relative flex-center w-[33%]">
            <Logo />
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center justify-end w-[33%]">
            <div className="flex-center gap-3">
              <Link href="/login" className="text-sm">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/dashboard">
                <Button>Try for free</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="px-2!"
              variant="ghost"
            >
              <FiMenu size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut" }}
            className="fixed top-0 w-full h-screen md:hidden flex justify-end bg-black/80 backdrop-blur-sm shadow-sm"
          >
            {/* <div className="absolute left-0 bottom-40">
              <Image
                src="/lotusflow-logo-squasre.png"
                alt="Lotus"
                width={150}
                height={150}
                className="opacity-30"
              />
            </div> */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="flex flex-col justify-between min-w-1/2 p-4"
            >
              <Button
                variant="ghost"
                className="self-end px-2!"
                onClick={() => setMobileOpen(false)}
              >
                <FiX size={24} />
              </Button>

              {/* Mobile Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    className="py-1! justify-start!"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link href={link.href} className="block text-white/90 py-2">
                      {link.label}
                    </Link>
                  </Button>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="pt-2 border-t border-white/5">
                {mobileActions.map((action) =>
                  action.variant === "solid" ? (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="block mt-2 py-2 font-semibold bg-white text-black rounded-md text-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      {action.label}
                    </Link>
                  ) : (
                    <Button
                      key={action.href}
                      variant="ghost"
                      className="py-1! justify-start!"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link
                        href={action.href}
                        className="block py-2 text-white/90"
                      >
                        {action.label}
                      </Link>
                    </Button>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
