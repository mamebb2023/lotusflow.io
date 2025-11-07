// app/(root)/(pages)/layout.tsx

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ReactLenis from "lenis/react";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root>
      <Header />
      {children}
      <Footer />
    </ReactLenis>
  );
};

export default Layout;
