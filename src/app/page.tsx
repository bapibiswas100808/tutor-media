import { Metadata } from "next";
import {
  Banner,
  TuitionTypes,
  Services,
  FlowChartStudent,
  FlowChartTutor,
  BecomeTutorCTA,
  WhyChooseUs,
} from "@/components/homepage";
import FindTutorSection2 from "@/components/homepage/FindTutorSection2";

export const metadata: Metadata = {
  title: "Tutor Media - Connect Students with Perfect Tutors",
  description:
    "Find qualified tutors for home, online, and group tutoring. Connect with experienced educators across all subjects in Bangladesh.",
  keywords:
    "tutoring, education, tutor, student, learning, Bangladesh, online tutoring, home tutoring",
};

interface BannerData {
  heading: string;
  subHeading: string;
}
const bannerData: BannerData = {
  heading: "Connecting Learners With Verified Tutors!",
  subHeading: "Hire the right tutor or get tuition in your area.",
};

// async function getBannerData(): Promise<BannerData> {
//    const strapiUrl =
//     process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
//   try {
//     const res = await fetch(
//       `${strapiUrl}/api/banner?populate=*`,
//       {
//         cache: "no-store", // Remove cache for real-time updates
//       }
//     );

//     if (!res.ok) {
//       throw new Error(`Failed to fetch banner: ${res.status}`);
//     }

//     const { data } = await res.json();

//     return {
//       heading: data.heading || "Connecting Learners With Verified Tutors.",
//       subHeading: data.subHeading || "Hire the Right Tutor or get Tuition in your Area.",
//     };
//   } catch (error) {
//     console.error("Banner fetch error:", error);
//     // Return fallback data
//     return {
//       heading: "Connecting Learners With Verified Tutors.",
//       subHeading: "Hire the Right Tutor or get Tuition in your Area.",
//     };
//   }
// }

export default async function Home() {
  // const bannerData = await getBannerData();
  return (
    <main>
      <Banner bannerData={bannerData} />
      <TuitionTypes />
      <Services />
      <FlowChartStudent />
      {/* <FindTutorSection /> */}
      <FindTutorSection2 />
      <FlowChartTutor />
      <BecomeTutorCTA />
      <WhyChooseUs />
    </main>
  );
}
