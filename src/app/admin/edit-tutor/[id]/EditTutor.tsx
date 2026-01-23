"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import BasicInfo, { BasicInfoData } from "@/app/complete-profile/[id]/tabs/basicInfo";
import Education, { EducationEntry } from "@/app/complete-profile/[id]/tabs/education";
import PersonalInformation, { PersonalInfoData } from "@/app/complete-profile/[id]/tabs/personalInfo";
import DocumentsInfo, { DocumentsInfoData } from "@/app/complete-profile/[id]/tabs/documentsInfo";
import Image from "next/image";

/* ================= CONSTANTS ================= */

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL;

const tabs = [
  { label: "Basic Info", icon: "/images/completeProfile/tuition-info.png" },
  { label: "Education", icon: "/images/completeProfile/educational-info.png" },
  { label: "Personal Info", icon: "/images/completeProfile/personal-info.png" },
  { label: "Documents Info", icon: "/images/completeProfile/documents-info.png" },
];

const EMPTY_PERSONAL_INFO: PersonalInfoData = {
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
};

/* ================= PROPS ================= */

interface Props {
  id: string;
}

/* ================= COMPONENT ================= */

export default function EditTutor({ id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  /* ===== STATES FOR TAB DATA ===== */
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

  const createEmptyEducation = (): EducationEntry => ({
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

  const [sscData, setSscData] = useState<EducationEntry[]>([createEmptyEducation()]);
  const [hscData, setHscData] = useState<EducationEntry[]>([createEmptyEducation()]);
  const [gradData, setGradData] = useState<EducationEntry[]>([createEmptyEducation()]);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>(EMPTY_PERSONAL_INFO);

  const [documentsInfo, setDocumentsInfo] = useState<DocumentsInfoData>({
    nidFront: undefined,
    nidBack: undefined,
    universityId: undefined,
    sscCertificate: undefined,
    hscCertificate: undefined,
  });

  /* ================= FETCH TUTOR DATA ================= */

useEffect(() => {
  const fetchTutor = async () => {
    try {
      const res = await fetch(`${BACKEND_BASE}/allTutors/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch tutor");

      const data = await res.json();

      setBasicInfo(prev => ({
        ...prev,
        ...data.basicInfo,
        email: data.email,
      }));

      setSscData(
        data.education?.ssc?.length
          ? data.education.ssc
          : [createEmptyEducation()],
      );

      setHscData(
        data.education?.hsc?.length
          ? data.education.hsc
          : [createEmptyEducation()],
      );

      setGradData(
        data.education?.grad?.length
          ? data.education.grad
          : [createEmptyEducation()],
      );

      setPersonalInfo({
        ...EMPTY_PERSONAL_INFO,
        ...(data.personalInfo || {}),
      });

      setDocumentsInfo(prev => ({
        ...prev,
        ...(data.documentsInfo || {}),
      }));
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load tutor data", "error");
    } finally {
      setLoading(false);
    }
  };

  fetchTutor();
}, [id]);


  if (loading) return <p className="text-center mt-20">Loading...</p>;

  /* ================= SAVE ================= */

  const handleSave = async () => {
    try {
      const confirm = await Swal.fire({
        title: "Save changes?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Save",
      });
      if (!confirm.isConfirmed) return;

      const token = localStorage.getItem("token");
      if (!token) return Swal.fire("Unauthorized", "Please login again", "error");

      const formData = new FormData();
      formData.append("basicInfo", JSON.stringify(basicInfo));
      formData.append("education", JSON.stringify({ ssc: sscData, hsc: hscData, grad: gradData }));
      formData.append("personalInfo", JSON.stringify(personalInfo));

      Object.entries(documentsInfo).forEach(([key, value]) => {
        if (value instanceof File) formData.append(key, value);
      });

      const res = await fetch(`${BACKEND_BASE}/allTutors/update/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");
      Swal.fire("Success", "Tutor updated successfully", "success");
      router.push("/admin/dashboard");
    } catch (err) {
        console.error(err);
      Swal.fire("Error", "Failed to save tutor data", "error");
    }
  };

  /* ================= RENDER TAB CONTENT ================= */

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <BasicInfo data={basicInfo} setData={setBasicInfo} />;
      case 1:
        return (
          <Education
            sscData={sscData}
            hscData={hscData}
            gradData={gradData}
            setSscData={setSscData}
            setHscData={setHscData}
            setGradData={setGradData}
          />
        );
      case 2:
        return <PersonalInformation data={personalInfo} setData={setPersonalInfo} />;
      case 3:
        return <DocumentsInfo data={documentsInfo} setData={setDocumentsInfo} />;
      default:
        return null;
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 pt-5">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Edit Tutor Profile</h1>

       {/* Tabs */}
<div className="flex gap-3 border-b mb-6">
  {tabs.map((tab, index) => (
    <button
                    key={tab.label}
                    onClick={() => setActiveTab(index)}
                    className={`group pb-3 font-bold transition w-full flex flex-col items-center justify-center cursor-pointer 
                      ${
                        activeTab === index
                          ? "border-b-2 border-blue-600 text-blue-600"
                          : "text-gray-700 hover:text-blue-500"
                      }`}
                  >
                    <div className="relative w-10 md:w-14 h-10 md:h-20">
                      <Image
                        src={tab.icon}
                        alt={tab.label}
                        fill
                        priority
                        className={`object-contain transition-transform duration-300
                          ${
                            activeTab === index
                              ? "scale-110"
                              : "group-hover:scale-110"
                          }`}
                      />
                    </div>
    
                    <span
                      className={`hidden sm:inline text-lg transition-transform duration-300
                        ${
                          activeTab === index
                            ? "scale-105"
                            : "group-hover:scale-105"
                        }`}
                    >
                      {tab.label}
                    </span>
                  </button>
  ))}
</div>


        {/* Tab Content */}
        <div className="mb-6">{renderTabContent()}</div>

        {/* Save / Cancel */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save Changes
          </button>
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="px-6 py-3 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
