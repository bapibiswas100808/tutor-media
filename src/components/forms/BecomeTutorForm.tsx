"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const becomeTutorSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select your gender",
  }),
  qualification: z.string().min(2, "Please enter your qualification"),
  experience: z.string().min(1, "Please select your experience level"),
  subjects: z.array(z.string()).min(1, "Please select at least one subject"),
  classLevels: z
    .array(z.string())
    .min(1, "Please select at least one class level"),
  teachingMode: z
    .array(z.string())
    .min(1, "Please select at least one teaching mode"),
  availableDays: z
    .array(z.string())
    .min(1, "Please select at least one available day"),
  location: z.string().min(2, "Please enter your location"),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
});

type BecomeTutorFormData = z.infer<typeof becomeTutorSchema>;

const experienceLevels = [
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "6-10 years",
  "More than 10 years",
];

export default function BecomeTutorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BecomeTutorFormData>({
    resolver: zodResolver(becomeTutorSchema),
    defaultValues: {
      subjects: [],
      classLevels: [],
      teachingMode: [],
      availableDays: [],
    },
  });

  const onSubmit = async (data: BecomeTutorFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Tutor application submitted:", data);
    setIsSubmitted(true);
    setIsSubmitting(false);
    reset();
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center bg-green-50 border border-green-200 rounded-lg p-8"
      >
        <div className="text-6xl mb-4">🎓</div>
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          Application Submitted Successfully!
        </h3>
        <p className="text-green-700 mb-6">
          Thank you for applying to become a tutor. We&rsquo;ll review your
          application and get back to you within 2-3 business days.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Submit Another Application
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 px-6"
    >
      {/* Personal Information */}
      <div className="rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name *
            </label>
            <input
              {...register("fullName")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address *
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number *
            </label>
            <input
              {...register("phone")}
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              placeholder="01XXXXXXXXX"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Gender *
            </label>
            <select
              {...register("gender")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-2 mt-6"
          >
            Location *
          </label>
          <input
            {...register("location")}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
            placeholder="e.g., Dhanmondi, Dhaka"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>

      {/* Educational Background */}
      <div className="rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Educational Background
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="qualification"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Highest Qualification *
            </label>
            <input
              {...register("qualification")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              placeholder="e.g., BSc in Mathematics, MSc in Physics"
            />
            {errors.qualification && (
              <p className="mt-1 text-sm text-red-600">
                {errors.qualification.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Teaching Experience *
            </label>
            <select
              {...register("experience")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
            >
              <option value="">Select experience level</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.experience && (
              <p className="mt-1 text-sm text-red-600">
                {errors.experience.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* About You */}
      <div className="rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About You</h3>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Short Bio (optional)
          </label>
          <textarea
            {...register("bio")}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
            placeholder="Tell us about your teaching philosophy, approach, and what makes you a great tutor..."
          />
          {errors.bio && (
            <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Submitting Application...
          </>
        ) : (
          "Submit Tutor Application"
        )}
      </button>

      <p className="text-sm text-gray-600 text-center">
        By submitting this application, you agree to our terms and conditions
        and privacy policy.
      </p>
    </motion.form>
  );
}
