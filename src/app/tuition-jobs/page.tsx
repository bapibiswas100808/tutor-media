import { Metadata } from "next";
import TuitionJobClient from "./TuitionJobClient";
import { TuitionJob } from "@/data/tuitionJobsList";

// Revalidate every 5 minutes — serves cached page instantly, refreshes in background
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Tuition Jobs - Tutor Media",
  description:
    "Browse the latest tuition job listings and find the perfect tutoring opportunity.",
};

export default async function TuitionJobsPage() {
  let tests: TuitionJob[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allJobs`, {
      next: { revalidate: 300 },
    });

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
