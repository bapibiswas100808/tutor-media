"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

export interface BasicInfoData {
  email: string;
  image?: string;

  expectedSalary?: string;
  currentTuitionStatus?: string;
  daysPerWeek?: string;
  tutoringExperience?: string;
  placeOfLearning?: string;
  preferredMedium?: string;
  preferredClass?: string;
  preferredSubjects?: string;
  preferredTime?: string;
  preferredArea?: string;

  days: string[];
  mode: "Online" | "Offline" | "Hybrid" | "";
}

const SALARY_OPTIONS = [
  "0 Tk / Month",
  "500 Tk / Month",
  "1,000 Tk / Month",
  "1,500 Tk / Month",
  "2,000 Tk / Month",
  "2,500 Tk / Month",
  "3,000 Tk / Month",
  "3,500 Tk / Month",
  "5,000 Tk / Month",
  "5,500 Tk / Month",
  "6,000 Tk / Month",
  "6,500 Tk / Month",
  "7,000 Tk / Month",
  "7,500 Tk / Month",
  "8,000 Tk / Month",
  "8,500 Tk / Month",
  "9,000 Tk / Month",
  "9,500 Tk / Month",
  "10,000 Tk / Month",
  "10,500 Tk / Month",
  "11,000 Tk / Month",
  "11,500 Tk / Month",
  "12,000 Tk / Month",
  "12,500 Tk / Month",
  "13,000 Tk / Month",
  "13,500 Tk / Month",
  "14,000 Tk / Month",
  "14,500 Tk / Month",
  "15,000 Tk / Month",
];

const DAYS_PER_WEEK_OPTIONS = [
  "1 Day / Week",
  "2 Days / Week",
  "3 Days / Week",
  "4 Days / Week",
  "5 Days / Week",
  "6 Days / Week",
  "7 Days / Week",
];

const weekDays = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const EXPERIENCE_OPTIONS = Array.from(
  { length: 20 },
  (_, i) => `${i + 1} Year${i > 0 ? "s" : ""}`
);

const TIME_OPTIONS = ["Morning", "Afternoon", "Evening", "Night"];

interface BasicInfoProps {
  data: BasicInfoData;
  setData: React.Dispatch<React.SetStateAction<BasicInfoData>>;
}

export default function BasicInfo({ data, setData }: BasicInfoProps) {
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string>("");

  /* ---------- Handle Change ---------- */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as {
      name: keyof BasicInfoData;
      value: string;
    };

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors({ ...errors });
  };

  /* ---------- IMAGE UPLOAD ---------- */
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );

      const result = await res.json();

      if (result.success) {
        setData((prev) => ({
          ...prev,
          image: result.data.url,
        }));
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      URL.revokeObjectURL(previewUrl);
      setUploading(false);
    }
  };

  /* ---------- Handle Mode Change ---------- */
  const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setData((prev) => ({
      ...prev,
      mode: e.target.value as BasicInfoData["mode"],
    }));
  };

  /* ---------- Handle Day Toggle ---------- */
  const handleDayToggle = (day: string) => {
    setData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  return (
    <div className="space-y-5 text-gray-700">
      <div className="md:flex gap-4 items-end">
        {/* Profile Image */}
        <div className="flex-1 mb-4 md:mb-0">
          {(preview || data.image) && (
            <div className="w-24 h-24 rounded-full mb-2 relative overflow-hidden">
              <Image
                src={preview || data.image!}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          )}
          <label className="block font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full border rounded-lg px-3 py-2"
          />

          {uploading && (
            <p className="text-sm text-blue-600 mt-1">Uploading...</p>
          )}
        </div>

        {/* Email */}
        <div className="flex-1">
          <label className="block font-medium">
            Email Address *
            <p className="text-sm text-gray-500 mt-1">
              Email is linked to your account and cannot be changed
            </p>
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            readOnly
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>

      {/* -------- Tuition Preferences -------- */}
      <div className="space-y-4">

        <div className="grid md:grid-cols-2 gap-4">
          {/* Expected Minimum Salary */}
          <div>
            <label className="block font-medium">Expected Minimum Salary</label>
            <select
              name="expectedSalary"
              value={data.expectedSalary || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select salary</option>
              {SALARY_OPTIONS.map((salary) => (
                <option key={salary} value={salary}>
                  {salary}
                </option>
              ))}
            </select>
          </div>

          {/* Current Status */}
          <div>
            <label className="block font-medium">
              Current Status for Tuition
            </label>
            <select
              name="currentTuitionStatus"
              value={data.currentTuitionStatus || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select status</option>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="part-time">Part Time</option>
            </select>
          </div>

          {/* Days Per Week */}
          <div>
            <label className="block font-medium">Days Per Week</label>
            <select
              name="daysPerWeek"
              value={data.daysPerWeek || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select days</option>
              {DAYS_PER_WEEK_OPTIONS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Tutoring Experience */}
          <div>
            <label className="block font-medium">Tutoring Experience</label>
            <select
              name="tutoringExperience"
              value={data.tutoringExperience || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select experience</option>
              {EXPERIENCE_OPTIONS.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </div>

          {/* Place of Learning */}
          <div>
            <label className="block font-medium">Place of Learning</label>
            <select
              name="placeOfLearning"
              value={data.placeOfLearning || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select place</option>
              <option value="home">Student Home</option>
              <option value="teacher">Tutor Home</option>
              <option value="online">Online</option>
            </select>
          </div>

          {/* Preferred Medium */}
          <div>
            <label className="block font-medium">
              Preferred Medium of Instruction
            </label>
            <select
              name="preferredMedium"
              value={data.preferredMedium || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select medium</option>
              <option value="bangla">Bangla</option>
              <option value="english">English</option>
              <option value="both">Both</option>
            </select>
          </div>

          {/* Preferred Class */}
          <div>
            <label className="block font-medium">Preferred Class</label>
            <input
              type="text"
              name="preferredClass"
              value={data.preferredClass || ""}
              onChange={handleChange}
              placeholder="e.g. Class 8–10"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Preferred Subjects */}
          <div>
            <label className="block font-medium">Preferred Subjects</label>
            <input
              type="text"
              name="preferredSubjects"
              value={data.preferredSubjects || ""}
              onChange={handleChange}
              placeholder="Math, Physics"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Preferred Time */}
          <div>
            <label className="block font-medium">Preferred Time</label>
            <select
              name="preferredTime"
              value={data.preferredTime || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select time</option>
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Area */}
          <div>
            <label className="block font-medium">Preferred Area to Teach</label>
            <input
              type="text"
              name="preferredArea"
              value={data.preferredArea || ""}
              onChange={handleChange}
              placeholder="Mirpur, Dhanmondi"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Available Days */}
          <div>
            <label className="block font-medium">Available Days</label>
            <div className="flex flex-wrap gap-2">
              {weekDays.map((day) => (
                <button
                  key={day}
                  type="button"
                  aria-pressed={data.days.includes(day)}
                  onClick={() => handleDayToggle(day)}
                  className={`px-3 py-2 rounded-lg border cursor-pointer ${
                    data.days.includes(day)
                      ? "bg-[#0C259F] text-white border-[#0C259F]"
                      : "bg-gray-400 text-white border-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Mode */}
          <div>
            <label className="block font-medium">Preferred Mode</label>
            <select
              value={data.mode}
              onChange={handleModeChange}
              className="w-full border rounded-lg px-3 py-2.5"
              disabled={data.days.length === 0}
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
