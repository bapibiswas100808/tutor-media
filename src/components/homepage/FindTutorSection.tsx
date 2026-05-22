"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, Star, Users, BookOpen } from "lucide-react";

const STATS = [
  { icon: Users, value: "100k+", label: "Expert Tutors" },
  { icon: BookOpen, value: "50+", label: "Subjects" },
  { icon: Star, value: "10k+", label: "Students" },
];

export default function FindTutorSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 flex justify-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 to-indigo-400/20 scale-105 blur-sm -z-10" />
              {/* Main image */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-blue-100">
                <Image
                  src="/images/findTutor.webp"
                  alt="Find a Tutor"
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 500px"
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent pointer-events-none" />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-white rounded-2xl shadow-xl border border-blue-100 px-4 py-2.5 flex items-center gap-2"
              >
                <span className="text-2xl">🎓</span>
                <div>
                  <p className="text-xs text-gray-500 leading-none">
                    Tutors online
                  </p>
                  <p className="text-sm font-bold text-blue-700 leading-tight">
                    100k+ Active
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5"
          >
            {/* Pill label */}
            <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              <Search className="w-3.5 h-3.5" />
              Smart Tutor Matching
            </span>

            <div>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight">
                Find Your
              </h2>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#1447E6] leading-tight mt-1">
                Perfect Mentor Today
              </h2>
            </div>

            <p className="text-base sm:text-lg text-gray-500 max-w-md leading-relaxed">
              Connect with verified, expert tutors tailored to your learning
              goals — from school subjects to professional skills.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start w-full">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm"
                >
                  <Icon className="w-4 h-4 text-blue-500 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-gray-800 leading-none">
                      {value}
                    </p>
                    <p className="text-xs text-gray-400 leading-tight mt-0.5">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/tutor-hub"
              className="inline-flex items-center gap-2 bg-[#1447E6] hover:bg-[#093ede] text-white font-semibold py-3 px-8 rounded-full text-sm transition-all duration-200 shadow-lg hover:shadow-blue-400/40 hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4" />
              Find a Mentor
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
