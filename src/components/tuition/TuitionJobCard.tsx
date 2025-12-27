"use client";

import { motion } from "framer-motion";
import { TuitionJob } from "@/data/tuitionJobsList";
import {
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  BookOpen,
  Home,
  Video,
} from "lucide-react";

interface TuitionJobCardProps {
  job: TuitionJob;
  onApply: (job: TuitionJob) => void;
}

const getModeIcon = (mode: string) => {
  if (mode.toLowerCase().includes("online"))
    return <Video className="w-4 h-4" />;
  if (mode.toLowerCase().includes("home")) return <Home className="w-4 h-4" />;
  return <BookOpen className="w-4 h-4" />;
};

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

export default function TuitionJobCard({ job, onApply }: TuitionJobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Header with Subject Badge */}
      <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 p-5 border-b border-gray-100">
        {/* Urgency Badge */}
        {/* {job.urgency === "urgent" && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            <AlertCircle className="w-3 h-3" />
            URGENT
          </div>
        )} */}

        {/* Subject Badge */}
        {/* <div
          className={`inline-flex items-center gap-2 ${subjectColor} text-white px-4 py-2 rounded-full text-sm font-semibold mb-3`}
        >
          <BookOpen className="w-4 h-4" />
          {job.subject}
        </div> */}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
          {job.title}
        </h3>

        {/* Class Level */}
        <p className="text-sm font-medium text-gray-600">{job.class}</p>

        {/* Tutor Gender */}
        <p className="text-sm font-medium text-gray-600 capitalize">
          Tutor Gender Preferred:{" "}
          <span className="font-bold">{job.gender}</span>
        </p>
        {/* Job id */}
        <p className="text-sm font-medium text-gray-600 capitalize">
          Job id: <span className="font-bold">{job.id}</span>
        </p>
        {/* Posted Date */}
        {/* <p className="text-sm font-medium text-gray-600 capitalize">
          Posted Date: <span className="font-bold">{job.postedDate}</span>
        </p> */}
        <p className="text-sm font-medium text-gray-600 capitalize">
          Posted: <span className="font-bold">{timeAgo(job.createdAt)}</span>
        </p>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Location</p>
              <p className="text-sm text-gray-700 font-semibold">{job.area}</p>
            </div>
          </div>

          {/* Budget */}
          <div className="flex items-start gap-2">
            <DollarSign className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Budget</p>
              <p className="text-sm text-gray-700 font-semibold">
                {job.budget}
              </p>
            </div>
          </div>

          {/* Mode */}
          <div className="flex items-start gap-2 text-gray-600">
            {getModeIcon(job.mode)}
            <div>
              <p className="text-xs text-gray-500 font-medium">Mode</p>
              <p className="text-sm text-gray-700 font-semibold">{job.mode}</p>
            </div>
          </div>

          {/* Schedule */}
          {/* <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Schedule</p>
              <p className="text-sm text-gray-700 font-semibold">
                {job.schedule}
              </p>
            </div>
          </div> */}
        </div>

        {/* Description */}
        <div className="border-t pt-3">
          <p className="text-sm text-gray-600 line-clamp-3">
            <p className="text-xs text-gray-500 font-medium">
              Schedule Description
            </p>
            {job.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          {/* Posted Date & Applicants */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(job.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => onApply(job)}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
          >
            Apply Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
