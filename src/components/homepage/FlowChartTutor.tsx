"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Submit Application",
    description: "Complete our tutor application form with your qualifications",
    icon: "📋",
  },
  {
    number: 2,
    title: "Get verified",
    description:
      "Our team reviews and verifies your credentials to ensure quality.",
    icon: "✅",
  },
  {
    number: 3,
    title: "Apply to Jobs",
    description: "Browse and apply to tuition jobs that match your expertise",
    icon: "🎯",
  },
  {
    number: 4,
    title: "Start teaching & earning",
    description:
      "Connect with students, deliver quality education, and earn money.",
    icon: "💼",
    bgColor: "from-orange-300 to-red-400",
    iconBg: "bg-orange-600",
  },
];

export default function FlowChartTutor() {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
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
              <div className="w-5/12">
                <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.bgColor} flex items-center justify-center mb-4`}
                  >
                    <div
                      className={`w-12 h-12 ${step.iconBg} rounded-lg flex items-center justify-center text-2xl`}
                    >
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.bgColor} flex items-center justify-center mb-4`}
              >
                <div
                  className={`w-12 h-12 ${step.iconBg} rounded-lg flex items-center justify-center text-2xl`}
                >
                  {step.icon}
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
    </section>
  );
}
