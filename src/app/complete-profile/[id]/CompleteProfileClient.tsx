"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BasicInfo, { BasicInfoData } from "./tabs/basicInfo";
import Education, { EducationEntry } from "./tabs/education";
import Availability, { AvailabilityData } from "./tabs/availability";

const tabs = ["Basic Info", "Education", "Availability"];

interface Props {
  tutorId: string;
}

export default function CompleteProfileClient({ tutorId }: Props) {
  // =========================
  // STATES
  // =========================
  const [basicInfo, setBasicInfo] = useState<BasicInfoData>({
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
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
  // FETCH TUTOR EMAIL
  // =========================
  useEffect(() => {
    if (!tutorId) return;

    async function fetchTutorEmail() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/allTutors/${tutorId}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch tutor");

        const tutor = await res.json();

        setBasicInfo((prev) => ({
          ...prev,
          email: tutor.basicInfo?.email ?? tutor.email ?? "",
          image: tutor.basicInfo?.image ?? "",
        }));
      } catch (error) {
        console.error(error);
      }
    }

    fetchTutorEmail();
  }, [tutorId]);

  // =========================
  // VALIDATION
  // =========================
  const validateBasicInfo = () => {
    if (!basicInfo.email?.trim()) return false;
    if (!basicInfo.password?.trim()) return false;
    if (basicInfo.password.length < 6) return false;
    if (!basicInfo.confirmPassword?.trim()) return false;
    if (basicInfo.password !== basicInfo.confirmPassword) return false;
    return true;
  };

  const validateEducation = () =>
    education.length > 0 &&
    education.every((e) => e.academy.trim() !== "" && e.year.trim() !== "");

  const validateAvailability = () =>
    availability.days.length > 0 && availability.mode !== "";

  const isFormValid =
    validateBasicInfo() && validateEducation() && validateAvailability();

  // =========================
  // SAVE HANDLER (PUT)
  // =========================
  const handleSave = async () => {
    try {
      if (!isFormValid) {
        if (!validateBasicInfo()) setActiveTab(0);
        else if (!validateEducation()) setActiveTab(1);
        else setActiveTab(2);

        alert("Please fill all required fields correctly");
        return;
      }

      // Build the profile update data
      const updateData = {
        password: basicInfo.password,
        image: basicInfo.image,
        education: education,
        availability: availability,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/allTutors/${tutorId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      // Check response content type
      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        throw new Error(`Server error: ${text.substring(0, 100)}`);
      }

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Update failed");
      }

      console.log("Updated tutor:", responseData);
      alert("Profile updated successfully! ✅");
    } catch (error) {
      console.error("Update failed:", error);
      alert(`Update failed. ❌ ${error instanceof Error ? error.message : ""}`);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Complete Tutor Profile
        </h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-700 mb-8">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`pb-2 font-medium transition ${
                activeTab === index
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-800"
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
    </div>
  );
}
