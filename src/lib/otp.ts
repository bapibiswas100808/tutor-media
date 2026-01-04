// OTP Storage with in-memory implementation
// For production, replace this with a database solution (Redis, MongoDB, etc.)

interface OtpData {
  code: string;
  expiresAt: number;
  attempts: number;
  maxAttempts: number;
}

// Using Map for better memory management
const otpStore = new Map<string, OtpData>();

// Cleanup expired OTPs every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [email, data] of otpStore.entries()) {
    if (data.expiresAt < now) {
      otpStore.delete(email);
    }
  }
}, 5 * 60 * 1000);

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOtp(email: string, otp: string): void {
  otpStore.set(email, {
    code: otp,
    expiresAt: Date.now() + 10 * 60 * 1000, // Valid for 10 minutes
    attempts: 0,
    maxAttempts: 5,
  });
}

export function getOtp(email: string): OtpData | undefined {
  return otpStore.get(email);
}

export function deleteOtp(email: string): void {
  otpStore.delete(email);
}

export function incrementAttempts(email: string): boolean {
  const data = otpStore.get(email);
  if (!data) return false;

  data.attempts += 1;
  if (data.attempts >= data.maxAttempts) {
    deleteOtp(email);
    return false;
  }

  return true;
}

export function isOtpExpired(data: OtpData): boolean {
  return data.expiresAt < Date.now();
}
