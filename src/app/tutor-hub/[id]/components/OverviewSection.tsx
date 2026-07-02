"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Tutor } from "@/data/tutorsList";

interface OverviewSectionProps {
  tutor: Tutor;
}

export default function OverviewSection({ tutor }: OverviewSectionProps) {
  if (!tutor?.personalInfo?.overview) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Users className="w-6 h-6 mr-3 text-blue-600" />
        Overview
      </h2>
      <p className="text-gray-700 leading-relaxed">
        {tutor.personalInfo.overview || "No overview available."}
      </p>
    </motion.div>
  );
}
