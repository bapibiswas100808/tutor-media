"use client";

import { motion } from "framer-motion";

const tuitionTypes = [
  {
    id: 1,
    title: "Home Tutoring",
    description: "One-on-one personalized learning at your home",
    icon: "🏠",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Online Tutoring",
    description: "Learn from anywhere with virtual sessions",
    icon: "💻",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Group Tutoring",
    description: "Cost-effective learning with peers",
    icon: "👥",
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Remote Learning",
    description: "Flexible scheduling with digital resources",
    icon: "📱",
    color: "bg-orange-500",
  },
];

export default function TuitionTypes() {
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
            Choose Your Learning Mode
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer flexible tutoring options to suit every learning style and
            schedule
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tuitionTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className={`${type.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <span className="text-2xl">{type.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {type.title}
              </h3>
              <p className="text-gray-600">{type.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
