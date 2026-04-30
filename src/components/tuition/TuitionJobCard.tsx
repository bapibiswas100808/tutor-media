"use client";

import { motion } from "framer-motion";
import { TuitionJob } from "@/data/tuitionJobsList";
import {
  MapPin,
  Eye,
  LayoutGrid,
  BookOpen,
  FileText,
  CheckSquare,
} from "lucide-react";

interface TuitionJobCardProps {
  job: TuitionJob;
  onApply: (job: TuitionJob) => void;
  onViewDetails?: (job: TuitionJob) => void;
}

function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1)
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

interface InfoCellProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoCell({ icon, label, value }: InfoCellProps) {
  return (
    <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl p-3">
      <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center shrink-0 text-orange-500">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-bold text-gray-800 truncate">{value}</p>
      </div>
    </div>
  );
}

export default function TuitionJobCard({
  job,
  onApply,
  onViewDetails,
}: TuitionJobCardProps) {
  const tutorGenderCapitalized =
    job.tutorGender.charAt(0).toUpperCase() + job.tutorGender.slice(1);
  const subjectDisplay = job.subjects?.join(", ") || "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 p-4"
    >
      {/* Top row: badge · ID · time ago */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
          Home Tuition
        </span>
        <span className="text-xs text-gray-500 font-mono">
          ID : {job.jobId}
        </span>
        <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">
          {timeAgo(job.createdAt)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-gray-900 mb-4 leading-snug">
        Need a <span className="text-red-500">{tutorGenderCapitalized}</span>{" "}
        Tutor for {job.medium} {job.location} , {job.district}
      </h3>

      {/* Info grid: 3 cols × 2 rows */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
        <InfoCell
          icon={<LayoutGrid className="w-4 h-4" />}
          label="Category"
          value={job.medium}
        />
        <InfoCell
          icon={<BookOpen className="w-4 h-4" />}
          label="Class"
          value={job.class}
        />
        <InfoCell
          icon={<FileText className="w-4 h-4" />}
          label="Subject"
          value={subjectDisplay}
        />
        <InfoCell
          icon={<CheckSquare className="w-4 h-4" />}
          label="Day"
          value={`${job.days} Days/Week`}
        />
        <InfoCell
          icon={<MapPin className="w-4 h-4" />}
          label="Location"
          value={job.location}
        />
        <InfoCell
          icon={<span className="text-sm font-bold leading-none">৳</span>}
          label="Tuition fees"
          value={`${job.salary} ৳`}
        />
      </div>

      {/* Requirement */}
      {job.tutorDescription && (
        <p className="text-xs text-gray-500 mb-4">
          <span className="font-semibold text-gray-700">Requirement: </span>
          {job.tutorDescription}
        </p>
      )}

      {/* Footer */}
      <div className="border-t border-gray-100 pt-3 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewDetails?.(job)}
          className="flex items-center gap-1.5 text-gray-600 border border-gray-200 px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>

        <span className="text-xs text-gray-400 whitespace-nowrap">
          {new Date(job.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>

        <button
          onClick={() => onApply(job)}
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2 rounded-full font-semibold text-xs tracking-wide transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          Apply Now
        </button>
      </div>
    </motion.div>
  );
}
