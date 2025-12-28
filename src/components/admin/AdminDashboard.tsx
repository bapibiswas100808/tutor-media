"use client";

import React, { useEffect, useMemo, useState } from "react";

import { Tutor } from "@/data/tutorsList";
import { TuitionJob } from "@/data/tuitionJobsList";
import { Application } from "@/lib/applications";

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

  async function toggleField(
    type: "tutor" | "job",
    id: number | string,
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
      const res = await fetch(
        `/api/admin/${type === "tutor" ? "tutors" : "tuition-jobs"}/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ [field]: value }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Failed to update");
      }

      // can use returned updated object if needed
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
                      <th className="px-3 py-2">Subjects</th>
                      <th className="px-3 py-2">Location</th>
                      <th className="px-3 py-2">Verified</th>
                      <th className="px-3 py-2">Approved</th>
                      <th className="px-3 py-2">Premium</th>
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
                          <td className="px-3 py-2">
                            {t.subjects?.join(", ")}
                          </td>
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
                                  "isVerified",
                                  e.target.checked
                                )
                              }
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
                                  "isApproved",
                                  e.target.checked
                                )
                              }
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
                                  "isPremium",
                                  e.target.checked
                                )
                              }
                            />
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
                                  "isApproved",
                                  e.target.checked
                                )
                              }
                            />
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
    </div>
  );
}
