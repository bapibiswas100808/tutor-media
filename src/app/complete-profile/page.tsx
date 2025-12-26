"use client";

import { useState, ChangeEvent } from "react";
import BasicInfo, { BasicInfoData } from "./tabs/basicInfo";
import Education, { EducationEntry } from "./tabs/education";
import Availability, { AvailabilityData } from "./tabs/availability";

const tabs = ["Basic Info", "Education", "Availability"];

// Props for existing data (optional)
interface CompleteProfilePageProps {
  existingData?: {
    basicInfo?: BasicInfoData;
    education?: EducationEntry;
    availability?: AvailabilityData;
  };
}

export default function CompleteProfilePage({
  existingData,
}: CompleteProfilePageProps) {
  // === States for each tab ===
  const [basicInfo, setBasicInfo] = useState<BasicInfoData>({
    fullName: existingData?.basicInfo?.fullName || "",
    email: existingData?.basicInfo?.email || "",
    phone: existingData?.basicInfo?.phone || "",
    gender: existingData?.basicInfo?.gender || "",
    city: existingData?.basicInfo?.city || "",
    location: existingData?.basicInfo?.location || "",
  });

  const [education, setEducation] = useState<EducationEntry[]>([
    { academy: "", year: "" },
  ]);

  const [availability, setAvailability] = useState<AvailabilityData>({
    days: [],
    mode: "",
  });

  const [activeTab, setActiveTab] = useState(0);

  // Save function: combine all tab data
  const handleSave = () => {
    const profileData = {
      basicInfo,
      education,
      availability,
    };
    console.log("Saved Profile Data:", profileData);
    // TODO: send `profileData` to backend API
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Complete Tutor Profile</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-8">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={`pb-2 font-medium ${
              activeTab === index
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mb-6">
        {activeTab === 0 && (
          <BasicInfo data={basicInfo} setData={setBasicInfo} />
        )}
        {activeTab === 1 && (
          <Education data={education} setData={setEducation} />
        )}
        {activeTab === 2 && (
          <Availability data={availability} setData={setAvailability} />
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 transition"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
