"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { mediumsData, ClassItem, MediumData } from "@/data/mediumsData";

export default function ClassDetailPage() {
  const params = useParams();
  const [medium, setMedium] = useState<MediumData | null>(null);
  const [classItem, setClassItem] = useState<ClassItem | null>(null);

  useEffect(() => {
    const mediumSlug = params.slug as string;
    const classSlug = params.class as string;

    const foundMedium = mediumsData.find((m) => m.slug === mediumSlug);
    if (foundMedium) {
      setMedium(foundMedium);
      const foundClass = foundMedium.classes.find((c) => c.slug === classSlug);
      setClassItem(foundClass || null);
    }
  }, [params]);

  if (!medium || !classItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Class Not Found
          </h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/mediums/${medium.slug}`}
              className="hover:text-blue-600 transition-colors"
            >
              {medium.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{classItem.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section with Split Layout */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Icon Badge */}
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full mb-6 shadow-lg">
                <span className="text-3xl">{classItem.icon}</span>
                <span className="font-semibold">{medium.name}</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                {classItem.title}
              </h1>

              {/* Subtitle */}
              <p className="text-2xl font-medium text-blue-600 mb-6">
                {classItem.subtitle}
              </p>

              {/* Duration Badge */}
              {classItem.duration && (
                <div className="inline-flex items-center bg-white rounded-full px-5 py-2 shadow-md mb-8">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">
                    {classItem.duration}
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {classItem.description}
                </p>
              </div>

              {/* Subjects/Features */}
              {classItem.subjects && classItem.subjects.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    What You will Learn
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {classItem.subjects.map((subject, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3"
                      >
                        <svg
                          className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 font-medium">
                          {subject}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/hire-tutor"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300 text-center transform hover:scale-105"
                >
                  Get a Tutor Now
                </Link>
                <Link
                  href={`/mediums/${medium.slug}`}
                  className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors border-2 border-gray-200 text-center"
                >
                  View All Classes
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>

                {/* Placeholder Image with Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <div className="text-8xl mb-6 animate-pulse">
                        {classItem.icon}
                      </div>
                      <h3 className="text-4xl font-bold mb-4">
                        {classItem.name}
                      </h3>
                      <p className="text-xl opacity-90">{medium.name}</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-8 left-8 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Expert Tutors</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">95%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Program?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "👨‍🏫",
                title: "Expert Tutors",
                description:
                  "Learn from qualified and experienced educators who are passionate about teaching.",
              },
              {
                icon: "📚",
                title: "Comprehensive Curriculum",
                description:
                  "Complete coverage of all topics with structured learning materials and resources.",
              },
              {
                icon: "⏰",
                title: "Flexible Schedule",
                description:
                  "Choose class times that fit your schedule with both online and in-person options.",
              },
              {
                icon: "💯",
                title: "Proven Results",
                description:
                  "Track record of helping students achieve excellent grades and exam success.",
              },
              {
                icon: "🤝",
                title: "Personalized Attention",
                description:
                  "Small batch sizes or one-on-one sessions ensuring individual focus and support.",
              },
              {
                icon: "📈",
                title: "Progress Tracking",
                description:
                  "Regular assessments and feedback to monitor improvement and identify areas for growth.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Connect with an expert tutor today and take the first step towards
            academic excellence.
          </p>
          <Link
            href="/hire-tutor"
            className="inline-block px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-2xl transform hover:scale-105"
          >
            Find Your Perfect Tutor
          </Link>
        </div>
      </section>
    </div>
  );
}
