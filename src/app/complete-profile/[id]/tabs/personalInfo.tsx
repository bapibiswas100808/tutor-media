"use client";

export interface PersonalInfoData {
  additionalNumber?: string;
  address?: string;
  gender?: "Male" | "Female" | "Other" | "";
  dateOfBirth?: string;
  religion?: string;
  identityType?: string;
  nationality?: string;
  facebookProfile?: string;
  linkedinProfile?: string;

  fatherName?: string;
  fatherNumber?: string;
  motherName?: string;
  motherNumber?: string;

  overview?: string;

  emergencyName?: string;
  emergencyRelation?: string;
  emergencyNumber?: string;
  emergencyAddress?: string;
}

import { ChangeEvent } from "react";

interface PersonalInfoProps {
  data: PersonalInfoData;
  setData: React.Dispatch<React.SetStateAction<PersonalInfoData>>;
}

export default function PersonalInformation({
  data,
  setData,
}: PersonalInfoProps) {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8 text-gray-700">
      {/* -------- Personal Information -------- */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Additional Phone Number</label>
            <input
              type="tel"
              name="additionalNumber"
              placeholder="Additional Phone Number (e.g. +880 17XXXXXXXX)"
              value={data.additionalNumber || ""}
              onChange={handleChange}
              autoComplete="tel"
              inputMode="tel"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Select Gender</label>
            <select
              name="gender"
              value={data.gender || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2.5"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
  <label
    htmlFor="dateOfBirth"
    className="block text-sm font-medium text-gray-700"
  >
    Date of Birth
  </label>

  <input
    id="dateOfBirth"
    type="date"
    name="dateOfBirth"
    value={data.dateOfBirth || ""}
    onChange={handleChange}
    max={new Date().toISOString().split("T")[0]}
    className="w-full border rounded-lg px-3 py-2"
  />
</div>


          <div>
            <label className="block font-medium">Religion</label>
            <select
              name="religion"
              value={data.religion || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2.5"
            >
              <option value="">Select Religion</option>
              <option value="Islam">Islam</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Christianity">Christianity</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Identity Type</label>
            <select
              name="identityType"
              value={data.identityType || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2.5"
            >
              <option value="">Select Identity Type</option>
              <option value="NID">NID</option>
              <option value="Passport">Passport</option>
              <option value="Birth Certificate">Birth Certificate</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Nationality</label>
            <select
              name="nationality"
              value={data.nationality || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2.5"
            >
              <option value="">Select Nationality</option>
              <option value="Bangladeshi">Bangladeshi</option>
              <option value="Indian">Indian</option>
              <option value="Pakistani">Pakistani</option>
              <option value="Nepali">Nepali</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Facebook Profile</label>
            <input
              name="facebookProfile"
              placeholder="Facebook Profile Link"
              value={data.facebookProfile || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">LinkedIn Profile</label>
            <input
              name="linkedinProfile"
              placeholder="LinkedIn Profile Link"
              value={data.linkedinProfile || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Father&apos;s Name</label>
            <input
              name="fatherName"
              placeholder="Father's Name"
              value={data.fatherName || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Father&apos;s Number</label>
            <input
              name="fatherNumber"
              placeholder="Father's Number"
              value={data.fatherNumber || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Mother&apos;s Name</label>
            <input
              name="motherName"
              placeholder="Mother's Name"
              value={data.motherName || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Mother&apos;s Number</label>
            <input
              name="motherNumber"
              placeholder="Mother's Number"
              value={data.motherNumber || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-medium">Overview</label>
          <textarea
            name="overview"
            placeholder="Write a short overview about yourself"
            value={data.overview || ""}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 "
          />
        </div>
      </div>

      {/* -------- Emergency Information -------- */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Emergency Information
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Emergency Contact Name</label>
            <input
              name="emergencyName"
              placeholder="Emergency Contact Name"
              value={data.emergencyName || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Relation</label>
            <input
              name="emergencyRelation"
              placeholder="Relation"
              value={data.emergencyRelation || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              Emergency Contact Number
            </label>
            <input
              name="emergencyNumber"
              placeholder="Emergency Number"
              value={data.emergencyNumber || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Emergency Address</label>
            <input
              name="emergencyAddress"
              placeholder="Emergency Address"
              value={data.emergencyAddress || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
