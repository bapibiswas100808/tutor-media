import { Metadata } from "next";
import {
  Banner,
  TuitionTypes,
  Services,
  FlowChartStudent,
  FlowChartTutor,
  BecomeTutorCTA,
  WhyChooseUs,
  FindTutorSection,
} from "@/components/homepage";

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
  subHeading: "Hire the Right Tutor or Get Tuition in Your Area.",
};


export default async function Home() {
  // const bannerData = await getBannerData();
  return (
    <main>
      <Banner bannerData={bannerData} />
      <TuitionTypes />
      <Services />
      <FlowChartStudent />
      <FindTutorSection />
      <FlowChartTutor />
      <BecomeTutorCTA />
      <WhyChooseUs />
    </main>
  );
}
