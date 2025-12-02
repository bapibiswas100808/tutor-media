"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-white via-blue-300 to-orange-400 overflow-hidden">
      {/* Decorative background elements */}
      {/* <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"></div> */}

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-left"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Connecting Learners to Verified and Qualified Tutors
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-xl">
              Hire the Right Tutor or get Tuition in your Area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link
                href="/hire-tutor"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
              >
                Hire a Tutor
              </Link>
              <Link
                href="/become-a-tutor"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
              >
                Become a Tutor
              </Link>
              <Link
                href="/tuition-jobs"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
              >
                Tuition Jobs
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:flex flex-wrap justify-center items-center gap-6 relative  hidden"
          >
            {/* Main background blob */}
            {/* <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-200 via-amber-100 to-blue-100 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-60"></div> */}
            {/* Top Left - Art/Drawing Student */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className=" top-0 left-5 w-72 h-72 bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl rounded-br-none shadow-xl overflow-hidden transform -rotate-0"
            >
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-200 to-pink-200">
                <div className="text-center p-6">
                  <div className="text-6xl mb-3">🎨</div>
                  <p className="font-semibold text-gray-800">
                    Creative Learning
                  </p>
                </div>
              </div>
            </motion.div>
            {/* Top Right - Madrasa Student */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className=" top-8 right-8 w-64 h-64 bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl rounded-bl-none shadow-2xl overflow-hidden transform rotate-0"
            >
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-700">
                <div className="text-white text-center p-6">
                  <div className="text-6xl mb-3">📖</div>
                  <p className="font-semibold">Islamic Studies</p>
                </div>
              </div>
            </motion.div>

            {/* Bottom Left - Bangla Medium Student */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className=" bottom-8 left-5 w-64 h-64 bg-gray-800 rounded-3xl rounded-tr-none shadow-2xl overflow-hidden transform rotate-0"
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
              className=" bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl rounded-tl-none shadow-xl overflow-hidden transform rotate-0"
            >
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-200 to-emerald-300">
                <div className="text-center p-6">
                  <div className="text-6xl mb-3">EM</div>
                  <p className="font-semibold text-gray-800">English Medium</p>
                </div>
              </div>
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              animate={{ y: [0, -25, 0] }}
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
              className="absolute top-2/3 right-10 text-2xl"
            >
              ⭐
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
