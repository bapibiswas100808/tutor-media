import Image from "next/image";
import { ChangeEvent, useState } from "react";

export interface BasicInfoData {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  city: string;
  location: string;
  image?: string;
}

interface BasicInfoProps {
  data: BasicInfoData;
  setData: (data: BasicInfoData) => void;
}

export default function BasicInfo({ data, setData }: BasicInfoProps) {
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Partial<BasicInfoData>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });

    // clear error on typing
    if (errors[name as keyof BasicInfoData]) {
      setErrors({ ...errors, [name]: undefined });
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
          value={data.fullName}
          onChange={handleChange}
          className={`w-full border rounded-lg px-3 py-2 ${
            errors.fullName ? "border-red-500" : ""
          }`}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block font-medium">Email *</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className={`w-full border rounded-lg px-3 py-2 ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block font-medium">Phone *</label>
        <input
          type="tel"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          className={`w-full border rounded-lg px-3 py-2 ${
            errors.phone ? "border-red-500" : ""
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone}</p>
        )}
      </div>

      {/* Gender */}
      <div>
        <label className="block font-medium">Gender *</label>
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className={`w-full border rounded-lg px-3 py-2 bg-gray-800 ${
            errors.gender ? "border-red-500" : ""
          }`}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender}</p>
        )}
      </div>

      {/* City */}
      <div>
        <label className="block font-medium">City</label>
        <input
          type="text"
          name="city"
          value={data.city}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={data.location}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
    </div>
  );
}
