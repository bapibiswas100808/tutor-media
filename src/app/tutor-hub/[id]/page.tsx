import { Metadata } from "next";
import { Tutor } from "@/data/tutorsList";
import TutorProfilePage from "./TutorDetailsClient";

export const metadata: Metadata = {
  title: "Tutor Profile - Tutor Media",
  description: "View detailed tutor profile and book a session.",
};

export default async function TutorHubsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(`Fetching tutor id: ${id}`);

  // Default to null (shows friendly not-found UI client-side)
  let tutor: Tutor | null = null;

  try {
    const res = await fetch(`http://localhost:5000/allTutors/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`Tutor not found (status ${res.status}) for id ${id}`);
    } else {
      const text = await res.text();
      if (!text || !text.trim()) {
        console.warn(`Empty response body for tutor id ${id}`);
      } else {
        try {
          tutor = JSON.parse(text) as Tutor;
        } catch (err) {
          console.error(`Invalid JSON for tutor id ${id}:`, err);
        }
      }
    }
  } catch (err) {
    console.error(`Network or fetch error while fetching tutor id ${id}:`, err);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TutorProfilePage tutor={tutor} />
    </div>
  );
}
