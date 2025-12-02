"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    id: 1,
    title: "The Tutor Media Standard",
    description:
      "Our educators are not just skilled; they are true mentors. Each one passes a rigorous 4-step vetting process, ensuring they meet our decade-old standard of excellence and a true passion for teaching.",
    icon: "✅",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    title: "Reliable Pricing, Invaluable Results",
    description:
      "We believe in transparent and honest pricing. With us, you invest in a premium, reliable service that delivers real academic growth and confidence—a value that lasts a lifetime.",
    icon: "🕐",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    title: "A Decade of Parent Trust",
    description: "For over 10 years, we have been the trusted choice for discerning parents. Our 98% satisfaction rate is a testament to the peace of mind and success we deliver to families like yours.",
    icon: "💬",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    title: "A Partnership in Education",
    description:
      "We build lasting relationships. From our dedicated support team to our committed mentors, we work alongside you and your child at every step of the educational journey.",
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
            The Tutor Media Promise
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our commitment goes beyond tutoring. We are your partners in education.
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
              className="bg-white rounded-xl shadow-lg px-6 py-12 text-center hover:shadow-xl transition-shadow duration-300"
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
      </div>
    </section>
  );
}
