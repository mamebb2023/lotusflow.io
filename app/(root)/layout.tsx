import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover object-center opacity-35"
          draggable={false}
          priority
        />
      </div>

      <main className="relative z-10">{children}</main>
    </div>
  );
};

export default Layout;
