"use client";

import React, { useEffect, useMemo, useState } from "react";

import { Tutor } from "@/data/tutorsList";
import { Application } from "@/lib/applications";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  CreditCard,
  Menu,
  X,
} from "lucide-react";
import { BkashPayment, TuitionJob } from "./adminTypes";
import OverviewTab from "./OverviewTab";
import TutorsTab from "./TutorsTab";
import TuitionJobsTab from "./TuitionJobsTab";
import ApplicationsTab from "./ApplicationsTab";
import PaymentsTab from "./PaymentsTab";

export type { BkashPayment, TuitionJob };

/* ================= COMPONENT ================= */
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
    "home" | "tutors" | "jobs" | "applications" | "payments"
  >("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tutors, setTutors] = useState<Tutor[]>(initialTutors || []);
  const [jobs, setJobs] = useState<TuitionJob[]>(initialJobs || []);
  const [applications, setApplications] = useState<Application[]>(
    initialApplications || [],
  );
  const [payments, setPayments] = useState<BkashPayment[]>([]);

  const BACKEND_BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://pro-assignment-twelve-server.vercel.app";

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
        const res = await fetch(`${BACKEND_BASE}/all-payments`, {
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
  }, [BACKEND_BASE]);

  const counts = useMemo(
    () => ({
      tutors: tutors.length,
      jobs: jobs.length,
      applications: applications.length,
      payments: payments.length,
    }),
    [tutors, jobs, applications, payments],
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-3 px-4 sm:px-6 py-3 pt-5">
          <button
            className="sm:hidden p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-600"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0">
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <span className="font-bold text-gray-800 text-lg">
            Tutor Media Admin
          </span>
          <span className="ml-auto text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200 font-medium hidden sm:inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>{" "}
            Live
          </span>
        </div>
      </header>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex relative">
        {/* Sidebar */}
        <aside
          className={`
            fixed sm:static top-14 sm:top-auto left-0
            h-[calc(100vh-56px)] sm:h-auto
            z-20 sm:z-auto
            w-64 bg-white border-r sm:min-h-[calc(100vh-57px)] shrink-0 p-4 pt-3
            transform transition-transform duration-300 overflow-y-auto
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            sm:translate-x-0
          `}
        >
          <div className="flex items-center justify-between mb-3 pb-3 border-b sm:hidden">
            <span className="font-semibold text-gray-700 text-sm">
              Navigation
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>
          <nav className="space-y-1">
            {[
              {
                id: "home",
                label: "Overview",
                icon: LayoutDashboard,
                count: undefined,
              },
              {
                id: "tutors",
                label: "Tutors",
                icon: Users,
                count: counts.tutors,
              },
              {
                id: "jobs",
                label: "Tuition Jobs",
                icon: Briefcase,
                count: counts.jobs,
              },
              {
                id: "applications",
                label: "Applications",
                icon: FileText,
                count: counts.applications,
              },
              {
                id: "payments",
                label: "Payments",
                icon: CreditCard,
                count: counts.payments,
              },
            ].map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  view === id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setView(id as typeof view);
                  setSidebarOpen(false);
                }}
              >
                <span className="flex items-center gap-3">
                  <Icon size={16} />
                  {label}
                </span>
                {count !== undefined && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${view === id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}
                  >
                    {count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        <section className="flex-1 p-4 sm:p-6 min-w-0 min-h-[calc(100vh-57px)] bg-gray-50">
          {view === "home" && (
            <OverviewTab
              counts={counts}
              tutors={tutors}
              jobs={jobs}
              applications={applications}
              payments={payments}
              setView={setView}
            />
          )}
          {view === "tutors" && (
            <TutorsTab
              tutors={tutors}
              setTutors={setTutors}
              BACKEND_BASE={BACKEND_BASE}
            />
          )}
          {view === "jobs" && (
            <TuitionJobsTab
              jobs={jobs}
              setJobs={setJobs}
              BACKEND_BASE={BACKEND_BASE}
              applications={applications}
              setApplications={setApplications}
            />
          )}
          {view === "applications" && (
            <ApplicationsTab
              applications={applications}
              setApplications={setApplications}
              BACKEND_BASE={BACKEND_BASE}
            />
          )}
          {view === "payments" && <PaymentsTab payments={payments} />}
        </section>
      </div>
    </div>
  );
}
