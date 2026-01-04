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
            className="space-y-2 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              {bannerData.heading}
            </h1>

            <p className="text-xl md:text-2xl font-medium text-gray-600 max-w-xl">
              {bannerData.subHeading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start mt-8">
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
            {/* Function to generate same animation for all cards */}
            {[
              {
                src: "/images/banner/4.png",
                rounded: "rounded-br-none",
                z: 4,
                phase: 0,
              },
              {
                src: "/images/banner/2.png",
                rounded: "rounded-bl-none",
                z: 3,
                phase: 1,
              },
              {
                src: "/images/banner/3.png",
                rounded: "rounded-tr-none",
                z: 2,
                phase: 2,
              },
              {
                src: "/images/banner/1.png",
                rounded: "rounded-tl-none",
                z: 1,
                phase: 3,
              },
            ].map((img) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  x: [0, 12, 0, -12, 0],
                  y: [0, -12, 0, 12, 0],
                }}
                transition={{
                  duration: 8,
                  delay: img.phase * 0.6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                className={`relative w-52 sm:w-56 md:w-64 h-52 sm:h-56 md:h-64 rounded-3xl ${img.rounded} overflow-hidden shadow-2xl transition-all`}
                style={{ zIndex: img.z }}
              >
                <Image
                  src={img.src}
                  alt="Banner"
                  fill
                  className="object-cover relative z-20"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
