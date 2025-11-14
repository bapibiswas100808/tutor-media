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

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <Link
          href="/become-a-tutor"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
        >
          Become a Tutor
        </Link>
        <Link
          href="/hire-tutor"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
        >
          Hire a Tutor
        </Link>
        <Link
          href="/tuition-jobs"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
        >
          Tuition Jobs
        </Link>
      </div>

      {/* Right Side - Image Collage */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative h-[600px] hidden lg:block"
      >
        {/* Main background blob */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-200 via-amber-100 to-blue-100 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-60"></div>

        {/* Top Right - Madrasa Student */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl shadow-2xl overflow-hidden transform rotate-3"
        >
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-700">
            <div className="text-white text-center p-6">
              <div className="text-6xl mb-3">📖</div>
              <p className="font-semibold">Islamic Studies</p>
            </div>
          </div>
        </motion.div>

        {/* Top Left - Art/Drawing Student */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute top-8 left-0 w-60 h-56 bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl shadow-xl overflow-hidden transform -rotate-6"
        >
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-200 to-pink-200">
            <div className="text-center p-6">
              <div className="text-6xl mb-3">🎨</div>
              <p className="font-semibold text-gray-800">Creative Learning</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Left - Bangla Medium Student */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="absolute bottom-0 left-8 w-64 h-72 bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transform rotate-2"
        >
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
            <div className="text-white text-center p-6">
              <div className="text-6xl mb-3">📚</div>
              <p className="font-semibold">Bangla Medium</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Right - English Medium Student */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-12 right-20 w-56 h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl shadow-xl overflow-hidden transform -rotate-3"
        >
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-200 to-emerald-300">
            <div className="text-center p-6">
              <div className="text-6xl mb-3">🇬🇧</div>
              <p className="font-semibold text-gray-800">English Medium</p>
            </div>
          </div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-32 right-32 text-4xl"
        >
          ✏️
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-40 left-40 text-3xl"
        >
          📐
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-10 text-2xl"
        >
          ⭐
        </motion.div>
      </motion.div>
    </section>
  );
}
