"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const hireTutorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  class: z.string().min(1, "Please select a class"),
  area: z.string().min(2, "Please enter your area"),
  budget: z.string().min(1, "Please enter your budget"),
  mode: z.enum(["home", "online", "group"], {
    message: "Please select a tutoring mode",
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type HireTutorFormData = z.infer<typeof hireTutorSchema>;

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Bangla",
  "Computer Science",
  "Economics",
  "Accounting",
  "Statistics",
  "Geography",
  "History",
];

const classes = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "HSC 1st Year",
  "HSC 2nd Year",
  "University Level",
  "Adult Learning",
];

export default function HireTutorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HireTutorFormData>({
    resolver: zodResolver(hireTutorSchema),
  });

  const onSubmit = async (data: HireTutorFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", data);
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
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          Request Submitted Successfully!
        </h3>
        <p className="text-green-700 mb-6">
          We&rsquo;ve received your tuition request. Our tutors will start
          applying within 24 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Submit Another Request
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
      className="space-y-6"
    >
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name *
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            placeholder="01XXXXXXXXX"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email Address (optional)
        </label>
        <input
          {...register("email")}
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Tuition Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Subject *
          </label>
          <select
            {...register("subject")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="class"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Class/Level *
          </label>
          <select
            {...register("class")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          >
            <option value="">Select class/level</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
          {errors.class && (
            <p className="mt-1 text-sm text-red-600">{errors.class.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="area"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Area/Location *
          </label>
          <input
            {...register("area")}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            placeholder="e.g., Dhanmondi, Dhaka"
          />
          {errors.area && (
            <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Budget (BDT/month) *
          </label>
          <input
            {...register("budget")}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            placeholder="e.g., 8000-12000"
          />
          {errors.budget && (
            <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
          )}
        </div>
      </div>

      {/* Tutoring Mode */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Preferred Tutoring Mode *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { value: "home", label: "Home Tutoring", icon: "🏠" },
            { value: "online", label: "Online Tutoring", icon: "💻" },
            { value: "group", label: "Group Tutoring", icon: "👥" },
          ].map((mode) => (
            <label
              key={mode.value}
              className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer "
            >
              <input
                {...register("mode")}
                type="radio"
                value={mode.value}
                className="mr-3 text-blue-600"
              />
              <span className="text-xl mr-2">{mode.icon}</span>
              <span className="text-sm font-medium text-gray-700">
                {mode.label}
              </span>
            </label>
          ))}
        </div>
        {errors.mode && (
          <p className="mt-1 text-sm text-red-600">{errors.mode.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Additional Details (optional)
        </label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          placeholder="Describe your specific requirements, learning goals, preferred schedule, etc."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
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
            Submitting...
          </>
        ) : (
          "Submit Tuition Request"
        )}
      </button>

      <p className="text-sm text-gray-600 text-center">
        By submitting this form, you agree to receive calls and messages from
        qualified tutors.
      </p>
    </motion.form>
  );
}
