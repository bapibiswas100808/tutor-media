"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please provide email and password.");
      return;
    }

    setLoading(true);
    try {
      const user = await login(email, password);

      // Redirect based on role and completion status
      if (user.role === "tutor") {
        // For tutors, redirect to complete profile if needed
        const redirectTo = `/complete-profile/${user?.id || ""}`;
        router.push(redirectTo);
      } else {
        // For students/others, redirect to tutor hub
        router.push("/tutor-hub");
      }
    } catch (err: unknown) {
      let message = "Network error. Please try again.";
      if (err instanceof Error) message = err.message;
      else if (typeof err === "string") message = err;
      else {
        try {
          message = JSON.stringify(err);
        } catch {
          // leave default
        }
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-600">
        Login to your account
      </h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <label className="block mb-2 text-sm font-medium">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
        placeholder="you@example.com"
      />

      <label className="block mb-2 text-sm font-medium">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
        placeholder="Your password"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
