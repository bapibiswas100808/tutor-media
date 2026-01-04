"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AdminContextType {
  isAdminAuthenticated: boolean;
  isAdminLoading: boolean;
  adminEmail: string | null;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  // Load admin auth from localStorage on mount
  useEffect(() => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const admin = localStorage.getItem("adminEmail");

      if (adminToken && admin) {
        setIsAdminAuthenticated(true);
        setAdminEmail(admin);
      }
    } catch (error) {
      console.error("Failed to load admin auth data:", error);
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminEmail");
    } finally {
      setIsAdminLoading(false);
    }
  }, []);

  const adminLogin = async (email: string, password: string): Promise<void> => {
    // Check against environment variables
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@tutormedia.com";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      throw new Error("Invalid admin credentials");
    }

    // Generate a simple token
    const adminToken = Buffer.from(`${email}:${Date.now()}`).toString("base64");

    localStorage.setItem("adminToken", adminToken);
    localStorage.setItem("adminEmail", email);

    setIsAdminAuthenticated(true);
    setAdminEmail(email);
  };

  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    setIsAdminAuthenticated(false);
    setAdminEmail(null);
  };

  const value: AdminContextType = {
    isAdminAuthenticated,
    isAdminLoading,
    adminEmail,
    adminLogin,
    adminLogout,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
