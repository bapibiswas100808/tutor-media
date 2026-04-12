import { Metadata } from "next";
import TutorHubPage from "./TutorHubClient";
import { Tutor } from "@/data/tutorsList";

export const metadata: Metadata = {
  title: "Tutor Hub - Tutor Media",
  description:
    "Explore our expert tutors and find the perfect match for your learning needs.",
};

// Revalidate every 5 minutes — serves cached page instantly, refreshes in background
export const revalidate = 300;

export default async function TutorHubsPage() {
  let tutorHubs: Tutor[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allTutors`, {
      next: { revalidate: 300 },
    });

    if (res.ok) {
      const data = await res.json();
      tutorHubs = Array.isArray(data) ? data : [];
    } else {
      console.error("Fetch failed:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Backend not available:", error);
    tutorHubs = [];
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TutorHubPage tutorHubs={tutorHubs} />
    </div>
  );
}
