"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface BannerData {
  heading: string;
  subHeading: string;
}

const IMAGES = [
  { src: "/images/banner/1.png", corner: "rounded-tl-none", delay: 0 },
  { src: "/images/banner/2.png", corner: "rounded-tr-none", delay: 1.2 },
  { src: "/images/banner/3.png", corner: "rounded-bl-none", delay: 0.6 },
  { src: "/images/banner/4.png", corner: "rounded-br-none", delay: 1.8 },
];

export default function Banner({ bannerData }: { bannerData: BannerData }) {
  return (
    <section className="relative flex items-center bg-gradient-to-br from-[#06112b] via-[#0c1f6e] to-[#07152e] overflow-hidden min-h-[520px]">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute -top-20 left-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 py-14 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5"
          >
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 text-blue-300 border border-blue-400/25 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-400 rounded-full" />
              Bangladesh&apos;s Trusted Tutoring Platform
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight">
              {bannerData.heading}
            </h1>

            <p className="text-base md:text-lg text-blue-100/75 max-w-lg leading-relaxed">
              {bannerData.subHeading}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 items-center justify-center lg:justify-start pt-1">
              <Link
                href="/hire-tutor"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-7 rounded-full text-sm transition-all duration-200 shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 inline-block"
              >
                Hire a Mentor
              </Link>
              <Link
                href="/become-a-tutor"
                className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold py-2.5 px-7 rounded-full text-sm transition-all duration-200 shadow-lg hover:shadow-amber-400/30 hover:-translate-y-0.5 inline-block"
              >
                Become a Mentor
              </Link>
              <Link
                href="/tuition-jobs"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold py-2.5 px-7 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5 inline-block"
              >
                Tuition Jobs
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4 border-t border-white/10 w-full justify-center lg:justify-start">
              {[
                { value: "500+", label: "Tutors" },
                { value: "1000+", label: "Students" },
                { value: "98%", label: "Satisfaction" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-blue-200/60 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Compact image grid — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="grid grid-cols-2 gap-4">
              {IMAGES.map((img) => (
                <motion.div
                  key={img.src}
                  animate={{ y: [0, -7, 0] }}
                  transition={{
                    duration: 5.5,
                    delay: img.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "loop",
                  }}
                  className={`relative w-40 h-40 xl:w-44 xl:h-44 rounded-2xl ${img.corner} overflow-hidden shadow-2xl border border-white/10`}
                >
                  <Image
                    src={img.src}
                    alt="Banner"
                    fill
                    sizes="176px"
                    className="object-cover"
                    priority
                  />
                  {/* Subtle inner glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile: single image */}
          <div className="lg:hidden flex justify-center">
            <div className="relative w-52 h-52 rounded-2xl overflow-hidden shadow-xl border border-white/10 mb-6">
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
