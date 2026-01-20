"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    number: 1,
    title: "Create your profile",
    description:
      "Register and create your tutor profile with qualifications and expertise.",
    image: "/images/workForTutors/create-profile.png",
    bgColor: "from-blue-400 to-cyan-400",
    iconBg: "bg-blue-600",
  },
  {
    number: 2,
    title: "Get verified",
    description:
      "Our team reviews and verifies your credentials to ensure quality.",
    image: "/images/workForTutors/get-verified.png",
    bgColor: "from-green-300 to-emerald-400",
    iconBg: "bg-green-600",
  },
  {
    number: 3,
    title: "Apply to tuition jobs",
    description:
      "Browse available tuition requests and apply to jobs matching your skills.",
    image: "/images/workForTutors/apply-tuition.png",
    bgColor: "from-purple-300 to-indigo-400",
    iconBg: "bg-purple-600",
  },
  {
    number: 4,
    title: "Start teaching & earning",
    description:
      "Connect with students, deliver quality education, and earn money.",
    image: "/images/workForTutors/teaching-earning.png",
    bgColor: "from-orange-300 to-red-400",
    iconBg: "bg-orange-600",
  },
];

export default function FlowChartTutor() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works for Tutors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our platform and start your tutoring career with these simple
            steps
          </p>
        </motion.div>

        {/* Desktop & Tablet Zigzag Layout */}
        <div className="hidden md:block max-w-5xl mx-auto relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex items-center mb-16 last:mb-0 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Card */}
              <div className="w-9/12">
                <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 grid grid-cols-2 items-center gap-3">
                  <div
                    className={`w-full h-[170px] rounded-xl bg-gradient-to-br ${step.bgColor} flex items-baseline justify-end`}
                  >
                    <div className="w-full h-full overflow-hidden relative rounded-lg">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover rounded-xl p-0.5"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-5">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              <div className="w-2/12 flex items-center justify-center relative">
                {/* Horizontal line */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute ${
                      index % 2 === 0 ? "left-0" : "right-0"
                    } w-1/2 h-0.5 bg-gradient-to-r from-gray-300 via-blue-400 to-gray-300`}
                  />
                )}
                {index < steps.length - 1 && (
                  <svg
                    className="absolute top-0"
                    width="4"
                    height="180"
                    viewBox="0 200 2 20"
                  >
                    <line
                      x1="2"
                      y1="0"
                      x2="2"
                      y2="1280"
                      stroke="#93C5FD"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>
                )}
                {/* Dot (hide for last item) */}
                {index < steps.length - 1 && (
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-md" />
                )}
              </div>

              {/* Empty Space */}
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout - Vertical */}
        <div className="md:hidden max-w-md mx-auto relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div
                  className={`w-full h-40 rounded-xl bg-gradient-to-br ${step.bgColor} flex items-center justify-center mb-4`}
                >
                  <div className="w-full h-full overflow-hidden relative rounded-lg">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover rounded-xl p-0.25"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector for mobile */}
              {index < steps.length - 1 && (
                <div className="flex justify-center">
                  <svg width="2" height="40" viewBox="0 0 2 40">
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="40"
                      stroke="#86EFAC"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
