"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BecomeTutorCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="text-6xl mb-6">🎓</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Share Your Knowledge?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join thousands of tutors who are making a difference in
            students&rsquo; lives while building their careers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
              <p className="opacity-90">Teach on your own time and terms</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-xl font-semibold mb-2">Great Earnings</h3>
              <p className="opacity-90">Competitive rates for your expertise</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🌟</div>
              <h3 className="text-xl font-semibold mb-2">Make Impact</h3>
              <p className="opacity-90">Help students achieve their goals</p>
            </div>
          </div>

          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <Link
              href="/become-a-tutor"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Become a Tutor Now
            </Link>
            <Link
              href="/tuition-jobs"
              className="inline-block border-2 border-white hover:bg-white hover:text-green-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
            >
              View Available Jobs
            </Link>
          </div>

          <p className="mt-6 text-sm opacity-75">
            No fees • Quick approval • Start earning immediately
          </p>
        </motion.div>
      </div>
    </section>
  );
}
