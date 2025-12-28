import AdminDashboard from "@/components/admin/AdminDashboard";
import { TuitionJob } from "@/data/tuitionJobsList";
import { Tutor } from "@/data/tutorsList";
import { Application } from "@/lib/applications";

export const metadata = {
  title: "Admin Dashboard | Tutor Media",
};

export default async function AdminDashboardPage() {
  let tutorHubs: Tutor[] = [];

  try {
    const res = await fetch("http://localhost:5000/allTutors", {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      tutorHubs = Array.isArray(data) ? data : [];
    } else {
      console.error("Fetch failed:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Backend not available:", error);
    tutorHubs = [];
  }

  let tuituionJobs: TuitionJob[] = [];

  try {
    const res = await fetch("http://localhost:5000/allJobs", {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      tuituionJobs = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error("Backend not available:", error);
    tuituionJobs = []; // fallback
  }

  let applications: Application[] = [];
  try {
    const res = await fetch("http://localhost:5000/applications", {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      applications = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    applications = [];
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <AdminDashboard
          tutors={tutorHubs}
          jobs={tuituionJobs}
          applications={applications}
        />
      </div>
    </main>
  );
}
