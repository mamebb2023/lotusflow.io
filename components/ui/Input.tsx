"use client";

import React, { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="space-y-1 relative">
      <label className="block text-sm text-zinc-400">{label}</label>
      <div className="flex items-center relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`min-w-[300px] w-full px-4 py-2 rounded-xl border transition-all duration-200 
          ${
            error ? "border-red-500" : "border-zinc-700 focus:border-purple-500"
          }
          bg-white/10 backdrop-blur-sm text-white placeholder-zinc-400 outline-none pr-10`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-zinc-400 hover:text-white transition-colors"
          >
            {showPassword ? <LuEyeClosed size={20} /> : <LuEye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
