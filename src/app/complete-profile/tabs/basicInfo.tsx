import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface BasicInfoData {
  fullName?: string;
  email?: string;
  phone?: string;
  gender?: string;
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // update data
    const newData = { ...data, [name]: value };
    setData(newData);

    // clear field-specific error
    if (errors[name]) {
      const { [name]: _, ...rest } = errors;
      setErrors(rest);
    }

    // Password validations
    if (name === "password" || name === "confirmPassword") {
      const pass = name === "password" ? value : newData.password || "";
      const confirm =
        name === "confirmPassword" ? value : newData.confirmPassword || "";

      // password length check
      if (
        newData.password &&
        newData.password.length > 0 &&
        newData.password.length < 6
      ) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 6 characters",
        }));
      } else {
        setErrors((prev) => {
          const { password, ...rest } = prev;
          return rest;
        });
      }

      // match check
      if (pass && confirm && pass !== confirm) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prev) => {
          const { confirmPassword, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  // 🔹 Image upload
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
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Profile Image */}
      <div>
        <label className="block font-medium">Profile Image</label>

        {data.image && (
          <div className="w-24 h-24 rounded-full mb-2 relative overflow-hidden">
            <Image
              src={data.image}
              alt="Profile"
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

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

      {/* Full Name */}
      <div>
        <label className="block font-medium">Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={data.fullName || ""}
          onChange={handleChange}
          className={`w-full border rounded-lg px-3 py-2 ${
            errors["fullName"] ? "border-red-500" : ""
          }`}
        />
        {errors["fullName"] && (
          <p className="text-red-500 text-sm">{errors["fullName"]}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block font-medium">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={data.password || ""}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 pr-12 ${
              errors["password"] ? "border-red-500" : ""
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 p-1"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        {errors["password"] && (
          <p className="text-red-500 text-sm">{errors["password"]}</p>
        )}
      </div>

      {/* Retype Password */}
      <div>
        <label className="block font-medium">Retype Password</label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={data.confirmPassword || ""}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 pr-12 ${
              errors["confirmPassword"] ? "border-red-500" : ""
            }`}
          />

          <button
            type="button"
            onClick={() => setShowConfirm((s) => !s)}
            aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 p-1"
          >
            {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        {errors["confirmPassword"] && (
          <p className="text-red-500 text-sm">{errors["confirmPassword"]}</p>
        )}
      </div>
    </div>
  );
}
