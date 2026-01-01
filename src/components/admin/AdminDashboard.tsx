"use client";

import React, { useEffect, useMemo, useState } from "react";

import { Tutor } from "@/data/tutorsList";
// import { TuitionJob } from "@/data/tuitionJobsList";
import { Application } from "@/lib/applications";
export interface TuitionJob {
  id: number;
  _id: string | number;
  title: string;
  subject: string;
  location: string;
  budget: string;
  isApproved?: boolean;
  isDeleted?: boolean;
}

export default function AdminDashboard({
  tutors: initialTutors,
  jobs: initialJobs,
  applications: initialApplications,
}: {
  tutors: Tutor[];
  jobs: TuitionJob[];
  applications?: Application[];
}) {
  const [view, setView] = useState<"tutors" | "jobs" | "applications">(
    "tutors"
  );
  const [tutors, setTutors] = useState<Tutor[]>(initialTutors || []);
  const [jobs, setJobs] = useState<TuitionJob[]>(initialJobs || []);
  const [applications, setApplications] = useState<Application[]>(
    initialApplications || []
  );
  const [tutorEmailQuery, setTutorEmailQuery] = useState<string>("");
  const [jobTitleQuery, setJobTitleQuery] = useState<string>("");

  const PAGE_SIZE = 10;
  const [tutorPage, setTutorPage] = useState<number>(1);
  const [jobPage, setJobPage] = useState<number>(1);
  const [applicationsPage, setApplicationsPage] = useState<number>(1);

  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Tutor>>({});

  //   useEffect(() => {
  //     const userJson = localStorage.getItem("user");
  //     const token = localStorage.getItem("token");
  //     if (!userJson || !token) {
  //       router.push("/login");
  //       return;
  //     }
  //     const user = JSON.parse(userJson);
  //     if (user.role !== "admin") {
  //       router.push("/");
  //     }
  //   }, [router]);

  useEffect(() => {
    setTutors(initialTutors || []);
    setJobs(initialJobs || []);
    setApplications(initialApplications || []);
  }, [initialTutors, initialJobs, initialApplications]);

  const counts = useMemo(
    () => ({
      tutors: tutors.length,
      jobs: jobs.length,
      applications: applications.length,
    }),
    [tutors, jobs, applications]
  );

  const filteredTutors = useMemo(() => {
    const q = tutorEmailQuery.trim().toLowerCase();
    return q
      ? tutors.filter((t) => (t.email ?? "").toLowerCase().includes(q))
      : tutors;
  }, [tutors, tutorEmailQuery]);

  const filteredJobs = useMemo(() => {
    const q = jobTitleQuery.trim().toLowerCase();
    return q
      ? jobs.filter((j) => (j.title ?? "").toLowerCase().includes(q))
      : jobs;
  }, [jobs, jobTitleQuery]);

  const tutorTotalPages = Math.max(
    1,
    Math.ceil(filteredTutors.length / PAGE_SIZE)
  );
  const jobTotalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const applicationsTotalPages = Math.max(
    1,
    Math.ceil(applications.length / PAGE_SIZE)
  );

  const currentTutorItems = filteredTutors.slice(
    (tutorPage - 1) * PAGE_SIZE,
    tutorPage * PAGE_SIZE
  );
  const currentJobItems = filteredJobs.slice(
    (jobPage - 1) * PAGE_SIZE,
    jobPage * PAGE_SIZE
  );
  const currentApplicationItems = applications.slice(
    (applicationsPage - 1) * PAGE_SIZE,
    applicationsPage * PAGE_SIZE
  );

  useEffect(() => {
    if (tutorPage > tutorTotalPages) setTutorPage(tutorTotalPages);
  }, [tutorTotalPages, tutorPage]);

  useEffect(() => {
    if (jobPage > jobTotalPages) setJobPage(jobTotalPages);
  }, [jobTotalPages, jobPage]);

  useEffect(() => {
    if (applicationsPage > applicationsTotalPages)
      setApplicationsPage(applicationsTotalPages);
  }, [applicationsTotalPages, applicationsPage]);

  useEffect(() => setTutorPage(1), [tutorEmailQuery]);
  useEffect(() => setJobPage(1), [jobTitleQuery]);

  const BACKEND_BASE =
    process.env.NEXT_PUBLIC_API_BASE ||
    "https://pro-assignment-twelve-server.vercel.app";

  async function toggleField(
    type: "tutor" | "job",
    id: number | string,
    mongoId: string | undefined,
    field: "isVerified" | "isApproved" | "isPremium",
    value: boolean
  ) {
    const key = `${type}-${id}`;
    setLoadingMap((s) => ({ ...s, [key]: true }));
    setError(null);

    // optimistic update
    if (type === "tutor") {
      setTutors((prev) =>
        prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
      );
    } else {
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, [field]: value } : j))
      );
    }

    try {
      const token = localStorage.getItem("token");

      let url = "";
      if (type === "tutor") {
        if (field === "isVerified")
          url = `${BACKEND_BASE}/allTutors/isVerified/${mongoId}`;
        else if (field === "isApproved")
          url = `${BACKEND_BASE}/allTutors/isApproved/${mongoId}`;
        else if (field === "isPremium")
          url = `${BACKEND_BASE}/allTutors/isPremium/${mongoId}`;
      } else {
        if (field === "isApproved")
          url = `${BACKEND_BASE}/allJobs/isApproved/${mongoId}`;
      }

      if (!url) throw new Error("Unsupported operation");

      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (!res.ok) {
        // try parse error body
        let errMessage = "Failed to update";
        try {
          const body = await res.json();
          errMessage = body?.message || body?.error || errMessage;
        } catch {
          // ignore
        }
        throw new Error(errMessage);
      }

      // optionally, could refresh resource or use returned payload
    } catch (err: unknown) {
      // revert optimistic update
      if (type === "tutor") {
        setTutors((prev) =>
          prev.map((t) => (t.id === id ? { ...t, [field]: !value } : t))
        );
      } else {
        setJobs((prev) =>
          prev.map((j) => (j.id === id ? { ...j, [field]: !value } : j))
        );
      }

      let message = "Update failed";
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "string") {
        message = err;
      } else {
        try {
          message = JSON.stringify(err);
        } catch {
          // leave default
        }
      }

      setError(message);
    } finally {
      setLoadingMap((s) => ({ ...s, [key]: false }));
    }
  }

  // Update handlers
  const handleUpdate = async (
    type: "job" | "tutor" | "application",
    id: string | number
  ) => {
    const job = jobs.find((j) => j.id === id || j._id === id);
    if (!job) return;

    const newTitle = window.prompt("Enter new title", job.title);
    if (!newTitle || newTitle === job.title) return;

    try {
      const res = await fetch(`${API_BASE}/tuitionJobs/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();

      // ✅ Update local state
      setJobs((prev) =>
        prev.map((j) =>
          j.id === id || j._id === id ? { ...j, title: data.title } : j
        )
      );

      alert("Updated successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  // Delete handlers
  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://pro-assignment-twelve-server.vercel.app";

  const handleDelete = async (
    type: "tutor" | "job" | "application",
    id: number | string
  ) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;

    let endpoint = "";

    if (type === "tutor") {
      endpoint = `${API_BASE}/allTutors/delete/${id}`;
    } else if (type === "job") {
      endpoint = `${API_BASE}/tuitionJobs/delete/${id}`;
    } else {
      endpoint = `${API_BASE}/applications/delete/${id}`;
    }

    const res = await fetch(endpoint, { method: "PATCH" });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    // ✅ REMOVE FROM UI
    if (type === "tutor") {
      setTutors((prev) =>
        prev.filter((t) => String(t.id ?? t._id) !== String(id))
      );
    }

    if (type === "job") {
      setJobs((prev) =>
        prev.filter((j) => String(j.id ?? j._id) !== String(id))
      );
    }

    if (type === "application") {
      setApplications((prev) =>
        prev.filter((a) => String(a.id ?? a._id) !== String(id))
      );
    }

    alert("Deleted successfully");
  };

  return (
    <div className="p-6 bg-white text-gray-600">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <div className="flex gap-6">
        <aside className="w-64 bg-white border rounded p-4">
          <nav className="space-y-2">
            <button
              className={`w-full text-left px-3 py-2 rounded ${
                view === "tutors"
                  ? "bg-blue-50 border-l-4 border-blue-600"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setView("tutors")}
            >
              Tutors ({counts.tutors})
            </button>

            <button
              className={`w-full text-left px-3 py-2 rounded ${
                view === "jobs"
                  ? "bg-blue-50 border-l-4 border-blue-600"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setView("jobs")}
            >
              Tuition Jobs ({counts.jobs})
            </button>

            <button
              className={`w-full text-left px-3 py-2 rounded ${
                view === "applications"
                  ? "bg-blue-50 border-l-4 border-blue-600"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setView("applications")}
            >
              Applications ({counts.applications})
            </button>
          </nav>
        </aside>

        <section className="flex-1">
          {view === "tutors" ? (
            // Tutors
            <div className="bg-white border rounded p-4">
              <h2 className="text-lg font-medium mb-2">Tutors</h2>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">
                  {filteredTutors.length === 0 ? (
                    <>Showing 0 of 0</>
                  ) : (
                    <>
                      Showing {(tutorPage - 1) * PAGE_SIZE + 1} -{" "}
                      {Math.min(tutorPage * PAGE_SIZE, filteredTutors.length)}{" "}
                      of {filteredTutors.length}
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="search"
                    value={tutorEmailQuery}
                    onChange={(e) => setTutorEmailQuery(e.target.value)}
                    placeholder="Search by email"
                    className="border rounded px-3 py-2 text-sm w-72"
                  />
                  {tutorEmailQuery && (
                    <button
                      className="text-sm text-gray-600 hover:text-gray-800"
                      onClick={() => setTutorEmailQuery("")}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Email</th>
                      {/* <th className="px-3 py-2">Subjects</th> */}
                      <th className="px-3 py-2">Location</th>
                      <th className="px-3 py-2">Verified</th>
                      <th className="px-3 py-2">Approved</th>
                      <th className="px-3 py-2">Premium</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTutorItems.length === 0 ? (
                      <tr className="border-t">
                        <td className="px-3 py-2" colSpan={7}>
                          No tutors found
                        </td>
                      </tr>
                    ) : (
                      currentTutorItems.map((t) => (
                        <tr key={t.id} className="border-t">
                          <td className="px-3 py-2">{t.fullName}</td>
                          <td className="px-3 py-2">{t.email}</td>
                          {/* <td className="px-3 py-2">
                            {t.subjects?.join(", ")}
                          </td> */}
                          <td className="px-3 py-2">{t.location}</td>
                          <td className="px-3 py-2">
                            <input
                              type="checkbox"
                              checked={!!t.isVerified}
                              disabled={!!loadingMap[`tutor-${t.id}`]}
                              onChange={(e) =>
                                toggleField(
                                  "tutor",
                                  t.id,
                                  t._id,
                                  "isVerified",
                                  e.target.checked
                                )
                              }
                              title="Toggle verified status"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="checkbox"
                              checked={!!t.isApproved}
                              disabled={!!loadingMap[`tutor-${t.id}`]}
                              onChange={(e) =>
                                toggleField(
                                  "tutor",
                                  t.id,
                                  t._id,
                                  "isApproved",
                                  e.target.checked
                                )
                              }
                              title="Toggle approved status"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="checkbox"
                              checked={!!t.isPremium}
                              disabled={!!loadingMap[`tutor-${t.id}`]}
                              onChange={(e) =>
                                toggleField(
                                  "tutor",
                                  t.id,
                                  t._id,
                                  "isPremium",
                                  e.target.checked
                                )
                              }
                              title="Toggle premium status"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingTutor(t);
                                  setEditFormData(t);
                                }}
                                className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={async () => {
                                  try {
                                    const confirmed = window.confirm(
                                      `Are you sure you want to ${
                                        t.isDeleted ? "restore" : "delete"
                                      } this tutor?`
                                    );
                                    if (!confirmed) return;

                                    const endpoint = t.isDeleted
                                      ? `${API_BASE}/allTutors/restore/${t.id}`
                                      : `${API_BASE}/allTutors/delete/${t.id}`;

                                    const res = await fetch(endpoint, {
                                      method: "PATCH",
                                    });
                                    if (!res.ok) {
                                      const text = await res.text();
                                      throw new Error(text);
                                    }

                                    // const data = await res.json();

                                    // Update local state
                                    setTutors((prev) =>
                                      prev.map((u) =>
                                        u.id === t.id || u._id === t._id
                                          ? { ...u, isDeleted: !t.isDeleted }
                                          : u
                                      )
                                    );

                                    alert(
                                      t.isDeleted
                                        ? "Restored successfully"
                                        : "Deleted successfully"
                                    );
                                  } catch (err: unknown) {
                                    if (err instanceof Error) {
                                      alert(err.message);
                                    } else {
                                      alert("Something went wrong");
                                    }
                                  }
                                }}
                                className={`px-2 py-1 text-xs rounded ${
                                  t.isDeleted
                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                    : "bg-red-600 hover:bg-red-700 text-white"
                                }`}
                              >
                                {t.isDeleted ? "Restore" : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="text-sm text-gray-500">
                  Page {tutorPage} of {tutorTotalPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 rounded bg-gray-100 disabled:opacity-50"
                    onClick={() => setTutorPage((p) => Math.max(1, p - 1))}
                    disabled={tutorPage === 1}
                  >
                    Prev
                  </button>
                  {Array.from({ length: tutorTotalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTutorPage(i + 1)}
                      className={`px-2 py-1 rounded ${
                        i + 1 === tutorPage
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="px-2 py-1 rounded bg-gray-100 disabled:opacity-50"
                    onClick={() =>
                      setTutorPage((p) => Math.min(tutorTotalPages, p + 1))
                    }
                    disabled={tutorPage === tutorTotalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : view === "jobs" ? (
            // Jobs
            <div className="bg-white border rounded p-4">
              <h2 className="text-lg font-medium mb-2">Tuition Jobs</h2>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">
                  Showing {filteredJobs.length} of {counts.jobs}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="search"
                    value={jobTitleQuery}
                    onChange={(e) => setJobTitleQuery(e.target.value)}
                    placeholder="Search by title"
                    className="border rounded px-3 py-2 text-sm w-72"
                  />
                  {jobTitleQuery && (
                    <button
                      className="text-sm text-gray-600 hover:text-gray-800"
                      onClick={() => setJobTitleQuery("")}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="px-3 py-2">Title</th>
                      <th className="px-3 py-2">Subject</th>
                      <th className="px-3 py-2">Location</th>
                      <th className="px-3 py-2">Budget</th>
                      <th className="px-3 py-2">Approved</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentJobItems.length === 0 ? (
                      <tr className="border-t">
                        <td className="px-3 py-2" colSpan={5}>
                          No jobs found
                        </td>
                      </tr>
                    ) : (
                      currentJobItems.map((j) => (
                        <tr key={j.id} className="border-t">
                          <td className="px-3 py-2">{j.title}</td>
                          <td className="px-3 py-2">{j.subject}</td>
                          <td className="px-3 py-2">{j.location}</td>
                          <td className="px-3 py-2">{j.budget}</td>

                          <td className="px-3 py-2">
                            <input
                              type="checkbox"
                              checked={!!j.isApproved}
                              disabled={!!loadingMap[`job-${j.id}`]}
                              onChange={(e) =>
                                toggleField(
                                  "job",
                                  j.id,
                                  String(j._id),
                                  "isApproved",
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleUpdate("job", j.id)}
                                className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                Update
                              </button>

                              <button
                                onClick={async () => {
                                  try {
                                    const confirmed = window.confirm(
                                      `Are you sure you want to ${
                                        j.isDeleted ? "restore" : "delete"
                                      } this job?`
                                    );
                                    if (!confirmed) return;

                                    const endpoint = j.isDeleted
                                      ? `${API_BASE}/allJobs/restore/${j.id}` // restore API
                                      : `${API_BASE}/allJobs/delete/${j.id}`; // delete API

                                    const res = await fetch(endpoint, {
                                      method: "PATCH",
                                    });
                                    if (!res.ok) {
                                      const text = await res.text();
                                      throw new Error(text);
                                    }

                                    // ✅ API succeeded → update local state immediately
                                    setJobs((prev) =>
                                      prev.map((job) =>
                                        job.id === j.id || job._id === j._id
                                          ? { ...job, isDeleted: !j.isDeleted } // toggle the flag
                                          : job
                                      )
                                    );

                                    alert(
                                      j.isDeleted
                                        ? "Restored successfully"
                                        : "Deleted successfully"
                                    );
                                  } catch (err: unknown) {
                                    if (err instanceof Error) {
                                      alert(err.message);
                                    } else {
                                      alert("Something went wrong");
                                    }
                                  }
                                }}
                                className={`px-2 py-1 text-xs rounded ${
                                  j.isDeleted
                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                    : "bg-red-600 hover:bg-red-700 text-white"
                                }`}
                              >
                                {j.isDeleted ? "Restore" : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="text-sm text-gray-500">
                  Page {jobPage} of {jobTotalPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 rounded bg-gray-100 disabled:opacity-50"
                    onClick={() => setJobPage((p) => Math.max(1, p - 1))}
                    disabled={jobPage === 1}
                  >
                    Prev
                  </button>
                  {Array.from({ length: jobTotalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setJobPage(i + 1)}
                      className={`px-2 py-1 rounded ${
                        i + 1 === jobPage
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="px-2 py-1 rounded bg-gray-100 disabled:opacity-50"
                    onClick={() =>
                      setJobPage((p) => Math.min(jobTotalPages, p + 1))
                    }
                    disabled={jobPage === jobTotalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Applications
            <div className="bg-white border rounded p-4">
              <h2 className="text-lg font-medium mb-4">Applications</h2>

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">
                  {applications.length === 0 ? (
                    <>Showing 0 of 0</>
                  ) : (
                    <>
                      Showing {(applicationsPage - 1) * PAGE_SIZE + 1} -{" "}
                      {Math.min(
                        applicationsPage * PAGE_SIZE,
                        applications.length
                      )}{" "}
                      of {applications.length}
                    </>
                  )}
                </div>
                <div />
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="px-3 py-2">ID</th>
                      <th className="px-3 py-2">Job</th>
                      <th className="px-3 py-2">Tutor IDs</th>
                      <th className="px-3 py-2">Rate</th>
                      <th className="px-3 py-2">Schedule</th>
                      <th className="px-3 py-2">Proposal</th>
                      <th className="px-3 py-2">Created</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentApplicationItems.length === 0 ? (
                      <tr className="border-t">
                        <td className="px-3 py-2" colSpan={7}>
                          No applications found
                        </td>
                      </tr>
                    ) : (
                      currentApplicationItems.map((a) => {
                        const job = jobs.find((j) => j.id === a.tuition_job);
                        return (
                          <tr key={a.id} className="border-t">
                            <td className="px-3 py-2">{a.id}</td>
                            <td className="px-3 py-2">
                              {job?.title ?? a.tuition_job}
                            </td>
                            <td className="px-3 py-2">
                              {a.tutor_hubs?.join(", ") ?? "-"}
                            </td>
                            <td className="px-3 py-2">{a.rate}</td>
                            <td className="px-3 py-2">{a.schedule}</td>
                            <td className="px-3 py-2">{a.proposal}</td>
                            <td className="px-3 py-2">
                              {new Date(a.createdAt).toLocaleString()}
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    handleUpdate("application", a.id)
                                  }
                                  className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                  View
                                </button>

                                <button
                                  onClick={() =>
                                    handleDelete("application", a.id)
                                  }
                                  className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="text-sm text-gray-500">
                  Page {applicationsPage} of {applicationsTotalPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 rounded bg-gray-100 disabled:opacity-50"
                    onClick={() =>
                      setApplicationsPage((p) => Math.max(1, p - 1))
                    }
                    disabled={applicationsPage === 1}
                  >
                    Prev
                  </button>
                  {Array.from({ length: applicationsTotalPages }).map(
                    (_, i) => (
                      <button
                        key={i}
                        onClick={() => setApplicationsPage(i + 1)}
                        className={`px-2 py-1 rounded ${
                          i + 1 === applicationsPage
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    )
                  )}
                  <button
                    className="px-2 py-1 rounded bg-gray-100 disabled:opacity-50"
                    onClick={() =>
                      setApplicationsPage((p) =>
                        Math.min(applicationsTotalPages, p + 1)
                      )
                    }
                    disabled={applicationsPage === applicationsTotalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Edit Tutor Modal */}
      {editingTutor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-full overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Edit Tutor</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.fullName || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editFormData.email || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editFormData.phone || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={editFormData.gender || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        gender: e.target.value as "male" | "female" | "other",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Division
                  </label>
                  <input
                    type="text"
                    value={editFormData.division || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        division: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editFormData.location || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        location: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={editFormData.qualification || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        qualification: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={editFormData.experience || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        experience: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={editFormData.bio || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, bio: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("token");

                      // Filter out immutable fields
                      const {
                        _id,
                        id,
                        createdAt,
                        updatedAt,
                        verifiedAt,
                        approvedAt,
                        premiumAt,
                        role,
                        ...updateData
                      } = editFormData;

                      const res = await fetch(
                        `${API_BASE}/allTutors/update/${editingTutor.id}`,
                        {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(updateData),
                        }
                      );

                      if (!res.ok) {
                        const errData = await res.json();
                        throw new Error(
                          errData.message || "Failed to update tutor"
                        );
                      }

                      const updatedData = await res.json();

                      // Update local state
                      setTutors((prev) =>
                        prev.map((t) =>
                          t.id === editingTutor.id || t._id === editingTutor._id
                            ? { ...t, ...editFormData }
                            : t
                        )
                      );

                      setEditingTutor(null);
                      alert("Tutor updated successfully");
                    } catch (err: unknown) {
                      const message =
                        err instanceof Error
                          ? err.message
                          : "Something went wrong";
                      alert(message);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingTutor(null)}
                  className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
