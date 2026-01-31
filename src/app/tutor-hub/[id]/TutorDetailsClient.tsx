"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  NotebookText,
  Paperclip,
  AlertCircle,
  Shield,
  Users,
  GraduationCap,
  CheckCircle2,
  StarIcon,
  CheckCircleIcon,
  CheckCircle,
  CircleX,
} from "lucide-react";
import Info from "@/components/info/info";
import { Education, Tutor } from "@/data/tutorsList";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
};

type BkashPaymentData = {
  // tutorId: string;
  sender: string;
  trxId: string;
  plan: string;
  amount: number;
  tutorId: number | string;
  method: string;
};

// Calculate profile completion percentage
// const calculateCompletionPercentage = (tutor: Tutor | null): number => {
//   if (!tutor) return 0;

//   // Premium tutors are automatically 100%
//   if (tutor.isPremium) {
//     return 100;
//   }

//   // Non-premium tutors can reach max 90%
//   let completedFields = 0;
//   const totalFields = 14;

//   // Basic Info fields (8 fields)
//   if (tutor.basicInfo?.expectedSalary) completedFields++;
//   if (tutor.basicInfo?.currentTuitionStatus) completedFields++;
//   if (tutor.basicInfo?.daysPerWeek) completedFields++;
//   if (tutor.basicInfo?.tutoringExperience) completedFields++;
//   if (tutor.basicInfo?.placeOfLearning) completedFields++;
//   if (tutor.basicInfo?.preferredMedium) completedFields++;
//   if (tutor.basicInfo?.preferredClass) completedFields++;
//   if (tutor.basicInfo?.preferredSubjects) completedFields++;

//   // Education fields (3 fields - at least one entry for each)
//   if (tutor.education?.ssc && tutor.education.ssc.length > 0) completedFields++;
//   if (tutor.education?.hsc && tutor.education.hsc.length > 0) completedFields++;
//   if (tutor.education?.grad && tutor.education.grad.length > 0)
//     completedFields++;

//   // Availability fields (2 fields)
//   if (tutor.basicInfo?.days && tutor.basicInfo.days.length > 0)
//     completedFields++;
//   if (tutor.basicInfo?.mode) completedFields++;

//   // Profile image (1 field)
//   if (tutor.basicInfo.image) completedFields++;

//   // Cap at 90% for non-premium tutors
//   const percentage = Math.round((completedFields / totalFields) * 100);
//   return Math.min(percentage, 90);
// };

const isFilled = (v?: string | string[]) => {
  if (!v) return false;
  if (Array.isArray(v)) return v.length > 0;
  return v.trim().length > 0;
};

const countFilled = (values: (string | string[] | undefined)[]) => {
  return {
    total: values.length,
    completed: values.filter(isFilled).length,
  };
};

