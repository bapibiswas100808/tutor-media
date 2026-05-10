"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, RotateCcw } from "lucide-react";

import TuitionJobCard from "@/components/tuition/TuitionJobCard";
import ApplyJobModal from "@/components/tuition/ApplyJobModal";
import { TuitionJob } from "@/data/tuitionJobsList";
import Info from "@/components/info/info";

interface TuitionJobClientProps {
  tuitionJobs: TuitionJob[];
}

type ModalType = "details" | "apply" | null;

export default function TuitionJobClient({
  tuitionJobs,
}: TuitionJobClientProps) {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedDivision, setSelectedDivision] = useState("all");
  const [selectedMedium, setSelectedMedium] = useState("all");

  const [selectedJob, setSelectedJob] = useState<TuitionJob | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // Load more
  const ITEMS_PER_LOAD = 20;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

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

  const normalize = (value?: string) =>
    value?.toLowerCase().replace(/\s+/g, "");

  const filteredJobs = tuitionJobs.filter((job) => {
    const matchesClass =
      selectedClass === "all" ||
      normalize(job.class) === normalize(selectedClass);

    const matchesMedium =
      selectedMedium === "all" ||
      normalize(job.medium) === normalize(selectedMedium);

    const matchesDivision =
      selectedDivision === "all" ||
      normalize(job.division) === normalize(selectedDivision);

    return job.isApproved && matchesClass && matchesMedium && matchesDivision;
  });

  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [selectedClass, selectedDivision, selectedMedium]);

  const handleResetFilters = () => {
    setSelectedClass("all");
    setSelectedDivision("all");
    setSelectedMedium("all");
    setSelectedJob(null);
    setActiveModal(null);
    setVisibleCount(ITEMS_PER_LOAD);
  };

  // OPEN APPLY MODAL
  const handleApply = (job: TuitionJob) => {
    setSelectedJob(job);
    setActiveModal("apply");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-purple-50 py-20">
      <div className="container mx-auto px-4 max-w-7xl text-gray-800">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold ">
            Find Your Perfect Tuition Job
          </h1>
        </motion.div>

        {/* FILTERS */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Filter /> Filters
            </h3>

            <button
              onClick={handleResetFilters}
              className="flex items-center gap-2 text-sm border px-3 py-1 rounded"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Class */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="all">All Classes</option>
              {classes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            {/* Division */}
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="all">All Divisions</option>
              <option value="dhaka">Dhaka</option>
              <option value="khulna">Khulna</option>
              <option value="chattogram">Chattogram</option>
              <option value="rajshahi">Rajshahi</option>
              <option value="barishal">Barishal</option>
              <option value="sylhet">Sylhet</option>
              <option value="rangpur">Rangpur</option>
              <option value="mymensingh">Mymensingh</option>
            </select>

            {/* Medium */}
            <select
              value={selectedMedium}
              onChange={(e) => setSelectedMedium(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="all">All Mediums</option>
              <option value="banglamedium">Bangla Medium</option>
              <option value="englishmedium">English Medium</option>
              <option value="englishversion">English Version</option>
              <option value="madrasahbackground">Madrasah Background</option>
            </select>
          </div>
        </div>

        {/* JOB LIST */}
        <div className="grid md:grid-cols-2 gap-6">
          {[...filteredJobs]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .slice(0, visibleCount)
            .map((job) => (
              <TuitionJobCard
                key={job.jobId}
                job={job}
                onApply={handleApply}
                onViewDetails={(job: TuitionJob) => {
                  setSelectedJob(job);
                  setActiveModal("details");
                }}
              />
            ))}
        </div>

        {/* LOAD MORE */}
        {visibleCount < filteredJobs.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((p) => p + ITEMS_PER_LOAD)}
              className="px-6 py-2 bg-blue-600 text-white rounded"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* ================= DETAILS MODAL ================= */}
      {activeModal === "details" && selectedJob && (
        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            setActiveModal(null);
            setSelectedJob(null);
          }}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  {selectedJob.class}
                </h2>
                <p className="text-xs text-gray-500">
                  Job ID: {selectedJob.jobId}
                </p>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Subjects */}
              <div className="flex flex-wrap gap-2">
                {selectedJob.subjects?.map((sub: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                  >
                    {sub}
                  </span>
                ))}
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Info
                  label="📍 Location"
                  value={`${selectedJob.location}, ${selectedJob.district}`}
                />
                <Info label="🏙 Division" value={selectedJob.division} />
                <Info label="💰 Salary" value={selectedJob.salary} />
                <Info label="📅 Days" value={`${selectedJob.days} days/week`} />
                <Info label="⏰ Duration" value={selectedJob.duration} />
                <Info label="📘 Medium" value={selectedJob.medium} />
                <Info
                  label="👩‍🎓 Student Gender"
                  value={selectedJob.studentGender}
                />
                <Info label="👨‍🏫 Tutor Gender" value={selectedJob.tutorGender} />
                <Info
                  label="📌 Preferred Area"
                  value={selectedJob.preferredArea}
                />
              </div>

              {/* Description */}
              {selectedJob.tutorDescription && (
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    📌 Requirement
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedJob.tutorDescription}
                  </p>
                </div>
              )}

              {/* Location Description */}
              {selectedJob.locationDescription && (
                <div className="text-sm text-gray-500 bg-blue-50 border border-blue-100 rounded-xl p-3">
                  📍 {selectedJob.locationDescription}
                </div>
              )}

              {/* Status */}
              {/* <div className="flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full border ${
              selectedJob.isApproved
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-600 border-red-200"
            }`}
          >
            {selectedJob.isApproved ? "Approved" : "Pending"}
          </span>

          {selectedJob.isPremium && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
              Premium Job
            </span>
          )}

          {selectedJob.isVerified && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Verified
            </span>
          )}
        </div> */}
            </div>
          </div>
        </div>
      )}

      {/* ================= APPLY MODAL ================= */}
      <ApplyJobModal
        isOpen={activeModal === "apply"}
        onClose={() => {
          setActiveModal(null);
          setSelectedJob(null);
        }}
        job={selectedJob}
      />
    </div>
  );
}
