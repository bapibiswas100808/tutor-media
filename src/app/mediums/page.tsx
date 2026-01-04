"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { mediumsData } from "@/data/mediumsData";

export default function MediumsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 py-10 md:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent">
            All Educational Mediums
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose your preferred educational medium and find expert tutors for
            all subjects
          </p>
        </motion.div>

        {/* Mediums Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mediumsData.map((medium, index) => (
            <motion.div
              key={medium.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/mediums/${medium.slug}`}>
                <motion.div
  whileHover={{ y: -6 }}
  transition={{ duration: 0.25, ease: "easeOut" }}
  className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
>
  {/* Image Section */}
  <div className="relative w-full h-44 bg-gray-50 rounded-t-2xl overflow-hidden">
    <Image
      src={medium.image || "/placeholder.png"}
      alt={medium.name}
      fill
      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, 33vw"
    />
  </div>

  {/* Content */}
  <div className="flex flex-col flex-1 px-5 py-4 text-center">
    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
      {medium.name}
    </h3>

    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
      {medium.description}
    </p>

    {/* CTA */}
    <button className="mt-auto pt-4 text-sm font-semibold text-blue-800 group-hover:text-blue-600 transition">
      View Details →
    </button>
  </div>
</motion.div>

              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Can&rsquo;t Find What You&rsquo;re Looking For?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            We have expert tutors for many more subjects and specialized courses
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/hire-tutor">
              <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Find a Mentor
              </button>
            </Link>
            <Link href="/tutor-hub">
              <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300">
                Browse Mentors
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
