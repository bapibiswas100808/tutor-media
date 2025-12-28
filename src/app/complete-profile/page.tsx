"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BasicInfo, { BasicInfoData } from "./tabs/basicInfo";
import Education, { EducationEntry } from "./tabs/education";
import Availability, { AvailabilityData } from "./tabs/availability";

const tabs = ["Basic Info", "Education", "Availability"];

export default function CompleteProfilePage() {
  // =========================
  // STATES
  // =========================
  const [basicInfo, setBasicInfo] = useState<BasicInfoData>({
    image: "",
    password: "",
  });

  const [education, setEducation] = useState<EducationEntry[]>([
    { academy: "", year: "" },
  ]);

  const [availability, setAvailability] = useState<AvailabilityData>({
    days: [],
    mode: "",
  });

  const [activeTab, setActiveTab] = useState(0);

  // =========================
  // VALIDATION
  // =========================
  const validateBasicInfo = () => {
    const required: (keyof BasicInfoData)[] = [
      "fullName",
      "email",
      "phone",
      "gender",
    ];

    const baseValid = required.every(
      (field) => (basicInfo[field] ?? "").toString().trim() !== ""
    );

    // if the user provided a password, ensure it meets length and matches confirm
    const passwordValid =
      !basicInfo.password ||
      (basicInfo.password.length >= 6 &&
        basicInfo.password === basicInfo.confirmPassword);

    return baseValid && passwordValid;
  };

  const validateEducation = () =>
    education.length > 0 &&
    education.every((e) => e.academy.trim() !== "" && e.year !== "");

  const validateAvailability = () =>
    availability.days.length > 0 && availability.mode !== "";

  const isFormValid =
    validateBasicInfo() && validateEducation() && validateAvailability();

  // =========================
  // SAVE HANDLER
  // =========================
  const handleSave = async () => {
    if (!isFormValid) {
      if (!validateBasicInfo()) setActiveTab(0);
      else if (!validateEducation()) setActiveTab(1);
      else setActiveTab(2);

      alert("Please fill all required fields");
      return;
    }

    const profileData = {
      basicInfo,
      education,
      availability,
    };

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      alert("Profile saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Complete Tutor Profile</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-8">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={`pb-2 font-medium transition ${
              activeTab === index
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Animated Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        {activeTab === 0 && (
          <BasicInfo data={basicInfo} setData={setBasicInfo} />
        )}
        {activeTab === 1 && (
          <Education data={education} setData={setEducation} />
        )}
        {activeTab === 2 && (
          <Availability data={availability} setData={setAvailability} />
        )}
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          disabled={!isFormValid}
          className={`bg-[#0D24A0] w-full text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all ${
            !isFormValid
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700 hover:scale-105"
          }`}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
