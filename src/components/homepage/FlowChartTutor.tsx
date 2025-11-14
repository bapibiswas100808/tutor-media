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
    title: "Get Verified",
    description: "Our team reviews and verifies your credentials shortly",
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
    title: "Start Earning",
    description: "Begin teaching and earning money and experience immediately",
    icon: "💰",
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

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {/* Connector line */}
                {/* {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-green-300 z-0"></div>
                )} */}

                <div className="relative z-10">
                  {/* <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.number}
                  </div> */}
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start Earning Today!
            </h3>
            <p className="text-gray-600 mb-4">
              Join 500+ tutors already earning on our platform
            </p>
            <p className="text-2xl font-bold text-green-600 mb-4">
              BDT 15,000+ /month
            </p>
            <p className="text-sm text-gray-500">Average tutor earnings</p>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
