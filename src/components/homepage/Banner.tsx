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
    <section className="relative min-h-screen flex items-center bg-linear-to-br from-white via-blue-300 to-gray-200 overflow-hidden">
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
            className="space-y-6 text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              {bannerData.heading}
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-xl">
              {bannerData.subHeading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
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
            className="lg:flex flex-wrap justify-center items-center gap-8 relative hidden"
          >
            {/* Top Left - Art/Drawing Student */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="relative w-72 h-72 rounded-3xl rounded-br-none overflow-hidden"
            >
              <Image
                src="/images/banner/4.png"
                alt="Creative Learning"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Top Right - Madrasa Student */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative w-64 h-64 rounded-3xl rounded-bl-none overflow-hidden"
            >
              <Image
                src="/images/banner/2.png"
                alt="Creative Learning"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Bottom Left - Bangla Medium Student */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="relative w-64 h-64 rounded-3xl rounded-tr-none overflow-hidden"
            >
              <Image
                src="/images/banner/3.png"
                alt="Creative Learning"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Bottom Right - English Medium Student */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative w-72 h-72 rounded-3xl rounded-tl-none overflow-hidden"
            >
              <Image
                src="/images/banner/1.png"
                alt="Creative Learning"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Floating decorative elements */}
            {/* <motion.div
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
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
