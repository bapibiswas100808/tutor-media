"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { divisionsAndDistricts } from "./location";

/* ---------------- LOCATION TYPES ---------------- */

type Thana = {
  locations: string[];
};

type District = {
  name: string;
  thanas: Record<string, Thana>;
};

type Division = {
  name: string;
  districts: Record<string, District>;
};

const locationData = divisionsAndDistricts as Record<string, Division>;

/* ---------------- SCHEMA ---------------- */

const schema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^01\d{9}$/, {
      message: "Enter a valid Bangladeshi phone number",
    }),
  class: z.string().min(1, "Select class"),
  medium: z.string().min(1, "Select medium"),

  studentGender: z.enum(["male", "female"]).optional(),
  tutorGender: z.enum(["male", "female", "any"]).optional(),

  salary: z.string().min(1, "Select salary"),
  days: z.string().min(1, "Select days"),
  duration: z.string().min(1, "Select duration"),

  division: z.string().min(1, "Select division"),
  district: z.string().min(1, "Select district"),
  location: z.string().min(1, "Select location"),
  preferredArea: z.string().min(1, "Select preferred area"),

  tutorDescription: z.string().optional(),
  locationDescription: z.string().optional(),

  subjects: z.array(z.string()).min(1, "Select at least one subject"),
});

type FormData = z.infer<typeof schema>;

/* ---------------- DATA ---------------- */

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
  "SSC",
  "Admission",
  "Class 11",
  "Class 12",
  "HSC",
  "A Level",
  "O Level",
];

const media = [
  "Bangla Medium",
  "English Medium",
  "English Version",
  "Madrasah Background",
];

const subjectsList = [
  "All",
  "Bangla",
  "English",
  "Math",
  "Higher Math",
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
  "Somaj",
  "Dormo",
];

/* ---------------- COMPONENT ---------------- */

