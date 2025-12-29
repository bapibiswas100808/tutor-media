import { Metadata } from "next";
import TuitionJobClient from "./TuitionJobClient";
import { TuitionJob } from "@/data/tuitionJobsList";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tuition Jobs - Tutor Media",
  description:
    "Browse the latest tuition job listings and find the perfect tutoring opportunity.",
};

export default async function TuitionJobsPage() {
  let tests: TuitionJob[] = [];

  try {
    const res = await fetch(
      "https://pro-assignment-twelve-server.vercel.app/allJobs",
      {
        cache: "no-store",
      }
    );

    if (res.ok) {
      const data = await res.json();
      tests = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error("Backend not available:", error);
    tests = []; // fallback
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TuitionJobClient tuitionJobs={tests} />
    </div>
  );
}
