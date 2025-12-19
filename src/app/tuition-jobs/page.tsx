import { Metadata } from "next";
import TuitionJobClient from "./TuitionJobClient";

export const metadata: Metadata = {
  title: "Tuition Jobs - Tutor Media",
  description: "Browse the latest tuition job listings and find the perfect tutoring opportunity.",
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
  medium: "banglaMedium" | "englishMedium" | "englishVersion" | "madrasahBackground";
}

const getTuitionJobs = async (): Promise<TuitionJob[]> => {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  try {
    const res = await fetch(`${strapiUrl}/api/tuition-jobs?populate=*`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch tuition jobs: ${res.status}`);
    }
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Tuition jobs fetch error:", error);
    return [];
  }
};

export default async function TuitionJobsPage() {

  const tuitionJobs = await getTuitionJobs();

  console.log("Tuition Jobs Data:", tuitionJobs);
  return (
    <div className="min-h-screen bg-gray-50">   
      <TuitionJobClient tuitionJobs={tuitionJobs} />
    </div>
  );
}