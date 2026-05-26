"use client";

import { motion } from "framer-motion";
import { TuitionJob } from "@/data/tuitionJobsList";
import {
  MapPin,
  Eye,
  LayoutGrid,
  BookOpen,
  FileText,
  CheckSquare,
  Heart,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface TuitionJobCardProps {
  job: TuitionJob;
  onApply: (job: TuitionJob) => void;
  onViewDetails?: (job: TuitionJob) => void;
}

interface ApplicationData {
  _id: string;
  tutorId: string;
  tuitionJobId: string;
  status: "applied" | "shortlisted" | "appointed" | "confirmed" | "cancelled";
  isDeleted?: boolean;
}

function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1)
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

interface InfoCellProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoCell({ icon, label, value }: InfoCellProps) {
  return (
    <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl p-3">
      <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center shrink-0 text-orange-500">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-bold text-gray-800 truncate">{value}</p>
      </div>
    </div>
  );
}

export default function TuitionJobCard({
  job,
  // onApply,
  onViewDetails,
}: TuitionJobCardProps) {
  const { user } = useAuth();
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [isLoadingShortlist, setIsLoadingShortlist] = useState(false);
  const [shortlistedAppId, setShortlistedAppId] = useState<string | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Check if job is already shortlisted on mount
  useEffect(() => {
    if (!user || !token || !job._id) return;

    const checkShortlistStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/applications?tutorId=${user._id}&tuitionJobId=${job._id}`,
          {
            headers: { authorization: `Bearer ${token}` },
          },
        );

        if (!res.ok) return;

        const data = await res.json();
        const applications = Array.isArray(data) ? data : [];

        // Check if there's a shortlisted or applied application for this job
        const existingApp = applications.find(
          (app: ApplicationData) =>
            String(app.tuitionJobId) === String(job._id) &&
            (app.status === "shortlisted" || app.status === "applied"),
        );

        if (existingApp) {
          setIsShortlisted(true);
          setShortlistedAppId(existingApp._id);
        }
      } catch (error) {
        console.error("Error checking shortlist status:", error);
      }
    };

    checkShortlistStatus();
  }, [user, token, job._id]);

  const handleShortlist = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to shortlist jobs.",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please login again.",
      });
      return;
    }

    setIsLoadingShortlist(true);

    try {
      if (isShortlisted) {
        // REMOVE: Send PATCH to update status to cancelled
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/applications/${shortlistedAppId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              status: "cancelled", // or isDeleted: true
            }),
          },
        );

        if (!res.ok) throw new Error("Failed to remove shortlist");

        setIsShortlisted(false);
        setShortlistedAppId(null);
        Swal.fire({
          icon: "success",
          title: "Removed from Shortlist",
          text: "Job removed from your shortlist.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        // ADD: Send POST to create application with status
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/applications`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              tutorId: user._id, // Use MongoDB ObjectId, not numeric id
              tuitionJobId: job._id, // Use MongoDB ObjectId, not jobId
              status: "shortlisted",
              rate: user.rate || 0,
              schedule: "flexible",
              proposal: "Added to shortlist",
            }),
          },
        );

        if (!res.ok) throw new Error("Failed to shortlist");

        const data = await res.json();
        setIsShortlisted(true);
        setShortlistedAppId(data.data._id); // Store app ID for later removal

        Swal.fire({
          icon: "success",
          title: "Added to Shortlist",
          text: "Job added to your shortlist.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Shortlist error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update shortlist. Please try again.",
      });
    } finally {
      setIsLoadingShortlist(false);
    }
  };

  const tutorGenderCapitalized =
    job.tutorGender.charAt(0).toUpperCase() + job.tutorGender.slice(1);
  const subjectDisplay = job.subjects?.join(", ") || "N/A";

  // Handle Apply Now click with confirmation
