import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
      </div>
      {children}
    </div>
  );
};

export default Layout;
