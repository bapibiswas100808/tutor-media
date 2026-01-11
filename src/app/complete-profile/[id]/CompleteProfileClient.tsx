"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import BasicInfo, { BasicInfoData } from "./tabs/basicInfo";
import Education, { EducationEntry } from "./tabs/education";
import Availability, { AvailabilityData } from "./tabs/availability";
import Swal from "sweetalert2";

const tabs = ["Basic Info", "Education", "Availability"];

interface Props {
  tutorId: string;
}

export default function CompleteProfileClient({ tutorId }: Props) {
  // =========================
  // AUTH & ROUTING
  // =========================
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Protect route - redirect if not authenticated or not the same tutor
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.push("/login");
    }
    // Check if the user trying to access is the same as the tutor ID
    if (!isLoading && isAuthenticated && user && String(user.id) !== tutorId) {
      router.push(`/complete-profile/${user.id}`);
    }
  }, [isLoading, isAuthenticated, user, tutorId, router]);

  // Security flag: only render if user owns this profile
  const isOwnProfile =
    !isLoading && isAuthenticated && user && String(user.id) === tutorId;

  // =========================
  // STATES - MUST BE FIRST
  // =========================
  const [basicInfo, setBasicInfo] = useState<BasicInfoData>({
    email: "",
    // password: "",
    // confirmPassword: "",
    image: "",
    expectedSalary: "",
    currentTuitionStatus: "",
    daysPerWeek: "",
    tutoringExperience: "",
    placeOfLearning: "",
    preferredMedium: "",
    preferredClass: "",
    preferredSubjects: "",
    preferredTime: "",
    preferredArea: "",
  });

  // Education states
  const createEmptyEntry = (): EducationEntry => ({
    id: crypto.randomUUID(), // <-- unique id for stable React keys
    academy: "",
    curriculum: "",
    group: "",
    passingYear: "",
    result: "",
    instituteType: "",
    studyType: "",
    department: "",
    cgpa: "",
  });

  // Example state initialization
  const [sscData, setSscData] = useState<EducationEntry[]>([
    createEmptyEntry(),
  ]);
  const [hscData, setHscData] = useState<EducationEntry[]>([
    createEmptyEntry(),
  ]);
  const [gradData, setGradData] = useState<EducationEntry[]>([
    createEmptyEntry(),
  ]);

  // Availability state
  const [availability, setAvailability] = useState<AvailabilityData>({
    days: [],
    mode: "",
  });

  const [activeTab, setActiveTab] = useState(0);

  // =========================
  // FETCH TUTOR DATA
  // =========================
  useEffect(() => {
    if (!tutorId) return;

    async function fetchTutorData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/allTutors/${tutorId}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch tutor");

        const tutor = await res.json();

        // Basic Info
        setBasicInfo((prev) => ({
          ...prev,
          email: tutor.basicInfo?.email ?? tutor.email ?? "",
          image: tutor.basicInfo?.image ?? "",
          expectedSalary: tutor.basicInfo?.expectedSalary ?? "",
          currentTuitionStatus: tutor.basicInfo?.currentTuitionStatus ?? "",
          daysPerWeek: tutor.basicInfo?.daysPerWeek ?? "",
          tutoringExperience: tutor.basicInfo?.tutoringExperience ?? "",
          placeOfLearning: tutor.basicInfo?.placeOfLearning ?? "",
          preferredMedium: tutor.basicInfo?.preferredMedium ?? "",
          preferredClass: tutor.basicInfo?.preferredClass ?? "",
          preferredSubjects: tutor.basicInfo?.preferredSubjects ?? "",
          preferredTime: tutor.basicInfo?.preferredTime ?? "",
          preferredArea: tutor.basicInfo?.preferredArea ?? "",
        }));

        // Helper: ensure entries have stable IDs
        const fixEducationEntries = (
          entries?: EducationEntry[]
        ): EducationEntry[] => {
          if (!entries || entries.length === 0) return [createEmptyEntry()];

          return entries.map((e) => ({
            id: e.id ?? crypto.randomUUID(),
            academy: e.academy ?? "",
            curriculum: e.curriculum ?? "",
            group: e.group ?? "",
            passingYear: e.passingYear ?? "",
            result: e.result ?? "",
            instituteType: e.instituteType ?? "",
            studyType: e.studyType ?? "",
            department: e.department ?? "",
            cgpa: e.cgpa ?? "",
          }));
        };

        // Inside fetchTutorData():
        setSscData(fixEducationEntries(tutor.education?.ssc));
        setHscData(fixEducationEntries(tutor.education?.hsc));
        setGradData(fixEducationEntries(tutor.education?.grad));

        // Availability
        setAvailability(tutor.availability ?? { days: [], mode: "" });
      } catch (error) {
        console.error(error);
      }
    }

    fetchTutorData();
  }, [tutorId]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated or not the same tutor (security check)
  if (!isLoading && !isOwnProfile) {
    return null;
  }

  // =========================
  // VALIDATION
  // =========================
  const validateBasicInfo = () => {
    const b = basicInfo;
    return (
      (b.email ?? "").trim() !== "" &&
      // (b.password ?? "").trim() !== "" &&
      // (b.password ?? "").length >= 6 &&
      // (b.confirmPassword ?? "").trim() !== "" &&
      // b.password === b.confirmPassword &&
      b.expectedSalary !== "" &&
      b.currentTuitionStatus !== "" &&
      b.daysPerWeek !== "" &&
      b.tutoringExperience !== "" &&
      b.placeOfLearning !== "" &&
      b.preferredMedium !== "" &&
      b.preferredClass !== "" &&
      b.preferredSubjects !== "" &&
      b.preferredTime !== "" &&
      b.preferredArea !== ""
    );
  };

  const validateEducation = () =>
    sscData.every((e) => e.academy.trim() !== "") &&
    hscData.every((e) => e.academy.trim() !== "") &&
    gradData.every((e) => e.academy.trim() !== "");

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
      Swal.fire({
        icon: "warning",
        title: "Invalid Form",
        text: "Please fill all required fields correctly",
      });
      return;
    }

    try {
      const updateData = {
        basicInfo,
        education: { ssc: sscData, hsc: hscData, grad: gradData },
        availability,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/allTutors/${tutorId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        throw new Error(`Server error: ${text.substring(0, 100)}`);
      }

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message || "Update failed");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile updated successfully! ✅",
      });
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error instanceof Error ? error.message : "Something went wrong",
      });
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
            <Education
              sscData={sscData}
              hscData={hscData}
              gradData={gradData}
              setSscData={setSscData}
              setHscData={setHscData}
              setGradData={setGradData}
            />
          )}
          {activeTab === 2 && (
            <Availability data={availability} setData={setAvailability} />
          )}
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-between gap-4">
          {/* Previous Button - Hidden on first tab */}
          {activeTab > 0 && (
            <button
              onClick={() => setActiveTab(activeTab - 1)}
              className="bg-gray-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all hover:bg-gray-600 hover:scale-105"
            >
              Previous
            </button>
          )}

          <div className="flex-1"></div>

          {/* Next Button - Show on first two tabs */}
          {activeTab < tabs.length - 1 && (
            <button
              onClick={() => {
                if (activeTab === 0 && !validateBasicInfo()) {
                  alert("Please fill all required fields in Basic Info");
                  return;
                }
                if (activeTab === 1 && !validateEducation()) {
                  alert("Please fill all required fields in Education");
                  return;
                }
                setActiveTab(activeTab + 1);
              }}
              className="bg-[#0D24A0] text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all hover:bg-blue-700 hover:scale-105"
            >
              Next
            </button>
          )}

          {/* Save Button - Show only on last tab */}
          {activeTab === tabs.length - 1 && (
            <button
              onClick={handleSave}
              disabled={!isFormValid}
              className={`bg-[#0D24A0] text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all ${
                !isFormValid
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700 hover:scale-105"
              }`}
            >
              Save Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
