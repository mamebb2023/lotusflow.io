"use client";

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { motion } from "framer-motion";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});
    console.log("Login success:", form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex-1 flex items-center justify-between flex-col p-5"
    >
      <div className="flex-1 flex justify-center flex-col gap-3">
        <h1 className="text-4xl text-center tracking-wider text-primary-light">
          Welcome Back
        </h1>
        <p className="text-center">Login to your account</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md mx-auto w-full"
        >
          <Input
            type="email"
            placeholder="your@email.com"
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            placeholder="*********"
          />
          <Button type="submit" className="w-full mt-2">
            Login
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
          Don&apos;t have an account?
          <Link href="/register" className="hover:underline text-primary-light">
            Create an account
          </Link>
        </div>
        <Link
          href="/terms"
          className="hover:underline hover:text-zinc-400 7hover:hover:underline"
        >
          Terms & Conditions
        </Link>
      </motion.div>
    </motion.div>
  );
}
