"use client";

import { motion } from "framer-motion";
import { TuitionJob } from "@/data/tuitionJobsList";
import {
  MapPin,
  DollarSign,
  Calendar,
  BookOpen,
  Clock,
  User,
  BadgeCheck,
  Star,
  Eye,
} from "lucide-react";

interface TuitionJobCardProps {
  job: TuitionJob;
  onApply: (job: TuitionJob) => void;
  onViewDetails?: (job: TuitionJob) => void;
}

interface TimeInterval {
  label: string;
  seconds: number;
}

function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: TimeInterval[] = [
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
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export default function TuitionJobCard({ job, onApply, onViewDetails }: TuitionJobCardProps) {
  // const [selectedJob, setSelectedJob] = useState<TuitionJob | null>(null);

  const subjectText =
    job.subjects?.length > 2
      ? `${job.subjects} `
      : job.subjects?.join(", ") || "Teacher";

  const className = job.class;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(37,99,235,0.13)" }}
      className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Accent top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

      <div className="p-4">
        {/* Top row: title + badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 leading-snug">
              Teacher needed for{" "}
              {subjectText === "All" ? "All Subjects" : subjectText}{" "}
              <span className="text-blue-600">{className}</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <span className="font-mono tracking-wide">{job.jobId}</span>
              <span className="mx-1 text-gray-200">·</span>
              <Calendar className="w-3 h-3 inline" />
              <span>{timeAgo(job.createdAt)}</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            {job.isPremium && (
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                Premium
              </span>
            )}
            {job.isVerified && (
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                <BadgeCheck className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
        </div>

        {/* Subjects pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {job.subjects?.slice(0, 4).map((sub, i) => (
            <span
              key={i}
              className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full text-xs font-semibold"
            >
              {sub}
            </span>
          ))}
          {job.subjects?.length > 4 && (
            <span className="text-xs text-gray-400 self-center">
              +{job.subjects.length - 4}
            </span>
          )}
        </div>

        {/* Key info grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 bg-gray-50 rounded-xl p-3 mb-3 text-sm">
          <div className="flex items-center gap-1.5 text-gray-600 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="truncate font-medium">
              {job.location}, {job.district}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 min-w-0">
            <DollarSign className="w-3.5 h-3.5 text-green-500 shrink-0" />
            <span className="font-semibold text-green-700">
              {job.salary} ৳/mo
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 min-w-0">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">{job.medium}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 min-w-0">
            <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span>
              {job.days}d/wk · {job.duration}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 col-span-2 min-w-0">
            <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="capitalize">
              Tutor preferred:{" "}
              <span className="font-semibold text-gray-800">
                {job.tutorGender}
              </span>
            </span>
          </div>
        </div>

        {/* Tutor description */}
        {job.tutorDescription && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
            <span className="font-semibold text-gray-700">Requirement: </span>
            {job.tutorDescription}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
          {/* Left side */}
          <div className="flex items-center gap-2">
            <button
  onClick={() => onViewDetails?.(job)}
  className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-xs font-semibold"
>
  <Eye className="w-4 h-4" />
  View Details
</button>
          </div>

          {/* Middle */}
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {new Date(job.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>

          {/* Right */}
          <button
            onClick={() => onApply(job)}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2 rounded-full font-semibold text-xs tracking-wide transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
          >
            Apply Now
          </button>
        </div>
      </div>

  
    </motion.div>
  );
}
