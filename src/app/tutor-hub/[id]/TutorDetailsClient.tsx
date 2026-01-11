"use client";

import Link from "next/link";
import { motion } from "framer-motion";
// import { Tutor } from "@/data/tutorsList";
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
  const { user, isLoading, isAuthenticated } = useAuth();
  const [isOwnProfile, setIsOwnProfile] = useState(false);

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
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
          >
            <div className="h-32"></div>
            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row gap-6 -mt-16">
                {/* Profile Image */}
                <div className="relative">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={tutor.fullName}
                        fill
                        className="object-cover"
                        sizes="128px"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                        {tutor.fullName?.charAt(0)}
                      </div>
                    )}
                  </div>

                  {tutor.isVerified && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
                      <CheckCircleIcon className="w-6 h-6 " />

                    </div>
                  )}
                </div>

                {/* Header Info */}
                <div className="flex-1 mt-16 md:mt-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                          {tutor.fullName}
                        </h1>

                        {tutor?.isPremium && (
                          <span className="bg-linear-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                            <StarIcon className="w-4 h-4" />
                            PREMIUM
                          </span>
                        )}
                      </div>
                      {/* <p className="text-xl text-blue-600 font-semibold mb-2">
                        {tutor.fullName}
                      </p> */}
                      <div className="flex items-center justify-between gap-10">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-700">
                            ID:
                          </span>
                          <span className="text-sm text-gray-500 capitalize">
                            {tutor.id}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-700">
                            Gender:
                          </span>
                          <span className="text-sm text-gray-500 capitalize">
                            {tutor.gender}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center justify-between ">
                    {/* Info Grid */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <NotebookText className="w-4 h-4 mr-2 text-gray-400" />
                        {tutor.experience}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Paperclip className="w-4 h-4 mr-2 text-gray-400" />
                        {tutor.qualification}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex justify-center gap-3">
                      {/* <Link
                        href="/hire-tutor"
                        className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 px-3 lg:px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center shadow-lg"
                      >
                        Hire Tutor
                      </Link> */}
                      {isAuthenticated &&
                        user &&
                        String(user.id) === String(tutor.id) && (
                          <Link
                            href={`/complete-profile/${tutor.id}`}
                            className="bg-[#0D24A0] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-all"
                          >
                            Update Profile
                          </Link>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Completion Section - Only visible to the tutor viewing their own profile */}
          {isOwnProfile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={`rounded-3xl shadow-lg p-6 mb-8 ${
                isProfileIncomplete
                  ? "bg-red-50 border-2 border-red-200"
                  : "bg-green-50 border-2 border-green-200"
              }`}
            >
              <div className="flex items-start gap-4">
                {isProfileIncomplete && (
                  <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                )}
                {!isProfileIncomplete && (
                  <div className="w-6 h-6 text-green-600 shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                )}
                <div className="flex-1">
                  <h3
                    className={`text-lg font-bold mb-2 ${
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
                    <div>
                      <p className="text-red-700 font-semibold mb-2">
                        ⚠️ Your profile is not fully completed
                      </p>
                      <p className="text-red-600 text-sm mb-3">
                        Your profile will NOT be shown to students until it
                        reaches 80% completion. Currently at{" "}
                        {completionPercentage}% - you need to complete{" "}
                        {80 - completionPercentage}% more.
                      </p>
                      <Link
                        href={`/complete-profile/${tutor.id}`}
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Complete Your Profile
                      </Link>
                    </div>
                  ) : (
                    <p className="text-green-700 text-sm font-semibold">
                      ✓ Your profile is complete and visible to all students!
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
