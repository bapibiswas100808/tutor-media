"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface BasicInfoData {
  email: string;
  password?: string;
  confirmPassword?: string;
  image?: string;
}

interface BasicInfoProps {
  data: BasicInfoData;
  setData: (data: BasicInfoData) => void;
}

export default function BasicInfo({ data, setData }: BasicInfoProps) {
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newData = { ...data, [name]: value };
    setData(newData);

    const newErrors: Record<string, string> = { ...errors };

    /* ---------- EMAIL VALIDATION ---------- */
    // if (name === "email") {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //   if (!value) {
    //     newErrors.email = "Email is required";
    //   } else if (!emailRegex.test(value)) {
    //     newErrors.email = "Invalid email address";
    //   } else {
    //     delete newErrors.email;
    //   }
    // }

    /* ---------- PASSWORD VALIDATION ---------- */
    if (name === "password" || name === "confirmPassword") {
      const password = name === "password" ? value : newData.password || "";
      const confirm =
        name === "confirmPassword" ? value : newData.confirmPassword || "";

      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      } else {
        delete newErrors.password;
      }

      if (!confirm) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (password !== confirm) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  /* ---------- IMAGE UPLOAD ---------- */
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );

      const result = await res.json();

      if (result.success) {
        setData({ ...data, image: result.data.url });
      }
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-5 text-gray-700">
      <div className="md:flex gap-4 items-end">
        {/* Profile Image */}
        <div className="flex-1 mb-4 md:mb-0">
          {data.image && (
            <div className="w-24 h-24 rounded-full mb-2 relative overflow-hidden">
              <Image
                src={data.image}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          )}
          <label className="block font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full border rounded-lg px-3 py-2"
          />

          {uploading && (
            <p className="text-sm text-blue-600 mt-1">Uploading...</p>
          )}
        </div>

        {/* Email */}
        <div className="flex-1">
          <label className="block font-medium">
            Email Address *
            <p className="text-sm text-gray-500 mt-1">
              Email is linked to your account and cannot be changed
            </p>
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            readOnly
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>

      <div className="md:flex gap-4 items-start">
        {/* Password */}
        <div className="flex-1 mb-4 md:mb-0">
          <label className="block font-medium">Password *</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full border rounded-lg px-3 py-2 pr-12 ${
                errors.password ? "border-red-500" : ""
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        {/* Confirm Password */}
        <div className="flex-1">
          <label className="block font-medium">Retype Password *</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              autoComplete="new-password"
              value={data.confirmPassword}
              onChange={handleChange}
              onPaste={(e) => e.preventDefault()}
              placeholder="Retype Password"
              className={`w-full border rounded-lg px-3 py-2 pr-12 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />

            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>
      </div>
    </div>
  );
}
