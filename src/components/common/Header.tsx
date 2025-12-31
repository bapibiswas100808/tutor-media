"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/context/AdminContext";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Tuition Jobs", href: "/tuition-jobs" },
  { name: "Tutor Hub", href: "/tutor-hub" },
  { name: "Categories", href: "/mediums" },
  { name: "Blog", href: "/blog" },
  // { name: "Shop", href: "/shop" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const { isAdminAuthenticated, adminLogout, adminEmail } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();

  // Check if we're on admin pages
  const isAdminPage = pathname?.startsWith("/admin");

  // Ensure component is mounted before rendering auth-dependent content
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock/unlock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showUserMenu]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push("/");
  };

  const handleAdminLogout = () => {
    adminLogout();
    setShowUserMenu(false);
    router.push("/admin/login");
  };

  const getFirstName = () => {
    return (
      user?.firstName ||
      user?.fullName?.split(" ")[0] ||
      user?.email?.split("@")[0] ||
      "User"
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center ">
            <Image
              src="/images/logo.png"
              alt="Tutor Media Logo"
              width={140}
              height={50}
              priority
              className="object-contain h-50 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-semibold text-xl transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAdminPage && isAdminAuthenticated ? (
              // Admin logout button
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium text-sm">
                  Admin: {adminEmail}
                </span>
                <button
                  onClick={handleAdminLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : isLoading || !isMounted ? (
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {getFirstName().charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium hidden sm:inline">
                    {getFirstName()}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-[9999]"
                    >
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-semibold text-gray-800">
                          {getFirstName()}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>

                      {user?.role === "tutor" && (
                        <>
                          <Link
                            href={`/complete-profile/${user?.id}`}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Complete Profile
                          </Link>
                          <Link
                            href={`/tutor-hub/${user?.id}`}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            My Profile
                          </Link>
                        </>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2 border-t border-gray-200"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 font-semibold px-4 py-2 rounded-full transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/become-a-tutor"
                  className="bg-[#0D24A0] hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-colors duration-200"
                >
                  Become a Tutor
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {isAuthenticated && user ? (
                  <>
                    <div className="px-4 py-3 border-t border-gray-200 border-b">
                      <p className="font-semibold text-gray-800">
                        {getFirstName()}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    {user?.role === "tutor" && (
                      <>
                        <Link
                          href={`/complete-profile/${user?.id}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Complete Profile
                        </Link>
                        <Link
                          href={`/tutor-hub/${user?.id}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          My Profile
                        </Link>
                      </>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <div className="px-4 pt-4 border-t border-gray-200">
                      <Link
                        href="/become-a-tutor"
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        Become a Tutor
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
