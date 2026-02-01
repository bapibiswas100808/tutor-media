"use client";

import React from "react";
import { X } from "lucide-react";

export interface EducationEntry {
  id: string;
  academy: string;
  curriculum: string;
  group: string;
  passingYear: string;
  result: string;
  instituteType: string;
  studyType: string;
  department: string;
  cgpa: string;
}

interface Props {
  sscData: EducationEntry[];
  hscData: EducationEntry[];
  gradData: EducationEntry[];
  setSscData: React.Dispatch<React.SetStateAction<EducationEntry[]>>;
  setHscData: React.Dispatch<React.SetStateAction<EducationEntry[]>>;
  setGradData: React.Dispatch<React.SetStateAction<EducationEntry[]>>;
}

const years = Array.from(
  { length: new Date().getFullYear() - 1950 + 1 },
  (_, i) => `${new Date().getFullYear() - i}`,
);

/* ===========================
   SAFE CHANGE HANDLER
=========================== */
const handleChange = (
  index: number,
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setData: React.Dispatch<React.SetStateAction<EducationEntry[]>>,
) => {
  const { name, value } = e.target;

  setData((prev) =>
    prev.map((item, i) => (i === index ? { ...item, [name]: value } : item)),
  );
};

/* ===========================
   SECTION
=========================== */
const EducationSection = ({
  title,
  data,
  setData,
  showCurriculum,
  showGroup,
  showPassingYear,
  showResult,
  showInstituteType,
  showStudyType,
  showDepartment,
  showCGPA,
}: {
  title: string;
  data: EducationEntry[];
  setData: React.Dispatch<React.SetStateAction<EducationEntry[]>>;
  showCurriculum?: boolean;
  showGroup?: boolean;
  showPassingYear?: boolean;
  showResult?: boolean;
  showInstituteType?: boolean;
  showStudyType?: boolean;
  showDepartment?: boolean;
  showCGPA?: boolean;
}) => (
  <div className="p-6 bg-white rounded-lg shadow space-y-4">
    <h3 className="font-bold">{title}</h3>

    {Array.isArray(data) &&
      data.map((entry, index) => (
        <div key={entry.id} className="grid md:grid-cols-2 gap-4 items-end">
          {/* Institute */}
          <div>
            <label>Institute</label>
            <input
              name="academy"
              value={entry.academy}
              onChange={(e) => handleChange(index, e, setData)}
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>

          {/* Curriculum */}
          {showCurriculum && (
            <div>
              <label>Curriculum</label>
              <select
                name="curriculum"
                value={entry.curriculum}
                onChange={(e) => handleChange(index, e, setData)}
                className="border rounded-lg px-3 py-2.5 w-full"
              >
                <option value="">Select</option>
                <option value="Bangla">Bangla</option>
                <option value="English">English</option>
              </select>
            </div>
          )}

          {/* Group */}
          {showGroup && (
            <div>
              <label>Group</label>
              <select
                name="group"
                value={entry.group}
                onChange={(e) => handleChange(index, e, setData)}
                className="border rounded-lg px-3 py-2.5 w-full"
              >
                <option value="">Select</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
          )}

          {/* Passing Year */}
          {showPassingYear && (
            <div>
              <label>Passing Year</label>
              <select
                name="passingYear"
                value={entry.passingYear}
                onChange={(e) => handleChange(index, e, setData)}
                className="border rounded-lg px-3 py-2.5 w-full"
              >
                <option value="">Select</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div>
              <label>Result</label>
              <input
                name="result"
                value={entry.result}
                onChange={(e) => handleChange(index, e, setData)}
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>
          )}

          {/* Institute Type */}
          {showInstituteType && (
            <div>
              <label>Institute Type</label>
              <select
                name="instituteType"
                value={entry.instituteType}
                onChange={(e) => handleChange(index, e, setData)}
                className="border rounded-lg px-3 py-2.5 w-full"
              >
                <option value="">Select</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
          )}

          {/* Study Type */}
          {showStudyType && (
            <div>
              <label>Study Type</label>
              <select
                name="studyType"
                value={entry.studyType}
                onChange={(e) => handleChange(index, e, setData)}
                className="border rounded-lg px-3 py-2.5 w-full"
              >
                <option value="">Select</option>
                <option value="Honours">Honours</option>
                <option value="Pass">Pass</option>
              </select>
            </div>
          )}

          {/* Department */}
          {showDepartment && (
            <div>
              <label>Department</label>
              <input
                name="department"
                value={entry.department}
                onChange={(e) => handleChange(index, e, setData)}
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>
          )}

          {/* CGPA */}
          {showCGPA && (
            <div>
              <label>CGPA</label>
              <input
                name="cgpa"
                value={entry.cgpa}
                onChange={(e) => handleChange(index, e, setData)}
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>
          )}

          {/* Remove */}
          {data.length > 1 && (
            <button
              type="button"
              onClick={() =>
                setData((prev) => prev.filter((_, i) => i !== index))
              }
              className="text-red-500 mt-6"
            >
              <X />
            </button>
          )}
        </div>
      ))}
  </div>
);

/* ===========================
   MAIN
=========================== */
export default function Education({
  sscData,
  hscData,
  gradData,
  setSscData,
  setHscData,
  setGradData,
}: Props) {
  return (
    <div className="space-y-8 text-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Educational Information
      </h3>
      <EducationSection
        title="SSC"
        data={sscData}
        setData={setSscData}
        showCurriculum
        showGroup
        showPassingYear
        showResult
      />

      <EducationSection
        title="HSC"
        data={hscData}
        setData={setHscData}
        showCurriculum
        showGroup
        showPassingYear
        showResult
      />

      <EducationSection
        title="Graduation"
        data={gradData}
        setData={setGradData}
        showInstituteType
        showStudyType
        showDepartment
        showCurriculum
        showPassingYear
        showCGPA
      />
    </div>
  );
}
