import React from "react";

const GradientText = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-light to-primary">
      {children}
    </span>
  );
};

export default GradientText;
