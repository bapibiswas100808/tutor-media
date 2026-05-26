"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Briefcase, Smile, Star, MapPin } from "lucide-react";
import CountUp from "react-countup";

interface BannerData {
  heading: string;
  subHeading: string;
}

const stats = [
  {
    icon: Users,
    value: 100,
    suffix: "k+",
    label: "Active Tutors",
  },
  {
    icon: Briefcase,
    value: 300,
    suffix: "+",
    label: "Live Tuition Jobs",
  },
  {
    icon: Smile,
    value: 10,
    suffix: "k+",
    label: "Happy Students",
  },
  {
    icon: Star,
    value: 4.8,
    suffix: "/5",
    decimals: 1,
    label: "Average Rating",
  },
];

const IMAGES = [
  { src: "/images/banner/1.webp", corner: "rounded-tl-none", delay: 0 },
  { src: "/images/banner/2.webp", corner: "rounded-tr-none", delay: 1.2 },
  { src: "/images/banner/3.webp", corner: "rounded-bl-none", delay: 0.6 },
  { src: "/images/banner/4.webp", corner: "rounded-br-none", delay: 1.8 },
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

            <div className="flex items-start sm:items-center gap-3 mt-2 w-full max-w-xl">
              {/* Icon */}
              <div
                className="relative flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#2B7FFF]/30 to-[#FFD230]/20 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(43,127,255,0.25)]
    overflow-hidden group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Pulse ring */}
                <span className="absolute inline-flex h-full w-full rounded-2xl bg-[#2B7FFF]/20 animate-ping opacity-4\0"></span>

                {/* Icon */}
                <MapPin className="relative w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-[#FFD230] drop-shadow-md" />
              </div>

              {/* Text */}
              <p className="text-sm sm:text-base md:text-lg text-blue-100/90 leading-relaxed font-medium tracking-wide break-words">
                {bannerData.subHeading}
              </p>
            </div>

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
            <div className="w-full flex justify-center mt-4">
              <div className="w-full max-w-6xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-3xl shadow-2xl p-5 md:p-7 text-white relative overflow-hidden border border-white/10">
                {/* Background Glow */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-cyan-300/10 rounded-full blur-3xl" />

                {/* Content */}
                <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
                  {stats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={index}
                        className="group flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-2 cursor-default"
                      >
                        {/* Icon */}
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        {/* Animated Value */}
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                          <CountUp
                            end={item.value}
                            duration={3}
                            decimals={item.decimals || 0}
                          />
                          {item.suffix}
                        </h2>

                        {/* Label */}
                        <p className="text-sm md:text-base text-blue-100/80 font-medium">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
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
              {IMAGES.map((img, index) => (
                <motion.div
                  key={index}
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
                  {/* <Image
                    src={img.src}
                    alt="Banner"
                    fill
                    sizes="176px"
                    className="object-cover"
                    priority
                  /> */}
                  <Image
                    src={img.src}
                    alt="Banner"
                    fill
                    sizes="176px"
                    className="object-cover"
                    priority={index === 0}
                    quality={75}
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
                src="/images/banner/1.webp"
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
