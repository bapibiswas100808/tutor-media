"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  BookOpen,
  User,
  DoorOpen,
  School,
  RotateCcw,
} from "lucide-react";
// import { tuitionJobsList, TuitionJob } from "@/data/tuitionJobsList";
import TuitionJobCard from "@/components/tuition/TuitionJobCard";
import ApplyJobModal from "@/components/tuition/ApplyJobModal";
import { TuitionJob } from "@/data/tuitionJobsList";

interface TuitionJobClientProps {
  tuitionJobs: TuitionJob[];
}

export default function TuitionJobClient({
  tuitionJobs,
}: TuitionJobClientProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedDivision, setSelectedDivision] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");
  const [selectedMedium, setSelectedMedium] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<TuitionJob | null>(null);

  // Extract unique subjects for filter
  const classes = [
    "Play",
    "Nursery",
    "KG",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
    "A Level",
    "O Level",
  ];

  // Filter jobs
  const normalize = (value?: string) =>
    value?.toLowerCase().replace(/\s+/g, "");

  const filteredJobs = tuitionJobs
    // ✅ 1. Only approved jobs
    .filter((job) => job.isApproved)
    // ✅ 2. Apply filters
    .filter((job) => {
      const matchesClass =
        selectedClass === "all" ||
        normalize(job.class) === normalize(selectedClass);

      const matchesMode =
        selectedMode === "all" ||
        normalize(job.mode) === normalize(selectedMode);

      const matchesMedium =
        selectedMedium === "all" ||
        normalize(job.medium) === normalize(selectedMedium);

      const matchesDivision =
        selectedDivision === "all" ||
        normalize(job.division) === normalize(selectedDivision);

      const isActive =
        normalize(job.status) === "active" ||
        normalize(job.status) === "published" ||
        normalize(job.status) === "open";

      return (
        matchesClass && matchesMode && matchesMedium && matchesDivision
      );
    });

  // Approved Jobs
  const approvedJobs = tuitionJobs.filter(
    (job) => job.isApproved && normalize(job.status) === "active"
  );

  // handleResetFilters
  const handleResetFilters = () => {
    setSelectedClass("all");
    setSelectedDivision("all");
    setSelectedMode("all");
    setSelectedMedium("all");
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  // handleApply
  const handleApply = (job: TuitionJob) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };
  // formatting functions
  const formatDivision = (d: string) => d.charAt(0).toUpperCase() + d.slice(1);
  const formatMode = (m: string) => {
    switch (m.toLowerCase()) {
      case "hometutoring":
        return "Home Tutoring";
      case "onlinetutoring":
        return "Online Tutoring";
      case "groupclasses":
        return "Group Classes";
      default:
        return m;
    }
  };
  const formatMedium = (m: string) => {
    switch (m.toLowerCase()) {
      case "banglamedium":
        return "Bangla Medium";
      case "englishmedium":
        return "English Medium";
      case "englishversion":
        return "English Version";
      case "madrasahbackground":
        return "Madrasah Background";
      default:
        return m;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-purple-50 py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Perfect Tuition Job
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through {approvedJobs.length}+ available tuition
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
          <div className="flex items-center justify-between mb-4">
            {/* filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-800">Filters</h3>
            </div>
            {/* reset button*/}
            <div
              onClick={handleResetFilters}
              className="flex items-center gap-2 cursor-pointer select-none
             px-3 py-2 rounded-lg border border-gray-300
             hover:bg-gray-100 active:scale-95 transition"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-800">Reset</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Class Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="w-4 h-4 inline mr-1" />
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
              >
                <option value="all">All Classes</option>
                {classes.map((subject, idx) => (
                  <option key={idx} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Division Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Division
              </label>
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
              >
                <option value="all">All Divisions</option>
                <option value="Dhaka">Dhaka</option>
                <option value="khulna">Khulna</option>
                <option value="rajshahi">Rajshahi</option>
                <option value="rangpur">Rangpur</option>
                <option value="mymensingh">Mymensingh</option>
                <option value="chattogram">Chattogram</option>
                <option value="sylhet">Sylhet</option>
                <option value="barishal">Barishal</option>
              </select>
            </div>

            {/* Mode Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DoorOpen className="w-4 h-4 inline mr-1" />
                Teaching Mode
              </label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
              >
                <option value="all">All Modes</option>
                <option value="hometutoring">Home Tutoring</option>
                <option value="onlinetutoring">Online Tutoring</option>
                <option value="groupclasses">Group Classes</option>
              </select>
            </div>

            {/* Medium Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <School className="w-4 h-4 inline mr-1" />
                Medium
              </label>
              <select
                value={selectedMedium}
                onChange={(e) => setSelectedMedium(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
              >
                <option value="all">All Mediums</option>
                <option value="banglamedium">Bangla Medium</option>
                <option value="englishmedium">English Medium</option>
                <option value="englishversion">English Version</option>
                <option value="madrasahbackground">Madrasah Background</option>
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
            {selectedClass !== "all" && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {selectedClass}
              </span>
            )}
            {selectedMode !== "all" && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {formatMode(selectedMode)}
              </span>
            )}

            {selectedMedium !== "all" && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                {formatMedium(selectedMedium)}
              </span>
            )}

            {selectedDivision !== "all" && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {formatDivision(selectedDivision)}
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
