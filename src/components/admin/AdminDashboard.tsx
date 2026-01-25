"use client";

import React, { useEffect, useMemo, useState } from "react";

import { Tutor } from "@/data/tutorsList";
import { Application } from "@/lib/applications";
import Swal from "sweetalert2";
import Link from "next/link";
export interface BkashPayment {
  _id?: string;
  studentId?: string;
  tutorId?: string;
  trxId?: string;
  transactionId?: string;
  plan?: string;
  amount?: number | string;
  sender?: string;
  status?: string;
  createdAt?: string;
  method?: string;
}

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
  const [view, setView] = useState<
    "tutors" | "jobs" | "applications" | "payments"
  >("tutors");
  const [tutors, setTutors] = useState<Tutor[]>(initialTutors || []);
  const [jobs, setJobs] = useState<TuitionJob[]>(initialJobs || []);
  const [applications, setApplications] = useState<Application[]>(
    initialApplications || [],
  );
  const [payments, setPayments] = useState<BkashPayment[]>([]);
  const [tutorEmailQuery, setTutorEmailQuery] = useState<string>("");
  const [tutorIdQuery, setTutorIdQuery] = useState<string>("");
  const [jobTitleQuery, setJobTitleQuery] = useState<string>("");
  const [paymentsPage, setPaymentsPage] = useState<number>(1);

  const PAGE_SIZE = 10;
  const [tutorPage, setTutorPage] = useState<number>(1);
  const [jobPage, setJobPage] = useState<number>(1);
  const [applicationsPage, setApplicationsPage] = useState<number>(1);

  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [editingJob, setEditingJob] = useState<TuitionJob | null>(null);
  const [editJobFormData, setEditJobFormData] = useState<Partial<TuitionJob>>(
    {},
  );


  // Sync initial data props
  useEffect(() => {
    setTutors(initialTutors || []);
    setJobs(initialJobs || []);
    setApplications(initialApplications || []);
  }, [initialTutors, initialJobs, initialApplications]);

  // Fetch payments
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://pro-assignment-twelve-server.vercel.app";
        const res = await fetch(`${baseUrl}/all-payments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setPayments(Array.isArray(data) ? data : data.payments || []);
        }
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };
    fetchPayments();
  }, []);

  const counts = useMemo(
    () => ({
      tutors: tutors.length,
      jobs: jobs.length,
      applications: applications.length,
      payments: payments.length,
    }),
    [tutors, jobs, applications, payments],
  );

  const filteredTutors = useMemo(() => {
    const emailQ = tutorEmailQuery.trim().toLowerCase();
    const idQ = tutorIdQuery.trim();

    return tutors.filter((tutor) => {
      // Email match (case-insensitive)
      const emailMatch = emailQ
        ? (tutor.email ?? "").toLowerCase().includes(emailQ)
        : true;

      // Tutor ID match (numbers only)
      const idMatch = idQ ? String(tutor.id).includes(idQ) : true;

      return emailMatch && idMatch;
    });
  }, [tutors, tutorEmailQuery, tutorIdQuery]);

  const filteredJobs = useMemo(() => {
    const q = jobTitleQuery.trim().toLowerCase();
    return q
      ? jobs.filter((j) => (j.title ?? "").toLowerCase().includes(q))
      : jobs;
  }, [jobs, jobTitleQuery]);

  const tutorTotalPages = Math.max(
    1,
    Math.ceil(filteredTutors.length / PAGE_SIZE),
  );
  const jobTotalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const applicationsTotalPages = Math.max(
    1,
    Math.ceil(applications.length / PAGE_SIZE),
  );
  const paymentsTotalPages = Math.max(
    1,
    Math.ceil(payments.length / PAGE_SIZE),
  );

  const currentTutorItems = filteredTutors.slice(
    (tutorPage - 1) * PAGE_SIZE,
    tutorPage * PAGE_SIZE,
  );
  const currentJobItems = filteredJobs.slice(
    (jobPage - 1) * PAGE_SIZE,
    jobPage * PAGE_SIZE,
  );
  const currentApplicationItems = applications.slice(
    (applicationsPage - 1) * PAGE_SIZE,
    applicationsPage * PAGE_SIZE,
  );
  const currentPaymentItems = payments.slice(
    (paymentsPage - 1) * PAGE_SIZE,
    paymentsPage * PAGE_SIZE,
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

  useEffect(() => {
    if (paymentsPage > paymentsTotalPages) setPaymentsPage(paymentsTotalPages);
  }, [paymentsTotalPages, paymentsPage]);

  useEffect(() => setTutorPage(1), [tutorEmailQuery]);
  useEffect(() => setJobPage(1), [jobTitleQuery]);

  const BACKEND_BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://pro-assignment-twelve-server.vercel.app";

  async function toggleField(
    type: "tutor" | "job",
    id: number | string,
    mongoId: string | undefined,
    field: "isVerified" | "isApproved" | "isPremium",
    value: boolean,
  ) {
    const key = `${type}-${id}`;
    setLoadingMap((s) => ({ ...s, [key]: true }));
    setError(null);

    // optimistic update
    if (type === "tutor") {
      setTutors((prev) =>
        prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
      );
    } else {
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, [field]: value } : j)),
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
          prev.map((t) => (t.id === id ? { ...t, [field]: !value } : t)),
        );
      } else {
        setJobs((prev) =>
          prev.map((j) => (j.id === id ? { ...j, [field]: !value } : j)),
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


  // Toggle Application Status (Soft Delete)
  const toggleApplicationStatus = async (
    applicationId: string,
    shouldDelete: boolean,
  ) => {
    const key = `application-${applicationId}`;

    // 🔔 Confirm first
    const result = await Swal.fire({
      title: shouldDelete ? "Delete application?" : "Restore application?",
      text: shouldDelete
        ? "This application will be soft deleted."
        : "This application will be restored.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: shouldDelete ? "#dc2626" : "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: shouldDelete ? "Yes, Delete" : "Yes, Restore",
    });

    if (!result.isConfirmed) return;

    setLoadingMap((s) => ({ ...s, [key]: true }));
    setError(null);

    // ✅ Optimistic update
    setApplications((prev) =>
      prev.map((a) =>
        a._id === applicationId ? { ...a, isDeleted: shouldDelete } : a,
      ),
    );

    try {
      const res = await fetch(`${BACKEND_BASE}/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDeleted: shouldDelete }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Update failed");
      }

      // ✅ Success toast
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: shouldDelete ? "Application deleted" : "Application restored",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
    } catch (err) {
      // 🔄 Revert optimistic update
      setApplications((prev) =>
        prev.map((a) =>
          a._id === applicationId ? { ...a, isDeleted: !shouldDelete } : a,
        ),
      );

      const message = err instanceof Error ? err.message : "Update failed";

      setError(message);

      Swal.fire({
        icon: "error",
        title: "Action failed",
        text: message,
      });
    } finally {
      setLoadingMap((s) => ({ ...s, [key]: false }));
    }
  };

  // onfirm Action function
  const confirmAction = async (isDeleted: boolean) => {
    return Swal.fire({
      title: isDeleted ? "Restore tutor?" : "Delete tutor?",
      text: isDeleted
        ? "This tutor will be restored."
        : "This tutor will be soft deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: isDeleted ? "Yes, Restore" : "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: isDeleted ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6b7280",
    });
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

            <button
              className={`w-full text-left px-3 py-2 rounded ${
                view === "payments"
                  ? "bg-blue-50 border-l-4 border-blue-600"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setView("payments")}
            >
              Payments ({counts.payments})
            </button>
          </nav>
        </aside>

        <section className="flex-1">
          {view === "payments" ? (
            // Payments
            <div className="bg-white border rounded p-4">
              <h2 className="text-lg font-medium mb-2">Payments</h2>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">
                  {payments.length === 0 ? (
                    <>Showing 0 of 0</>
                  ) : (
                    <>
                      Showing {(paymentsPage - 1) * PAGE_SIZE + 1} -{" "}
                      {Math.min(paymentsPage * PAGE_SIZE, payments.length)} of{" "}
                      {payments.length}
                    </>
                  )}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      {/* <th className="px-3 py-2">Student ID</th> */}
                      <th className="px-3 py-2">Tutor ID</th>
                      <th className="px-3 py-2">Transaction ID</th>
                      <th className="px-3 py-2">Plan</th>
                      <th className="px-3 py-2">Amount</th>
                      <th className="px-3 py-2">Phone</th>
                      {/* <th className="px-3 py-2">Status</th> */}
                      <th className="px-3 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPaymentItems.length === 0 ? (
                      <tr className="border-t">
                        <td className="px-3 py-2" colSpan={8}>
                          No payments found
                        </td>
                      </tr>
                    ) : (
                      currentPaymentItems.map((p: BkashPayment) => (
                        <tr key={p._id} className="border-t">
                          {/* <td className="px-3 py-2">{p.studentId || "N/A"}</td> */}
                          <td className="px-3 py-2">{p.tutorId || "N/A"}</td>
                          <td className="px-3 py-2 font-mono text-xs">
                            {p.trxId || p.transactionId || "N/A"}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.plan || "N/A"}
                          </td>
                          <td className="px-3 py-2">৳{p.amount || "0"}</td>
                          <td className="px-3 py-2">{p.sender || "N/A"}</td>
                          {/* <td className="px-3 py-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                p.status === "verified"
                                  ? "bg-green-100 text-green-800"
                                  : p.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {p.status || "pending"}
                            </span>
                          </td> */}
                          <td className="px-3 py-2 text-xs text-gray-500">
                            {p.createdAt
                              ? new Date(p.createdAt).toLocaleDateString()
                              : "N/A"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-4">
                <button
                  disabled={paymentsPage === 1}
                  onClick={() => setPaymentsPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-2 text-sm">
                  Page {paymentsPage} of {paymentsTotalPages}
                </span>
                <button
                  disabled={paymentsPage === paymentsTotalPages}
                  onClick={() =>
                    setPaymentsPage((p) => Math.min(paymentsTotalPages, p + 1))
                  }
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          ) : view === "tutors" ? (
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

                <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-lg shadow-sm">
                  {/* Search by Email */}
                  <div className="flex items-center gap-2 border rounded px-2 py-1">
                    <input
                      type="search"
                      value={tutorEmailQuery}
                      onChange={(e) => setTutorEmailQuery(e.target.value)}
                      placeholder="Search by email"
                      className="outline-none px-2 py-1 text-sm w-72 bg-transparent"
                    />
                    {tutorEmailQuery && (
                      <button
                        type="button"
                        onClick={() => setTutorEmailQuery("")}
                        className="text-xs px-2 py-1 rounded-md text-gray-500 hover:text-white hover:bg-red-500 transition"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {/* Search by Tutor ID */}
                  <div className="flex items-center gap-2 border rounded px-2 py-1">
                    <input
                      type="search"
                      value={tutorIdQuery}
                      onChange={
                        (e) =>
                          setTutorIdQuery(e.target.value.replace(/\D/g, "")) // numbers only
                      }
                      placeholder="Search by Tutor ID"
                      className="outline-none px-2 py-1 text-sm w-40 bg-transparent"
                    />
                    {tutorIdQuery && (
                      <button
                        type="button"
                        onClick={() => setTutorIdQuery("")}
                        className="text-xs px-2 py-1 rounded-md text-gray-500 hover:text-white hover:bg-red-500 transition"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Id</th>
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
                          <td className="px-3 py-2">{t.id}</td>
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
                                  e.target.checked,
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
                                  e.target.checked,
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
                                  e.target.checked,
                                )
                              }
                              title="Toggle premium status"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex gap-2">
                              <Link
                                href={`/admin/edit-tutor/${t.id}`}
                                className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                Edit
                              </Link>

                              <button
                                onClick={async () => {
                                  try {
                                    const result = await confirmAction(
                                      t.isDeleted,
                                    );
                                    if (!result.isConfirmed) return;

                                    const endpoint = t.isDeleted
                                      ? `${BACKEND_BASE}/allTutors/restore/${t.id}`
                                      : `${BACKEND_BASE}/allTutors/delete/${t.id}`;

                                    const res = await fetch(endpoint, {
                                      method: "PATCH",
                                    });
                                    if (!res.ok) {
                                      const text = await res.text();
                                      throw new Error(text || "Action failed");
                                    }

                                    // ✅ Update local state
                                    setTutors((prev) =>
                                      prev.map((u) =>
                                        u.id === t.id || u._id === t._id
                                          ? { ...u, isDeleted: !t.isDeleted }
                                          : u,
                                      ),
                                    );

                                    // ✅ Success toast
                                    Swal.fire({
                                      toast: true,
                                      position: "top-end",
                                      icon: "success",
                                      title: t.isDeleted
                                        ? "Tutor restored"
                                        : "Tutor deleted",
                                      showConfirmButton: false,
                                      timer: 2000,
                                      timerProgressBar: true,
                                      background: "#111827",
                                      color: "#F9FAFB",
                                    });
                                  } catch (error: unknown) {
                                    Swal.fire({
                                      icon: "error",
                                      title: "Update Failed",
                                      text:
                                        error instanceof Error
                                          ? error.message
                                          : "Something went wrong",
                                    });
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
                                  e.target.checked,
                                )
                              }
                            />
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex gap-2">
                              <button
                                onClick={async () => {
                                  const result = await Swal.fire({
                                    title: "Edit Job?",
                                    text: "You are about to edit this job's details.",
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonText: "Yes, Edit",
                                    cancelButtonText: "Cancel",
                                    confirmButtonColor: "#2563eb",
                                    cancelButtonColor: "#6b7280",
                                  });

                                  if (!result.isConfirmed) return;

                                  setEditingJob(j);
                                  setEditJobFormData(j);
                                }}
                                className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                Update
                              </button>

                              <button
                                onClick={async () => {
                                  try {
                                    const result = await Swal.fire({
                                      title: j.isDeleted
                                        ? "Restore Job?"
                                        : "Delete Job?",
                                      text: j.isDeleted
                                        ? "This job will be restored."
                                        : "This job will be deleted.",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: j.isDeleted
                                        ? "#16a34a"
                                        : "#dc2626",
                                      cancelButtonColor: "#6b7280",
                                      confirmButtonText: j.isDeleted
                                        ? "Yes, Restore"
                                        : "Yes, Delete",
                                    });

                                    if (!result.isConfirmed) return;

                                    const endpoint = j.isDeleted
                                      ? `${BACKEND_BASE}/allJobs/restore/${j.id}`
                                      : `${BACKEND_BASE}/allJobs/delete/${j.id}`;

                                    const res = await fetch(endpoint, {
                                      method: "PATCH",
                                    });

                                    if (!res.ok) {
                                      const text = await res.text();
                                      throw new Error(text || "Request failed");
                                    }

                                    // ✅ Update UI immediately
                                    setJobs((prev) =>
                                      prev.map((job) =>
                                        job.id === j.id || job._id === j._id
                                          ? { ...job, isDeleted: !j.isDeleted }
                                          : job,
                                      ),
                                    );

                                    // ✅ Success toast
                                    Swal.fire({
                                      toast: true,
                                      position: "top-end",
                                      icon: "success",
                                      title: j.isDeleted
                                        ? "Restored successfully"
                                        : "Deleted successfully",
                                      showConfirmButton: false,
                                      timer: 2500,
                                      timerProgressBar: true,
                                    });
                                  } catch (err) {
                                    Swal.fire({
                                      icon: "error",
                                      title: "Action failed",
                                      text:
                                        err instanceof Error
                                          ? err.message
                                          : "Something went wrong",
                                    });
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
                        applications.length,
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
                    <tr className="text-left bg-gray-50">
                      <th className="px-3 py-2">ID</th>
                      <th className="px-3 py-2">Job Title</th>
                      <th className="px-3 py-2">Subject</th>
                      <th className="px-3 py-2">Tutor Name</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Rate</th>
                      <th className="px-3 py-2">Schedule</th>
                      <th className="px-3 py-2">Created</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentApplicationItems.length === 0 ? (
                      <tr className="border-t">
                        <td className="px-3 py-2" colSpan={10}>
                          No applications found
                        </td>
                      </tr>
                    ) : (
                      currentApplicationItems.map((a) => {
                        // Use aggregated job from response
                        const jobTitle =
                          a.job?.title || `Job (${a.tuitionJobId})`;
                        const jobSubject = a.job?.subject || "-";
                        const tutorName =
                          a.tutor?.fullName || `Tutor (${a.tutorId})`;
                        const tutorEmail = a.tutor?.email || "-";
                        const isDeleted = a.isDeleted || false;

                        return (
                          <tr
                            key={a._id}
                            className={`border-t ${
                              isDeleted ? "bg-red-50" : ""
                            }`}
                          >
                            <td className="px-3 py-2 text-xs font-mono">
                              {String(a._id).slice(-8)}
                            </td>
                            <td className="px-3 py-2 font-medium">
                              {jobTitle}
                            </td>
                            <td className="px-3 py-2">{jobSubject}</td>
                            <td className="px-3 py-2 font-medium">
                              {tutorName}
                            </td>
                            <td className="px-3 py-2 text-xs">{tutorEmail}</td>
                            <td className="px-3 py-2 font-semibold">
                              {a.rate} Tk
                            </td>
                            <td className="px-3 py-2 text-xs truncate">
                              {a.schedule}
                            </td>
                            <td className="px-3 py-2 text-xs">
                              {new Date(a.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-3 py-2">
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                  isDeleted
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {isDeleted ? "Deleted" : "Active"}
                              </span>
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    toggleApplicationStatus(a._id, !isDeleted)
                                  }
                                  disabled={
                                    !!loadingMap[`application-${a._id}`]
                                  }
                                  className={`px-2 py-1 text-xs rounded text-white transition-colors ${
                                    isDeleted
                                      ? "bg-green-600 hover:bg-green-700 disabled:opacity-50"
                                      : "bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
                                  }`}
                                >
                                  {isDeleted ? "Restore" : "Soft Delete"}
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
                    ),
                  )}
                  <button
                    className="px-2 py-1 rounded bg-gray-100 disabled:opacity-50"
                    onClick={() =>
                      setApplicationsPage((p) =>
                        Math.min(applicationsTotalPages, p + 1),
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

      {/* Edit Job Modal */}
      {editingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-full overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Job</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={editJobFormData.title || ""}
                  onChange={(e) =>
                    setEditJobFormData({
                      ...editJobFormData,
                      title: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={editJobFormData.subject || ""}
                  onChange={(e) =>
                    setEditJobFormData({
                      ...editJobFormData,
                      subject: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editJobFormData.location || ""}
                  onChange={(e) =>
                    setEditJobFormData({
                      ...editJobFormData,
                      location: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Budget</label>
                <input
                  type="text"
                  value={editJobFormData.budget || ""}
                  onChange={(e) =>
                    setEditJobFormData({
                      ...editJobFormData,
                      budget: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={async () => {
                  try {
                    // 🔔 Step 1: Show confirmation
                    const result = await Swal.fire({
                      title: "Save changes?",
                      text: "Are you sure you want to update this job?",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#16a34a", // green
                      cancelButtonColor: "#6b7280", // gray
                      confirmButtonText: "Yes, Save",
                      cancelButtonText: "Cancel",
                    });

                    if (!result.isConfirmed) return; // ❌ Stop if cancelled

                    // 🔔 Step 2: Proceed with update
                    const token = localStorage.getItem("token");

                    // Only include defined fields
                    const updateData = Object.fromEntries(
                      Object.entries(editJobFormData).filter(
                        ([v]) => v !== undefined,
                      ),
                    );

                    const res = await fetch(
                      `${BACKEND_BASE}/allJobs/update/${editingJob.id}`,
                      {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(updateData),
                      },
                    );

                    if (!res.ok) {
                      const errData = await res.json().catch(() => null);
                      throw new Error(
                        errData?.message || "Failed to update job",
                      );
                    }

                    // const data = await res.json();

                    // ✅ Update local state
                    setJobs((prev) =>
                      prev.map((j) =>
                        j.id === editingJob.id || j._id === editingJob._id
                          ? { ...j, ...editJobFormData }
                          : j,
                      ),
                    );

                    setEditingJob(null);

                    // ✅ Success toast
                    Swal.fire({
                      toast: true,
                      position: "top-end",
                      icon: "success",
                      title: "Job updated successfully",
                      showConfirmButton: false,
                      timer: 2500,
                      timerProgressBar: true,
                    });
                  } catch (err) {
                    Swal.fire({
                      icon: "error",
                      title: "Update failed",
                      text:
                        err instanceof Error
                          ? err.message
                          : "Something went wrong",
                    });
                  }
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save Changes
              </button>

              <button
                onClick={() => setEditingJob(null)}
                className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
