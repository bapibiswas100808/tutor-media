"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface AuthUser {
  id: string | number;
  email: string;
  firstName?: string;
  fullName?: string;
  role: "tutor" | "student";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  isAuthenticated: boolean;
  isTutor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load auth data:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<AuthUser> => {
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
        throw new Error(msg);
      }

      // Extract user and role from response
      const responseUser = data?.tutor ?? data?.user ?? null;
      const role = data?.role ?? responseUser?.role ?? "student";

      if (!responseUser) {
        throw new Error("No user data returned from login");
      }

      const authUser: AuthUser = {
        ...responseUser,
        role,
      };

      // Store in localStorage
      if (data?.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }

      localStorage.setItem("user", JSON.stringify(authUser));
      setUser(authUser);

      return authUser;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user && !!token,
    isTutor: user?.role === "tutor",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
