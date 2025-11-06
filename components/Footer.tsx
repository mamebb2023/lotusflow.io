"use client";

import React from "react";
import Link from "next/link";
import Logo from "./ui/Logo";
import { motion } from "framer-motion";
import { links } from "@/constants";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const socials = [
    { icon: <FaXTwitter />, href: "https://x.com/lotusflowio" },
    {
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/company/lotusflowio",
    },
  ];

  return (
    <footer className="relative p-6 mt-12 border-t border-white/10">
      {/* Background Glow */}
      <motion.div
        // initial={{ opacity: 0 }}
        // whileInView={{ opacity: 1 }}
        className="absolute inset-0 -z-10 blur-[120px] bg-linear-to-r from-primary/90 via-primary-dark-90 to-primary-light/90"
      />

      {/* Container */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-300">
        {/* Left - Brand + Links */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Logo />
          <nav className="flex gap-4">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-white transition"
              >
                {link.label}
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
      <div className="text-center text-xs text-gray-400 mt-6">
        © {new Date().getFullYear()} LotusFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
