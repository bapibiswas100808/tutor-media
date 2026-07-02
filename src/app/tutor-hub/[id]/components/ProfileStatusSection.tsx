"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ProfileStatusSectionProps {
  isOwnProfile: boolean;
  isProfileIncomplete: boolean;
  completionPercentage: number;
  tutorId: number | string | undefined;
  onOpenPremiumModal: () => void;
}

export default function ProfileStatusSection({
  isOwnProfile,
  isProfileIncomplete,
  completionPercentage,
  tutorId,
  onOpenPremiumModal,
}: ProfileStatusSectionProps) {
  if (!isOwnProfile) return null;

  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row">
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
          {isProfileIncomplete ? (
            <AlertCircle className="w-16 h-16 text-red-600 shrink-0 mt-1" />
          ) : (
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

            <div className="w-full bg-gray-300 rounded-full h-2 mb-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  isProfileIncomplete ? "bg-red-500" : "bg-green-500"
                }`}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            {isProfileIncomplete ? (
              <p className="text-red-600 text-sm mb-2 text-center">
                Your profile will NOT be shown to students until it reaches 80%
                completion.
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
                href={`/complete-profile/${tutorId}`}
                className="block w-full rounded-full bg-red-600 py-3 text-sm font-semibold text-white text-center transition hover:bg-red-700"
              >
                Complete Your Profile
              </Link>
            ) : (
              <Link
                href={`/complete-profile/${tutorId}`}
                className="block w-full rounded-full bg-green-500 py-3 text-sm font-semibold text-white text-center transition hover:bg-green-600"
              >
                Update Your Profile
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-3xl bg-linear-to-r from-yellow-100 to-orange-100 p-8 shadow-xl flex-1 border-2 border-orange-200 flex flex-col"
      >
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

        <h3 className="mb-2 text-center text-2xl font-bold text-yellow-800">
          Premium Request
        </h3>

        <p className="mb-2 text-center text-md text-yellow-700">
          Premium members receive frequent tuition updates with priority
        </p>

        <div className="mt-auto">
          <button
            onClick={onOpenPremiumModal}
            className="block w-full text-center rounded-full bg-linear-to-r from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-yellow-500 py-3 text-sm font-semibold text-white transition-colors duration-300"
          >
            Premium Tutor registration
          </button>
        </div>
      </motion.div>
    </div>
  );
}
