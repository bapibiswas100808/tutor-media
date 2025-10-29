import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutor Hub - Find Qualified Tutors",
  description: "Browse and connect with verified tutors for all subjects",
};

export default function TutorHubPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Tutor Hub
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Mock tutor cards */}
          {[1, 2, 3, 4, 5, 6].map((tutor) => (
            <div key={tutor} className="bg-white rounded-lg shadow-md p-6">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-center mb-2 text-black">
                John Doe
              </h3>
              <p className="text-gray-600 text-center mb-2">
                Mathematics Expert
              </p>
              <p className="text-gray-600 text-center mb-2">
                5+ years experience
              </p>
              <p className="text-gray-600 text-center mb-4">
                Online & Home Tutoring
              </p>
              <div className="flex gap-2 justify-center mb-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                  Math
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
                  Physics
                </span>
              </div>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                Contact Tutor
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
