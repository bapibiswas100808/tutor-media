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
} from "lucide-react";

interface TuitionJobCardProps {
  job: TuitionJob;
  onApply: (job: TuitionJob) => void;
}

// const getModeIcon = (mode: string) => {
//   if (mode.toLowerCase().includes("online"))
//     return <Video className="w-4 h-4" />;
//   if (mode.toLowerCase().includes("home")) return <Home className="w-4 h-4" />;
//   return <BookOpen className="w-4 h-4" />;
// };

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
  // const subjectText = job.subjects?.length
  //   ? job.subjects.join(", ")
  //   : "Teacher";
  // const className = job.class?.toLowerCase();

  const subjectText =
    job.subjects?.length > 2
      ? `${job.subjects} `
      : job.subjects?.join(", ") || "Teacher";

  const className = job.class;

  return (
    //     <motion.div
    //       initial={{ opacity: 0, y: 20 }}
    //       whileInView={{ opacity: 1, y: 0 }}
    //       viewport={{ once: true }}
    //       transition={{ duration: 0.5 }}
    //       whileHover={{ y: -5 }}
    //       className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    //     >
    //       {/* Header with Subject Badge */}
    //       <div className="relative bg-linear-to-r from-blue-50 to-purple-50 p-5 border-b border-gray-100">
    //         {/* Urgency Badge */}
    //         {/* {job.urgency === "urgent" && (
    //           <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
    //             <AlertCircle className="w-3 h-3" />
    //             URGENT
    //           </div>
    //         )} */}
    //         {/* Subject Badge */}
    //         {/* <div
    //           className={`inline-flex items-center gap-2 ${subjectColor} text-white px-4 py-2 rounded-full text-sm font-semibold mb-3`}
    //         >
    //           <BookOpen className="w-4 h-4" />
    //           {job.subject}
    //         </div> */}
    //         {/* Title */}

    //         <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
    //           {`${subjectText} teacher needed for class ${className}`}
    //         </h3>
    //         {/* <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
    //           {job.title}
    //         </h3> */}

    //         {/* Class Level */}
    //         <p className="text-sm font-medium text-gray-600">{job.class}</p>
    //         {/* Tutor Gender */}
    //         <p className="text-sm font-medium text-gray-600 capitalize">
    //           Tutor Gender Preferred:{" "}
    //           <span className="font-bold">{job.tutorGender}</span>
    //         </p>
    //         {/* Job id */}
    //         <p className="text-sm font-medium text-gray-600 capitalize">
    //           Job id: <span className="font-bold">{job.jobId}</span>
    //         </p>
    //         {/* Posted Date */}
    //         {/* <p className="text-sm font-medium text-gray-600 capitalize">
    //           Posted Date: <span className="font-bold">{job.postedDate}</span>
    //         </p> */}
    //         <p className="text-sm font-medium text-gray-600 capitalize pb-3">
    //           Posted: <span className="font-bold">{timeAgo(job.createdAt)}</span>
    //         </p>

    //         <div className="border-t pt-3">
    //           <p className="text-xs text-gray-500 font-medium mb-1">Subjects</p>
    //           <div className="flex flex-wrap gap-2">
    //             {job.subjects?.map((sub, i) => (
    //               <span
    //                 key={i}
    //                 className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-semibold"
    //               >
    //                 {sub}
    //               </span>
    //             ))}
    //           </div>
    //         </div>
    //       </div>

    //       {/* Body */}
    //       <div className="p-5 space-y-4">
    //         {/* Key Info Grid */}
    //         <div className="grid grid-cols-2 gap-3">
    //           {/* Location */}
    //           {/* <div className="flex items-start gap-2">
    //             <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
    //             <div>
    //               <p className="text-xs text-gray-500 font-medium">Location</p>
    //               <p className="text-sm text-gray-700 font-semibold capitalize">
    //                 {job.division}
    //               </p>
    //             </div>
    //           </div> */}
    //           <div className="flex items-start gap-2">
    //   <MapPin className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
    //   <div>
    //     <p className="text-xs text-gray-500 font-medium">Full Location</p>
    //     <p className="text-sm text-gray-700 font-semibold">
    //       {job.location}, {job.district}
    //     </p>
    //   </div>
    // </div>

    //           {/* Budget */}
    //           <div className="flex items-start gap-2">
    //             <DollarSign className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
    //             <div>
    //               <p className="text-xs text-gray-500 font-medium">Budget</p>
    //               <p className="text-sm text-gray-700 font-semibold">
    //                 {job.salary}
    //               </p>
    //             </div>
    //           </div>

    //           {/* Mode */}
    //           {/* <div className="flex items-start gap-2 text-gray-600">
    //             {getModeIcon(job.mode)}
    //             <div>
    //               <p className="text-xs text-gray-500 font-medium">Mode</p>
    //               <p className="text-sm text-gray-700 font-semibold">{job.mode}</p>
    //             </div>
    //           </div> */}

    //           {/* Schedule */}
    //           {/* <div className="flex items-start gap-2">
    //             <Clock className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
    //             <div>
    //               <p className="text-xs text-gray-500 font-medium">Schedule</p>
    //               <p className="text-sm text-gray-700 font-semibold">
    //                 {job.schedule}
    //               </p>
    //             </div>
    //           </div> */}
    //         </div>

    //         {/* Description */}
    //         <div className="border-t pt-3">
    //           <p className="text-sm text-gray-600 line-clamp-3">
    //             <span className="text-xs text-gray-500 font-medium">
    //               Tutor Description--
    //             </span>
    //             {job.tutorDescription}
    //           </p>
    //         </div>

    //         {/* Footer */}
    //         <div className="flex items-center justify-between pt-3 border-t">
    //           {/* Posted Date & Applicants */}
    //           <div className="flex items-center gap-4 text-xs text-gray-500">
    //             <div className="flex items-center gap-1">
    //               <Calendar className="w-3.5 h-3.5" />
    //               <span>
    //                 {new Date(job.createdAt).toLocaleDateString("en-US", {
    //                   month: "short",
    //                   day: "numeric",
    //                 })}
    //               </span>
    //             </div>
    //           </div>

    //           {/* Apply Button */}
    //           <button
    //             onClick={() => onApply(job)}
    //             className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
    //           >
    //             Apply Now
    //           </button>
    //         </div>
    //       </div>
    //     </motion.div>

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
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-400">
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
      </div>
    </motion.div>
  );
}
