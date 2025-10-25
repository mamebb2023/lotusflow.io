import ReactLenis from "lenis/react";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

export default Layout;
