"use client";

import Link from "next/link";
import { Tutor } from "@/data/tutorsList";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { calculateProfileCompletion } from "@/lib/profileCompletion";
import TutorProfileHeader from "./components/TutorProfileHeader";
import ProfileStatsSection from "./components/ProfileStatsSection";
import ProfileStatusSection from "./components/ProfileStatusSection";
import OverviewSection from "./components/OverviewSection";
import TuitionPreferencesSection from "./components/TuitionPreferencesSection";
import EducationSection from "./components/EducationSection";
import StatsJobsModal from "./components/StatsJobsModal";
import PremiumModal from "./components/PremiumModal";

type BkashPaymentData = {
  sender: string;
  trxId: string;
  plan: string;
  amount: number;
  tutorId: number | string;
  method: string;
};

interface ApiErrorResponse {
  message?: string;
}

export default function TutorProfilePage({ tutor }: { tutor: Tutor | null }) {
  const { user, isLoading } = useAuth();
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [appStats, setAppStats] = useState({
    applied: 0,
    shortlisted: 0,
    appointed: 0,
    cancelled: 0,
  });

  type StatApplication = {
    _id?: string;
    tuitionJobId?: string;
    status?: string;
    createdAt?: string;
    job?: {
      _id?: string;
      jobId?: string;
      class?: string;
      subjects?: string[];
      salary?: string;
      days?: string;
      duration?: string;
      district?: string;
      location?: string;
      medium?: string;
    };
  };

  const [activeStatCategory, setActiveStatCategory] = useState<string | null>(
    null,
  );
  const [statJobs, setStatJobs] = useState<StatApplication[]>([]);
  const [statJobsLoading, setStatJobsLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const tutorId = user?.id;

  // Handle bKash Payment Submission
  const handleBkashSubmit = async ({
    sender,
    trxId,
    plan: selectedPlan,
    amount,
  }: BkashPaymentData): Promise<void> => {
    if (!selectedPlan || !amount) return;

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "Please login again.",
      });
      return;
    }

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
            amount,
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

      // 🔴 Other server errors
      if (!res.ok) {
        const errorData: ApiErrorResponse = await res.json();
        throw new Error(errorData.message || "Payment submission failed");
      }

      // ✅ Success
      Swal.fire({
        icon: "success",
        title: "Payment Submitted",
        text: "Verification may take up to 24 hours.",
      });
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if (error instanceof Error) {
        message = error.message;
      }

      console.error("bKash submission error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
    }
  };

  const handleStatCardClick = async (label: string, apiStatus: string) => {
    if (!tutor?._id || !token) return;

    setActiveStatCategory(label);
    setStatJobs([]);
    setStatJobsLoading(true);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/applications?tutorId=${tutor._id}`;

    try {
      const res = await fetch(url, {
        headers: { authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error(
          "Failed to fetch stat jobs:",
          res.status,
          await res.text(),
        );
        setStatJobs([]);
        return;
      }

      const rawData = await res.json();
      const applications = Array.isArray(rawData)
        ? rawData
        : Array.isArray(rawData?.data)
          ? rawData.data
          : [];

      const filteredApps = applications.filter((app: StatApplication) => {
        if (apiStatus === "rejected") {
          return app.status === "rejected" || app.status === "cancelled";
        }
        if (apiStatus === "applied") {
          return app.status === "applied" || !app.status;
        }
        return app.status === apiStatus;
      });

      setStatJobs(filteredApps);
    } catch (error) {
      console.error("Error fetching stat jobs:", error);
      setStatJobs([]);
    } finally {
      setStatJobsLoading(false);
    }
  };

  // Check if the logged-in user is viewing their own profile
  useEffect(() => {
    if (!isLoading && user && tutor && String(user.id) === String(tutor.id)) {
      setIsOwnProfile(true);
    }
  }, [user, tutor, isLoading]);

  // Fetch application stats for own profile
  useEffect(() => {
    if (!isOwnProfile || !tutor?.id || !token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutor-job-stats/${tutor.id}`, {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setAppStats({
            applied: data.applied || 0,
            shortlisted: data.shortlisted || 0,
            appointed: data.appointed || 0,
            // confirmed: data.confirmed || 0,
            cancelled: data.rejected || 0,
          });
        }
      })
      .catch(() => {});
  }, [isOwnProfile, tutor?.id, token]);

  const completionPercentage = calculateProfileCompletion(tutor);
  const isProfileIncomplete = completionPercentage < 80;

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
        {/* Profile Header */}
        <TutorProfileHeader
          tutor={tutor}
          isOwnProfile={isOwnProfile}
          imageError={imageError}
          onImageError={() => setImageError(true)}
        />

        {/* Application Stats — only shown to own profile */}
        <ProfileStatsSection
          isOwnProfile={isOwnProfile}
          appStats={appStats}
          onSelect={handleStatCardClick}
        />

        {/* Profile Completion & Premium Request Section - Only visible to the tutor viewing their own profile */}
        <ProfileStatusSection
          isOwnProfile={isOwnProfile}
          isProfileIncomplete={isProfileIncomplete}
          completionPercentage={completionPercentage}
          tutorId={tutor.id}
          onOpenPremiumModal={() => setIsOpen(true)}
        />

        {/* Main Content */}
        <div className="space-y-8">
          {/* Overview */}
          <OverviewSection tutor={tutor} />

          {/* Tuition Preferences */}
          <TuitionPreferencesSection tutor={tutor} />

          {/* Education */}
          <EducationSection tutor={tutor} />

          <StatsJobsModal
            activeStatCategory={activeStatCategory}
            statJobs={statJobs}
            statJobsLoading={statJobsLoading}
            onClose={() => setActiveStatCategory(null)}
          />

          <PremiumModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            selectedPlan={selectedPlan}
            amount={amount}
            submitting={submitting}
            tutorId={tutorId}
            onPlanSelect={(plan, nextAmount) => {
              setSelectedPlan(plan);
              setAmount(nextAmount);
            }}
            onSubmitPayment={async (payload) => {
              setSubmitting(true);
              try {
                await handleBkashSubmit(payload);
              } finally {
                setSubmitting(false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
