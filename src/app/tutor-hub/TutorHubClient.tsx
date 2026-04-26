"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tutor } from "@/data/tutorsList";
import TutorCard from "@/components/tutors/TutorCard";
import { Search } from "lucide-react";

export default function TutorHubPage({ tutorHubs }: { tutorHubs: Tutor[] }) {
  const [filter, setFilter] = useState<"all" | "premium" | "verified">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 🔥 Load More System
  const ITEMS_PER_LOAD = 12;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  // Filter tutors
  const filteredTutors = tutorHubs
    // ✅ 1. Only approved & not deleted
    .filter((tutor) => tutor.isApproved && tutor.isDeleted !== true)

    // ✅ 2. Apply UI filters + search
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
    })

    // ✅ 3. Premium tutors first
    .sort((a, b) => {
      if (a.isPremium === b.isPremium) return 0;
      return a.isPremium ? -1 : 1;
    });

  // 👇 Visible Tutors (Load More Logic)
  const visibleTutors = filteredTutors.slice(0, visibleCount);

  // ✅ Reset visible count when filter/search changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [filter, searchTerm]);

  // const approvedTutors = tutorHubs.filter((t) => t.isApproved);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-purple-50 py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-1 bg-linear-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent">
            Find Expert Mentors
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect with qualified tutors for personalized learning experiences
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-sm text-gray-700"
            />
          </div>
        </motion.div>

        {/* Filters */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 shadow"
              }`}
            >
              All Tutors ({approvedTutors.length})
            </button>

            <button
              onClick={() => setFilter("premium")}
              className={`px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${
                filter === "premium"
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-700 shadow"
              }`}
            >
              <CircleStar className="w-5 h-5" />
              Premium ({approvedTutors.filter((t) => t.isPremium).length})
            </button>

            <button
              onClick={() => setFilter("verified")}
              className={`px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${
                filter === "verified"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 shadow"
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
              Verified ({approvedTutors.filter((t) => t.isVerified).length})
            </button>
          </div>
        </motion.div> */}

        {/* Results Count */}
        {/* <div className="mb-6 text-center text-gray-600 text-lg">
          Showing{" "}
          <span className="font-bold text-gray-900">
            {filteredTutors.length}
          </span>{" "}
          tutor{filteredTutors.length !== 1 ? "s" : ""}
        </div> */}

        {/* Tutors Grid */}
        {filteredTutors.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleTutors.map((tutor, index) => (
                <TutorCard
                  key={tutor.id}
                  tutor={tutor}
                  index={index % ITEMS_PER_LOAD}
                />
              ))}
            </div>

            {/* 🔥 See More Button */}
            {visibleCount < filteredTutors.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() =>
                    setVisibleCount((prev) => prev + ITEMS_PER_LOAD)
                  }
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  See More ({filteredTutors.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
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
