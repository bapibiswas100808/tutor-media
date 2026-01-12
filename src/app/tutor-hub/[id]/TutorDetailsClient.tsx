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
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  StarIcon,
  CheckCircleIcon,
  Check,
  CheckCircle,
  Vault,
  X,
  CircleX,
} from "lucide-react";
import Info from "@/components/info/info";
import { Tutor } from "@/data/tutorsList";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

// Calculate profile completion percentage
const calculateCompletionPercentage = (tutor: Tutor | null): number => {
  if (!tutor) return 0;

  // Premium tutors are automatically 100%
  if (tutor.isPremium) {
    return 100;
  }

  // Non-premium tutors can reach max 90%
  let completedFields = 0;
  const totalFields = 14; // Total fields to check

  // Basic Info fields (8 fields)
  if (tutor.basicInfo?.expectedSalary) completedFields++;
  if (tutor.basicInfo?.currentTuitionStatus) completedFields++;
  if (tutor.basicInfo?.daysPerWeek) completedFields++;
  if (tutor.basicInfo?.tutoringExperience) completedFields++;
  if (tutor.basicInfo?.placeOfLearning) completedFields++;
  if (tutor.basicInfo?.preferredMedium) completedFields++;
  if (tutor.basicInfo?.preferredClass) completedFields++;
  if (tutor.basicInfo?.preferredSubjects) completedFields++;

  // Education fields (3 fields - at least one entry for each)
  if (tutor.education?.ssc && tutor.education.ssc.length > 0) completedFields++;
  if (tutor.education?.hsc && tutor.education.hsc.length > 0) completedFields++;
  if (tutor.education?.grad && tutor.education.grad.length > 0)
    completedFields++;

  // Availability fields (2 fields)
  if (tutor.availability?.days && tutor.availability.days.length > 0)
    completedFields++;
  if (tutor.availability?.mode) completedFields++;

  // Profile image (1 field)
  if (tutor.image) completedFields++;

  // Cap at 90% for non-premium tutors
  const percentage = Math.round((completedFields / totalFields) * 100);
  return Math.min(percentage, 90);
};

export default function TutorProfilePage({ tutor }: { tutor: Tutor | null }) {
  const { user, isLoading } = useAuth();
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"1year" | "2years" | null>(
    null
  );

  useEffect(() => {
    if (!isLoading && user && tutor && String(user.id) === String(tutor.id)) {
      setIsOwnProfile(true);
    }
  }, [user, tutor, isLoading]);

  const completionPercentage = calculateCompletionPercentage(tutor);
  const isProfileIncomplete = completionPercentage < 80;
  const imageUrl = tutor?.basicInfo?.image || null;

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
            <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600" />
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
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
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
                      <span className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow">
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
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                  {isProfileIncomplete && (
                    <AlertCircle className="w-28 h-28 text-red-600 shrink-0 mt-1" />
                  )}
                  {!isProfileIncomplete && (
                    <div className="w-28 h-28 text-green-600 shrink-0 mt-1">
                      <CheckCircle2 className="w-28 h-28 text-green-500" />
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
                    <div className="w-full bg-gray-300 rounded-full h-3 mb-4 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isProfileIncomplete ? "bg-red-500" : "bg-green-500"
                        }`}
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>

                    {isProfileIncomplete ? (
                      <p className="text-red-600 text-sm mb-3 text-center">
                        Your profile will NOT be shown to students until it
                        reaches 80% completion.
                      </p>
                    ) : (
                      <p className="text-green-700 text-sm font-semibold text-center mb-3">
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
                <div className=" flex justify-center">
                  <div className="relative h-40 w-40">
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
                <p className="mb-6 text-center text-md text-yellow-700">
                  Premium members receive frequent tuition updates with priority
                </p>

                {/* Button wrapper with mt-auto */}
                <div className="mt-auto">
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(true);
                    }}
                    className="block w-full text-center rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-yellow-500 py-3 text-sm font-semibold text-white transition-colors duration-300"
                  >
                    Premium Tutor registration
                  </Link>
                </div>
              </motion.div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
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
                <p className="text-gray-700 leading-relaxed">{tutor.bio}</p>
              </motion.div>

              {/* Tuition Preferences */}
              {tutor.basicInfo && (
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

                  <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                    <Info
                      label="Expected Salary"
                      value={tutor.basicInfo.expectedSalary}
                    />
                    <Info
                      label="Current Tuition Status"
                      value={tutor.basicInfo.currentTuitionStatus}
                    />
                    <Info
                      label="Days Per Week"
                      value={tutor.basicInfo.daysPerWeek}
                    />
                    <Info
                      label="Tutoring Experience"
                      value={tutor.basicInfo.tutoringExperience}
                    />
                    <Info
                      label="Place of Learning"
                      value={tutor.basicInfo.placeOfLearning}
                    />
                    <Info
                      label="Preferred Medium"
                      value={tutor.basicInfo.preferredMedium}
                    />
                    <Info
                      label="Preferred Class"
                      value={tutor.basicInfo.preferredClass}
                    />
                    <Info
                      label="Preferred Subject"
                      value={tutor.basicInfo.preferredSubjects}
                    />
                    <Info
                      label="Preferred Time"
                      value={tutor.basicInfo.preferredTime}
                    />
                    <Info
                      label="Preferred Area"
                      value={tutor.basicInfo.preferredArea}
                    />
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
                    {(tutor.education
                      ? [
                          ...(tutor.education.ssc || []),
                          ...(tutor.education.hsc || []),
                          ...(tutor.education.grad || []),
                        ]
                      : []
                    ).map((edu, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{edu.academy}</p>
                          {edu.passingYear && (
                            <p className="text-sm">{edu.passingYear}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-gray-800"
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-3 text-blue-600" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <span className="text-gray-700">{tutor.email}</span>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <span className="text-gray-700">{tutor.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <span className="text-gray-700">{tutor.location}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Modal */}
            {isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
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
                  <ul className="flex flex-col gap-2 mb-6 font-bold text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-600">
                        <CheckCircle size={20} />
                      </span>
                      Guaranteed at least one tuition.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-600">
                        <CheckCircle size={20} />
                      </span>
                      Nearby tuition notifications alert.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-600">
                        <CheckCircle size={20} />
                      </span>
                      Always on top of results.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-600">
                        <CheckCircle size={20} />
                      </span>
                      Prioritized during selection process.
                    </li>
                  </ul>

                  {/* Plans */}
                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={() => setSelectedPlan("1year")}
                      className={`flex-1 py-2 rounded-xl border text-center transition cursor-pointer ${
                        selectedPlan === "1year"
                          ? "bg-yellow-600 text-white border-yellow-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
                      }`}
                    >
                      <div className="text-md font-bold">1 Year</div>
                      <div className="text-lg font-bold">৳ 300.00</div>
                    </button>

                    <button
                      onClick={() => setSelectedPlan("2years")}
                      className={`flex-1 py-2 rounded-xl border text-center transition cursor-pointer ${
                        selectedPlan === "2years"
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
                    disabled={!selectedPlan}
                    className={`w-full py-3 rounded-xl text-white font-semibold transition cursor-pointer ${
                      selectedPlan
                        ? "bg-yellow-600 hover:bg-yellow-700 cursor-pointer"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                    onClick={() => {
                      alert(`Pay Now clicked for ${selectedPlan} plan!`);
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