export default function HireTutorForm() {
  // const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      subjects: [],
    },
  });

  const divisionValue = watch("division");
  const districtValue = watch("district");

  /* ---------------- SUBJECT ---------------- */

  const toggleSubject = (subject: string) => {
    let updated = [...selectedSubjects];

    if (updated.includes(subject)) {
      updated = updated.filter((s) => s !== subject);
    } else {
      updated.push(subject);
    }

    setSelectedSubjects(updated);
    setValue("subjects", updated);
  };

  /* ---------------- DISTRICTS ---------------- */

  const getDistricts = () => {
    if (!divisionValue) return [];

    const division = locationData[divisionValue];
    if (!division) return [];

    return Object.entries(division.districts).map(([key, value]) => ({
      key,
      name: value.name,
    }));
  };

  /* ---------------- LOCATIONS ---------------- */

  const getLocalities = (): string[] => {
    if (!divisionValue || !districtValue) return [];

    const division = locationData[divisionValue];
    if (!division) return [];

    const district = division.districts[districtValue];
    if (!district) return [];

    const allLocations: string[] = [];

    Object.values(district.thanas).forEach((thana) => {
      allLocations.push(...thana.locations);
    });

    return Array.from(new Set(allLocations)).sort();
  };

  /* ---------------- RESET ---------------- */

  useEffect(() => {
    setValue("district", "");
    setValue("location", "");
    setValue("preferredArea", "");
  }, [divisionValue]);

  useEffect(() => {
    setValue("location", "");
    setValue("preferredArea", "");
  }, [districtValue]);

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      // clone and remove 'id'
      const payload = { ...data };
      if ("id" in payload) delete payload.id;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allJobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          isVerified: false,
          isApproved: false,
          isPremium: false,
        }),
      });

      const result = await res.json();
      Swal.fire(
        "Success",
        `Tuition job posted! Job ID: ${result.jobId}`,
        "success",
      );

      reset();
      setSelectedSubjects([]);
      // setStep(1);
    } catch {
      Swal.fire("Error", "Failed to post job", "error");
    }

    setLoading(false);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 text-gray-700"
      >
        {/* STEP 1 */}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-semibold mb-4">Student Information</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>Class *</label>
              <select
                {...register("class")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 ${
                  errors.class ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Class</option>
                {classes.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              {errors.class && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.class.message}
                </p>
              )}
            </div>

            <div>
              <label>Medium *</label>
              <select
                {...register("medium")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 ${
                  errors.medium ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Medium</option>
                {media.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              {errors.medium && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.medium.message}
                </p>
              )}
            </div>

            <div>
              <label>Phone *</label>
              <input
                {...register("phone")}
                placeholder="01XXXXXXXXX"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label>Student Gender (optional)</label>
              <select
                {...register("studentGender")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </motion.div>

        <div className="border border-dashed border-gray-300" />

        {/* STEP 2 */}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-semibold mb-4">Tutor Requirement</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>Tutor Gender (optional)</label>
              <select
                {...register("tutorGender")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              >
                <option value="">Select Gender</option>
                <option value="any">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label>Salary *</label>
              <select
                {...register("salary")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 ${
                  errors.salary ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Salary</option>
                <option>Negotiable</option>
                <option>1500</option>
                <option>2000</option>
                <option>2500</option>
                <option>3000</option>
                <option>3500</option>
                <option>4000</option>
                <option>4500</option>
                <option>5000</option>
                <option>5500</option>
                <option>6000</option>
                <option>6500</option>
                <option>7000</option>
                <option>7500</option>
                <option>8000</option>
                <option>8500</option>
                <option>9000</option>
                <option>9500</option>
                <option>10000</option>
              </select>
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.salary.message}
                </p>
              )}
            </div>

            <div>
              <label>Days per Week *</label>
              <select
                {...register("days")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 ${
                  errors.days ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Days</option>
                {[
                  1,
                  "1 / 2",
                  2,
                  "2 / 3",
                  3,
                  "3 / 4",
                  4,
                  "4 / 5",
                  5,
                  "5 / 6",
                  6,
                  "6 / 7",
                  7,
                ].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              {errors.days && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.days.message}
                </p>
              )}
            </div>

            <div>
              <label>Duration *</label>
              <select
                {...register("duration")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 ${
                  errors.duration ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Duration</option>
                <option>1 Hour</option>
                <option>1.5 Hours</option>
                <option>2 Hours</option>
                <option>2.5 Hours</option>
                <option>3 Hours</option>
              </select>
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.duration.message}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label>Tutor Description (optional)</label>
              <textarea
                {...register("tutorDescription")}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              />
            </div>
          </div>

          {/* SUBJECTS */}

          <div className="mt-6">
            <label className="block mb-2">Subjects *</label>

            <div className="flex flex-wrap gap-2">
              {subjectsList.map((sub) => (
                <button
                  type="button"
                  key={sub}
                  onClick={() => toggleSubject(sub)}
                  className={`px-3 py-1 rounded-full border
                    ${
                      selectedSubjects.includes(sub)
                        ? "bg-green-600 text-white"
                        : "bg-gray-100"
                    }`}
                >
                  {sub}
                </button>
              ))}
            </div>
            {errors.subjects && (
              <p className="text-red-500 text-sm mt-2">
                {errors.subjects.message}
              </p>
            )}
          </div>

          {/* <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
              >
                Next
              </button>
            </div> */}
        </motion.div>

        <div className="border border-dashed border-gray-300" />

        {/* STEP 3 */}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-semibold mb-4">Location</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>Division *</label>
              <select
                {...register("division")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 ${
                  errors.division ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Division</option>
                {Object.entries(locationData).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.name}
                  </option>
                ))}
              </select>
              {errors.division && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.division.message}
                </p>
              )}
            </div>

            <div>
              <label>District *</label>
              <select
                {...register("district")}
                disabled={!divisionValue}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.district ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select District</option>
                {getDistricts().map((d) => (
                  <option key={d.key} value={d.key}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.district.message}
                </p>
              )}
            </div>

            <div>
              <label>Location *</label>
              <select
                {...register("location")}
                disabled={!districtValue}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Location</option>
                {getLocalities().map((loc) => (
                  <option key={loc}>{loc}</option>
                ))}
              </select>
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div>
              <label>Preferred Area *</label>
              <select
                {...register("preferredArea")}
                disabled={!districtValue}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.preferredArea ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Area</option>
                {getLocalities().map((loc) => (
                  <option key={loc}>{loc}</option>
                ))}
              </select>
              {errors.preferredArea && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.preferredArea.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label>Location Description (optional)</label>
            <textarea
              {...register("locationDescription")}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
