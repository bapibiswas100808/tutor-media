"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface BannerData {
  heading: string;
  subHeading: string;
}

export default function Banner({ bannerData }: { bannerData: BannerData }) {
  return (
    <section
      className="relative flex items-center bg-linear-to-br from-white via-blue-300 to-gray-200 overflow-hidden"
      style={{ minHeight: "clamp(500px, 70vh, 900px)" }}
    >
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
            className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              {bannerData.heading}
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-xl">
              {bannerData.subHeading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <Link
                href="/hire-tutor"
                className="bg-[#0D24A0] hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
              >
                Hire a Mentor
              </Link>
              <Link
                href="/become-a-tutor"
                className="bg-[#FFCE58] hover:bg-[#ffd572] text-black font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
              >
                Become a Mentor
              </Link>
              <Link
                href="/tuition-jobs"
                className="bg-[#62B8FF] hover:bg-[#7fc5ff] text-black font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
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
            className="relative w-full h-full lg:flex flex-wrap justify-center items-center gap-6 lg:justify-end hidden"
          >
            {/* Top Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10, x: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative w-52 sm:w-56 md:w-64 h-52 sm:h-56 md:h-64 rounded-3xl rounded-br-none overflow-hidden shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              style={{ zIndex: 4 }}
            >
              <div className="absolute inset-0 bg-white/10 rounded-3xl rounded-br-none z-10" />
              <Image
                src="/images/banner/4.png"
                alt="Creative Learning"
                fill
                className="object-cover rounded-3xl rounded-br-none"
              />
            </motion.div>

            {/* Top Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -5, x: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative w-52 sm:w-56 md:w-64 h-52 sm:h-56 md:h-64 rounded-3xl rounded-bl-none overflow-hidden shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              style={{ zIndex: 3 }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-3xl rounded-bl-none z-10" />
              <Image
                src="/images/banner/2.png"
                alt="Creative Learning"
                fill
                className="object-cover rounded-3xl rounded-bl-none"
              />
            </motion.div>

            {/* Bottom Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10, x: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="relative w-52 sm:w-56 md:w-64 h-52 sm:h-56 md:h-64 rounded-3xl rounded-tr-none overflow-hidden shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              style={{ zIndex: 2 }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-3xl rounded-tr-none z-10" />
              <Image
                src="/images/banner/3.png"
                alt="Creative Learning"
                fill
                className="object-cover rounded-3xl rounded-tr-none"
              />
            </motion.div>

            {/* Bottom Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 5, x: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="relative w-52 sm:w-56 md:w-64 h-52 sm:h-56 md:h-64 rounded-3xl rounded-tl-none overflow-hidden shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              style={{ zIndex: 1 }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-3xl rounded-tl-none z-10" />
              <Image
                src="/images/banner/1.png"
                alt="Creative Learning"
                fill
                className="object-cover rounded-3xl rounded-tl-none"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