const calculateCompletionPercentage = (tutor: Tutor | null): number => {
  if (!tutor) return 0;

  // Premium tutor = full profile
  if (tutor.isPremium) return 100;

  let total = 0;
  let completed = 0;

  // ================= BASIC INFO =================
  const basic = tutor.basicInfo;
  if (basic) {
    const basicFields = [
      basic.expectedSalary,
      basic.currentTuitionStatus,
      basic.daysPerWeek,
      basic.tutoringExperience,
      basic.placeOfLearning,
      basic.preferredMedium,
      basic.preferredClass,
      basic.preferredSubjects,
      basic.preferredTime,
      basic.preferredArea,
      basic.mode,
      basic.days,
      basic.image,
    ];

    const r = countFilled(basicFields);
    total += r.total;
    completed += r.completed;
  }

  // ================= EDUCATION INFO =================
  const hasValidEducation = (list?: EducationEntry[]) =>
    list?.some(
      (e) => isFilled(e.academy) && (isFilled(e.result) || isFilled(e.cgpa)),
    ) ?? false;

  const education = tutor.education;
  if (education) {
    const levels: (keyof Education)[] = ["ssc", "hsc", "grad"];

    total += levels.length;
    completed += levels.filter((lvl) =>
      hasValidEducation(education[lvl]),
    ).length;
  }

  // ================= PERSONAL INFO =================
  const personal = tutor.personalInfo;
  if (personal) {
    const personalFields = [
      personal.fatherName,
      personal.motherName,
      personal.gender,
      personal.dateOfBirth,
      personal.religion,
      personal.nationality,
      personal.additionalNumber,
      personal.address,
      personal.identityType,
      personal.facebookProfile,
      personal.linkedinProfile,
      personal.fatherNumber,
      personal.motherNumber,
      personal.overview, // overview এখানেই
      personal.emergencyName,
      personal.emergencyRelation,
      personal.emergencyNumber,
      personal.emergencyAddress,
    ];

    const r = countFilled(personalFields);
    total += r.total;
    completed += r.completed;
  }

  // ================= DOCUMENT INFO =================
  const docs = tutor.documentsInfo;
  if (docs) {
    const docFields = [
      docs.nidFront,
      docs.nidBack,
      docs.universityId,
      docs.sscCertificate,
      docs.hscCertificate,
    ];

    const r = countFilled(docFields);
    total += r.total;
    completed += r.completed;
  }

  // ================= FINAL =================
  const percentage = Math.round((completed / total) * 100);

  // Non-premium max cap
  return Math.min(percentage, 90);
};

