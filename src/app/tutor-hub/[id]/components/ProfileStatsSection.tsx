"use client";

import { motion } from "framer-motion";

interface ProfileStatsSectionProps {
  isOwnProfile: boolean;
  appStats: {
    applied: number;
    shortlisted: number;
    appointed: number;
    cancelled: number;
  };
  onSelect: (label: string, apiStatus: string) => void;
}

export default function ProfileStatsSection({
  isOwnProfile,
  appStats,
  onSelect,
}: ProfileStatsSectionProps) {
  if (!isOwnProfile) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
    >
      {[
        {
          label: "Applied Jobs",
          value: appStats.applied,
          color: "text-blue-600",
          bg: "bg-blue-50",
          icon: "📋",
          apiStatus: "applied",
        },
        {
          label: "Shortlisted Jobs",
          value: appStats.shortlisted,
          color: "text-indigo-600",
          bg: "bg-indigo-50",
          icon: "📌",
          apiStatus: "shortlisted",
        },
        {
          label: "Appointed Jobs",
          value: appStats.appointed,
          color: "text-violet-600",
          bg: "bg-violet-50",
          icon: "🔒",
          apiStatus: "appointed",
        },
        {
          label: "Cancelled Jobs",
          value: appStats.cancelled,
          color: "text-red-500",
          bg: "bg-red-50",
          icon: "❌",
          apiStatus: "rejected",
        },
      ].map(({ label, value, color, bg, icon, apiStatus }) => (
        <button
          key={label}
          onClick={() => onSelect(label, apiStatus)}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col items-start gap-1 cursor-pointer hover:shadow-md hover:border-gray-200 transition-all text-left w-full"
        >
          <div
            className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center text-xl mb-1`}
          >
            {icon}
          </div>
          <span className={`text-2xl font-bold ${color}`}>{value}</span>
          <span className="text-xs text-gray-500 font-medium">{label}</span>
        </button>
      ))}
    </motion.div>
  );
}
