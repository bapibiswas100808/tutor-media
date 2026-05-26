"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    number: 1,
    title: "Submit Your Requirements",
    description:
      "Submit your requirements and we will match you with the best tutor within your budget.",
    image: "/images/workForStudents/search-tutor.webp",
    accent: "from-orange-400 to-amber-400",
    lightBg: "bg-amber-50",
    border: "border-amber-200",
    textAccent: "text-amber-600",
  },
  {
    number: 2,
    title: "Free Demo Session",
    description:
      "Get a free two-day demo session with the tutor at your preferred location.",
    image: "/images/workForStudents/demo-session.webp",
    accent: "from-pink-400 to-rose-400",
    lightBg: "bg-pink-50",
    border: "border-pink-200",
    textAccent: "text-rose-500",
  },
  {
    number: 3,
    title: "Select Your Tutor",
    description: "Evaluate tutors & start learning with your preferred tutor.",
    image: "/images/workForStudents/hire-tutor.webp",
    accent: "from-blue-400 to-indigo-500",
    lightBg: "bg-blue-50",
    border: "border-blue-200",
    textAccent: "text-blue-600",
  },
  {
    number: 4,
    title: "Start Learning",
    description:
      "Gain knowledge, boost confidence and improve overall performance.",
    image: "/images/workForStudents/get-results.webp",
    accent: "from-teal-400 to-green-500",
    lightBg: "bg-teal-50",
    border: "border-teal-200",
    textAccent: "text-teal-600",
  },
];

export default function FlowChartStudent() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            For Students &amp; Guardians
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            How It Works For Guardians/Students
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
            Getting started with your perfect tutor is simple and
            straightforward
          </p>
        </motion.div>

        {/* Steps — Desktop zigzag */}
        <div className="hidden md:block max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-6 lg:gap-10 ${index % 2 !== 0 ? "flex-row-reverse" : ""}`}
              >
                {/* Image card */}
                <div
                  className={`flex-1 ${step.lightBg} ${step.border} border rounded-3xl p-5 shadow-md`}
                >
                  <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 1024px) 45vw, 400px"
                      className="object-contain p-3"
                      priority={index < 2}
                    />
                  </div>
                </div>

                {/* Centre step indicator */}
                <div className="flex flex-col items-center shrink-0 gap-2">
                  <div
                    className={`w-14 h-14 rounded-full bg-linear-to-br ${step.accent} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-white font-extrabold text-xl">
                      {step.number}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-20 bg-linear-to-b from-gray-300 to-transparent" />
                  )}
                </div>

                {/* Text card */}
                <div className="flex-1 space-y-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${step.textAccent}`}
                  >
                    Step {step.number}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm lg:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {/* Connector between steps */}
              {index < steps.length - 1 && (
                <div
                  className={`flex ${index % 2 === 0 ? "justify-end pr-[calc(50%-28px)]" : "justify-start pl-[calc(50%-28px)]"} my-1`}
                >
                  <div className="w-0.5 h-8 bg-linear-to-b from-gray-200 to-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile / tablet layout */}
        <div className="md:hidden max-w-sm mx-auto space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className={`bg-white border ${step.border} rounded-2xl shadow-md overflow-hidden`}
              >
                {/* Image */}
                <div className={`${step.lightBg} w-full`}>
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="90vw"
                      className="object-contain p-4"
                    />
                  </div>
                </div>
                {/* Text */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full bg-linear-to-br ${step.accent} flex items-center justify-center shrink-0 shadow`}
                    >
                      <span className="text-white font-bold text-sm">
                        {step.number}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${step.textAccent}`}
                    >
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector arrow */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                    <path
                      d="M8 0 L8 20 M2 14 L8 20 L14 14"
                      stroke="#CBD5E1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