export default function TutorProfilePage({ tutor }: { tutor: Tutor | null }) {
  const { user, isLoading } = useAuth();
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const tutorId = user?.id;

  //  Handle bKash Payment Submission
  const handleBkashSubmit = async ({
    sender,
    trxId,
    plan: selectedPlan,
    amount,
  }: BkashPaymentData) => {
    if (!selectedPlan || !amount) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/manual-bkash-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tutorId,
            plan: selectedPlan,
            amount, // ✅ dynamic amount (300 / 500)
            sender,
            trxId,
            method: "bkash",
          }),
        },
      );

      // 🔴 Duplicate transaction
      if (res.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Duplicate Payment",
          text: "This Transaction ID was already submitted.",
        });
        return;
      }

      // 🔴 Other server error
      if (!res.ok) {
        throw new Error("Payment submission failed");
      }

      // ✅ Success
      Swal.fire({
        icon: "success",
        title: "Payment Submitted",
        text: "Verification may take up to 24 hours.",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  // Check if the logged-in user is viewing their own profile
  useEffect(() => {
    if (!isLoading && user && tutor && String(user.id) === String(tutor.id)) {
      setIsOwnProfile(true);
    }
  }, [user, tutor, isLoading]);

  const completionPercentage = calculateCompletionPercentage(tutor);
  const isProfileIncomplete = completionPercentage < 80;
  const imageUrl = tutor?.basicInfo?.image || null;

  // Tuition Preference Fields
  const tuitionPreferenceFields = [
    { label: "Expected Salary", key: "expectedSalary" },
    { label: "Current Tuition Status", key: "currentTuitionStatus" },
    { label: "Days Per Week", key: "daysPerWeek" },
    { label: "Tutoring Experience", key: "tutoringExperience" },
    { label: "Place of Learning", key: "placeOfLearning" },
    { label: "Preferred Medium", key: "preferredMedium" },
    { label: "Preferred Class", key: "preferredClass" },
    { label: "Preferred Subject", key: "preferredSubjects" },
    { label: "Preferred Time", key: "preferredTime" },
    { label: "Preferred Area", key: "preferredArea" },
  ];

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tutor Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            We could not find a tutor with that ID. The tutor may have been
            removed or the ID is invalid.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/tutor-hub"
              className="text-blue-600 hover:text-blue-700 underline font-medium"
            >
              Return to Tutor Hub
            </Link>
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 underline"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 mt-4">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/tutor-hub"
              className="hover:text-blue-600 transition-colors"
            >
              Tutor Hub
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{tutor.fullName}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
          >
            {/* Top Banner Space */}
            <div className="h-24 bg-linear-to-r from-blue-600 to-purple-600" />
            <div className="p-8">
              <div className="flex flex-col items-center md:flex-row gap-6 -mt-20">
                {/* Profile Image */}
                <div className="relative shrink-0 w-fit">
                  <div className="relative w-44 h-44 rounded-full overflow-hidden shadow-xl ring-4 ring-white bg-white">
                    {imageUrl && !imageError ? (
                      <Image
                        src={imageUrl}
                        alt={tutor.fullName}
                        fill
                        sizes="176px"
                        className="object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                        {tutor.fullName?.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Verified Badge */}
                  {tutor.isVerified && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
                      <CheckCircleIcon className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Header Info */}
                <div className="flex-1 mt-4 md:mt-16">
                  {/* Name + Premium */}
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {tutor.fullName}
                    </h1>

                    {tutor.isPremium && (
                      <span className="bg-linear-to-r from-orange-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow">
                        <StarIcon className="w-4 h-4" />
                        Premium
                      </span>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-6 text-sm mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-400">ID:</span>
                      <span className="text-gray-600">{tutor.id}</span>
                    </div>

                    {tutor.gender && (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-400">
                          Gender:
                        </span>
                        <span className="text-gray-600 capitalize">
                          {tutor.gender}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="space-y-2 text-sm text-gray-600">
                    {tutor.experience && (
                      <div className="flex items-center">
                        <NotebookText className="w-4 h-4 mr-2 text-gray-400" />
                        {tutor.experience}
                      </div>
                    )}

                    {tutor.qualification && (
                      <div className="flex items-center">
                        <Paperclip className="w-4 h-4 mr-2 text-gray-400" />
                        {tutor.qualification}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Completion & Premium Request Section - Only visible to the tutor viewing their own profile */}
          {isOwnProfile && (
            <div className="mb-8 flex flex-col gap-6 lg:flex-row">
              {/* Profile Completion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className={`flex-1 rounded-3xl shadow-lg p-8 flex flex-col ${
                  isProfileIncomplete
                    ? "bg-red-50 border-2 border-red-200"
                    : "bg-green-50 border-2 border-green-200"
                }`}
              >
                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                  {isProfileIncomplete && (
                    <AlertCircle className="w-16 h-16 text-red-600 shrink-0 mt-1" />
                  )}
                  {!isProfileIncomplete && (
                    <div className="w-16 h-16 text-green-600 shrink-0 mt-1">
                      <CheckCircle2 className="w-16 h-16 text-green-500" />
                    </div>
                  )}

                  <div className="flex-1 w-full">
                    <h3
                      className={`text-lg font-bold mb-2 text-center ${
                        isProfileIncomplete ? "text-red-800" : "text-green-800"
                      }`}
                    >
                      Profile Completion: {completionPercentage}%
                    </h3>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-300 rounded-full h-2 mb-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isProfileIncomplete ? "bg-red-500" : "bg-green-500"
                        }`}
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>

                    {isProfileIncomplete ? (
                      <p className="text-red-600 text-sm mb-2 text-center">
                        Your profile will NOT be shown to students until it
                        reaches 80% completion.
                      </p>
                    ) : (
                      <p className="text-green-700 text-sm font-semibold text-center mb-2">
                        ✓ Your profile is complete and visible to all students!
                      </p>
                    )}
                  </div>

                  <div className="w-full mt-auto">
                    {isProfileIncomplete ? (
                      <Link
                        href={`/complete-profile/${tutor.id}`}
                        className="block w-full rounded-full bg-red-600 py-3 text-sm font-semibold text-white text-center transition hover:bg-red-700"
                      >
                        Complete Your Profile
                      </Link>
                    ) : (
                      <Link
                        href={`/complete-profile/${tutor.id}`}
                        className="block w-full rounded-full bg-green-500 py-3 text-sm font-semibold text-white text-center transition hover:bg-green-600"
                      >
                        Update Your Profile
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Premium */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-3xl bg-linear-to-r from-yellow-100 to-orange-100 p-8 shadow-xl flex-1 border-2 border-orange-200 flex flex-col"
              >
                {/* Badge */}
                <div className="flex justify-center">
                  <div className="relative h-22 w-26">
                    <Image
                      src="/images/premium.png"
                      alt="Premium"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-center text-2xl font-bold text-yellow-800">
                  Premium Request
                </h3>

                {/* Description */}
                <p className="mb-2 text-center text-md text-yellow-700">
                  Premium members receive frequent tuition updates with priority
                </p>

                {/* Button wrapper with mt-auto */}
                <div className="mt-auto">
                  <Link
                    href="BkashPaymentModal"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(true);
                    }}
                    className="block w-full text-center rounded-full bg-linear-to-r from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-yellow-500 py-3 text-sm font-semibold text-white transition-colors duration-300"
                  >
                    Premium Tutor registration
                  </Link>
                </div>
              </motion.div>
            </div>
          )}

          {/* Main Content */}
          <div className="space-y-8">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-3 text-blue-600" />
                About
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {tutor?.personalInfo?.overview || "No overview available."}
              </p>
            </motion.div>

            {/* Tuition Preferences */}
            {tutor?.basicInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-blue-600" />
                  Tuition Preferences
                </h2>

                <div className="grid gap-6 md:grid-cols-2 text-gray-700">
                  {tuitionPreferenceFields.map(({ label, key }) => {
                    const rawValue =
                      tutor.basicInfo?.[key as keyof typeof tutor.basicInfo];

                    const value = Array.isArray(rawValue)
                      ? rawValue.join(", ")
                      : (rawValue ?? "Not specified");

                    return <Info key={key} label={label} value={value} />;
                  })}
                </div>
              </motion.div>
            )}

            {/* Education */}
            {tutor.education && (
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
                          `${edu.academy || "N/A"}${
                            edu.passingYear ? ` (${edu.passingYear})` : ""
                          }` +
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
            )}

            {/* Modal */}
            {isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                <div className="bg-white rounded-3xl w-11/12 max-w-md p-8 relative shadow-xl">
                  {/* Crown Icon */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <Image
                      src="/images/premium.png"
                      alt="Crown"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6 mt-12">
                    Benefits of Becoming Premium Membership
                  </h2>

                  {/* Benefits */}
                  <div className="flex justify-center mb-6">
                    <ul className="flex flex-col gap-2 text-gray-700 font-medium">
                      {[
                        "Guaranteed at least one tuition",
                        "Nearby tuition notification alerts",
                        "Always on top of results",
                        "Prioritized during selection process",
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle
                            size={20}
                            className="text-yellow-600 mt-0.5"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Plans */}
                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={() => {
                        setSelectedPlan("1 year");
                        setAmount(300);
                      }}
                      className={`flex-1 py-2 rounded-xl border text-center transition cursor-pointer ${
                        selectedPlan === "1 year"
                          ? "bg-yellow-600 text-white border-yellow-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
                      }`}
                    >
                      <div className="text-md font-bold">1 Year</div>
                      <div className="text-lg font-bold">৳ 300.00</div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedPlan("2 years");
                        setAmount(500);
                      }}
                      className={`flex-1 py-2 rounded-xl border text-center transition cursor-pointer ${
                        selectedPlan === "2 years"
                          ? "bg-yellow-600 text-white border-yellow-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
                      }`}
                    >
                      <div className="text-md font-bold">2 Years</div>
                      <div className="text-lg font-bold">৳ 500.00</div>
                    </button>
                  </div>

                  {/* Pay Now Button */}
                  <button
                    disabled={!selectedPlan || submitting}
                    className={`w-full py-3 rounded-xl text-white font-semibold transition cursor-pointer ${
                      selectedPlan
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (!selectedPlan || !tutorId) return;

                      Swal.fire({
                        title: "Pay with bKash (Send Money)",

                        html: `

                        <div style="margin-bottom:10px;font-size:18px;">
  <span style="
    margin-left:6px;
    font-weight:600;
    color:#2563eb;
  ">
    ${selectedPlan} (৳ ${amount}.00)
  </span>
</div>

        <p style="margin-bottom:10px;font-size:16px;">
          <b>Send money\</b> via <b>bKash</b> to the number below:
        </p>

        <div style="
          display:flex;
          align-items:center;
          justify-content:center;
          gap:8px;
          margin-bottom:12px;
        ">
          <span
  style="
    font-family: 'Inter', system-ui, -apple-system, sans-serif;

    font-size: 20px;
    font-weight: 700;
    padding: 8px 16px;
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border-radius: 999px;
    color: #92400e;
    letter-spacing: 1.2px;
    display: inline-block;
  "
>
  01990-539200
</span>


          <button
            onclick="navigator.clipboard.writeText('01990539200')"
            style="
              padding:6px 10px;
              background:#22c55e;
              color:white;
              border:none;
              border-radius:6px;
              cursor:pointer;
            "
          >
            Copy
          </button>
        </div>

        <p style="font-size:16px;color:#555;margin-bottom:10px;line-height:1.5;">
          After sending money, enter your <b>bKash number</b> and
          <b>Transaction ID (CAPITAL LETTERS)</b>.
        </p>

        <div style="margin-bottom:8px;font-size:18px;">
          <b>Tutor ID:</b>
          <span style="
            margin-left:6px;
            font-weight:600;
            color:#2563eb;
          ">
            ${tutorId}
          </span>
        </div>

      <input
  id="sender"
  type="tel"
  inputmode="numeric"
  maxlength="11"
  placeholder="Your bKash Number"
  oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0,11)"
  style="
    width: 100%;
    height: 44px;
    padding: 10px 14px;
    margin: 8px 0;
    font-size: 15px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  "
  onfocus="this.style.borderColor='#f59e0b'; this.style.boxShadow='0 0 0 2px rgba(245,158,11,0.25)'"
  onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
/>

        <input
  id="trxId"
  placeholder="Transaction ID (CAPITAL LETTERS)"
  oninput="this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '')"
  style="
    width: 100%;
    height: 44px;
    padding: 10px 14px;
    margin-top: 8px;
    font-size: 15px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  "
  onfocus="this.style.borderColor='#f59e0b'; this.style.boxShadow='0 0 0 2px rgba(245,158,11,0.25)'"
  onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
/>

      `,
                        confirmButtonText: "Submit Payment",
                        confirmButtonColor: "#f59e0b",
                        showCancelButton: true,

                        preConfirm: (): BkashPaymentData | false => {
                          const sender = (
                            document.getElementById(
                              "sender",
                            ) as HTMLInputElement
                          )?.value.trim();

                          const trxId = (
                            document.getElementById("trxId") as HTMLInputElement
                          )?.value.trim();

                          if (!sender || !trxId) {
                            Swal.showValidationMessage(
                              "bKash number and Transaction ID are required",
                            );
                            return false;
                          }

                          if (!/^01[3-9]\d{8}$/.test(sender)) {
                            Swal.showValidationMessage("Invalid bKash number");
                            return false;
                          }

                          if (!/^[A-Z0-9]{10,15}$/.test(trxId)) {
                            Swal.showValidationMessage(
                              "Invalid Transaction ID",
                            );
                            return false;
                          }

                          return {
                            sender,
                            trxId,
                            plan: selectedPlan, // ✅
                            amount, // ✅
                            tutorId, // ✅ IMPORTANT
                            method: "bkash",
                          };
                        },
                      }).then((result) => {
                        if (result.isConfirmed && result.value) {
                          setSubmitting(true);
                          handleBkashSubmit(result.value).finally(() => {
                            setSubmitting(false);
                          });
                        }
                      });
                    }}
                  >
                    Pay Now
                  </button>

                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <CircleX size={40} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
