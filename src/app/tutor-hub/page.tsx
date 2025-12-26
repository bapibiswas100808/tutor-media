import { Metadata } from "next";
// import { Tutor } from "@/data/tutorsList";
import TutorHubPage from "./TutorHubClient";

export const metadata: Metadata = {
  title: "Tutor Hub - Tutor Media",
  description:
    "Explore our expert tutors and find the perfect match for your learning needs.",
};

// const getTutorHubs = async (): Promise<Tutor[]> => {
//   const strapiUrl =
//     process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
//   try {
//     const res = await fetch(`${strapiUrl}/api/tutor-hubs?populate=*`, {
//       cache: "no-store",
//     });
//     if (!res.ok) {
//       throw new Error(`Failed to fetch tuition jobs: ${res.status}`);
//     }
//     const { data } = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Tutor hubs fetch error:", error);
//     return [];
//   }
// };

export default async function TutorHubsPage() {
  const res = await fetch(
    "https://pro-assignment-twelve-server.vercel.app/allTutors",
    {
      cache: "no-store",
    }
  );
  const tutorHubs = await res.json();

  console.log("Tutor Hubs Data:", tutorHubs);
  return (
    <div className="min-h-screen bg-gray-50">
      <TutorHubPage tutorHubs={tutorHubs} />
    </div>
  );
}
