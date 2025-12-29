"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
// import { createPublic } from "@/lib/strapi";

const hireTutorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  gender: z.enum(["male", "female", "any"], {
    message: "Please select a gender",
  }),
  area: z.string().min(2, "Please enter your area"),
  division: z.string().min(1, "Please select a division"),
  location: z.string().min(1, "Please select a district"),
  budget: z.string().min(1, "Please enter your budget"),
  mode: z.string().min(1, "Please select a tutoring mode"),
  subject: z.string().optional(),
  class: z.string().optional(),
  medium: z.string().min(1, "Please select a medium"),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

type HireTutorFormData = z.infer<typeof hireTutorSchema>;

const media = [
  "Bangla Medium",
  "English Medium",
  "English Version",
  "Madrasah Background",
];

const divisionsAndDistricts = {
  dhaka: {
    name: "Dhaka",
    districts: [
      "Dhaka",
      "Narayanganj",
      "Gazipur",
      "Tangail",
      "Kishoreganj",
      "Manikganj",
      "Munshiganj",
      "Shariatpur",
      "Rajbari",
      "Madaripur",
    ],
  },
  rajshahi: {
    name: "Rajshahi",
    districts: [
      "Rajshahi",
      "Natore",
      "Naogaon",
      "Chapainawabganj",
      "Bogura",
      "Sirajganj",
      "Pabna",
    ],
  },
  khulna: {
    name: "Khulna",
    districts: [
      "Khulna",
      "Bagerhat",
      "Satkhira",
      "Jessore",
      "Magura",
      "Narail",
    ],
  },
  rangpur: {
    name: "Rangpur",
    districts: [
      "Rangpur",
      "Gaibandha",
      "Kurigram",
      "Dinajpur",
      "Thakurgaon",
      "Panchagarh",
      "Lalmonirhat",
    ],
  },
  mymensingh: {
    name: "Mymensingh",
    districts: ["Mymensingh", "Jamalpur", "Sherpur", "Netrokona"],
  },
  chattogram: {
    name: "Chattogram",
    districts: [
      "Chattogram",
      "Cox's Bazar",
      "Feni",
      "Noakhali",
      "Lakshmipur",
      "Cumilla",
      "Khagrachari",
      "Rangamati",
      "Bandarban",
    ],
  },
  sylhet: {
    name: "Sylhet",
    districts: ["Sylhet", "Moulvibazar", "Sunamganj", "Habiganj"],
  },
  barishal: {
    name: "Barishal",
    districts: [
      "Barishal",
      "Pirojpur",
      "Jhalokati",
      "Patuakhali",
      "Bhola",
      "Borguna",
    ],
  },
};

const subjects = [
  "All",
  "Bangla",
  "English",
  "Math",
  "Science",
  "Commerce",
  "Accounting",
  "Physics",
  "Chemistry",
  "Biology",
  "ICT",
  "Religious studies",
  "Economics",
  "Admission",
  "Arts",
  "Music",
];

const classes = [
  "Play",
  "Nursery",
  "KG",
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
  "Class 11",
  "Class 12",
  "A Level",
  "O Level",
];

const modes = ["Online Tutoring", "Home Tutoring", "Group Classes", "All"];

export default function HireTutorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<HireTutorFormData>({
    resolver: zodResolver(hireTutorSchema),
    defaultValues: {
      gender: "any",
      division: "",
      location: "",
    },
  });

  const divisionValue = watch("division");

  const getDistricts = () => {
    if (!divisionValue) return [];
    const division =
      divisionsAndDistricts[divisionValue as keyof typeof divisionsAndDistricts];
    return division?.districts || [];
  };

  useEffect(() => {
    // Clear district when division changes
    setValue("location", "");
  }, [divisionValue, setValue]);

  const onSubmit = async (data: HireTutorFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://pro-assignment-twelve-server.vercel.app/allJobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            isVerified: false,
            isApproved: false,
            isPremium: false,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to submit application");
      }

      console.log("Tutor application submitted:", result);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
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
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Job Title *
          </label>
          <input
            {...register("title")}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            placeholder="e.g., Math Tutor for Class 10"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Subject
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="Class"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Class
          </label>
          <select
            {...register("class")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          >
            <option value="">Select a class</option>
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

        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Budget (BDT/month) *
          </label>
          <input
            {...register("budget")}
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            placeholder="e.g., 8000-12000"
          />
          {errors.budget && (
            <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Preferred Teacher Gender *
          </label>
          <select
            {...register("gender")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          >
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="mode"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Preferred Tutoring Mode *
          </label>
          <select
            {...register("mode")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          >
            <option value="">Select a mode</option>
            {modes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
          {errors.mode && (
            <p className="mt-1 text-sm text-red-600">{errors.mode.message}</p>
          )}
        </div>
      </div>

      {/* Division / Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label
            htmlFor="division"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Division *
          </label>
          <select
            {...register("division")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
          >
            <option value="">Select your division</option>
            {Object.entries(divisionsAndDistricts).map(([key, value]) => (
              <option key={key} value={key}>
                {value.name}
              </option>
            ))}
          </select>
          {errors.division && (
            <p className="mt-1 text-sm text-red-600">{errors.division.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            District *
          </label>
          <select
            {...register("location")}
            disabled={!divisionValue}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">
              {divisionValue ? "Select your district" : "Select division first"}
            </option>
            {getDistricts().map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>

      {/* medium */}
      <div>
        <label
          htmlFor="medium"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Medium *
        </label>
        <select
          {...register("medium")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        >
          <option value="">Select a medium</option>
          {media.map((medium) => (
            <option key={medium} value={medium}>
              {medium}
            </option>
          ))}
        </select>
        {errors.medium && (
          <p className="mt-1 text-sm text-red-600">{errors.medium.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Schedule Description *
        </label>
        <textarea
          {...register("description")}
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          placeholder="Provide details about the tuition job, student's level, expectations, etc."
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
