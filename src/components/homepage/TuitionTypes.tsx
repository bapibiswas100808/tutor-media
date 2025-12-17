"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const tuitionTypes = [
  {
    id: 1,
    title: "Home Tutoring",
    description:
      "Verified mentors at your doorstep. Experience safe, focused, 1-on-1 guidance in the comfort of your own home.",
    image: "/images/learningMode/home-tutoring.png",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Online Tutoring",
    description: "Access Bangladesh’s top subject experts regardless of location. Interactive live sessions via Zoom or Google Meet.",
    image: "/images/learningMode/online-tutoring.png",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Group Tutoring",
    description:
      "Premium education made affordable. Your child learns, solves, and competes in small, focused groups.",
    image: "/images/learningMode/group-tutoring.png",
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Remote Learning",
    description: "Education on your schedule. Access curated digital resources and recorded modules for flexible, independent study.",
    image: "/images/learningMode/remote-learning.png",
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
            Tailored Learning Pathways for Every Student
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether in-person or digital, we provide world-class mentorship
            designed to fit your schedule and goals.
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
              <div className="w-full h-48 rounded-3xl overflow-hidden mb-4 relative">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
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
