"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Tutor } from "@/data/tutorsList";
import Image from "next/image";
import {
  BadgeCheck,
  BaggageClaim,
  LocationEdit,
  NotebookText,
  Paperclip,
  ShieldCheck,
  Star,
} from "lucide-react";

interface TutorCardProps {
  tutor: Tutor;
  index: number;
}

export default function TutorCard({ tutor, index }: TutorCardProps) {
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const imageUrl = tutor.image?.formats?.large?.url
    ? `${STRAPI_URL}${tutor.image.formats.large.url}`
    : tutor.image?.url
    ? `${STRAPI_URL}${tutor.image.url}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`/tutor-hub/${tutor.id}`}>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
          {/* Premium Badge */}
          {tutor.isPremium && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3" />
                PREMIUM
              </div>
            </div>
          )}

          {/* Verified Badge */}
          {tutor.isVerified && (
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
                <BadgeCheck className="w-4 h-4 " />
              </div>
            </div>
          )}
          {/* Verified Badge */}
          {tutor.isApproved && (
            <div className="absolute top-4 left-12 z-10">
              <div className="bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                <ShieldCheck className="w-4 h-4 " />
              </div>
            </div>
          )}

          {/* Profile Image */}
          <div className="relative h-48 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
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
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                  {tutor.fullName?.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Name & city */}
            <div className="mb-3">
              <div className="flex items-center justify-between">
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
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {tutor.fullName}
              </h3>
              {/* City */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">
                  City:
                </span>
                <span className="text-sm text-gray-500">{tutor.city}</span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <NotebookText className="w-4 h-4 mr-2 text-gray-400" />
                {tutor.experience}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <LocationEdit className="w-4 h-4 mr-2 text-gray-400" />
                {tutor.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Paperclip className="w-4 h-4 mr-2 text-gray-400" />
                {tutor.qualification}
              </div>
            </div>

            {/* Subjects */}
            {/* <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {tutor.subjects.slice(0, 3).map((subject, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                  >
                    {subject}
                  </span>
                ))}
                {tutor.subjects.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    +{tutor.subjects.length - 3} more
                  </span>
                )}
              </div>
            </div> */}

            {/* Teaching Modes */}
            {/* <div className="flex flex-wrap gap-2 mb-4">
              {tutor.teachingModes.map((mode, idx) => (
                <div
                  key={idx}
                  className="flex items-center text-xs text-gray-600"
                >
                  <svg
                    className="w-3 h-3 mr-1 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {mode}
                </div>
              ))}
            </div> */}

            {/* CTA Button */}
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform group-hover:scale-105 shadow-md">
              View Full Profile
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
