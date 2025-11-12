import React from "react";
import clsx from "clsx";
import Loading from "./Loading";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline";
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className,
  children,
  loading = false,
  disabled,
  ...props
}) => {
  const baseStyles =
    "flex-center gap-2 px-4 py-2 rounded-xl font-sm transition-colors duration-200 focus:outline-none focus:ring-0 transition-all active:scale-95 cursor-pointer";

  const variantStyles = {
    default:
      "bg-gradient-to-b from-pink-400 via-pink-400 to-primary text-white hover:opacity-95",
    ghost:
      "bg-transparent text-gray-200 hover:bg-gray-500/30 border border-transparent",
    outline: "border border-pink-400 text-pink-400 hover:bg-pink-500/20",
  };

  const disabledStyles =
    "bg-transparent text-gray-400 cursor-not-allowed hover:opacity-100 active:scale-100 border-gray-600";

  const isDisabled = disabled || loading;

  return (
    <button
      className={clsx(
        baseStyles,
        !isDisabled && variantStyles[variant],
        isDisabled && disabledStyles,
        className
      )}
      style={
        variant === "default" && !isDisabled
          ? { boxShadow: "0 -3px 10px -1px white inset" }
          : {}
      }
      disabled={isDisabled}
      {...props}
    >
      <div className="flex-center gap-2">
        {loading ? <Loading /> : children}
      </div>
    </button>
  );
};

export default Button;
