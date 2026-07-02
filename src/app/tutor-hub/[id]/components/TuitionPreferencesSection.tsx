"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Info from "@/components/info/info";
import { Tutor } from "@/data/tutorsList";

interface TuitionPreferencesSectionProps {
  tutor: Tutor;
}

export default function TuitionPreferencesSection({
  tutor,
}: TuitionPreferencesSectionProps) {
  if (!tutor?.basicInfo) return null;

  const tuitionPreferenceFields = [
    { label: "Expected Salary", key: "expectedSalary" },
    { label: "Current Tuition Status", key: "currentTuitionStatus" },
    { label: "Days Per Week", key: "daysPerWeek" },
    { label: "Tutoring Experience", key: "tutoringExperience" },
    { label: "Place of Learning", key: "placeOfLearning" },
    { label: "Preferred Medium", key: "preferredMedium" },
    { label: "Preferred Class", key: "preferredClass" },
    { label: "Preferred Subject", key: "preferredSubjects" },
    { label: "Preferred Time", key: "preferredTime" },
    { label: "Preferred Area", key: "preferredArea" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Shield className="w-6 h-6 mr-3 text-blue-600" />
        Tuition Preferences
      </h2>

      <div className="grid gap-6 md:grid-cols-2 text-gray-700">
        {tuitionPreferenceFields.map(({ label, key }) => {
          const rawValue =
            tutor.basicInfo?.[key as keyof typeof tutor.basicInfo];
          const value = Array.isArray(rawValue)
            ? rawValue.join(", ")
            : (rawValue ?? "Not specified");

          return <Info key={key} label={label} value={String(value)} />;
        })}
      </div>
    </motion.div>
  );
}
