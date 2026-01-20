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
      // style={{ minHeight: "clamp(500px, 70vh, 900px)" }}
    >
      <div className="container mx-auto px-4 py-10 md:py-0">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2 text-center lg:text-left flex flex-col items-center lg:items-start py-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {bannerData.heading}
            </h1>

            <p className="text-xl md:text-2xl font-medium text-gray-600 max-w-xl">
              {bannerData.subHeading}
            </p>
            <div className="flex flex-col flex-wrap sm:flex-row gap-6 items-center sm:items-start mt-8">
              <Link
                href="/hire-tutor"
                className="bg-[#0D24A0] hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
              >
                Hire a Mentor
              </Link>
              <Link
                href="/become-a-tutor"
                className="bg-[#FFCE58] hover:bg-[#ffd572] text-gray-800 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
              >
                Become a Mentor
              </Link>
              <Link
                href="/tuition-jobs"
                className="bg-[#62B8FF] hover:bg-[#7fc5ff] text-gray-800 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
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
            className="relative w-full h-[80%] hidden lg:grid grid-cols-2 items-end justify-end"
          >
            {[
              { src: "/images/banner/4.png", rounded: "rounded-br-none", z: 4 },
              { src: "/images/banner/2.png", rounded: "rounded-bl-none", z: 3 },
              { src: "/images/banner/3.png", rounded: "rounded-tr-none", z: 2 },
              { src: "/images/banner/1.png", rounded: "rounded-tl-none", z: 1 },
            ].map((img, idx) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: ["0%", "-2%", "0%", "2%", "0%"], // smoother floating
                  x: ["0%", "1%", "0%", "-1%", "0%"],
                }}
                transition={{
                  duration: 8 + idx, // slight variation per image
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
                className={`relative aspect-square h-[70%] w-[70%] xl:h-[90%] xl:w-[90%] rounded-3xl ${img.rounded} overflow-hidden shadow-2xl`}
                style={{ zIndex: img.z }}
              >
                <Image
                  src={img.src}
                  alt="Banner"
                  fill
                  sizes="(max-width: 1024px) 0px, (max-width: 1280px) 224px, 256px"
                  className="object-cover"
                  priority
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="lg:hidden flex justify-center">
            <div className="relative w-64 aspect-square rounded-3xl overflow-hidden shadow-xl mb-10">
              <Image
                src="/images/banner/1.png"
                alt="Banner"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
