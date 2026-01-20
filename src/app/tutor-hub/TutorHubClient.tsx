"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tutor } from "@/data/tutorsList";
import TutorCard from "@/components/tutors/TutorCard";
import { CircleStar, Search, ShieldCheck } from "lucide-react";

export default function TutorHubPage({ tutorHubs }: { tutorHubs: Tutor[] }) {
  const [filter, setFilter] = useState<"all" | "premium" | "verified">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tutors
  const filteredTutors = tutorHubs
    // ✅ 1. Only approved tutors
    .filter((tutor) => tutor.isApproved)
    .filter((tutor) => tutor.isDeleted !== true)
    // ✅ 2. Apply UI filters
    .filter((tutor) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "premium" && tutor.isPremium) ||
        (filter === "verified" && tutor.isVerified);

      const matchesSearch =
        searchTerm === "" ||
        tutor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.location.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });

  // Approved Tutors
  const approvedTutors = tutorHubs.filter((t) => t.isApproved);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-purple-50 py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent">
            Find Expert Mentors
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect with qualified tutors for personalized learning experiences
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, subject, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors shadow-sm text-gray-700"
            />
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === "all"
                  ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              All Tutors ({approvedTutors.length})
            </button>
            <button
              onClick={() => setFilter("premium")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                filter === "premium"
                  ? "bg-linear-to-r from-yellow-400 to-orange-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              <CircleStar className="w-5 h-5" />
              Premium ({approvedTutors.filter((t) => t.isPremium).length})
            </button>
            <button
              onClick={() => setFilter("verified")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                filter === "verified"
                  ? "bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
              Verified ({approvedTutors.filter((t) => t.isVerified).length})
            </button>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-center text-gray-600 text-lg">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredTutors.length}
            </span>{" "}
            tutor{filteredTutors.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Tutors Grid */}
        {filteredTutors.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTutors.map((tutor, index) => (
              <TutorCard key={tutor.id} tutor={tutor} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No tutors found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
