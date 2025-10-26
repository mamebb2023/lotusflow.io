import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline";
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className,
  ...props
}) => {
  const baseStyles =
    "flex-center px-4 py-2 rounded-xl font-sm transition-colors duration-200 focus:outline-none focus:ring-0 cursor-pointer transition-all active:scale-95";

  const variantStyles = {
    default:
      "bg-gradient-to-b from-pink-400 via-pink-400 to-pink-600 text-white hover:opacity-95",
    ghost: "bg-transparent text-gray-200 hover:bg-gray-500/30 hover:text-white",
    outline: "border border-pink-600 text-pink-600 hover:bg-pink-50",
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      style={
        variant === "default"
          ? { boxShadow: "0 -3px 10px -1px white inset" }
          : {}
      }
      {...props}
    />
  );
};

export default Button;
