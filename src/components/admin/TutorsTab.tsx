"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Users } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { Tutor } from "@/data/tutorsList";
import { calculateProfileCompletion } from "@/lib/profileCompletion";

const PAGE_SIZE = 10;

interface TutorsTabProps {
  tutors: Tutor[];
  setTutors: React.Dispatch<React.SetStateAction<Tutor[]>>;
  BACKEND_BASE: string;
}

export default function TutorsTab({
  tutors,
  setTutors,
  BACKEND_BASE,
}: TutorsTabProps) {
  const [tutorEmailQuery, setTutorEmailQuery] = useState("");
  const [tutorIdQuery, setTutorIdQuery] = useState("");
  const [tutorPage, setTutorPage] = useState(1);
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const filteredTutors = useMemo(() => {
    const emailQ = tutorEmailQuery.trim().toLowerCase();
    const idQ = tutorIdQuery.trim();
    return tutors.filter((tutor) => {
      const emailMatch = emailQ
        ? (tutor.email ?? "").toLowerCase().includes(emailQ)
        : true;
      const idMatch = idQ ? String(tutor.id).includes(idQ) : true;
      return emailMatch && idMatch;
    });
  }, [tutors, tutorEmailQuery, tutorIdQuery]);

  const tutorTotalPages = Math.max(
    1,
    Math.ceil(filteredTutors.length / PAGE_SIZE),
  );

  const currentTutorItems = filteredTutors.slice(
    (tutorPage - 1) * PAGE_SIZE,
    tutorPage * PAGE_SIZE,
  );

  useEffect(() => {
    if (tutorPage > tutorTotalPages) setTutorPage(tutorTotalPages);
  }, [tutorTotalPages, tutorPage]);

  useEffect(() => setTutorPage(1), [tutorEmailQuery]);

  async function toggleField(
    id: number | string,
    mongoId: string | undefined,
    field: "isVerified" | "isApproved" | "isPremium",
    value: boolean,
  ) {
    const key = `tutor-${id}`;
    setLoadingMap((s) => ({ ...s, [key]: true }));
    setError(null);

    setTutors((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
    );

    try {
      const token = localStorage.getItem("token");
      let url = "";
      if (field === "isVerified")
        url = `${BACKEND_BASE}/allTutors/isVerified/${mongoId}`;
      else if (field === "isApproved")
        url = `${BACKEND_BASE}/allTutors/isApproved/${mongoId}`;
      else if (field === "isPremium")
        url = `${BACKEND_BASE}/allTutors/isPremium/${mongoId}`;

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
      setTutors((prev) =>
        prev.map((t) => (t.id === id ? { ...t, [field]: !value } : t)),
      );
      const message = err instanceof Error ? err.message : "Update failed";
      setError(message);
    } finally {
      setLoadingMap((s) => ({ ...s, [key]: false }));
    }
  }

  const confirmAction = async (isDeleted: boolean | undefined) => {
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Users size={20} className="text-blue-500" />
        Tutors
      </h2>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">
          {filteredTutors.length === 0 ? (
            <>Showing 0 of 0</>
          ) : (
            <>
              Showing {(tutorPage - 1) * PAGE_SIZE + 1} -{" "}
              {Math.min(tutorPage * PAGE_SIZE, filteredTutors.length)} of{" "}
              {filteredTutors.length}
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
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
              onChange={(e) =>
                setTutorIdQuery(e.target.value.replace(/\D/g, ""))
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
            <tr className="text-left bg-gray-50">
              <th className="px-3 py-2 font-semibold text-gray-600">Name</th>
              <th className="px-3 py-2 font-semibold text-gray-600">Email</th>
              <th className="px-3 py-2 font-semibold text-gray-600">Phone</th>
              <th className="px-3 py-2 font-semibold text-gray-600">Id</th>
              <th className="px-3 py-2 font-semibold text-gray-600">
                Location
              </th>
              <th className="px-3 py-2 font-semibold text-gray-600">
                Profile %
              </th>
              <th className="px-3 py-2 font-semibold text-gray-600">
                Verified
              </th>
              <th className="px-3 py-2 font-semibold text-gray-600">
                Approved
              </th>
              <th className="px-3 py-2 font-semibold text-gray-600">Premium</th>
              <th className="px-3 py-2 font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTutorItems.length === 0 ? (
              <tr className="border-t">
                <td
                  className="px-3 py-4 text-gray-400 text-center"
                  colSpan={10}
                >
                  No tutors found
                </td>
              </tr>
            ) : (
              currentTutorItems.map((t) => {
                const profilePercentage = calculateProfileCompletion(t);
                const isLow = profilePercentage < 80;
                return (
                  <tr
                    key={t.id}
                    className="border-t hover:bg-blue-50/40 transition-colors"
                  >
                    <td className="px-3 py-2">{t.fullName}</td>
                    <td className="px-3 py-2">{t.email}</td>
                    <td className="px-3 py-2">{t.phone}</td>
                    <td className="px-3 py-2">{t.id}</td>
                    <td className="px-3 py-2">{t.location}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              isLow ? "bg-red-500" : "bg-green-500"
                            }`}
                            style={{ width: `${profilePercentage}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium ${isLow ? "text-red-600" : "text-green-600"}`}
                        >
                          {profilePercentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={!!t.isVerified}
                        disabled={!!loadingMap[`tutor-${t.id}`]}
                        onChange={(e) =>
                          toggleField(
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
                          Update
                        </Link>
                        <button
                          onClick={async () => {
                            try {
                              const result = await confirmAction(t.isDeleted);
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

                              setTutors((prev) =>
                                prev.map((u) =>
                                  u.id === t.id || u._id === t._id
                                    ? { ...u, isDeleted: !t.isDeleted }
                                    : u,
                                ),
                              );

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
                );
              })
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
          {(() => {
            const pages = [];
            const start = Math.max(1, tutorPage - 2);
            const end = Math.min(tutorTotalPages, tutorPage + 2);

            if (start > 1) {
              pages.push(
                <button
                  key={1}
                  onClick={() => setTutorPage(1)}
                  className="px-2 py-1 rounded bg-gray-100"
                >
                  1
                </button>,
              );
              if (start > 2) pages.push(<span key="start-ellipsis">...</span>);
            }

            for (let i = start; i <= end; i++) {
              pages.push(
                <button
                  key={i}
                  onClick={() => setTutorPage(i)}
                  className={`px-2 py-1 rounded ${
                    i === tutorPage ? "bg-blue-600 text-white" : "bg-gray-100"
                  }`}
                >
                  {i}
                </button>,
              );
            }

            if (end < tutorTotalPages) {
              if (end < tutorTotalPages - 1)
                pages.push(<span key="end-ellipsis">...</span>);
              pages.push(
                <button
                  key={tutorTotalPages}
                  onClick={() => setTutorPage(tutorTotalPages)}
                  className="px-2 py-1 rounded bg-gray-100"
                >
                  {tutorTotalPages}
                </button>,
              );
            }

            return pages;
          })()}
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
  );
}
