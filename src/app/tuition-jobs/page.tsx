import { Metadata } from "next";
import TuitionJobClient from "./TuitionJobClient";

export const metadata: Metadata = {
  title: "Tuition Jobs - Tutor Media",
  description:
    "Browse the latest tuition job listings and find the perfect tutoring opportunity.",
};

export interface TuitionJob {
  id: number;
  title: string;
  subject: string;
  class: string;
  location: string;
  budget: string;
  mode: string;
  studentName: string;
  description: string;
  requirements: string[];
  schedule: string;
  postedDate: string;
  applicants: number;
  status: "active" | "closed" | "filled";
  urgency?: "urgent" | "normal";
  gender?: "male" | "female" | "any";
  studentGender?: "male" | "female";
  days: string[];
  duration: string;
  startDate?: string;
  division: string;
  medium:
    | "banglaMedium"
    | "englishMedium"
    | "englishVersion"
    | "madrasahBackground";
}

export default async function TuitionJobsPage() {
  const res = await fetch(
    "https://pro-assignment-twelve-server.vercel.app/allJobs",
    {
      cache: "no-store",
    }
  );
  const tests = await res.json();

  console.log("Tuition Jobs Data:", tests);
  return (
    <div className="min-h-screen bg-gray-50">
      <TuitionJobClient tuitionJobs={tests} />
    </div>
  );
}
