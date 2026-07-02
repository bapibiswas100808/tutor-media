"use client";

import { CircleX } from "lucide-react";

interface StatApplication {
  _id?: string;
  tuitionJobId?: string;
  status?: string;
  createdAt?: string;
  job?: {
    _id?: string;
    jobId?: string;
    class?: string;
    subjects?: string[];
    salary?: string;
    days?: string;
    duration?: string;
    district?: string;
    location?: string;
    medium?: string;
  };
}

interface StatsJobsModalProps {
  activeStatCategory: string | null;
  statJobs: StatApplication[];
  statJobsLoading: boolean;
  onClose: () => void;
}

export default function StatsJobsModal({
  activeStatCategory,
  statJobs,
  statJobsLoading,
  onClose,
}: StatsJobsModalProps) {
  if (!activeStatCategory) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-11/12 max-w-lg max-h-[80vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {activeStatCategory}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <CircleX size={28} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-3">
          {statJobsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : statJobs.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No jobs found in this category.
            </p>
          ) : (
            statJobs.map((app, idx) => {
              const job = app.job ?? {};
              return (
                <div
                  key={app._id ?? idx}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-4 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-600">
                      {job.jobId
                        ? `Job #${job.jobId}`
                        : `Application ${idx + 1}`}
                    </span>
                    {job.class && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                        {job.class}
                      </span>
                    )}
                  </div>
                  {job.subjects && job.subjects.length > 0 && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Subjects:</span>{" "}
                      {job.subjects.join(", ")}
                    </p>
                  )}
                  {job.medium && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Medium:</span> {job.medium}
                    </p>
                  )}
                  {job.salary && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Salary:</span> {job.salary}
                    </p>
                  )}
                  {(job.district || job.location) && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Location:</span>{" "}
                      {[job.location, job.district].filter(Boolean).join(", ")}
                    </p>
                  )}
                  {job.days && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Days:</span> {job.days}
                    </p>
                  )}
                  {!job.jobId && !job.class && !job.subjects && (
                    <p className="text-xs text-gray-400">
                      Job ID: {app.tuitionJobId ?? "N/A"}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
