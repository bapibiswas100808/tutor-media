import { Metadata } from "next";
import TutorHubPage from "./TutorHubClient";
import { Tutor } from "@/data/tutorsList";

export const metadata: Metadata = {
  title: "Tutor Hub - Tutor Media",
  description:
    "Explore our expert tutors and find the perfect match for your learning needs.",
};

export const dynamic = "force-dynamic";

export default async function TutorHubsPage() {
  let tutorHubs: Tutor[] = [];

  try {
    const res = await fetch(
      "https://pro-assignment-twelve-server.vercel.app/allTutors",
      {
        cache: "no-store",
      }
    );

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
