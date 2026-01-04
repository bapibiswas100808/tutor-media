import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateOtp, storeOtp, getOtp } from "@/lib/otp";

// Configure your email service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if OTP was recently sent (rate limiting - 30 seconds)
    const existingOtp = getOtp(email);
    if (existingOtp && existingOtp.expiresAt > Date.now() - 30000) {
      return NextResponse.json(
        {
          message:
            "OTP already sent. Please wait 30 seconds before requesting a new one.",
        },
        { status: 429 }
      );
    }

    // Generate and store OTP
    const otp = generateOtp();
    storeOtp(email, otp);

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Email Verification OTP - TutorMedia",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333; margin-top: 0;">Email Verification</h2>
            <p style="color: #666; font-size: 16px;">
              Your OTP code for TutorMedia email verification is:
            </p>
            <div style="background-color: #fff; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <p style="font-size: 32px; font-weight: bold; color: #16a34a; letter-spacing: 5px; margin: 0;">
                ${otp}
              </p>
            </div>
            <p style="color: #666; font-size: 14px;">
              This OTP is valid for 10 minutes.
            </p>
            <p style="color: #666; font-size: 14px;">
              If you didn't request this code, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px; text-align: center;">
              © TutorMedia. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "OTP sent successfully to your email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { message: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }
}
