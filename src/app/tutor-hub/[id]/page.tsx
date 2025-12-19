import { Metadata } from "next";
import { Tutor } from "@/data/tutorsList";
import TutorProfilePage from "./TutorDetailsClient";

export const metadata: Metadata = {
  title: "Tutor Profile - Tutor Media",
  description: "View detailed tutor profile and book a session.",
};  



const getTutorById = async (id: string): Promise<Tutor | null> => {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  try {
    // First, fetch all tutors to find the one matching the ID
    const res = await fetch(`${strapiUrl}/api/tutor-hubs?populate=*`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`Failed to fetch tutors: ${res.status}`);
      return null;
    }
    const { data } = await res.json();
    // Find tutor by id or documentId
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tutor = data.find((t: Tutor) => t.id.toString() === id || (t as any).documentId === id);
    console.log("Fetched tutor data:", tutor);
    return tutor || null;
  } catch (error) {
    console.error("Tutor fetch error:", error);
    return null;
  }
};

export default async function TutorHubsPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const tutor = await getTutorById(id);

  console.log("Tutor Data:", tutor);
  return (
    <div className="min-h-screen bg-gray-50">   
      <TutorProfilePage tutor={tutor} />
    </div>
  );
}