const handleApplyClick = async () => {
  // Login check
  if (!user) {
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login to apply for tuition jobs.",
      confirmButtonText: "Go to Login",
      confirmButtonColor: "#2563eb",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-full px-5 py-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/login";
      }
    });

    return;
  }

  // Token check
  if (!token) {
    Swal.fire({
      icon: "error",
      title: "Authentication Error",
      text: "Please login again.",
      confirmButtonColor: "#dc2626",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-full px-5 py-2",
      },
    });

    return;
  }

  // Job expired check
  const isExpired =
    new Date().getTime() - new Date(job.createdAt).getTime() >
    24 * 60 * 60 * 1000;

  // Expired warning popup
  if (isExpired) {
    const expiredResult = await Swal.fire({
      icon: "warning",
      title: "Older Tuition Job",
      text: "This tuition job was posted more than 24 hours ago. Do you still want to apply?",
      showCancelButton: true,
      confirmButtonText: "Apply Anyway",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2B7FFF",
      cancelButtonColor: "#d1d5db",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl shadow-2xl",
        confirmButton:
          "rounded-full px-6 py-2 font-semibold text-sm",
        cancelButton:
          "rounded-full px-6 py-2 font-semibold text-sm",
        title: "text-gray-800 text-xl font-bold",
        htmlContainer: "text-gray-500",
      },
    });

    if (!expiredResult.isConfirmed) return;
  }

  // Main confirmation popup
  const result = await Swal.fire({
    title: "Apply for this tuition?",
    text: "Your application will be submitted instantly.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, Apply",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#d1d5db",
    reverseButtons: true,
    customClass: {
      popup: "rounded-2xl shadow-2xl",
      confirmButton:
        "rounded-full px-6 py-2 font-semibold text-sm",
      cancelButton:
        "rounded-full px-6 py-2 font-semibold text-sm",
      title: "text-gray-800 text-xl font-bold",
      htmlContainer: "text-gray-500",
    },
  });

  if (!result.isConfirmed) return;

  try {
    // Loading popup
    Swal.fire({
      title: "Submitting...",
      text: "Please wait while we submit your application.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        popup: "rounded-2xl",
      },
    });

    // API request
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/applications`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tutorId: user._id,
          tuitionJobId: job._id,
          status: "applied",
          rate: user.rate || 0,
          schedule: "Flexible",
          proposal: "I am interested in this tuition job.",
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Application failed");
    }

    // Success popup
    Swal.fire({
      icon: "success",
      title: "Application Submitted",
      text: "Your application has been submitted successfully.",
      timer: 2000,
      showConfirmButton: false,
      customClass: {
        popup: "rounded-2xl shadow-xl",
      },
    });
  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Application Failed",
      text: "Something went wrong. Please try again.",
      confirmButtonColor: "#dc2626",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-full px-5 py-2",
      },
    });
  }
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 p-4"
    >

      {/* Top row: badge · status · ID · time ago */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        {/* Tuition Type */}
        <span className="bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
          Home Tuition
        </span>

        {/* Job ID */}
        <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
          ID : {job.jobId}
        </span>

        {/* Live / Closed Status */}
        {new Date().getTime() - new Date(job.createdAt).getTime() <
        24 * 60 * 60 * 1000 ? (
          <span className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Live
          </span>
        ) : (
          <span className="flex items-center gap-1.5 bg-red-100 text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Closed
          </span>
        )}

        {/* Time Ago */}
        <span className="ml-auto text-xs text-gray-400 whitespace-nowrap font-medium">
          {timeAgo(job.createdAt)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-gray-900 mb-4 leading-snug">
        Need a{" "}
        <span
          className={
            job.tutorGender === "male"
              ? "text-blue-500"
              : job.tutorGender === "female"
                ? "text-red-500"
                : "text-gray-500"
          }
        >
          {tutorGenderCapitalized}
        </span>{" "}
        Tutor for {job.medium} in {job.location}, {job.district}
      </h3>

      {/* Info grid: 3 cols × 2 rows */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
        <InfoCell
          icon={<LayoutGrid className="w-4 h-4" />}
          label="Category"
          value={job.medium}
        />
        <InfoCell
          icon={<BookOpen className="w-4 h-4" />}
          label="Class"
          value={job.class}
        />
        <InfoCell
          icon={<FileText className="w-4 h-4" />}
          label="Subject"
          value={subjectDisplay}
        />
        <InfoCell
          icon={<CheckSquare className="w-4 h-4" />}
          label="Day"
          value={`${job.days} Days/Week`}
        />
        <InfoCell
          icon={<MapPin className="w-4 h-4" />}
          label="Location"
          value={job.location}
        />
        <InfoCell
          icon={<span className="text-sm font-bold leading-none">৳</span>}
          label="Tuition fees"
          value={`${job.salary} ৳`}
        />
      </div>

      {/* Requirement */}
      {job.tutorDescription && (
        <p className="text-xs text-gray-500 mb-4">
          <span className="font-semibold text-gray-700">Requirement: </span>
          {job.tutorDescription}
        </p>
      )}

      {/* Footer */}
      <div className="border-t border-gray-100 pt-3 flex items-center justify-between gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap">
        <button
          onClick={() => onViewDetails?.(job)}
          className="flex items-center gap-1.5 text-gray-600 border border-gray-200 px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>

        <button
          onClick={handleShortlist}
          disabled={isLoadingShortlist}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            isShortlisted
              ? "bg-red-100 text-red-600 border border-red-200 hover:bg-red-200"
              : "text-gray-600 border border-gray-200 hover:bg-gray-50"
          } ${isLoadingShortlist ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Heart className={`w-4 h-4 ${isShortlisted ? "fill-current" : ""}`} />
          Shortlist
        </button>

        <span className="text-xs text-gray-400 whitespace-nowrap">
          {new Date(job.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>

        {/* <button
          onClick={() => onApply(job)}
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2 rounded-full font-semibold text-xs tracking-wide transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          Apply Now
        </button> */}
        <button
  onClick={handleApplyClick}
  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2 rounded-full font-semibold text-xs tracking-wide transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
>
  Apply Now
</button>
      </div>
    </motion.div>
  );
}
