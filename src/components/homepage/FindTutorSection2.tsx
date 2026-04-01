"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import img from "/public/images/admissionTest/cadetCollegeAdmission.png";

export default function FindTutorSection2() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3 col-span-3"
          >
            <div className="text-3xl md:text-5xl font-bold text-blue-900">
              <h2>Find Your</h2>
              <h2 className="text-[#1447E6] mt-1">Perfect Mentor Today</h2>
            </div>

            <p className="text-lg text-gray-600">
              Quality education, perfect tutor !
            </p>

            <div className="pt-4">
              <Link
                href="/tutor-hub"
                className="inline-block bg-[#1447E6] hover:bg-[#093ede] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Find a Mentor 🔎
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-3"
          >
            <div className="h-80">
              <div className="relative w-full h-full border-2 border-blue-200 shadow-2xl shadow-blue-500 rounded-full overflow-hidden">
                <Image src={img} alt="Tutor 1" fill className="object-cover" />
              </div>
              {/* <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt="Tutor 1"
                  fill
                  className="object-cover rounded-tr-full rounded-bl-full border-2 border-blue-200"
                />
              </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
