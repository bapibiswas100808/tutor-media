"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CreditCard } from "lucide-react";
import { BkashPayment } from "./adminTypes";

const PAGE_SIZE = 10;

interface PaymentsTabProps {
  payments: BkashPayment[];
}

export default function PaymentsTab({ payments }: PaymentsTabProps) {
  const [paymentTutorIdQuery, setPaymentTutorIdQuery] = useState("");
  const [paymentsPage, setPaymentsPage] = useState(1);

  const filteredPayments = useMemo(() => {
    const q = paymentTutorIdQuery.trim();
    return q
      ? payments.filter((p) => String(p.tutorId ?? "").includes(q))
      : payments;
  }, [payments, paymentTutorIdQuery]);

  const paymentsTotalPages = Math.max(
    1,
    Math.ceil(filteredPayments.length / PAGE_SIZE),
  );

  const currentPaymentItems = filteredPayments.slice(
    (paymentsPage - 1) * PAGE_SIZE,
    paymentsPage * PAGE_SIZE,
  );

  useEffect(() => {
    if (paymentsPage > paymentsTotalPages) setPaymentsPage(paymentsTotalPages);
  }, [paymentsTotalPages, paymentsPage]);

  useEffect(() => setPaymentsPage(1), [paymentTutorIdQuery]);

  return (
    <div className="rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <CreditCard size={20} className="text-orange-500" />
        Payments
      </h2>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">
          {filteredPayments.length === 0 ? (
            <>Showing 0 of 0</>
          ) : (
            <>
              Showing {(paymentsPage - 1) * PAGE_SIZE + 1} -{" "}
              {Math.min(paymentsPage * PAGE_SIZE, filteredPayments.length)} of{" "}
              {filteredPayments.length}
            </>
          )}
        </div>
        <div className="flex items-center gap-2 border rounded px-2 py-1">
          <input
            type="search"
            value={paymentTutorIdQuery}
            onChange={(e) =>
              setPaymentTutorIdQuery(e.target.value.replace(/\D/g, ""))
            }
            placeholder="Search by Tutor ID"
            className="outline-none px-2 py-1 text-sm w-40 bg-transparent"
          />
          {paymentTutorIdQuery && (
            <button
              type="button"
              onClick={() => setPaymentTutorIdQuery("")}
              className="text-xs px-2 py-1 rounded-md text-gray-500 hover:text-white hover:bg-red-500 transition"
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
              <th className="px-3 py-2 font-semibold text-gray-600">
                Tutor ID
              </th>
              <th className="px-3 py-2 font-semibold text-gray-600">
                Transaction ID
              </th>
              <th className="px-3 py-2 font-semibold text-gray-600">Plan</th>
              <th className="px-3 py-2 font-semibold text-gray-600">Amount</th>
              <th className="px-3 py-2 font-semibold text-gray-600">Phone</th>
              <th className="px-3 py-2 font-semibold text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentPaymentItems.length === 0 ? (
              <tr className="border-t">
                <td className="px-3 py-4 text-gray-400 text-center" colSpan={6}>
                  No payments found
                </td>
              </tr>
            ) : (
              currentPaymentItems.map((p: BkashPayment) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-blue-50/40 transition-colors"
                >
                  <td className="px-3 py-2">{p.tutorId || "N/A"}</td>
                  <td className="px-3 py-2 font-mono text-xs">
                    {p.trxId || p.transactionId || "N/A"}
                  </td>
                  <td className="px-3 py-2 capitalize">{p.plan || "N/A"}</td>
                  <td className="px-3 py-2">৳{p.amount || "0"}</td>
                  <td className="px-3 py-2">{p.sender || "N/A"}</td>
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

      <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
        <button
          disabled={paymentsPage === 1}
          onClick={() => setPaymentsPage((p) => Math.max(1, p - 1))}
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {(() => {
          const pages = [];
          const start = Math.max(1, paymentsPage - 2);
          const end = Math.min(paymentsTotalPages, paymentsPage + 2);

          if (start > 1) {
            pages.push(
              <button
                key={1}
                onClick={() => setPaymentsPage(1)}
                className="px-3 py-2 bg-gray-100 rounded"
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
                onClick={() => setPaymentsPage(i)}
                className={`px-3 py-2 rounded ${
                  i === paymentsPage ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                {i}
              </button>,
            );
          }

          if (end < paymentsTotalPages) {
            if (end < paymentsTotalPages - 1)
              pages.push(<span key="end-ellipsis">...</span>);
            pages.push(
              <button
                key={paymentsTotalPages}
                onClick={() => setPaymentsPage(paymentsTotalPages)}
                className="px-3 py-2 bg-gray-100 rounded"
              >
                {paymentsTotalPages}
              </button>,
            );
          }

          return pages;
        })()}

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
  );
}
