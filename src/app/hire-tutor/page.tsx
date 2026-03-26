import { Metadata } from "next";
import HireTutorForm from "@/components/forms/HireTutorForm";

export const metadata: Metadata = {
  title: "Hire a Tutor - Tutor Media",
  description:
    "Post your tuition requirements and connect with qualified tutors",
};

export default function HireTutorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Hire a Mentor
            </h1>
            <p className="text-lg text-gray-600">
              Fill out this form to post your tuition requirements and connect
              with qualified tutors.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md">
            <HireTutorForm />
          </div>
        </div>
      </div>
    </div>
  );
}
