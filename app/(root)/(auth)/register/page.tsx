"use client";

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { motion } from "framer-motion";
import Link from "next/link";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      return;
    }

    setErrors({});
    console.log("Register success:", form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex-1 flex items-center justify-between flex-col p-5 overflow-y-auto"
    >
      <div className="flex-1 flex justify-center flex-col gap-3">
        <h1 className="text-4xl text-center tracking-wider text-primary-light">
          Create Account
        </h1>
        <p className="text-center">Register your new account</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md mx-auto w-full"
        >
          <Input
            label="Name"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
          />
          <Input
            type="email"
            label="Email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="*********"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="*********"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            error={errors.confirmPassword}
          />
          <Button type="submit" className="w-full mt-2">
            Register
          </Button>
        </form>

        <div className="flex-center gap-2 text-sm text-gray-500">
          <div className="flex-1 border-t border-gray-500/50"></div>
          OR
          <div className="flex-1 border-t border-gray-500/50"></div>
        </div>

        <Button variant="ghost" className="border! border-primary-light/20!">
          <FcGoogle size={20} />
          Continue with Google
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="w-full flex items-center justify-between p-4 text-sm text-zinc-500"
      >
        <div className="flex gap-1">
          Already have an account?
          <Link href="/login" className="hover:underline text-primary-light">
            Login
          </Link>
        </div>
        <Link href="/privacy" className="hover:underline hover:text-zinc-400">
          Privacy Policy
        </Link>
      </motion.div>
    </motion.div>
  );
}
