"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";
import { Download, Eye, X } from "lucide-react";

import BasicInfo, {
  BasicInfoData,
} from "@/app/complete-profile/[id]/tabs/basicInfo";

import Education, {
  EducationEntry,
} from "@/app/complete-profile/[id]/tabs/education";

import PersonalInformation, {
  PersonalInfoData,
} from "@/app/complete-profile/[id]/tabs/personalInfo";

import DocumentsInfo, {
  DocumentsInfoData,
} from "@/app/complete-profile/[id]/tabs/documentsInfo";

/* ================= CONSTANTS ================= */

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL;

const tabs = [
  {
    label: "Basic Info",
    icon: "/images/completeProfile/tuition-info.png",
  },
  {
    label: "Education",
    icon: "/images/completeProfile/educational-info.png",
  },
  {
    label: "Personal Info",
    icon: "/images/completeProfile/personal-info.png",
  },
  {
    label: "Documents Info",
    icon: "/images/completeProfile/documents-info.png",
  },
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
  const [tutorName, setTutorName] = useState("");

  /* ===== IMAGE PREVIEW ===== */

  const [previewImage, setPreviewImage] = useState<string | null>(
    null,
  );

  const [previewTitle, setPreviewTitle] = useState("");

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
    session: "",
    degreeTitle: "",
  });

  const [sscData, setSscData] = useState<EducationEntry[]>([
    createEmptyEducation(),
  ]);

  const [hscData, setHscData] = useState<EducationEntry[]>([
    createEmptyEducation(),
  ]);

  const [gradData, setGradData] = useState<EducationEntry[]>([
    createEmptyEducation(),
  ]);

  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfoData>(EMPTY_PERSONAL_INFO);

  const [documentsInfo, setDocumentsInfo] =
    useState<DocumentsInfoData>({
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
        const res = await fetch(
          `${BACKEND_BASE}/allTutors/${id}`,
          {
            cache: "no-store",
          },
        );

        if (!res.ok)
          throw new Error("Failed to fetch tutor");

        const data = await res.json();

        setBasicInfo((prev) => ({
          ...prev,
          ...data.basicInfo,
          email: data.email,
        }));

        setTutorName(
          data.basicInfo?.fullName ||
            data.fullName ||
            "",
        );

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

        setDocumentsInfo((prev) => ({
          ...prev,
          ...(data.documentsInfo || {}),
        }));
      } catch (err) {
        console.error(err);

        Swal.fire(
          "Error",
          "Failed to load tutor data",
          "error",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [id]);

  /* ================= DOWNLOAD ================= */

  const handleDownload = async (
    imageUrl: string,
    fileName: string,
  ) => {
    try {
      const response = await fetch(imageUrl);

      const blob = await response.blob();

      const blobUrl =
        window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = `${fileName}.jpg`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);

      Swal.fire(
        "Error",
        "Failed to download image",
        "error",
      );
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <p className="text-center mt-20">
        Loading...
      </p>
    );
  }

  /* ================= SAVE ================= */

  const handleSave = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token)
        throw new Error("Admin token missing");

      const formData = new FormData();

      formData.append(
        "basicInfo",
        JSON.stringify(basicInfo),
      );

      formData.append(
        "education",
        JSON.stringify({
          ssc: sscData,
          hsc: hscData,
          grad: gradData,
        }),
      );

      formData.append(
        "personalInfo",
        JSON.stringify(personalInfo),
      );

      Object.entries(documentsInfo).forEach(
        ([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (
            typeof value === "string"
          ) {
            formData.append(key, value);
          }
        },
      );

      const res = await fetch(
        `${BACKEND_BASE}/allTutors/update/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!res.ok)
        throw new Error("Update failed");

      Swal.fire(
        "Success",
        "Tutor updated successfully",
        "success",
      );
    } catch (err) {
      console.error(err);

      Swal.fire(
        "Error",
        "Failed to save tutor data",
        "error",
      );
    }
  };

  /* ================= RENDER TAB ================= */

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <BasicInfo
            data={basicInfo}
            setData={setBasicInfo}
          />
        );

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
        return (
          <PersonalInformation
            data={personalInfo}
            setData={setPersonalInfo}
          />
        );

      case 3:
        return (
          <DocumentsInfo
            data={documentsInfo}
            setData={setDocumentsInfo}
          />
        );

      default:
        return null;
    }
  };

  /* ================= DOCUMENTS ================= */

  const documentList = [
    {
      key: "nidFront",
      label: "NID Front",
      image: documentsInfo.nidFront,
    },
    {
      key: "nidBack",
      label: "NID Back",
      image: documentsInfo.nidBack,
    },
    {
      key: "universityId",
      label: "University ID",
      image: documentsInfo.universityId,
    },
    {
      key: "sscCertificate",
      label: "SSC Certificate",
      image: documentsInfo.sscCertificate,
    },
    {
      key: "hscCertificate",
      label: "HSC Certificate",
      image: documentsInfo.hscCertificate,
    },
  ];

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 pt-5">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Title */}

        <h1 className="text-3xl font-bold mb-8">
          {tutorName
            ? `Edit Profile: ${tutorName} (ID: ${id})`
            : `Edit Tutor Profile`}
        </h1>

        {/* Tabs */}

        <div className="flex gap-3 border-b mb-8">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() =>
                setActiveTab(index)
              }
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

        <div className="mb-8">
          {renderTabContent()}
        </div>

        {/* Documents Preview */}

        {documentList.some(
          (doc) => doc.image,
        ) && (
          <div className="mb-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Uploaded Documents
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Preview and download tutor
                documents
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentList
                .filter((doc) => doc.image)
                .map((doc) => (
                  <div
                    key={doc.key}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    {/* Image */}

                    <div className="relative h-56 group">
                      <Image
                        src={doc.image as string}
                        alt={doc.label}
                        fill
                        unoptimized
                        className="object-cover"
                      />

                      {/* Overlay */}

                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                        {/* Preview */}

                        <button
                          type="button"
                          onClick={() => {
                            setPreviewImage(
                              doc.image as string,
                            );

                            setPreviewTitle(
                              doc.label,
                            );
                          }}
                          className="bg-white p-3 rounded-full hover:scale-105 transition"
                        >
                          <Eye size={18} />
                        </button>

                        {/* Download */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDownload(
                              doc.image as string,
                              doc.label,
                            )
                          }
                          className="bg-white p-3 rounded-full hover:scale-105 transition"
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Footer */}

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">
                        {doc.label}
                      </h3>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Buttons */}

        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Save Changes
          </button>

          <button
            onClick={() =>
              router.push("/admin/dashboard")
            }
            className="px-6 py-3 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Fullscreen Preview Modal */}

      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl h-[90vh]">
            {/* Close */}

            <button
              type="button"
              onClick={() =>
                setPreviewImage(null)
              }
              className="absolute -top-12 right-0 text-white hover:text-red-400 transition"
            >
              <X size={30} />
            </button>

            {/* Download */}

            <button
              type="button"
              onClick={() =>
                handleDownload(
                  previewImage,
                  previewTitle,
                )
              }
              className="absolute -top-12 right-14 text-white hover:text-blue-400 transition"
            >
              <Download size={28} />
            </button>

            {/* Image */}

            <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden">
              <Image
                src={previewImage}
                alt={previewTitle}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}