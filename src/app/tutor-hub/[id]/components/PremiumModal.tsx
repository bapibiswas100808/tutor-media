"use client";

import Image from "next/image";
import { CheckCircle, CircleX } from "lucide-react";
import Swal from "sweetalert2";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  amount: number;
  submitting: boolean;
  tutorId: number | string | undefined;
  onPlanSelect: (plan: string, amount: number) => void;
  onSubmitPayment: (payload: {
    sender: string;
    trxId: string;
    plan: string;
    amount: number;
    tutorId: number | string;
    method: string;
  }) => Promise<void>;
}

export default function PremiumModal({
  isOpen,
  onClose,
  selectedPlan,
  amount,
  submitting,
  tutorId,
  onPlanSelect,
  onSubmitPayment,
}: PremiumModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-3xl w-11/12 max-w-md p-8 relative shadow-xl">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <Image
            src="/images/premium.png"
            alt="Crown"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6 mt-12">
          Benefits of Becoming Premium Membership
        </h2>

        <div className="flex justify-center mb-6">
          <ul className="flex flex-col gap-2 text-gray-700 font-medium">
            {[
              "Guaranteed at least one tuition",
              "Nearby tuition notification alerts",
              "Always on top of results",
              "Prioritized during selection process",
            ].map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle size={20} className="text-yellow-600 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => onPlanSelect("1 year", 300)}
            className={`flex-1 py-2 rounded-xl border text-center transition cursor-pointer ${
              selectedPlan === "1 year"
                ? "bg-yellow-600 text-white border-yellow-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
            }`}
          >
            <div className="text-md font-bold">1 Year</div>
            <div className="text-lg font-bold">৳ 300.00</div>
          </button>

          <button
            onClick={() => onPlanSelect("2 years", 500)}
            className={`flex-1 py-2 rounded-xl border text-center transition cursor-pointer ${
              selectedPlan === "2 years"
                ? "bg-yellow-600 text-white border-yellow-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
            }`}
          >
            <div className="text-md font-bold">2 Years</div>
            <div className="text-lg font-bold">৳ 500.00</div>
          </button>
        </div>

        <button
          disabled={!selectedPlan || submitting}
          className={`w-full py-3 rounded-xl text-white font-semibold transition cursor-pointer ${
            selectedPlan
              ? "bg-yellow-600 hover:bg-yellow-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={() => {
            if (!selectedPlan || !tutorId) return;

            Swal.fire({
              title: "Pay with bKash (Send Money)",
              html: `
                <div style="margin-bottom:10px;font-size:18px;">
                  <span style="margin-left:6px;font-weight:600;color:#2563eb;">${selectedPlan} (৳ ${amount}.00)</span>
                </div>
                <p style="margin-bottom:10px;font-size:16px;">
                  <b>Send money</b> via <b>bKash</b> to the number below:
                </p>
                <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:12px;">
                  <span style="font-family:'Inter',system-ui,-apple-system,sans-serif;font-size:20px;font-weight:700;padding:8px 16px;background:linear-gradient(135deg,#fef3c7,#fde68a);border-radius:999px;color:#92400e;letter-spacing:1.2px;display:inline-block;">01990-539200</span>
                  <button onclick="navigator.clipboard.writeText('01990539200')" style="padding:6px 10px;background:#22c55e;color:white;border:none;border-radius:6px;cursor:pointer;">Copy</button>
                </div>
                <p style="font-size:16px;color:#555;margin-bottom:10px;line-height:1.5;">After sending money, enter your <b>bKash number</b> and <b>Transaction ID (CAPITAL LETTERS)</b>.</p>
                <div style="margin-bottom:8px;font-size:18px;"><b>Tutor ID:</b><span style="margin-left:6px;font-weight:600;color:#2563eb;">${tutorId}</span></div>
                <input id="sender" type="tel" inputmode="numeric" maxlength="11" placeholder="Your bKash Number" oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0,11)" style="width:100%;height:44px;padding:10px 14px;margin:8px 0;font-size:15px;border-radius:8px;border:1px solid #d1d5db;outline:none;box-sizing:border-box;transition:border-color 0.2s ease, box-shadow 0.2s ease;" onfocus="this.style.borderColor='#f59e0b'; this.style.boxShadow='0 0 0 2px rgba(245,158,11,0.25)'" onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"/>
                <input id="trxId" placeholder="Transaction ID (CAPITAL LETTERS)" oninput="this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '')" style="width:100%;height:44px;padding:10px 14px;margin-top:8px;font-size:15px;border-radius:8px;border:1px solid #d1d5db;outline:none;box-sizing:border-box;transition:border-color 0.2s ease, box-shadow 0.2s ease;" onfocus="this.style.borderColor='#f59e0b'; this.style.boxShadow='0 0 0 2px rgba(245,158,11,0.25)'" onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"/>
              `,
              confirmButtonText: "Submit Payment",
              confirmButtonColor: "#f59e0b",
              showCancelButton: true,
              preConfirm: ():
                | {
                    sender: string;
                    trxId: string;
                    plan: string;
                    amount: number;
                    tutorId: number | string;
                    method: string;
                  }
                | false => {
                const sender = (
                  document.getElementById("sender") as HTMLInputElement
                )?.value.trim();
                const trxId = (
                  document.getElementById("trxId") as HTMLInputElement
                )?.value.trim();

                if (!sender || !trxId) {
                  Swal.showValidationMessage(
                    "bKash number and Transaction ID are required",
                  );
                  return false;
                }
                if (!/^01[3-9]\d{8}$/.test(sender)) {
                  Swal.showValidationMessage("Invalid bKash number");
                  return false;
                }
                if (!/^[A-Z0-9]{10,15}$/.test(trxId)) {
                  Swal.showValidationMessage("Invalid Transaction ID");
                  return false;
                }

                return {
                  sender,
                  trxId,
                  plan: selectedPlan,
                  amount,
                  tutorId,
                  method: "bkash",
                };
              },
            }).then((result) => {
              if (result.isConfirmed && result.value) {
                onSubmitPayment(result.value);
              }
            });
          }}
        >
          Pay Now
        </button>

        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          <CircleX size={40} />
        </button>
      </div>
    </div>
  );
}
