import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { AdminProvider } from "@/context/AdminContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tutor Media - Connect Students with Perfect Tutors",
  description:
    "Find qualified tutors for home, online, and group tutoring. Connect with experienced educators across all subjects in Bangladesh.",
  keywords:
    "tutoring, education, tutor, student, learning, Bangladesh, online tutoring, home tutoring",
  authors: [{ name: "Tutor Media" }],
  icons: {
    icon: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AdminProvider>
          <AuthProvider>
            <Header />
            <div className="pt-16">{children}</div>
            <Footer />
          </AuthProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
