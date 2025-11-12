"use client";

import Lotus from "@/components/ui/Lotus";
import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen flex overflow-hidden">
      <div className="absolute inset-0 -z-10 backgrop-blur-[120px] bg-linear-to-t from-primary/10 via-primary-dark/20 to-transparent flex-center flex-col gap-4" />

      {children}

      <div className="relative flex-1 hidden md:flex items-center justify-end">
        <div className="absolute">
          <Lotus animatePetals={false} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
