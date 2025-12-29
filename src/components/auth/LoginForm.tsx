"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
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
      const res = await fetch(
        "https://pro-assignment-twelve-server.vercel.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      let data = null;
      try {
        data = await res.json();
      } catch {
        // non-json response allowed
      }

      if (!res.ok) {
        const msg =
          data?.error || data?.message || `Login failed (${res.status})`;
        setError(msg);
        setLoading(false);
        return;
      }

      // prefer backend 'tutor' field, otherwise 'user'
      const user = data?.tutor ?? data?.user ?? null;
      const role = data?.role ?? user?.role ?? null;

      if (data?.token) localStorage.setItem("token", data.token);
      if (user) {
        const userToStore = role ? { ...user, role } : user;
        localStorage.setItem("user", JSON.stringify(userToStore));
      }

      const redirectTo = `/tutor-hub/${user?.id || ""}`;
      router.push(redirectTo);
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
