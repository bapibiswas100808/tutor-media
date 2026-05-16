"use client";

import React from "react";
import {
  Users,
  Briefcase,
  FileText,
  CreditCard,
  CheckCircle,
  TrendingUp,
  Star,
} from "lucide-react";
import { Tutor } from "@/data/tutorsList";
import { Application } from "@/lib/applications";
import { BkashPayment, TuitionJob } from "./adminTypes";

type ViewType = "home" | "tutors" | "jobs" | "applications" | "payments";

interface OverviewTabProps {
  counts: {
    tutors: number;
    jobs: number;
    applications: number;
    payments: number;
  };
  tutors: Tutor[];
  jobs: TuitionJob[];
  applications: Application[];
  payments: BkashPayment[];
  setView: (view: ViewType) => void;
}

export default function OverviewTab({
  counts,
  tutors,
  jobs,
  applications,
  payments,
  setView,
}: OverviewTabProps) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back! Here&apos;s a summary of your platform.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Tutors",
            value: counts.tutors,
            icon: Users,
            gradient: "from-blue-500 to-blue-700",
            bg: "bg-blue-50",
            text: "text-blue-600",
            sub: `${tutors.filter((t) => t.isVerified).length} verified`,
            subIcon: CheckCircle,
            onClick: () => setView("tutors"),
          },
          {
            label: "Tuition Jobs",
            value: counts.jobs,
            icon: Briefcase,
            gradient: "from-emerald-500 to-green-700",
            bg: "bg-emerald-50",
            text: "text-emerald-600",
            sub: `${jobs.filter((j) => j.isApproved).length} approved`,
            subIcon: CheckCircle,
            onClick: () => setView("jobs"),
          },
          {
            label: "Applications",
            value: counts.applications,
            icon: FileText,
            gradient: "from-violet-500 to-purple-700",
            bg: "bg-violet-50",
            text: "text-violet-600",
            sub: `${applications.filter((a) => !a.isDeleted).length} active`,
            subIcon: TrendingUp,
            onClick: () => setView("applications"),
          },
          {
            label: "Payments",
            value: counts.payments,
            icon: CreditCard,
            gradient: "from-orange-500 to-amber-600",
            bg: "bg-orange-50",
            text: "text-orange-600",
            sub: `৳${payments.reduce((s, p) => s + (Number(p.amount) || 0), 0).toLocaleString()} total`,
            subIcon: Star,
            onClick: () => setView("payments"),
          },
        ].map(
          ({
            label,
            value,
            icon: Icon,
            gradient,
            bg,
            text,
            sub,
            subIcon: SubIcon,
            onClick,
          }) => (
            <button
              key={label}
              onClick={onClick}
              className="text-left bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <span
                  className={`text-xs font-semibold ${bg} ${text} px-2 py-1 rounded-full`}
                >
                  View All
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {value}
              </div>
              <div className="text-sm font-medium text-gray-500 mb-2">
                {label}
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${text}`}
              >
                <SubIcon size={12} />
                {sub}
              </div>
            </button>
          ),
        )}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Tutors */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
              <Users size={16} className="text-blue-500" />
              Recent Tutors
            </h2>
            <button
              onClick={() => setView("tutors")}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              See all
            </button>
          </div>
          <div className="space-y-2">
            {tutors.slice(0, 5).map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {t.fullName || "—"}
                  </div>
                  <div className="text-xs text-gray-400">{t.email}</div>
                </div>
                <div className="flex gap-1">
                  {t.isVerified && (
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                  {t.isPremium && (
                    <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">
                      Premium
                    </span>
                  )}
                </div>
              </div>
            ))}
            {tutors.length === 0 && (
              <p className="text-sm text-gray-400">No tutors yet.</p>
            )}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
              <CreditCard size={16} className="text-orange-500" />
              Recent Payments
            </h2>
            <button
              onClick={() => setView("payments")}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              See all
            </button>
          </div>
          <div className="space-y-2">
            {payments.slice(0, 5).map((p, i) => (
              <div
                key={p._id || i}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <div>
                  <div className="text-sm font-medium text-gray-800 font-mono">
                    {p.trxId || p.transactionId || "—"}
                  </div>
                  <div className="text-xs text-gray-400 capitalize">
                    {p.plan || "—"} · {p.sender || "—"}
                  </div>
                </div>
                <span className="text-sm font-bold text-green-600">
                  ৳{p.amount || 0}
                </span>
              </div>
            ))}
            {payments.length === 0 && (
              <p className="text-sm text-gray-400">No payments yet.</p>
            )}
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:col-span-2">
          <h2 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-violet-500" />
            Quick Status Breakdown
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              {
                label: "Verified Tutors",
                value: tutors.filter((t) => t.isVerified).length,
                total: Math.max(counts.tutors, 1),
                color: "bg-blue-500",
              },
              {
                label: "Approved Jobs",
                value: jobs.filter((j) => j.isApproved).length,
                total: Math.max(counts.jobs, 1),
                color: "bg-emerald-500",
              },
              {
                label: "Active Applications",
                value: applications.filter((a) => !a.isDeleted).length,
                total: Math.max(counts.applications, 1),
                color: "bg-violet-500",
              },
              {
                label: "Premium Tutors",
                value: tutors.filter((t) => t.isPremium).length,
                total: Math.max(counts.tutors, 1),
                color: "bg-amber-500",
              },
            ].map(({ label, value, total, color }) => (
              <div key={label}>
                <div className="flex justify-between text-sm text-gray-500 mb-1.5">
                  <span>{label}</span>
                  <span className="font-bold text-gray-800">{value}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${color} transition-all`}
                    style={{
                      width: `${Math.min(100, Math.round((value / total) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
