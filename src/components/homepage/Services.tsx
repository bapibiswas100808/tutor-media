"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { mediumsData } from "@/data/mediumsData";

// const basicSubjects = [
//   { name: "Bangla", icon: "📚", students: 250 },
//   { name: "English", icon: "🇬🇧", students: 320 },
//   { name: "Mathematics", icon: "🔢", students: 450 },
//   { name: "Physics", icon: "⚡", students: 180 },
//   { name: "Chemistry", icon: "🧪", students: 200 },
//   { name: "Biology", icon: "🧬", students: 160 },
//   { name: "ICT", icon: "💻", students: 120 },
//   { name: "Economics", icon: "📈", students: 90 },
//   { name: "Accounting", icon: "💰", students: 110 },
//   { name: "Statistics", icon: "📊", students: 80 },
//   { name: "Geography", icon: "🌍", students: 70 },
//   { name: "History", icon: "📜", students: 60 },
//   { name: "Social Science", icon: "🏛️", students: 50 },
// ];

// Note: All class data is now centralized in src/data/mediumsData.ts
// This component displays medium cards that link to detailed class pages

//  const mediums = [
//   {
//     name: "Bangla Medium",
//     image: "/images/tutoringServices/bangla-medium.png",
//   },
//   {
//     name: "English Medium",
//     image: "/images/tutoringServices/english-medium.png",
//   },
//   {
//     name: "English Version",
//     image: "/images/tutoringServices/english-version.png",
//   },
//   {
//     name: "Madrasah Medium",
//     image: "/images/tutoringServices/madrasah-medium.png",
//   },
//   {
//     name: "Admission Test",
//     image: "/images/tutoringServices/admission-test.png",
//   },
//   {
//     name: "Religious Studies",
//     image: "/images/tutoringServices/religious-studies.png",
//   },
//   {
//     name: "Arts & Creativity",
//     image: "/images/tutoringServices/arts&creativity.png",
//   },
//   {
//     name: "Skill Development",
//     image: "/images/tutoringServices/professional-skill-development.png",
//   },
//   {
//     name: "Language Training",
//     image: "/images/tutoringServices/language-training.png",
//   },
//   {
//     name: "Job Preparation",
//     image: "/images/tutoringServices/job-preparation.png",
//   },
// ];

export default function Services() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Tutoring Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert tutors available for all major subjects across different
            academic levels
          </p>
        </motion.div>

        <div className="medium-slider">
          <Slider {...settings}>
            {mediumsData.map((medium) => {
              // const slug = medium.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <div key={medium.name} className="p-6">
                  <Link href={`/mediums/${medium.slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl text-center hover:shadow-lg transition-all duration-200 border border-gray-100 cursor-pointer h-48 flex flex-col items-center justify-center"
                    >
                      <div className="w-full h-full overflow-hidden relative rounded-t-xl">
                        <Image
                          src={medium.image}
                          alt={medium.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-lg p-3">
                        {medium.name}
                      </h3>
                    </motion.div>
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
}
