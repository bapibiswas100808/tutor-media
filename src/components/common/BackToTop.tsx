"use client";

import { useEffect, useState } from "react";
import { MoveUp } from "lucide-react";

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
    <button
  onClick={scrollToTop}
  aria-label="Back to top"
  className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50
    rounded-full bg-blue-600 text-white shadow-lg
    p-3 sm:p-3.5
    transition-all duration-300 cursor-pointer
    hover:bg-blue-500 motion-safe:hover:-translate-y-1
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
    ${
      visible
        ? "opacity-100 scale-100"
        : "opacity-0 scale-90 pointer-events-none"
    }
  `}
>
  <MoveUp className="w-5 h-5" />
</button>

  );
}
