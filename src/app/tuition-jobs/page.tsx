import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuition Jobs - Find Teaching Opportunities",
  description: "Browse available tuition jobs and apply to teach students",
};

export default function TuitionJobsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Available Tuition Jobs
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Mock job cards */}
          {[1, 2, 3, 4, 5, 6].map((job) => (
            <div key={job} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-black">
                Mathematics Tutor Needed
              </h3>
              <p className="text-gray-600 mb-2">Class: Grade 10</p>
              <p className="text-gray-600 mb-2">Location: Dhaka</p>
              <p className="text-gray-600 mb-2">
                Budget: 8,000 - 12,000 BDT/month
              </p>
              <p className="text-gray-600 mb-4">Mode: Home Tutoring</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
