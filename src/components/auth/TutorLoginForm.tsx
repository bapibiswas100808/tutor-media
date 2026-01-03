"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function TutorLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      // Check if user is a tutor
      const user = data?.tutor ?? data?.user ?? null;
      const role = data?.role ?? user?.role ?? null;

      if (role !== "tutor") {
        setError("Only tutors can log in here. Please use the student login.");
        setLoading(false);
        return;
      }

      if (data?.token) localStorage.setItem("token", data.token);
      if (user) {
        const userToStore = role ? { ...user, role } : user;
        localStorage.setItem("user", JSON.stringify(userToStore));
      }
      const redirectTo = `/tutor-hub/${user?.id || ""}`;
      // Use window.location.href for hard redirect to ensure page reloads with fresh context data
      window.location.href = redirectTo;
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
      className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200"
    >
      <h2 className="text-3xl font-bold mb-2 text-gray-900">Tutor Login</h2>
      <p className="text-gray-600 text-sm mb-6">
        Sign in to manage your profile and connect with students
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="your@email.com"
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            disabled={loading}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-gray-600 text-sm mt-6">
        Not a tutor yet?{" "}
        <a
          href="/become-a-tutor"
          className="text-blue-600 hover:underline font-medium"
        >
          Become a tutor
        </a>
      </p>
    </form>
  );
}
