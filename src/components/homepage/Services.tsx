"use client";

import { motion } from "framer-motion";

const services = [
  { name: "Bangla", icon: "📚", students: 250 },
  { name: "English", icon: "🇬🇧", students: 320 },
  { name: "Mathematics", icon: "🔢", students: 450 },
  { name: "Physics", icon: "⚡", students: 180 },
  { name: "Chemistry", icon: "🧪", students: 200 },
  { name: "Biology", icon: "🧬", students: 160 },
  { name: "Computer Science", icon: "💻", students: 120 },
  { name: "Economics", icon: "📈", students: 90 },
  { name: "Accounting", icon: "💰", students: 110 },
  { name: "Statistics", icon: "📊", students: 80 },
  { name: "Geography", icon: "🌍", students: 70 },
  { name: "History", icon: "📜", students: 60 },
];

export default function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Tutoring Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert tutors available for all major subjects across different
            academic levels
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-sm text-gray-600">
                {service.students}+ students
              </p>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Don&rsquo;t see your subject? We have tutors for many more subjects!
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
            View All Subjects
          </button>
        </motion.div> */}
      </div>
    </section>
  );
}
