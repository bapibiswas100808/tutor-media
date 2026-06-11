"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Briefcase, Users } from "lucide-react";
import Swal from "sweetalert2";
import { TuitionJob, EditableJob, editableJobFields } from "./adminTypes";
import { Application } from "@/lib/applications";

const PAGE_SIZE = 10;

interface TuitionJobsTabProps {
  jobs: TuitionJob[];
  setJobs: React.Dispatch<React.SetStateAction<TuitionJob[]>>;
  BACKEND_BASE: string;
  applications?: Application[];
  setApplications?: React.Dispatch<React.SetStateAction<Application[]>>;
}

export default function TuitionJobsTab({
  jobs,
  setJobs,
  BACKEND_BASE,
  applications = [],
  setApplications,
}: TuitionJobsTabProps) {
  const [jobIdQuery, setJobIdQuery] = useState("");
  const [jobPage, setJobPage] = useState(1);
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [editingJob, setEditingJob] = useState<TuitionJob | null>(null);
  const [editJobFormData, setEditJobFormData] = useState<EditableJob>({});
  const [shortlistedJob, setShortlistedJob] = useState<TuitionJob | null>(null);

  const filteredJobs = useMemo(() => {
    const q = jobIdQuery.trim().toLowerCase();
    return q
      ? jobs.filter((j) =>
          String(j.jobId ?? j.id ?? j._id)
            .toLowerCase()
            .includes(q),
        )
      : jobs;
  }, [jobs, jobIdQuery]);

  const jobTotalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));

  const currentJobItems = filteredJobs.slice(
    (jobPage - 1) * PAGE_SIZE,
    jobPage * PAGE_SIZE,
  );

  useEffect(() => {
    if (jobPage > jobTotalPages) setJobPage(jobTotalPages);
  }, [jobTotalPages, jobPage]);

  useEffect(() => setJobPage(1), [jobIdQuery]);

  useEffect(() => {
    if (!editingJob) return;

    const formData: EditableJob = {};

    editableJobFields.forEach(({ key }) => {
      if (key === "subjects") {
        formData[key] = editingJob.subjects || [];
      } else if (key === "tutorDescription") {
        formData[key] = editingJob.tutorDescription || "";
      } else if (key === "locationDescription") {
        formData[key] = editingJob.locationDescription || "";
      } else if (key in editingJob) {
        // @ts-expect-error safe check for known string fields
        const value = editingJob[key];
        if (typeof value === "string") {
          if (key === "studentGender" || key === "tutorGender") {
            if (["male", "female"].includes(value)) {
              formData[key] = value as "male" | "female";
            }
          } else {
            formData[key] = value;
          }
        } else if (
          typeof value === "number" &&
          key !== "studentGender" &&
          key !== "tutorGender"
        ) {
          formData[key] = String(value);
        }
      }
    });

    setEditJobFormData(formData);
  }, [editingJob]);

  async function toggleApproved(
    id: number | string,
    mongoId: string | undefined,
    value: boolean,
  ) {
    const key = `job-${id}`;
    setLoadingMap((s) => ({ ...s, [key]: true }));

    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, isApproved: value } : j)),
    );

    try {
      const token = localStorage.getItem("token");
      const url = `${BACKEND_BASE}/allJobs/isApproved/${mongoId}`;

      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved: value }),
      });

      if (!res.ok) {
        let errMessage = "Failed to update";
        try {
          const body = await res.json();
          errMessage = body?.message || body?.error || errMessage;
        } catch {
          // ignore
        }
        throw new Error(errMessage);
      }
    } catch (err: unknown) {
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, isApproved: !value } : j)),
      );
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      setLoadingMap((s) => ({ ...s, [key]: false }));
    }
  }

  const updateApplicationStatus = async (
    applicationId: string,
    action: "appointed" | "rejected",
  ) => {
    if (!setApplications) {
      // fallback: still call API but won't optimistically update local list
    }

    const key = `application-${applicationId}`;
    const statusLabel = action === "appointed" ? "Appoint" : "Reject";
    const finalStatus = action === "appointed" ? "appointed" : "rejected";

    const result = await Swal.fire({
      title: `${statusLabel} application?`,
      text: `Application status will be changed to "${statusLabel}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: action === "appointed" ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${statusLabel}`,
    });

    if (!result.isConfirmed) return;

    setLoadingMap((s) => ({ ...s, [key]: true }));

    const previousApplications = applications ? [...applications] : [];

    if (setApplications) {
      setApplications((prev) =>
        prev.map((a) =>
          a._id === applicationId ? { ...a, status: finalStatus } : a,
        ),
      );
    }

    try {
      const token = localStorage.getItem("token");
      const endpoint =
        action === "appointed"
          ? `${BACKEND_BASE}/applications/${applicationId}/appointed`
          : `${BACKEND_BASE}/applications/${applicationId}/rejected`;

      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Status update failed");
      }

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Application marked as ${statusLabel}`,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
    } catch (err) {
      if (setApplications) setApplications(previousApplications);
      const message =
        err instanceof Error ? err.message : "Status update failed";
      Swal.fire({ icon: "error", title: "Action failed", text: message });
    } finally {
      setLoadingMap((s) => ({ ...s, [key]: false }));
    }
  };

  // Pagination helper to show limited page numbers with ellipsis
  const getPagination = (current: number, total: number) => {
    const delta = 2;
    const range: (number | string)[] = [];

    const start = Math.max(2, current - delta);
    const end = Math.min(total - 1, current + delta);

    if (start > 2) range.push("...");

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < total - 1) range.push("...");

    return [1, ...range, total].filter(
      (v, i, arr) => arr.indexOf(v) === i && total > 1,
    );
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Briefcase size={20} className="text-emerald-500" />
          Tuition Jobs
        </h2>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            Showing {filteredJobs.length} of {jobs.length}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="search"
              value={jobIdQuery}
              onChange={(e) => setJobIdQuery(e.target.value)}
              placeholder="Search by job ID"
              className="border rounded px-3 py-2 text-sm w-72"
            />
            {jobIdQuery && (
              <button
                className="text-sm text-gray-600 hover:text-gray-800"
                onClick={() => setJobIdQuery("")}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="px-3 py-2 font-semibold text-gray-600">
                  Title / Job ID
                </th>
                <th className="px-3 py-2 font-semibold text-gray-600">
                  Subject
                </th>
                <th className="px-3 py-2 font-semibold text-gray-600">
                  Location
                </th>
                <th className="px-3 py-2 font-semibold text-gray-600">
                  Budget
                </th>
                <th className="px-3 py-2 font-semibold text-gray-600">
                  Approved
                </th>
                <th className="px-3 py-2 font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentJobItems.length === 0 ? (
                <tr className="border-t">
                  <td
                    className="px-3 py-4 text-gray-400 text-center"
                    colSpan={6}
                  >
                    No jobs found
                  </td>
                </tr>
              ) : (
                currentJobItems.map((j) => {
                  const jobTitle = j.subjects?.length
                    ? `${j.subjects.slice(0, 2).join(", ")} teacher needed for ${j.class}`
                    : `Job (${j.jobId})`;
                  const jobSubjects = j.subjects?.join(", ") || "-";
                  const jobLocation = j.preferredArea
                    ? `${j.location}, ${j.preferredArea}`
                    : j.location;

                  return (
                    <tr
                      key={j.id || j._id}
                      className="border-t hover:bg-blue-50/40 transition-colors"
                    >
                      <td className="px-3 py-2">
                        {jobTitle} - {j.jobId}
                      </td>
                      <td className="px-3 py-2">{jobSubjects}</td>
                      <td className="px-3 py-2">{jobLocation}</td>
                      <td className="px-3 py-2">{j.salary} ৳</td>
                      <td className="px-3 py-2">
                        <input
                          type="checkbox"
                          checked={!!j.isApproved}
                          disabled={!!loadingMap[`job-${j.id || j._id}`]}
                          onChange={(e) =>
                            toggleApproved(
                              j.id || j._id,
                              String(j._id),
                              e.target.checked,
                            )
                          }
                        />
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShortlistedJob(j)}
                            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Shortlisted
                          </button>
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
                                  ? `${BACKEND_BASE}/allJobs/restore/${j.jobId || j._id}`
                                  : `${BACKEND_BASE}/allJobs/delete/${j.jobId || j._id}`;

                                const res = await fetch(endpoint, {
                                  method: "PATCH",
                                });
                                if (!res.ok) {
                                  const text = await res.text();
                                  throw new Error(text || "Request failed");
                                }

                                setJobs((prev) =>
                                  prev.map((job) =>
                                    job.id === j.id || job._id === j._id
                                      ? { ...job, isDeleted: !j.isDeleted }
                                      : job,
                                  ),
                                );

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
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
          {/* Info */}
          <div className="text-sm text-gray-500">
            Page <span className="font-semibold">{jobPage}</span> of{" "}
            <span className="font-semibold">{jobTotalPages}</span>
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Prev */}
            <button
              className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition"
              onClick={() => setJobPage((p) => Math.max(1, p - 1))}
              disabled={jobPage === 1}
            >
              Prev
            </button>

            {/* Pages */}
            {getPagination(jobPage, jobTotalPages).map((page, i) =>
              page === "..." ? (
                <span key={i} className="px-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={i}
                  onClick={() => setJobPage(page as number)}
                  className={`px-3 py-1 rounded-md transition font-medium ${
                    page === jobPage
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            {/* Next */}
            <button
              className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition"
              onClick={() => setJobPage((p) => Math.min(jobTotalPages, p + 1))}
              disabled={jobPage === jobTotalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Shortlisted Candidates Modal */}
      {shortlistedJob &&
        (() => {
          const jobApplications = applications.filter(
            (a) =>
              a.job?.jobId !== undefined &&
              String(a.job.jobId) === String(shortlistedJob.jobId) &&
              ["shortlisted", "appointed", "rejected"].includes(
                (a.status ?? "").toLowerCase().trim(),
              ),
          );
          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Users size={20} className="text-blue-600" />
                    Shortlisted Candidates
                  </h2>
                  <button
                    onClick={() => setShortlistedJob(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                  >
                    &times;
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Job:{" "}
                  <span className="font-medium text-gray-700">
                    {shortlistedJob.jobId} &mdash;{" "}
                    {shortlistedJob.subjects?.slice(0, 2).join(", ") ||
                      shortlistedJob.title ||
                      ""}
                  </span>
                </p>
                {jobApplications.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">
                    No shortlisted candidates for this job yet.
                  </p>
                ) : (
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-3 py-2">Tutor ID</th>
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2">Qualification</th>
                        <th className="px-3 py-2">Phone</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobApplications.map((a) => {
                        const status = (a.status ?? "").toLowerCase().trim();
                        return (
                          <tr key={a._id} className="border-t hover:bg-gray-50">
                            <td className="px-3 py-2 font-mono text-xs">
                              T-{a.tutor?.id}
                            </td>
                            <td className="px-3 py-2 font-medium">
                              {a.tutor?.fullName}
                            </td>
                            <td className="px-3 py-2 text-xs">
                              {a.tutor?.qualification}
                            </td>
                            <td className="px-3 py-2 text-xs">
                              {a.tutor?.phone}
                            </td>
                            <td className="px-3 py-2">
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                  status === "appointed"
                                    ? "bg-green-100 text-green-700"
                                    : status === "rejected"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {status === "appointed"
                                  ? "Appointed"
                                  : status === "rejected"
                                    ? "Rejected"
                                    : "Shortlisted"}
                              </span>
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  disabled={
                                    !!loadingMap[`application-${a._id}`]
                                  }
                                  onClick={() =>
                                    updateApplicationStatus(a._id, "appointed")
                                  }
                                  className="px-2 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                                >
                                  Appoint
                                </button>
                                <button
                                  disabled={
                                    !!loadingMap[`application-${a._id}`]
                                  }
                                  onClick={() =>
                                    updateApplicationStatus(a._id, "rejected")
                                  }
                                  className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                                >
                                  Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShortlistedJob(null)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {/* Edit Job Modal */}
      {editingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-full overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Job</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editableJobFields.map(({ label, key, type }) => {
                if (key === "subjects") {
                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium mb-1">
                        {label}
                      </label>
                      <textarea
                        value={
                          Array.isArray(editJobFormData[key])
                            ? editJobFormData[key].join(", ")
                            : editJobFormData[key] || ""
                        }
                        onChange={(e) =>
                          setEditJobFormData({
                            ...editJobFormData,
                            [key]: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter((s) => s.length > 0),
                          })
                        }
                        className="w-full border px-3 py-2 rounded-md"
                        rows={3}
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Enter subjects separated by comma
                      </p>
                    </div>
                  );
                }

                return (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1">
                      {label}
                    </label>
                    {type === "textarea" ? (
                      <textarea
                        value={editJobFormData[key] || ""}
                        onChange={(e) =>
                          setEditJobFormData({
                            ...editJobFormData,
                            [key]: e.target.value,
                          })
                        }
                        className="w-full border px-3 py-2 rounded-md"
                        rows={3}
                      />
                    ) : (
                      <input
                        type="text"
                        value={editJobFormData[key] || ""}
                        onChange={(e) =>
                          setEditJobFormData({
                            ...editJobFormData,
                            [key]: e.target.value,
                          })
                        }
                        className="w-full border px-3 py-2 rounded-md"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={async () => {
                  try {
                    const result = await Swal.fire({
                      title: "Save changes?",
                      text: "Are you sure you want to update this job?",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#16a34a",
                      cancelButtonColor: "#6b7280",
                      confirmButtonText: "Yes, Save",
                      cancelButtonText: "Cancel",
                    });

                    if (!result.isConfirmed) return;

                    const token = localStorage.getItem("token");
                    const updateData = Object.fromEntries(
                      Object.entries(editJobFormData).filter(
                        ([, v]) => v !== undefined,
                      ),
                    );

                    const res = await fetch(
                      `${BACKEND_BASE}/allJobs/update/${editingJob.jobId || editingJob._id}`,
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

                    setJobs((prev) =>
                      prev.map((j) =>
                        j.id === editingJob.id || j._id === editingJob._id
                          ? { ...j, ...editJobFormData }
                          : j,
                      ),
                    );

                    setEditingJob(null);

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
    </>
  );
}
