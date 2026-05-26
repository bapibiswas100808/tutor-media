"use client";

import { useEffect, useState } from "react";
import { MoveUp } from "lucide-react";
import { motion } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      aria-label="Back to top"
      animate={{
        y: [0, -8, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 group transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-[22px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-2xl opacity-70 group-hover:opacity-100 transition-all duration-500 animate-pulse" />

      {/* Main Button */}
      <div className="relative flex items-center justify-center w-16 h-16 rounded-[22px] overflow-hidden border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_15px_45px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
        
        {/* Animated Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 via-purple-500 to-pink-500 opacity-90 animate-gradient" />

        {/* Glass Overlay */}
        <div className="absolute inset-[1px] rounded-[20px] bg-black/10 backdrop-blur-2xl" />

        {/* Shine Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-[-75%] w-1/2 h-full bg-white/20 skew-x-[-25deg] animate-shine" />
        </div>

        {/* Icon */}
        <MoveUp className="relative w-7 h-7 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1" />
      </div>
    </motion.button>
  );
}