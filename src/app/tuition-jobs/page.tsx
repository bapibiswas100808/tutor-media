"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, BookOpen } from "lucide-react";
import { tuitionJobsList, TuitionJob } from "@/data/tuitionJobsList";
import TuitionJobCard from "@/components/tuition/TuitionJobCard";
import ApplyJobModal from "@/components/tuition/ApplyJobModal";

export default function TuitionJobsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<TuitionJob | null>(null);

  // Extract unique subjects for filter
  const subjects = Array.from(
    new Set(tuitionJobsList.map((job) => job.subject))
  );

  // Filter jobs
  const filteredJobs = tuitionJobsList.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.class.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject =
      selectedSubject === "all" || job.subject === selectedSubject;

    const matchesMode =
      selectedMode === "all" ||
      job.mode.toLowerCase().includes(selectedMode.toLowerCase());

    const matchesUrgency =
      selectedUrgency === "all" ||
      (selectedUrgency === "urgent" && job.urgency === "urgent") ||
      (selectedUrgency === "normal" && job.urgency === "normal");

    return (
      matchesSearch &&
      matchesSubject &&
      matchesMode &&
      matchesUrgency &&
      job.status === "active"
    );
  });

  const handleApply = (job: TuitionJob) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Perfect Tuition Job
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through {tuitionJobsList.length}+ available tuition
            opportunities and apply directly with your proposal
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="w-4 h-4 inline mr-1" />
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Teaching Mode
              </label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
              >
                <option value="all">All Modes</option>
                <option value="home">Home Tutoring</option>
                <option value="online">Online Tutoring</option>
                <option value="group">Group Classes</option>
              </select>
            </div>

            {/* Urgency Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
              >
                <option value="all">All Jobs</option>
                <option value="urgent">Urgent Only</option>
                <option value="normal">Normal Priority</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex items-center justify-between"
        >
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredJobs.length}
            </span>{" "}
            {filteredJobs.length === 1 ? "job" : "jobs"}
          </p>

          {/* Quick Filter Badges */}
          <div className="flex gap-2">
            {selectedSubject !== "all" && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {selectedSubject}
              </span>
            )}
            {selectedMode !== "all" && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {selectedMode}
              </span>
            )}
            {selectedUrgency === "urgent" && (
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                Urgent
              </span>
            )}
          </div>
        </motion.div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <TuitionJobCard key={job.id} job={job} onApply={handleApply} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Jobs Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your filters or search query to find more tuition
              opportunities
            </p>
          </motion.div>
        )}
      </div>

      {/* Apply Modal */}
      <ApplyJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
      />
    </div>
  );
}
