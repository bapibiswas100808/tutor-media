"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  BadgeCheck,
  BookA,
  MapPinned,
  ShieldCheck,
  Star,
  University,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Tutor } from "@/data/tutorsList";
import { useRouter } from "next/navigation";

interface TutorCardProps {
  tutor: Tutor;
  index: number;
}

export default function TutorCard({ tutor, index }: TutorCardProps) {
  const imageUrl = tutor?.basicInfo?.image?.trim();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const isOwnProfile = isAuthenticated && user && user.id === tutor.id;
  const isPremiumProfile = tutor.isPremium === true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25) }}
      className="group cursor-pointer"
      onClick={() => router.push(`/tutor-hub/${tutor.id}`)}
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden flex flex-col h-full relative">
        {/* Premium */}
        {isPremiumProfile && (
          <div className="absolute top-4 right-4 z-10 bg-linear-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3" /> PREMIUM
          </div>
        )}

        {/* Verified */}
        {tutor?.isVerified && (
          <div className="absolute top-4 left-4 z-10 bg-blue-500 text-white p-1.5 rounded-full">
            <BadgeCheck className="w-4 h-4" />
          </div>
        )}

        {tutor?.isApproved && (
          <div className="absolute top-4 left-12 z-10 bg-green-500 text-white p-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4" />
          </div>
        )}

        {/* Image */}
        <div className="h-48 flex items-center justify-center bg-linear-to-br from-blue-100 to-purple-100">
          <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={tutor.fullName}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                {tutor.fullName?.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 text-center space-y-2 flex-grow text-gray-600">
          <h3 className="text-lg font-bold text-gray-900">{tutor.fullName}</h3>

          <div className="flex justify-center gap-2 text-sm">
            <University className="w-4 h-4" />
            {tutor.qualification}
          </div>

          <div className="flex justify-center gap-2 text-sm">
            <BookA className="w-4 h-4" />
            {tutor.education?.grad?.[0]?.department || "Not provided"}
          </div>

          <div className="inline-flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-md capitalize text-sm">
            <MapPinned className="w-4 h-4" />
            {tutor.division}
          </div>
        </div>

        {/* CTA */}
        <div>
          {isOwnProfile ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/tutor-hub/${tutor.id}`);
              }}
              className="w-full bg-purple-600 text-white py-3 font-semibold hover:bg-purple-700 cursor-pointer"
            >
              View Profile
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/tutor-hub/${tutor.id}`);
              }}
              className="w-full bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 cursor-pointer"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
