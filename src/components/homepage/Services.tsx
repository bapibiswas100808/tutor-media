"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const mediums = [
  { name: "Bangla Medium", icon: "🇧🇩" },
  { name: "English Medium", icon: "🇬🇧" },
  { name: "English Version", icon: "🇬🇧" },
  { name: "Madrasa Medium", icon: "🕌" },
  { name: "Vocational", icon: "🛠️" },
  { name: "Admission Test", icon: "📝" },
  { name: "Language Training", icon: "🗣️" },
  { name: "Arts", icon: "🎨" },
  { name: "Religious Studies", icon: "🙏" },
];

export default function Services() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
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
          className="text-center mb-12"
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
            {mediums.map((medium) => {
              const slug = medium.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <div key={medium.name} className="px-3">
                  <Link href={`/mediums/${slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer h-40 flex flex-col items-center justify-center"
                    >
                      <div className="text-5xl mb-3">{medium.icon}</div>
                      <h3 className="font-semibold text-gray-900 text-base">
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
