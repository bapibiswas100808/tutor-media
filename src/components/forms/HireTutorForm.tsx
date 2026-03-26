// "use client";

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { motion } from "framer-motion";
// import { divisionsAndDistricts } from "./location";
// import Swal from "sweetalert2";

// const hireTutorSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   title: z.string().min(5, "Title must be at least 5 characters"),
//   phone: z.string().min(10, "Phone number must be at least 10 digits"),
//   email: z
//     .string()
//     .email("Please enter a valid email address")
//     .optional()
//     .or(z.literal("")),
//   gender: z.enum(["male", "female", "any"], {
//     message: "Please select a gender",
//   }),
//   division: z.string().min(1, "Please select a division"),
//   district: z.string().min(1, "Please select a district"),
//   location: z.string().min(1, "Please select a location"),
//   preferredArea: z.string().min(1, "Please select your preferred area"),
//   budget: z.string().min(1, "Please enter your budget"),
//   mode: z.string().min(1, "Please select a tutoring mode"),
//   subject: z.string().optional(),
//   class: z.string().optional(),
//   medium: z.string().min(1, "Please select a medium"),
//   description: z.string().min(20, "Description must be at least 20 characters"),
// });

// type HireTutorFormData = z.infer<typeof hireTutorSchema>;

// const media = [
//   "Bangla Medium",
//   "English Medium",
//   "English Version",
//   "Madrasah Background",
// ];

// const subjects = [
//   "All",
//   "Bangla",
//   "English",
//   "Math",
//   "Science",
//   "Commerce",
//   "Accounting",
//   "Physics",
//   "Chemistry",
//   "Biology",
//   "ICT",
//   "Religious studies",
//   "Economics",
//   "Admission",
//   "Arts",
//   "Music",
// ];

// const classes = [
//   "Play",
//   "Nursery",
//   "KG",
//   "Class 1",
//   "Class 2",
//   "Class 3",
//   "Class 4",
//   "Class 5",
//   "Class 6",
//   "Class 7",
//   "Class 8",
//   "Class 9",
//   "Class 10",
//   "Class 11",
//   "Class 12",
//   "A Level",
//   "O Level",
// ];

// const modes = ["Online Tutoring", "Home Tutoring", "Group Classes", "All"];

// export default function HireTutorForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//     reset,
//   } = useForm<HireTutorFormData>({
//     resolver: zodResolver(hireTutorSchema),
//     defaultValues: {
//       gender: "any",
//       division: "",
//       location: "",
//     },
//   });

//   const divisionValue = watch("division");
//   const districtValue = watch("district");

//   const getDistricts = () => {
//     if (!divisionValue) return [];
//     const division =
//       divisionsAndDistricts[
//         divisionValue as keyof typeof divisionsAndDistricts
//       ];
//     return Object.entries(division?.districts || {}).map(([key, value]) => ({
//       key,
//       name: value.name,
//     }));
//   };

//   const getLocalities = (): string[] => {
//     if (!divisionValue || !districtValue) return [];
//     const division =
//       divisionsAndDistricts[
//         divisionValue as keyof typeof divisionsAndDistricts
//       ];
//     const districtObj =
//       division?.districts[districtValue as keyof typeof division.districts];
//     if (!districtObj || typeof districtObj !== "object") return [];
//     const thanas = (districtObj as Record<string, unknown>).thanas || {};
//     // Get all locations from all thanas in this district
//     const allLocations: string[] = [];
//     Object.values(thanas).forEach((thana) => {
//       const locations = (thana as Record<string, unknown>)
//         ?.locations as string[];
//       if (Array.isArray(locations)) {
//         allLocations.push(...locations);
//       }
//     });
//     // Remove duplicates and sort
//     return Array.from(new Set(allLocations)).sort();
//   };

//   useEffect(() => {
//     // Clear district and location when division changes
//     setValue("district", "");
//     setValue("location", "");
//     setValue("preferredArea", "");
//   }, [divisionValue, setValue]);

//   useEffect(() => {
//     // Clear location when district changes
//     setValue("location", "");
//     setValue("preferredArea", "");
//   }, [districtValue, setValue]);

// const onSubmit = async (data: HireTutorFormData) => {
//   setIsSubmitting(true);

//   try {
//     const response = await fetch(
//       "https://pro-assignment-twelve-server.vercel.app/allJobs",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...data,
//           isVerified: false,
//           isApproved: false,
//           isPremium: false,
//         }),
//       }
//     ); // <-- Closing parenthesis here

//     const result = await response.json();
//     console.log("Tutor application submitted:", result);

//     await Swal.fire({
//       icon: "success",
//       title: "Job Posted Successfully!",
//       text: "Your tutor requirement has been submitted.",
//       confirmButtonText: "Post Another Job",
//       confirmButtonColor: "#16A34A",
//     });

//     reset();
//   } catch (error) {
//     console.error("Submission error:", error);

