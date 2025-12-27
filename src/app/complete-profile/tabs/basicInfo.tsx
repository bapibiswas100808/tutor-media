import { ChangeEvent } from "react";

export interface BasicInfoData {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  city: string;
  location: string;
}

interface BasicInfoProps {
  data: BasicInfoData;
  setData: (data: BasicInfoData) => void;
}

export default function BasicInfo({ data, setData }: BasicInfoProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={data.fullName}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Phone</label>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Gender</label>
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

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
