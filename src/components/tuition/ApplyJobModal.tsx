"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  DollarSign,
  Calendar,
  AlertCircle,
  LogIn,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TuitionJob } from "@/data/tuitionJobsList";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const proposalSchema = z.object({
  rate: z.string().min(1, "Please specify your expected rate"),
  schedule: z.string().min(10, "Please provide your availability details"),
  proposal: z
    .string()
    .min(20, "Proposal must be at least 20 characters")
    .max(1000, "Proposal must not exceed 1000 characters"),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: TuitionJob | null;
  tutorId?: string | number; // Optional tutor ID passed from parent
}

export default function ApplyJobModal({
  isOpen,
  onClose,
  job,
}: // tutorId,
ApplyJobModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
  });

  
  const onSubmit = async (data: ProposalFormData) => {
    try {
      setSubmitError(null);

      // Use logged-in tutor's ID from auth context
      const finalTutorId = user?.id ? parseInt(String(user.id), 10) : null;

      if (!finalTutorId || finalTutorId <= 0) {
        throw new Error(
          "Unable to identify your tutor ID. Please log in again."
        );
      }

      interface ApplicationPayload {
        rate: number;
        schedule: string;
        proposal: string;
        tutorId: string; // MongoDB ObjectId as string
        tuitionJobId: string; // MongoDB ObjectId as string
      }
      const applicationPayload: ApplicationPayload = {
        rate: parseInt(data.rate, 10),
        schedule: data.schedule,
        proposal: data.proposal,
        tutorId: String(finalTutorId), // Convert to string for MongoDB
        tuitionJobId: String(job?._id), // Use _id from job object
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationPayload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to submit application");
      }
      
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        reset();
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Application submission error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit application"
      );
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      setIsSubmitted(false);
      onClose();
    }
  };

  const handleLoginRedirect = () => {
    onClose();
    router.push("/login");
  };

  if (!job) return null;

  // Show login prompt if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-6 relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold">Login Required</h2>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                  <LogIn className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-gray-700 text-center">
                  You need to be logged in to apply for tuition jobs. Sign in to
                  your account or create a new one to get started.
                </p>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLoginRedirect}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn size={18} />
                  Login
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  const subjectText = job.subjects?.length
  ? job.subjects.join(", ")
  : "Teacher";
  const className = job.class?.toLowerCase();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden my-8"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-6 relative">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold mb-2">Apply for This Job</h2>
              <p className="text-blue-100 text-sm">{`${subjectText} teacher needed for class ${className}`}</p>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Error Message */}
                  {submitError && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                      <p className="text-red-700 text-sm">{submitError}</p>
                    </div>
                  )}

                  {/* Job Summary */}
                  <div className="bg-linear-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600 font-medium">Subject</p>
                        <p className="text-gray-800 font-semibold">
                          {job.subjects?.length ? job.subjects.join(", ") : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">Class</p>
                        <p className="text-gray-800 font-semibold">
                          {job.class}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">Location</p>
                        <p className="text-gray-800 font-semibold">
                          {job.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">Budget</p>
                        <p className="text-gray-800 font-semibold">
                          {job.salary}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expected Rate */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Expected Rate (BDT/month) *
                    </label>
                    <input
                      {...register("rate")}
                      type="number"
                      placeholder="e.g., 10000"
                      className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    {errors.rate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.rate.message}\
                      </p>
                    )}
                  </div>

                  {/* Schedule */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Schedule *
                    </label>
                    <input
                      {...register("schedule")}
                      type="text"
                      placeholder="e.g., Sunday to Thursday, 4-6 PM"
                      className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    {errors.schedule && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.schedule.message}
                      </p>
                    )}
                  </div>

                  {/* Proposal */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Send className="w-4 h-4 inline mr-2" />
                      Your Proposal / Cover Letter *
                    </label>
                    <textarea
                      {...register("proposal")}
                      rows={6}
                      placeholder="Write a compelling proposal explaining why you're the best fit for this job. Include your qualifications, experience, and teaching approach..."
                      className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    />
                    <div className="flex items-center justify-between mt-1">
                      {errors.proposal && (
                        <p className="text-sm text-red-600">
                          {errors.proposal.message}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 ml-auto">
                        Min 50 characters, Max 1000 characters
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Application
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                // Success State
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-10 h-10 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-600 text-center max-w-md">
                    Your application has been successfully submitted. The
                    student will review your proposal and contact you soon.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
