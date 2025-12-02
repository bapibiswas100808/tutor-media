"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, Phone, DollarSign, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TuitionJob } from "@/data/tuitionJobsList";
import { useState } from "react";

const proposalSchema = z.object({
  tutorName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  expectedRate: z.string().min(1, "Please specify your expected rate"),
  availability: z.string().min(10, "Please provide your availability details"),
  proposal: z
    .string()
    .min(50, "Proposal must be at least 50 characters")
    .max(1000, "Proposal must not exceed 1000 characters"),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: TuitionJob | null;
}

export default function ApplyJobModal({
  isOpen,
  onClose,
  job,
}: ApplyJobModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
  });

  const onSubmit = async (data: ProposalFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Application submitted:", {
      jobId: job?.id,
      jobTitle: job?.title,
      ...data,
    });

    setIsSubmitted(true);

    // Reset form and close modal after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      setIsSubmitted(false);
      onClose();
    }
  };

  if (!job) return null;

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
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold mb-2">Apply for This Job</h2>
              <p className="text-blue-100 text-sm">{job.title}</p>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Job Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600 font-medium">Subject</p>
                        <p className="text-gray-800 font-semibold">
                          {job.subject}
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
                          {job.budget}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tutor Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      {...register("tutorName")}
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    {errors.tutorName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.tutorName.message}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Expected Rate */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Expected Rate (BDT/month) *
                    </label>
                    <input
                      {...register("expectedRate")}
                      type="text"
                      placeholder="e.g., 10,000 - 15,000 BDT/month"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    {errors.expectedRate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.expectedRate.message}
                      </p>
                    )}
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Availability *
                    </label>
                    <input
                      {...register("availability")}
                      type="text"
                      placeholder="e.g., Sunday to Thursday, 4-6 PM"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    {errors.availability && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.availability.message}
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
                      placeholder="Write a compelling proposal explaining why you&apos;re the best fit for this job. Include your qualifications, experience, and teaching approach..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
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
