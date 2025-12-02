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

export default function Home() {
  return (
    <main>
      <Banner />
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
