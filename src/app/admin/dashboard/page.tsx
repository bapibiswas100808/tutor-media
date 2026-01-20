import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminProtected from "@/components/admin/AdminProtected";
import { TuitionJob } from "@/data/tuitionJobsList";
import { Tutor } from "@/data/tutorsList";
import { Application } from "@/lib/applications";

export const metadata = {
  title: "Admin Dashboard | Tutor Media",
};

export default async function AdminDashboardPage() {
  let tutorHubs: Tutor[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allTutors`, {
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

  let tuitionJobs: TuitionJob[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allJobs`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      tuitionJobs = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error("Backend not available:", error);
    tuitionJobs = []; // fallback
  }

  let applications: Application[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      applications = Array.isArray(data) ? data : data?.data ? data.data : [];
    } else {
      console.error(
        "Failed to fetch applications - Status:",
        res.status,
        res.statusText
      );
    }
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    applications = [];
  }

  return (
    <AdminProtected>
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="container mx-auto">
          <AdminDashboard
            tutors={tutorHubs}
            jobs={tuitionJobs.map((job) => ({ ...job, _id: String(job._id) }))}
            applications={applications}
          />
        </div>
      </main>
    </AdminProtected>
  );
}
