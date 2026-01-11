import { Metadata } from "next";
import BecomeTutorForm from "@/components/forms/BecomeTutorForm";

export const metadata: Metadata = {
  title: "Become a Tutor - Tutor Media",
  description: "Join our platform as a tutor and start teaching students",
};

export default function BecomeTutorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Become a Mentor
            </h1>
            <p className="text-lg text-gray-600">
              Apply to become a tutor on our platform and start earning by
              teaching students.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <BecomeTutorForm />
          </div>
        </div>
      </div>
    </div>
  );
}
