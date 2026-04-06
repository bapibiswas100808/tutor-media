import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { AdminProvider } from "@/context/AdminContext";
import BackToTop from "@/components/common/BackToTop";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="facebook-domain-verification"
          content="ly8tfdgp0rx6r4sz1sxuaxq0grw63n"
        />
      </head>

      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <AdminProvider>
          <AuthProvider>
            <Header />
            <div className="pt-16">{children}</div>
            <BackToTop />
            <Footer />
          </AuthProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
