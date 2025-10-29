"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    id: 1,
    title: "Verified Tutors",
    description:
      "All our tutors are thoroughly screened and verified for quality assurance",
    icon: "✅",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    title: "Flexible Learning",
    description:
      "Choose from home, online, or group tutoring based on your preference",
    icon: "🕐",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    title: "Easy Communication",
    description: "Direct communication with tutors through our secure platform",
    icon: "💬",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    title: "Transparent Process",
    description:
      "Clear pricing, no hidden fees, and transparent tutor selection process",
    icon: "🔍",
    color: "bg-orange-100 text-orange-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Tutor Media?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are committed to providing the best tutoring experience for both
            students and tutors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className={`${reason.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <span className="text-2xl">{reason.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Growing Community
            </h3>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-gray-600">Verified Tutors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">2000+</div>
                <div className="text-gray-600">Happy Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
            <p className="text-gray-600">
              Trusted by students and parents across Bangladesh for quality
              education
            </p>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
