"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { divisionsAndDistricts } from "./location";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
// import { createPublic } from "@/lib/strapi";

const becomeTutorSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    gender: z.enum(["male", "female", "other"], {
      message: "Please select your gender",
    }),
    division: z.string().min(1, "Please select your division"),
    location: z.string().min(1, "Please select your district"),
    locality: z.string().min(1, "Please select your location"),
    preferredTuitionArea: z
      .string()
      .min(1, "Please select your preferred tuition area"),
    qualification: z.string().min(2, "Please enter your qualification"),
    experience: z.string().min(1, "Please select your experience level"),
    // bio: z.string().min(20, "Bio must be at least 20 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
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
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSuccessMessage, setOtpSuccessMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<BecomeTutorFormData>({
    resolver: zodResolver(becomeTutorSchema),
    defaultValues: {
      // subjects: [],
      // classLevels: [],
      // teachingMode: [],
      // availableDays: [],
    },
  });

  const divisionValue = watch("division");
  const locationValue = watch("location");
  const emailValue = watch("email");

  // Handle OTP sending
  const handleSendOtp = async () => {
    if (!emailValue) {
      setOtpError("Please enter an email address");
      return;
    }

    setOtpSending(true);
    setOtpError("");
    setOtpSuccessMessage("");

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send OTP");
      }

      setShowOtpInput(true);
      setOtpSuccessMessage("OTP sent to your email. Please check your inbox.");
      setResendTimer(60);

      // Start countdown timer
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setOtpError(
        error instanceof Error ? error.message : "Failed to send OTP"
      );
    } finally {
      setOtpSending(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    setOtpVerifying(true);
    setOtpError("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue, otp: otp }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Invalid OTP");
      }

      setEmailVerified(true);
      setOtp("");
      setShowOtpInput(false);
      setOtpSuccessMessage("Email verified successfully!");
      setTimeout(() => setOtpSuccessMessage(""), 3000);
    } catch (error) {
      setOtpError(
        error instanceof Error ? error.message : "Failed to verify OTP"
      );
    } finally {
      setOtpVerifying(false);
    }
  };

  const getDistricts = () => {
    if (!divisionValue) return [];
    const division =
      divisionsAndDistricts[
        divisionValue as keyof typeof divisionsAndDistricts
      ];
    return Object.entries(division?.districts || {}).map(([key, value]) => ({
      key,
      name: value.name,
    }));
  };

  const getLocalities = (): string[] => {
    if (!divisionValue || !locationValue) return [];
    const division =
      divisionsAndDistricts[
        divisionValue as keyof typeof divisionsAndDistricts
      ];
    const districtObj =
      division?.districts[locationValue as keyof typeof division.districts];
    if (!districtObj || typeof districtObj !== "object") return [];
    const thanas = (districtObj as Record<string, unknown>).thanas || {};
    // Get all locations from all thanas in this district
    const allLocations: string[] = [];
    Object.values(thanas).forEach((thana) => {
      const locations = (thana as Record<string, unknown>)
        ?.locations as string[];
      if (Array.isArray(locations)) {
        allLocations.push(...locations);
      }
    });
    // Remove duplicates and sort
    return Array.from(new Set(allLocations)).sort();
  };

 

  const onSubmit = async (data: BecomeTutorFormData) => {
    // Check if email is verified
    if (!emailVerified) {
      Swal.fire({
        icon: "warning",
        title: "Email Not Verified",
        text: "Please verify your email address before submitting the application.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/allTutors`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            gender: data.gender,
            division: data.division,
            location: data.location,
            locality: data.locality,
            qualification: data.qualification,
            experience: data.experience,
            password: data.password,
            isVerified: false,
            isApproved: false,
            isPremium: false,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application");
      }

      // If ID exists → redirect
      if (result.id || result._id) {
        await Swal.fire({
          icon: "success",
          title: "Application Submitted Successfully!",
          text: "Please complete your profile to continue.",
          confirmButtonText: "Continue",
        });

        router.push(`/complete-profile/${result.id || result._id}`);
      }
      // If no ID → just success message
      else {
        await Swal.fire({
          icon: "success",
          title: "Application Submitted Successfully!",
          text: "We'll review your application and get back to you within 2–3 business days.",
          confirmButtonText: "Submit Another Application",
        });

        reset();
      }
    } catch (error) {
      console.error("Submission error:", error);

      Swal.fire({
        icon: "error",
        title: "Error submitting application",
        text: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

 

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
        {/* Full Name / Email Address */}
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
              Email Address *{" "}
              {emailVerified && (
                <span className="text-green-600">(Verified)</span>
              )}
            </label>
            <div className="flex flex-col md:flex-row gap-2">
              <input
                {...register("email")}
                type="email"
                disabled={emailVerified}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="your.email@example.com"
              />
              {!emailVerified && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpSending || !emailValue}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors duration-200 whitespace-nowrap font-medium"
                >
                  {otpSending ? "Sending..." : "Send OTP"}
                </button>
              )}
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
            {otpSuccessMessage && (
              <p className="mt-1 text-sm text-green-600">{otpSuccessMessage}</p>
            )}

            {/* OTP Input Section */}
            {showOtpInput && !emailVerified && (
              // <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200">
              //   <div className="flex gap-2">
              //     <input
              //       type="text"
              //       maxLength={6}
              //       placeholder="Enter 6-digit OTP"
              //       value={otp}
              //       onChange={(e) => {
              //         setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
              //         setOtpError("");
              //       }}
              //       className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-center text-lg tracking-widest"
              //     />
              //     <button
              //       type="button"
              //       onClick={handleVerifyOtp}
              //       disabled={otpVerifying || otp.length < 6}
              //       className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors duration-200 whitespace-nowrap font-medium"
              //     >
              //       {otpVerifying ? "Verifying..." : "Verify"}
              //     </button>
              //   </div>

              //   {otpError && (
              //     <p className="mt-2 text-sm text-red-600">{otpError}</p>
              //   )}

              //   {resendTimer > 0 ? (
              //     <p className="mt-2 text-sm text-gray-600">
              //       Resend OTP in {resendTimer}s
              //     </p>
              //   ) : (
              //     <button
              //       type="button"
              //       onClick={handleSendOtp}
              //       disabled={otpSending}
              //       className="mt-2 text-sm text-blue-600 hover:text-blue-700 underline font-medium"
              //     >
              //       {otpSending ? "Sending..." : "Resend OTP"}
              //     </button>
              //   )}
              // </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200">
  <div className="flex flex-col sm:flex-row gap-2">
    <input
      type="text"
      maxLength={6}
      placeholder="Enter 6-digit OTP"
      value={otp}
      onChange={(e) => {
        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
        setOtpError("");
      }}
      className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-center text-base sm:text-lg tracking-widest"
    />
    <button
      type="button"
      onClick={handleVerifyOtp}
      disabled={otpVerifying || otp.length < 6}
      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors duration-200 whitespace-nowrap font-medium"
    >
      {otpVerifying ? "Verifying..." : "Verify"}
    </button>
  </div>

  {otpError && (
    <p className="mt-2 text-sm text-red-600 break-words">{otpError}</p>
  )}

  {resendTimer > 0 ? (
    <p className="mt-2 text-sm text-gray-600 text-center sm:text-left">
      Resend OTP in {resendTimer}s
    </p>
  ) : (
    <button
      type="button"
      onClick={handleSendOtp}
      disabled={otpSending}
      className="mt-2 text-sm text-blue-600 hover:text-blue-700 underline font-medium w-full sm:w-auto text-center sm:text-left"
    >
      {otpSending ? "Sending..." : "Resend OTP"}
    </button>
  )}
</div>

            )}
          </div>
        </div>

        {/* Phone Number / Gender */}
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

        {/* Division / District */}
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
              <p className="mt-1 text-sm text-red-600">
                {errors.division.message}
              </p>
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
                {divisionValue
                  ? "Select your district"
                  : "Select division first"}
              </option>
              {getDistricts().map((district) => (
                <option key={district.key} value={district.key}>
                  {district.name}
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

        {/* Locality / Preferred Tuition Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label
              htmlFor="locality"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Location/City *
            </label>
            <select
              {...register("locality")}
              disabled={!locationValue}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {locationValue
                  ? "Select your location"
                  : "Select district first"}
              </option>
              {getLocalities().map((location: string) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            {errors.locality && (
              <p className="mt-1 text-sm text-red-600">
                {errors.locality.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="preferredTuitionArea"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Preferred Tuition Area *
            </label>
            <select
              {...register("preferredTuitionArea")}
              disabled={!locationValue}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {locationValue
                  ? "Select your preferred tuition area"
                  : "Select district first"}
              </option>
              {getLocalities().map((location: string) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            {errors.preferredTuitionArea && (
              <p className="mt-1 text-sm text-red-600">
                {errors.preferredTuitionArea.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Educational Background */}
      <div className="rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Educational Institution & Experience
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="qualification"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Educational Institution*
            </label>
            <input
              {...register("qualification")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              placeholder="e.g., University of XYZ, ABC College"
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
      {/* <div className="rounded-lg">
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
      </div> */}

      {/* Security */}
      <div className="rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>

            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                placeholder="Enter password (minimum 6 characters)"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>

            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                placeholder="Confirm your password"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
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
