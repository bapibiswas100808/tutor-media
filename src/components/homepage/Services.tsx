"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { mediumsData } from "@/data/mediumsData";

export default function Services() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/40 to-white">
      <div className="mx-auto container px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Our Tutoring Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert tutors for all subjects across every academic level
          </p>
        </motion.div>

        {/* Slider Wrapper */}
        <div className="relative">
          {/* Arrows (HIDDEN ON MOBILE) */}
          <button className="swiper-prev hidden md:flex absolute left-0 top-1/2 z-20 -translate-y-1/2 bg-white/70 backdrop-blur-md shadow-lg w-11 h-11 rounded-full items-center justify-center hover:scale-110 transition">
            <ChevronLeft className="text-black"/>
          </button>

          <button className="swiper-next hidden md:flex absolute right-0 top-1/2 z-20 -translate-y-1/2 bg-white/70 backdrop-blur-md shadow-lg w-11 h-11 rounded-full items-center justify-center hover:scale-110 transition">
            <ChevronRight className="text-black" />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: ".swiper-prev",
              nextEl: ".swiper-next",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 2,
                centeredSlides: true,
              },
              1280: {
                slidesPerView: 4,
                centeredSlides: true,
              },
            }}
          >
            {mediumsData.map((medium) => (
              <SwiperSlide key={medium.slug}>
                <Link href={`/mediums/${medium.slug}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="group h-full cursor-pointer pt-5 pb-10"
                  >
                    {/* GLASS CARD */}
                    <div className="relative rounded-2xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300">
                      {/* Image */}
                      <div className="relative h-[260px] overflow-hidden">
                        <Image
                          src={medium.image}
                          alt={medium.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-125"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="flex items-center justify-center h-[100px]">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition">
                          {medium.name}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
