"use client";

import React from "react";
import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import Logo from "./ui/Logo";
import { motion } from "framer-motion";

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Contact", href: "/contact" },
  ];

  const socials = [
    { icon: <FaTwitter />, href: "https://twitter.com" },
    { icon: <FaGithub />, href: "https://github.com" },
    { icon: <FaLinkedin />, href: "https://linkedin.com" },
    { icon: <FaGlobe />, href: "#" },
  ];

  return (
    <footer className="relative p-6 mt-12 border-t border-white/10">
      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="absolute inset-0 -z-10 blur-[120px] bg-linear-to-r from-pink-500/90 via-purple-500/90 to-indigo-500/90"
      />

      {/* Container */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        {/* Left - Brand + Links */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Logo />
          <nav className="flex gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right - Socials */}
        <div className="flex gap-4 text-lg">
          {socials.map((social, i) => (
            <Link
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} LotusFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
