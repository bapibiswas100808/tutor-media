import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Tutor Media",
  description:
    "Privacy Policy for Tutor Media - Learn how we protect your data",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-90">
            Tutor Media - Last Updated: December 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <article className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Intro */}
          <section className="mb-12">
            <p className="text-gray-700 text-lg leading-relaxed">
              At Tutor Media, trust is the foundation of our relationship with
              parents, students, and tutors. We are committed to protecting your
              privacy and ensuring the security of your personal information.
              This Privacy Policy outlines how we collect, use, and safeguard
              your data when you use our website and services.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              By accessing or using Tutor Media, you agree to the terms of this
              Privacy Policy.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We collect information to provide you with a personalized and safe
              tutoring experience.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Personal Information
                </h3>
                <p className="text-gray-700 ml-4">
                  When you register as a guardian, student, or tutor, we may
                  collect your name, email address, phone number, mailing
                  address, and NID/Student ID copies (for verification
                  purposes).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Educational Information
                </h3>
                <p className="text-gray-700 ml-4">
                  Class, subject requirements, curriculum (Bangla/English
                  Medium), and academic goals to match you with the right
                  mentor.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Payment Information
                </h3>
                <p className="text-gray-700 ml-4">
                  If you make payments through our platform, transaction details
                  are processed securely. We do not store sensitive card
                  information on our servers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Usage Data
                </h3>
                <p className="text-gray-700 ml-4">
                  We may collect non-personal data such as your IP address,
                  browser type, and device information to improve our
                  website&apos;s performance and user experience.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We use your data strictly to deliver and improve our services:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-4">
                <span className="text-blue-600 font-bold shrink-0 mt-1">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Tutor Matching
                  </h3>
                  <p className="text-gray-700">
                    To connect students with the most suitable tutors based on
                    location, subjects, and preferences.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-600 font-bold shrink-0 mt-1">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Verification & Safety
                  </h3>
                  <p className="text-gray-700">
                    To verify the identity of tutors and guardians, ensuring a
                    safe learning environment for everyone.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-600 font-bold shrink-0 mt-1">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Communication</h3>
                  <p className="text-gray-700">
                    To send you updates regarding your tuition request, account
                    status, important notices, or promotional offers (which you
                    can opt-out of).
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-600 font-bold shrink-0 mt-1">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Service Improvement
                  </h3>
                  <p className="text-gray-700">
                    To analyze user behavior and feedback, helping us enhance
                    our platform&apos;s functionality.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
              3. Data Protection & Security
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We implement robust security measures to protect your personal
              information from unauthorized access, alteration, or disclosure.
            </p>
            <ul className="space-y-3">
              <li className="flex gap-4">
                <span className="text-blue-600 font-bold shrink-0 mt-1">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Encryption</h3>
                  <p className="text-gray-700">
                    Sensitive data transmission is encrypted using SSL (Secure
                    Socket Layer) technology.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-600 font-bold shrink-0 mt-1">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Access Control
                  </h3>
                  <p className="text-gray-700">
                    Only authorized Tutor Media personnel have access to your
                    personal data for operational purposes.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-600 font-bold shrink-0 mt-1">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    No Third-Party Sale
                  </h3>
                  <p className="text-gray-700">
                    We never sell, trade, or rent your personal identification
                    information to third parties for marketing purposes.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
              4. Sharing of Information
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We respect your privacy and only share information in the
              following limited circumstances:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-4">
                <span className="text-blue-600 font-bold shrink-0 mt-1">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    With Tutors/Guardians
                  </h3>
                  <p className="text-gray-700">
                    Contact information is shared only after a tuition match is
                    confirmed to facilitate communication between the tutor and
                    the guardian.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-600 font-bold shrink-0 mt-1">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Legal Requirements
                  </h3>
                  <p className="text-gray-700">
                    If required by law or to protect the rights and safety of
                    Tutor Media and its users.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
              5. Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our website uses &quot;cookies&quot; to enhance your browsing
              experience. Cookies help us remember your preferences and
              recognize you on return visits. You can choose to disable cookies
              through your browser settings, though this may limit some features
              of our website.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
              6. Your Rights
            </h2>
            <ul className="space-y-3">
              <li className="flex gap-4">
                <span className="text-blue-600 font-bold shrink-0 mt-1">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Access & Correction
                  </h3>
                  <p className="text-gray-700">
                    You have the right to access the personal information we
                    hold about you and request corrections if it is inaccurate.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-600 font-bold shrink-0 mt-1">•</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Account Deletion
                  </h3>
                  <p className="text-gray-700">
                    You may request the deletion of your account and personal
                    data from our system by contacting our support team.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
              7. Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Tutor Media reserves the right to update this Privacy Policy at
              any time. We encourage you to review this page periodically to
              stay informed about how we are protecting your information.
            </p>
          </section>

          {/* Section 8 - Contact */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
              8. Contact Us
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              If you have any questions or concerns regarding this Privacy
              Policy, please contact us at:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Email */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Email</h3>
                </div>
                <p className="text-gray-700 break-all">
                  <a
                    href="mailto:support@tutormedia.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@tutormediabd.com
                  </a>
                </p>
              </div>

              {/* Phone */}
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                </div>
                <p className="text-gray-700">
                  <a
                    href="tel:+8801990539200"
                    className="text-purple-600 hover:underline"
                  >
                    01990-539200
                  </a>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  [WhatsApp Available]
                </p>
              </div>

              {/* Address */}
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Address</h3>
                </div>
                <p className="text-gray-700">Khulna, Bangladesh - 9100</p>
              </div>
            </div>
          </section>
        </article>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-gray-700 text-sm">
            <strong>Last Updated:</strong> December 2025 | This Privacy Policy
            is effective immediately upon posting to our website. We may modify
            this Privacy Policy at any time without notice. Your continued use
            of our service following any changes constitutes your acceptance of
            the new Privacy Policy.
          </p>
        </div>
      </div>
    </main>
  );
}
