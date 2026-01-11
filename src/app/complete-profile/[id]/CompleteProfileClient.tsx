"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import BasicInfo, { BasicInfoData } from "./tabs/basicInfo";
import Education, { EducationEntry } from "./tabs/education";
import PersonalInformation, { PersonalInfoData } from "./tabs/personalInfo";
import DocumentsInfo, { DocumentsInfoData } from "./tabs/documentsInfo";
import Swal from "sweetalert2";
import { FolderInput, GraduationCap, IdCard, User } from "lucide-react";

const tabs = [
  { label: "Basic Info", icon: User, color: "blue" },
  { label: "Educational Info", icon: GraduationCap, color: "green" },
  { label: "Personal Info", icon: IdCard, color: "purple" },
  { label: "Documents Info", icon: FolderInput, color: "orange" },
];

interface Props {
  tutorId: string;
}

export default function CompleteProfileClient({ tutorId }: Props) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const fullName = user?.fullName;

  // Protect route
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.push("/login");
    }
    if (!isLoading && isAuthenticated && user && String(user.id) !== tutorId) {
      router.push(`/complete-profile/${user.id}`);
    }
  }, [isLoading, isAuthenticated, user, tutorId, router]);

  const isOwnProfile =
    !isLoading && isAuthenticated && user && String(user.id) === tutorId;

  // =========================
  // STATES
  // =========================
  const [activeTab, setActiveTab] = useState(0);

  const [basicInfo, setBasicInfo] = useState<BasicInfoData>({
    email: "",
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
    days: [],
    mode: "",
  });

  const createEmptyEntry = (): EducationEntry => ({
    id: crypto.randomUUID(),
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

  const [sscData, setSscData] = useState<EducationEntry[]>([
    createEmptyEntry(),
  ]);
  const [hscData, setHscData] = useState<EducationEntry[]>([
    createEmptyEntry(),
  ]);
  const [gradData, setGradData] = useState<EducationEntry[]>([
    createEmptyEntry(),
  ]);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>({
    fatherName: "",
    motherName: "",
    gender: "",
    dateOfBirth: "",
    religion: "",
    nationality: "",
    additionalNumber: "",
    address: "",
    identityType: "",
    facebookProfile: "",
    linkedinProfile: "",
    fatherNumber: "",
    motherNumber: "",
    overview: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyNumber: "",
    emergencyAddress: "",
  });

  const [documentsInfo, setDocumentsInfo] = useState<DocumentsInfoData>({
    nidFront: undefined,
    nidBack: undefined,
    universityId: undefined,
    sscCertificate: undefined,
    hscCertificate: undefined,
  });

  // =========================
  // FETCH TUTOR DATA
  // =========================
  useEffect(() => {
    if (!tutorId) return;

    async function fetchTutorData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/allTutors/${tutorId}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch tutor");

        const tutor = await res.json();

        // Basic Info
        setBasicInfo((prev) => ({
          ...prev,
          ...tutor.basicInfo,
          email: tutor.basicInfo?.email ?? tutor.email ?? "",
        }));

        const fixEducationEntries = (
          entries?: EducationEntry[]
        ): EducationEntry[] => {
          if (!entries || entries.length === 0) return [createEmptyEntry()];
          return entries.map((e) => ({ ...createEmptyEntry(), ...e }));
        };

        setSscData(fixEducationEntries(tutor.education?.ssc));
        setHscData(fixEducationEntries(tutor.education?.hsc));
        setGradData(fixEducationEntries(tutor.education?.grad));

        setPersonalInfo((prev) => ({ ...prev, ...tutor.personalInfo }));
        setDocumentsInfo((prev) => ({ ...prev, ...tutor.documentsInfo }));
      } catch (error) {
        console.error(error);
      }
    }

    fetchTutorData();
  }, [tutorId]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );

  if (!isOwnProfile) return null;

  // =========================
  // VALIDATION
  // =========================
  // const validateBasicInfo = () => {
  //   const b = basicInfo;
  //   return (
  //     b.email.trim() !== "" &&
  //     b.expectedSalary !== "" &&
  //     b.currentTuitionStatus !== "" &&
  //     b.daysPerWeek !== "" &&
  //     b.tutoringExperience !== "" &&
  //     b.placeOfLearning !== "" &&
  //     b.preferredMedium !== "" &&
  //     b.preferredClass !== "" &&
  //     b.preferredSubjects !== "" &&
  //     b.preferredTime !== "" &&
  //     b.preferredArea !== "" &&
  //     b.days.length > 0 &&
  //     b.mode !== ""
  //   );
  // };

  // const validateEducation = () =>
  //   sscData.every((e) => e.academy.trim() !== "") &&
  //   hscData.every((e) => e.academy.trim() !== "") &&
  //   gradData.every((e) => e.academy.trim() !== "");

  // const validatePersonalInfo = () => {
  //   const p = personalInfo;
  //   return (
  //     (p.fatherName ?? "").trim() !== "" &&
  //     (p.motherName ?? "").trim() !== "" &&
  //     (p.gender ?? "") !== "" &&
  //     (p.dateOfBirth ?? "") !== "" &&
  //     (p.religion ?? "").trim() !== "" &&
  //     (p.nationality ?? "").trim() !== "" &&
  //     (p.address ?? "").trim() !== "" &&
  //     (p.emergencyName ?? "").trim() !== "" &&
  //     (p.emergencyRelation ?? "").trim() !== "" &&
  //     (p.emergencyNumber ?? "").trim() !== "" &&
  //     (p.emergencyAddress ?? "").trim() !== ""
  //   );
  // };

  // const validateDocumentsInfo = () => {
  //   const d = documentsInfo;
  //   return !!(
  //     d.nidFront &&
  //     d.nidBack &&
  //     d.universityId &&
  //     d.sscCertificate &&
  //     d.hscCertificate
  //   );
  // };

  // const isFormValid =
  //   validateBasicInfo() &&
  //   validateEducation() &&
  //   validatePersonalInfo() &&
  //   validateDocumentsInfo();

  // =========================
  // SAVE HANDLER
  // =========================
  const handleSave = async () => {
    try {
      const updateData = {
        basicInfo,
        education: { ssc: sscData, hsc: hscData, grad: gradData },
        personalInfo,
        documentsInfo,
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
        text: "Profile updated successfully!",
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
          {fullName
            ? `${fullName} — Complete Your Profile`
            : "Complete Your Profile"}
        </h1>

        {/* Tabs */}
        <div className="flex items-center justify-between gap-6 border-b border-gray-300 mb-8">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(index)}
                className={`pb-3 font-bold transition w-full flex flex-col items-center justify-center gap-1 cursor-pointer 
          ${
            activeTab === index
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-700 hover:text-blue-500"
          }`}
              >
                <Icon size={28} color={tab.color} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
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
            <PersonalInformation
              data={personalInfo}
              setData={setPersonalInfo}
            />
          )}
          {activeTab === 3 && (
            <DocumentsInfo data={documentsInfo} setData={setDocumentsInfo} />
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          {activeTab > 0 && (
            <button
              onClick={() => setActiveTab(activeTab - 1)}
              className="bg-[#0D24A0] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-all"
            >
              Prev
            </button>
          )}
          <div className="flex-1"></div>

          {activeTab < tabs.length - 1 && (
            <button
              onClick={() => {
                setActiveTab(activeTab + 1);
              }}
              className="bg-[#0D24A0] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-all"
            >
              Next
            </button>
          )}

          {activeTab === tabs.length - 1 && (
            <button
              onClick={handleSave}
              className="bg-[#0D24A0] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-all"
            >
              Save Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
