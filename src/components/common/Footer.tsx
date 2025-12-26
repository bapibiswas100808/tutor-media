"use client";

import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  "For Students": [
    { name: "Find a Tutor", href: "/tutor-hub" },
    { name: "Hire a Tutor", href: "/hire-tutor" },
    { name: "Tuition Jobs", href: "/tuition-jobs" },
    { name: "Categories", href: "/categories" },
  ],
  "For Tutors": [
    { name: "Become a Tutor", href: "/become-a-tutor" },
    { name: "Available Jobs", href: "/tuition-jobs" },
    { name: "Tutor Guidelines", href: "#" },
    { name: "Success Stories", href: "#" },
  ],
  Resources: [
    { name: "Blog", href: "/blog" },
    { name: "Study Materials", href: "/shop" },
    { name: "Learning Tips", href: "#" },
    { name: "Parent Guide", href: "#" },
  ],
  //   Company: [
  //     { name: "About Us", href: "#" },
  //     { name: "Contact", href: "#" },
  //     { name: "Privacy Policy", href: "#" },
  //     { name: "Terms of Service", href: "#" },
  //   ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0C259F] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo1.png"
                alt="Tutor Media Logo"
                width={140}
                height={40}
                priority
                className="object-contain"
              />
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Connecting students with qualified tutors across Bangladesh.
              Making quality education accessible to everyone.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <Link
                href="https://www.facebook.com/share/1CCEtYXsc8"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="w-6 h-6" />
              </Link>

              {/* YouTube */}
              <Link
                href="https://youtube.com/@tutormediabd?si=VF46LILnVuZn941X"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <Youtube className="w-7 h-7" />
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://www.linkedin.com/company/tutor-media"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-6 h-6" />
              </Link>

              {/* WhatsApp */}
              <Link
                href="https://wa.me/https://wa.me/message/ZMWV33J4K2MPO1"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">WhatsApp</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.04 2C6.53 2 2 6.48 2 11.98c0 1.93.5 3.73 1.45 5.33L2 22l4.86-1.39a10.01 10.01 0 0 0 5.18 1.4h.01c5.5 0 10-4.48 10-9.98C22.05 6.48 17.55 2 12.04 2zm5.88 14.37c-.25.7-1.45 1.35-2.01 1.43-.52.08-1.17.11-3.78-.81-3.35-1.18-5.5-4.82-5.67-5.04-.17-.23-1.36-1.82-1.36-3.47 0-1.65.87-2.46 1.18-2.8.3-.34.67-.43.89-.43h.64c.2 0 .48-.08.75.57.27.65.92 2.26 1 2.42.08.16.13.35.02.58-.11.23-.17.35-.33.54-.16.19-.35.42-.5.56-.17.17-.35.35-.15.7.2.35.9 1.48 1.93 2.4 1.32 1.18 2.44 1.55 2.79 1.72.35.17.55.15.75-.09.2-.23.86-1 1.09-1.35.23-.35.46-.29.77-.17.31.12 1.97.93 2.3 1.1.33.17.55.25.63.39.08.14.08.81-.17 1.51z" />
                </svg>
              </Link>

              {/* TikTok */}
              <Link
                href="https://www.tiktok.com/@tutormedia.edu?_r=1&_t=ZS-92731CQwSdY"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">TikTok</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.75 2.9 2.9 0 0 1 2.31-4.64 2.88 2.88 0 0 1 .88.13V9.4a5.85 5.85 0 0 0-1-.08A5.7 5.7 0 0 0 5 20.41a5.7 5.7 0 0 0 5.73-.37 5.64 5.64 0 0 0 1.75-2.39A5.63 5.63 0 0 0 13.14 20v-7.86a7.54 7.54 0 0 0 4.58 1.34v-3.4a4.76 4.76 0 0 1-.87-.07z" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                href="https://www.instagram.com/tutor_media"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Contact Us</h4>
              <p className="text-gray-300">📧 tutor.media9301@gmail.com</p>
              <p className="text-gray-300">📞 +880 1990-539200</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Office Address</h4>
              <p className="text-gray-300">
                Khulna,
                <br />
                Khulna Division, Bangladesh
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Support Hours</h4>
              <p className="text-gray-300">
                Monday – Thursday: 9:00 AM – 6:00 PM
              </p>
              <p className="text-gray-300">
                Friday – Saturday: 10:00 AM – 4:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Tutor Media. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
