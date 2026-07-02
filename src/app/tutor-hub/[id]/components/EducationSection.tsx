"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Info from "@/components/info/info";
import { Tutor } from "@/data/tutorsList";

type EducationEntry = {
  id: string;
  academy: string;
  curriculum?: string;
  group?: string;
  passingYear?: string;
  result?: string;
  instituteType?: string;
  studyType?: string;
  department?: string;
  cgpa?: string;
  degreeTitle?: string;
};

interface EducationSectionProps {
  tutor: Tutor;
}

export default function EducationSection({ tutor }: EducationSectionProps) {
  if (!tutor.education) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-2xl shadow-lg p-8 text-gray-800"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <GraduationCap className="w-6 h-6 mr-3 text-blue-600" />
        Education
      </h2>

      <ul className="space-y-3">
        {Object.entries(tutor.education).flatMap(([level, records]) =>
          (records || []).map((edu: EducationEntry) => (
            <Info
              key={edu.id}
              label={level.toUpperCase()}
              value={
                `${edu.academy || "N/A"}${edu.passingYear ? ` (${edu.passingYear})` : ""}` +
                (edu.group ? ` - ${edu.group}` : "") +
                (edu.degreeTitle ? ` - ${edu.degreeTitle}` : "") +
                (edu.cgpa
                  ? ` - CGPA: ${edu.cgpa}`
                  : edu.result
                    ? ` - Result: ${edu.result}`
                    : "")
              }
            />
          )),
        )}
      </ul>
    </motion.div>
  );
}
