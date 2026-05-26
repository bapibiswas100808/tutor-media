"use client";

import { ArrowUpRight, Users } from "lucide-react";
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
    { name: "Tutor Guidelines", href: "/blog" },
    { name: "Success Stories", href: "/blog" },
  ],
  Resources: [
    { name: "Blog", href: "/blog" },
    { name: "Study Materials", href: "/blog" },
    { name: "Learning Tips", href: "/blog" },
    { name: "Parent Guide", href: "/blog" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1CCEtYXsc8",
    icon: "/images/socialMedia/facebook.png",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@tutormediabd?si=VF46LILnVuZn941X",
    icon: "/images/socialMedia/youtube.png",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/tutor-media",
    icon: "/images/socialMedia/linkedIn.png",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/message/ZMWV33J4K2MPO1",
    icon: "/images/socialMedia/whatsApp.png",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@tutormedia.edu?_r=1&_t=ZS-92731CQwSdY",
    icon: "/images/socialMedia/tikTok.png",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/tutor_media",
    icon: "/images/socialMedia/instagram.png",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#081a76] text-white">
      <div className="container mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section Here*/}
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
            <p className="text-gray-300 my-4 max-w-md">
              Connecting students with qualified tutors across Bangladesh.
              Making quality education accessible to everyone.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group inline-flex items-center justify-center rounded-full 
                 transition-transform duration-300 hover:scale-120 
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={36}
                    height={36}
                    className="object-contain transition-opacity duration-300 group-hover:opacity-80"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="relative text-lg font-semibold mb-4 inline-block">
                {title}
                <span className="absolute left-0 -bottom-1 h-0.5 w-8 bg-blue-300 rounded-full" />
              </h3>

              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 relative transition-colors duration-200 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
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
        <div className="border-t border-blue-800 mt-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Contact */}
            <div>
              <h4 className="relative text-lg font-semibold mb-4 inline-block">
                Contact Us
                <span className="absolute left-0 -bottom-1 h-0.5 w-8 bg-blue-300 rounded-full" />
              </h4>

              <div className="space-y-2 text-gray-300">
                <p>📧 contact@tutormediabd.com</p>
                <p>📞 +880 1990-539200</p>
              </div>
            </div>

            {/* Address */}
            <div>
              <h4 className="relative text-lg font-semibold mb-4 inline-block">
                Office Address
                <span className="absolute left-0 -bottom-1 h-0.5 w-8 bg-blue-300 rounded-full" />
              </h4>

              <p className="text-gray-300 leading-relaxed">
                Khulna,
                <br />
                Khulna Division, Bangladesh
              </p>
            </div>

            {/* Community */}
            <div>
              <h4 className="relative text-lg font-semibold mb-4 inline-block">
                Join Our Community
                {/* animated underline */}
                <span className="absolute left-0 -bottom-1 h-0.5 w-8 bg-blue-300 rounded-full" />
              </h4>

              <Link
                href="https://www.facebook.com/share/g/1ARmGtg3fq"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-xl border border-[#2B7FFF]/40 bg-blue-800 px-5 py-3 md:px-6 md:py-4 text-sm md:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[#2B7FFF]/30"
              >
                {/* glow overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#2B7FFF]/20 to-[#FFD230]/20" />

                {/* Icon */}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
                  <Users className="h-5 w-5 md:h-7 md:w-7 text-[#FFD230]" />
                </div>

                {/* Text */}
                <div className="relative flex flex-col items-start text-left -space-y-1">
                  <span className="text-sm md:text-lg font-bold text-gray-100/80">Tutors</span>
                  <span className="text-lg md:text-xl text-gray-100/80">Community</span>
                </div>

                {/* Arrow */}
                <ArrowUpRight className="relative h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>

            {/* Support */}
            <div>
              <h4 className="relative text-lg font-semibold mb-4 inline-block">
                Support Hours
                <span className="absolute left-0 -bottom-1 h-0.5 w-8 bg-blue-300 rounded-full" />
              </h4>

              <div className="space-y-2 text-gray-300">
                <p>Monday – Thursday: 9:00 AM – 6:00 PM</p>
                <p>Friday – Saturday: 10:00 AM – 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-100 text-sm">
            © {new Date().getFullYear()} Tutor Media. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="text-blue-300 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-blue-300 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-blue-300 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
