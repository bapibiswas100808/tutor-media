"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  NotebookText,
  Paperclip,
  StarIcon,
} from "lucide-react";
import { Tutor } from "@/data/tutorsList";

interface TutorProfileHeaderProps {
  tutor: Tutor;
  isOwnProfile: boolean;
  imageError: boolean;
  onImageError: () => void;
}

export default function TutorProfileHeader({
  tutor,
  isOwnProfile,
  imageError,
  onImageError,
}: TutorProfileHeaderProps) {
  const imageUrl = tutor?.basicInfo?.image || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
    >
      <div className="h-24 bg-linear-to-r from-blue-600 to-purple-600" />
      <div className="p-8">
        <div className="flex flex-col items-center md:flex-row gap-6 -mt-20">
          <div className="relative shrink-0 w-fit">
            <div className="relative w-44 h-44 rounded-full overflow-hidden shadow-xl ring-4 ring-white bg-white">
              {imageUrl && !imageError ? (
                <Image
                  src={imageUrl}
                  alt={tutor.fullName}
                  fill
                  sizes="176px"
                  className="object-cover"
                  onError={onImageError}
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                  {tutor.fullName?.charAt(0)}
                </div>
              )}
            </div>

            {tutor.isVerified && (
              <div className="absolute top-0 right-0 bg-green-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
                <CheckCircleIcon className="w-6 h-6" />
              </div>
            )}
          </div>

          <div className="flex-1 mt-4 md:mt-16">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {tutor.fullName}
              </h1>

              {tutor.isPremium && (
                <span className="bg-linear-to-r from-orange-400 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 shadow">
                  <StarIcon className="w-4 h-4" />
                  Premium
                </span>
              )}

              {!isOwnProfile && (
                <Link
                  href="/hire-tutor"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow transition"
                >
                  Hire a Mentor
                </Link>
              )}
            </div>

            <div className="flex flex-wrap gap-6 text-sm mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-400">ID:</span>
                <span className="text-gray-600">{tutor.id}</span>
              </div>

              {tutor.gender && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-400">Gender:</span>
                  <span className="text-gray-600 capitalize">
                    {tutor.gender}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              {tutor.qualification && (
                <div className="flex items-center">
                  <Paperclip className="w-4 h-4 mr-2 text-gray-400" />
                  {tutor.qualification}
                </div>
              )}
              {tutor.experience && (
                <div className="flex items-center capitalize">
                  <NotebookText className="w-4 h-4 mr-2 text-gray-400" />
                  {tutor.experience} teaching experience
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
