"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BecomeTutorCTA() {
  return (
<section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-[#2B7FFF] via-[#1d4ed8] to-[#061b49] text-white">
  {/* Background Glow Effects */}
  <div className="absolute -top-24 -left-24 w-64 h-64 md:w-80 md:h-80 bg-[#FFD230]/20 rounded-full blur-3xl" />
  <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-cyan-400/10 rounded-full blur-3xl" />

  {/* Grid Pattern */}
  <div
    className="absolute inset-0 opacity-10"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
      backgroundSize: "26px 26px",
    }}
  />

  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto text-center"
    >
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs sm:text-sm font-medium text-blue-100 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-[#FFD230] animate-pulse" />
        Trusted by Thousands of Tutors Across Bangladesh
      </div>

      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-3">
        Join a Legacy of Excellence
      </h2>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100/90 leading-snug max-w-4xl mx-auto mb-5 md:mb-8 px-1">
        If you have a passion for shaping the next generation, we invite you
        to apply and become part of Bangladesh&apos;s most trusted community
        of educators.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Registration */}
        <Link
          href="/become-a-tutor"
          className="group relative inline-flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-full bg-[#FFD230] px-8 py-3.5 text-base md:text-lg font-bold text-gray-900 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-yellow-400/40"
        >
          <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative">Registration</span>
        </Link>

        {/* Apply Now */}
        <Link
          href="/tuition-jobs"
          className="group relative inline-flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-8 py-3.5 text-base md:text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#2B7FFF]"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative">Apply Now</span>
        </Link>
      </div>
    </motion.div>
  </div>
</section>
  );
}
