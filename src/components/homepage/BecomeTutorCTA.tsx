"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BecomeTutorCTA() {
  return (
    <section className="py-10 bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-3 leading-16">
            Join a Legacy of Excellence.
          </h2>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            If you have a passion for shaping the next generation, we invite you
            to apply and become part of Bangladesh&apos;s most trusted community
            of educators.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <Link
              href="/become-a-tutor"
              className="inline-block border-2 border-white  bg-yellow-500 hover:bg-white text-black font-bold py-2 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Registration
            </Link>
            <Link
              href="/tuition-jobs"
              className="inline-block border-2 border-white hover:bg-white hover:text-black text-white font-semibold py-2 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              Apply Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
