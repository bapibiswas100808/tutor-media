"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Connect Students with
            <span className="block text-yellow-300">Perfect Tutors</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            Find qualified tutors for home, online, and group tutoring. Start
            your learning journey today with Tutor Media.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link
              href="/hire-tutor"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Hire a Tutor
            </Link>
            <Link
              href="/become-a-tutor"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Become a Tutor
            </Link>
            <Link
              href="/tuition-jobs"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
            >
              Job Board
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-20"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="white"
          ></path>
        </svg>
      </div> */}
    </section>
  );
}
