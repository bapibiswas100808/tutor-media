import { NextRequest, NextResponse } from "next/server";
import { getOtp, deleteOtp, isOtpExpired, incrementAttempts } from "@/lib/otp";

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Get OTP from storage
    const storedOtpData = getOtp(email);

    if (!storedOtpData) {
      return NextResponse.json(
        { message: "No OTP found for this email. Please request a new one." },
        { status: 400 }
      );
    }

    // Check if OTP is expired
    if (isOtpExpired(storedOtpData)) {
      deleteOtp(email);
      return NextResponse.json(
        { message: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify OTP
    if (storedOtpData.code !== otp) {
      // Increment attempts and check limit
      const canRetry = incrementAttempts(email);
      if (!canRetry) {
        return NextResponse.json(
          { message: "Too many failed attempts. Please request a new OTP." },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: "Invalid OTP. Please try again." },
        { status: 400 }
      );
    }

    // OTP is valid - clean up
    deleteOtp(email);

    return NextResponse.json(
      { message: "Email verified successfully", verified: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { message: "Failed to verify OTP. Please try again." },
      { status: 500 }
    );
  }
}