//     Swal.fire({
//       icon: "error",
//       title: "Submission Failed",
//       text: error instanceof Error ? error.message : "Something went wrong",
//     });
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   return (
//     <motion.form
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-6"
//     >
//       {/* Personal Information */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* <div>
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Full Name *
//           </label>
//           <input
//             {...register("name")}
//             type="text"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
//             placeholder="Enter your full name"
//           />
//           {errors.name && (
//             <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
//           )}
//         </div> */}

//         <div>
//           <label
//             htmlFor="title"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Job Title *
//           </label>
//           <input
//             {...register("title")}
//             type="text"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
//             placeholder="e.g., Math Tutor for Class 10"
//           />
//           {errors.title && (
//             <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label
//             htmlFor="phone"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Phone Number *
//           </label>
//           <input
//             {...register("phone")}
//             type="tel"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
//             placeholder="01XXXXXXXXX"
//           />
//           {errors.phone && (
//             <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Email Address (optional)
//           </label>
//           <input
//             {...register("email")}
//             type="email"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
//             placeholder="your.email@example.com"
//           />
//           {errors.email && (
//             <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label
//             htmlFor="subject"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Subject
//           </label>
//           <select
//             {...register("subject")}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
//           >
//             <option value="">Select a subject</option>
//             {subjects.map((subject) => (
//               <option key={subject} value={subject}>
//                 {subject}
//               </option>
//             ))}
//           </select>
//           {errors.subject && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.subject.message}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label
//             htmlFor="Class"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Class
//           </label>
//           <select
//             {...register("class")}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
//           >
//             <option value="">Select a class</option>
//             {classes.map((cls) => (
//               <option key={cls} value={cls}>
//                 {cls}
//               </option>
//             ))}
//           </select>
//           {errors.class && (
//             <p className="mt-1 text-sm text-red-600">{errors.class.message}</p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="budget"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Budget (BDT/month) *
//           </label>
//           <input
//             {...register("budget")}
//             type="number"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
//             placeholder="e.g., 8000-12000"
//           />
//           {errors.budget && (
//             <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label
//             htmlFor="gender"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Preferred Teacher Gender *
//           </label>
//           <select
//             {...register("gender")}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
//           >
//             <option value="any">Any</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//           {errors.gender && (
//             <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="mode"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Preferred Tutoring Mode *
//           </label>
//           <select
//             {...register("mode")}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
//           >
//             <option value="">Select a mode</option>
//             {modes.map((mode) => (
//               <option key={mode} value={mode}>
//                 {mode}
//               </option>
//             ))}
//           </select>
//           {errors.mode && (
//             <p className="mt-1 text-sm text-red-600">{errors.mode.message}</p>
//           )}
//         </div>
//       </div>

//       {/* Division / District / Location */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <div>
//           <label
//             htmlFor="division"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Division *
//           </label>
//           <select
//             {...register("division")}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
//           >
//             <option value="">Select your division</option>
//             {Object.entries(divisionsAndDistricts).map(([key, value]) => (
//               <option key={key} value={key}>
//                 {value.name}
//               </option>
//             ))}
//           </select>
//           {errors.division && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.division.message}
//             </p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="district"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             District *
//           </label>
//           <select
//             {...register("district")}
//             disabled={!divisionValue}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
//           >
//             <option value="">
//               {divisionValue ? "Select your district" : "Select division first"}
//             </option>
//             {getDistricts().map((district) => (
//               <option key={district.key} value={district.key}>
//                 {district.name}
//               </option>
//             ))}
//           </select>
//           {errors.district && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.district.message}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Location / Preferred Area */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <div>
//           <label
//             htmlFor="location"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Location *
//           </label>
//           <select
//             {...register("location")}
//             disabled={!districtValue}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
//           >
//             <option value="">
//               {districtValue ? "Select your location" : "Select district first"}
//             </option>
//             {getLocalities().map((location: string) => (
//               <option key={location} value={location}>
//                 {location}
//               </option>
//             ))}
//           </select>
//           {errors.location && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.location.message}
//             </p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="preferredArea"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Preferred Area *
//           </label>
//           <select
//             {...register("preferredArea")}
//             disabled={!districtValue}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
//           >
//             <option value="">
//               {districtValue
//                 ? "Select your preferred area"
//                 : "Select district first"}
//             </option>
//             {getLocalities().map((location: string) => (
//               <option key={location} value={location}>
//                 {location}
//               </option>
//             ))}
//           </select>
//           {errors.preferredArea && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.preferredArea.message}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* medium */}
//       <div>
//         <label
//           htmlFor="medium"
//           className="block text-sm font-medium text-gray-700 mb-2"
//         >
//           Medium *
//         </label>
//         <select
//           {...register("medium")}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
//         >
//           <option value="">Select a medium</option>
//           {media.map((medium) => (
//             <option key={medium} value={medium}>
//               {medium}
//             </option>
//           ))}
//         </select>
//         {errors.medium && (
//           <p className="mt-1 text-sm text-red-600">{errors.medium.message}</p>
//         )}
//       </div>

//       {/* Description */}
//       <div>
//         <label
//           htmlFor="description"
//           className="block text-sm font-medium text-gray-700 mb-2"
//         >
//           Schedule Description *
//         </label>
//         <textarea
//           {...register("description")}
//           rows={5}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
//           placeholder="Provide details about the tuition job, student's level, expectations, etc."
//         />
//         {errors.description && (
//           <p className="mt-1 text-sm text-red-600">
//             {errors.description.message}
//           </p>
//         )}
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
//       >
//         {isSubmitting ? (
//           <>
//             <svg
//               className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               ></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               ></path>
//             </svg>
//             Submitting...
//           </>
//         ) : (
//           "Submit Tuition Request"
//         )}
//       </button>

//       <p className="text-sm text-gray-600 text-center">
//         By submitting this form, you agree to receive calls and messages from
//         qualified tutors.
//       </p>
//     </motion.form>
//   );
// }

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
    .optional()
    .refine((val) => !val || /^01\d{9}$/.test(val), {
      message: "Enter a valid phone number",
    }),
  class: z.string().min(1, "Select class"),
  medium: z.string().min(1),

  studentGender: z.enum(["male", "female"]).optional(),
  tutorGender: z.enum(["male", "female", "any"]).optional(),

  salary: z.string().min(1),
  days: z.string().min(1),
  duration: z.string().min(1),

  division: z.string().min(1),
  district: z.string().min(1),
  location: z.string().min(1),
  preferredArea: z.string().min(1),

  tutorDescription: z.string().min(10).optional(),
  locationDescription: z.string().min(10).optional(),

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
  "Class 11",
  "Class 12",
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

/* ---------------- COMPONENT ---------------- */

export default function HireTutorForm() {
  const [step, setStep] = useState(1);
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
      setStep(1);
    } catch (error) {
      Swal.fire("Error", "Failed to post job", "error");
    }

    setLoading(false);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      {/* progress */}

      <div className="flex justify-between mb-8 text-sm font-medium">
        <span className={step === 1 ? "text-green-600" : "text-gray-400"}>
          1 Student
        </span>
        <span className={step === 2 ? "text-green-600" : "text-gray-400"}>
          2 Tutor Requirement
        </span>
        <span className={step === 3 ? "text-green-600" : "text-gray-400"}>
          3 Location
        </span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 text-gray-700"
      >
        {/* STEP 1 */}

        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-semibold mb-4">Student Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label>Class*</label>
                <select
                  {...register("class")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                >
                  <option value="">Select Class</option>
                  {classes.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Medium*</label>
                <select
                  {...register("medium")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                >
                  <option value="">Select Medium</option>
                  {media.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Phone (Optional)</label>
                <input
                  {...register("phone")}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                />
              </div>

              <div>
                <label>Student Gender (Optional)</label>
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

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-semibold mb-4">Tutor Requirement</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label>Tutor Gender (Optional)</label>
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
                <label>Salary*</label>
                <select
                  {...register("salary")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                >
                  <option value="">Select Salary</option>
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
                  <option>Negotiable</option>
                </select>
              </div>

              <div>
                <label>Days per Week*</label>
                <select
                  {...register("days")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                >
                  <option value="">Select Days</option>
                  {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Duration*</label>
                <select
                  {...register("duration")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                >
                  <option value="">Select Duration</option>
                  <option>1 Hour</option>
                  <option>1.5 Hours</option>
                  <option>2 Hours</option>
                  <option>2.5 Hours</option>
                  <option>3 Hours</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label>Tutor Description (Optional)</label>
                <textarea
                  {...register("tutorDescription")}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                />
              </div>
            </div>

            {/* SUBJECTS */}

            <div className="mt-6">
              <label className="block mb-2">Subjects</label>

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
            </div>

            <div className="flex justify-between mt-6">
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
            </div>
          </motion.div>
        )}

        {/* STEP 3 */}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-semibold mb-4">Location</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label>Division*</label>
                <select
                  {...register("division")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                >
                  <option value="">Select Division</option>
                  {Object.entries(locationData).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>District*</label>
                <select
                  {...register("district")}
                  disabled={!divisionValue}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                >
                  <option value="">Select District</option>
                  {getDistricts().map((d) => (
                    <option key={d.key} value={d.key}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Location*</label>
                <select
                  {...register("location")}
                  disabled={!districtValue}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                >
                  <option value="">Select Location</option>
                  {getLocalities().map((loc) => (
                    <option key={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Preferred Area*</label>
                <select
                  {...register("preferredArea")}
                  disabled={!districtValue}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                >
                  <option value="">Select Area</option>
                  {getLocalities().map((loc) => (
                    <option key={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label>Location Description (Optional)</label>
              <textarea
                {...register("locationDescription")}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
              >
                {loading ? "Posting..." : "Post Job"}
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}
