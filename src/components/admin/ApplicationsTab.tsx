"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FileText } from "lucide-react";
import Swal from "sweetalert2";
import { Application } from "@/lib/applications";

const PAGE_SIZE = 10;

interface ApplicationsTabProps {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  BACKEND_BASE: string;
}

export default function ApplicationsTab({
  applications,
  setApplications,
  BACKEND_BASE,
}: ApplicationsTabProps) {
  const [applicationsPage, setApplicationsPage] = useState(1);
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [filterJobId, setFilterJobId] = useState("");

  const filteredApplications = useMemo(() => {
    const normalizedFilter = filterJobId.trim().toLowerCase();
    if (!normalizedFilter) return applications;

    return applications.filter((application) => {
      const jobId = application.job?.jobId || application.tuitionJobId || "";
      return String(jobId).toLowerCase().includes(normalizedFilter);
    });
  }, [applications, filterJobId]);

  const applicationsTotalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / PAGE_SIZE),
  );

  const currentApplicationItems = filteredApplications.slice(
    (applicationsPage - 1) * PAGE_SIZE,
    applicationsPage * PAGE_SIZE,
  );

  useEffect(() => {
    if (applicationsPage > applicationsTotalPages)
      setApplicationsPage(applicationsTotalPages);
  }, [applicationsTotalPages, applicationsPage]);

  useEffect(() => {
    setApplicationsPage(1);
  }, [filterJobId]);

  const updateApplicationStatus = async (
    applicationId: string,
    action: "appointed" | "rejected" | "shortlisted",
  ) => {
    const key = `application-${applicationId}`;
    const statusLabel =
      action === "appointed"
        ? "Appoint"
        : action === "rejected"
          ? "Reject"
          : "Shortlist";
    const finalStatus =
      action === "appointed"
        ? "appointed"
        : action === "rejected"
          ? "rejected"
          : "shortlisted";

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
    setError(null);

    const previousApplications = [...applications];

    setApplications((prev) =>
      prev.map((a) =>
        a._id === applicationId ? { ...a, status: finalStatus } : a,
      ),
    );

    try {
      const token = localStorage.getItem("token");
      const endpoint =
        action === "appointed"
          ? `${BACKEND_BASE}/applications/${applicationId}/appointed`
          : action === "rejected"
            ? `${BACKEND_BASE}/applications/${applicationId}/rejected`
            : `${BACKEND_BASE}/applications/${applicationId}/shortlisted`;

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
      setApplications(previousApplications);
      const message =
        err instanceof Error ? err.message : "Status update failed";
      setError(message);
      Swal.fire({ icon: "error", title: "Action failed", text: message });
    } finally {
      setLoadingMap((s) => ({ ...s, [key]: false }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FileText size={20} className="text-violet-500" />
        Applications
      </h2>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="text-sm text-gray-500">
          {filteredApplications.length === 0 ? (
            <>Showing 0 of 0</>
          ) : (
            <>
              Showing {(applicationsPage - 1) * PAGE_SIZE + 1} -{" "}
              {Math.min(
                applicationsPage * PAGE_SIZE,
                filteredApplications.length,
              )}{" "}
              of {filteredApplications.length}
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="job-filter"
          >
            Filter by tuition job ID:
          </label>
          <input
            id="job-filter"
            type="text"
            value={filterJobId}
            onChange={(event) => setFilterJobId(event.target.value)}
            placeholder="e.g. 12345"
            className="w-48 rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-violet-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="px-3 py-2">Tuition Code</th>
              <th className="px-3 py-2">Tutor ID</th>
              <th className="px-3 py-2">Tutor Name</th>
              <th className="px-3 py-2">Short CV</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentApplicationItems.map((a) => {
              const status = a.status ?? "applied";
              return (
                <tr
                  key={a._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-3 py-2 font-mono text-xs">
                    {a.job?.jobId}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs">
                    T-{a.tutor?.id}
                  </td>
                  <td className="px-3 py-2 font-medium">{a.tutor?.fullName}</td>
                  <td className="px-3 py-2 max-w-75">
                    <div className="space-y-1 text-xs">
                      <p className="font-medium">{a.tutor?.qualification}</p>
                      <p>Exp: {a.tutor?.experience}</p>
                      <p className="line-clamp-2 text-gray-600">
                        {a.tutor?.personalInfo?.overview}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs">{a.tutor?.phone}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        status === "appointed"
                          ? "bg-green-100 text-green-700"
                          : status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : status === "shortlisted"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {status === "appointed"
                        ? "Appointed"
                        : status === "rejected"
                          ? "Rejected"
                          : status === "shortlisted"
                            ? "Shortlisted"
                            : "Applied"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-2">
                      {status !== "shortlisted" &&
                        status !== "appointed" &&
                        status !== "rejected" && (
                          <button
                            disabled={!!loadingMap[`application-${a._id}`]}
                            onClick={() =>
                              updateApplicationStatus(a._id, "shortlisted")
                            }
                            className="px-2 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                          >
                            Shortlist
                          </button>
                        )}
                      <button
                        disabled={!!loadingMap[`application-${a._id}`]}
                        onClick={() =>
                          updateApplicationStatus(a._id, "appointed")
                        }
                        className="px-2 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                      >
                        Appoint
                      </button>
                      <button
                        disabled={!!loadingMap[`application-${a._id}`]}
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
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-gray-500">
          Page {applicationsPage} of {applicationsTotalPages}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 rounded bg-gray-100 disabled:opacity-50"
            onClick={() => setApplicationsPage((p) => Math.max(1, p - 1))}
            disabled={applicationsPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: applicationsTotalPages }).map((_, i) => (
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
          ))}
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
  );
}
