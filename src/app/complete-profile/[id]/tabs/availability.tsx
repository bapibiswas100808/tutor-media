import { ChangeEvent } from "react";

export interface AvailabilityData {
  days: string[];
  mode: "Online" | "Offline" | "Hybrid" | "";
}

interface Props {
  data: AvailabilityData;
  setData: (data: AvailabilityData) => void;
}

export default function Availability({ data, setData }: Props) {
  const weekDays = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, mode: e.target.value as AvailabilityData["mode"] });
  };

  const handleDayToggle = (day: string) => {
    if (data.days.includes(day)) {
      setData({ ...data, days: data.days.filter((d) => d !== day) });
    } else {
      setData({ ...data, days: [...data.days, day] });
    }
  };

  return (
    <div className="space-y-4 text-gray-700">
      <div>
        <label className="block font-medium mb-2">Available Days</label>
        <div className="flex flex-wrap gap-2">
          {weekDays.map((day) => (
            <button
              key={day}
              type="button"
              aria-pressed={data.days.includes(day)}
              onClick={() => handleDayToggle(day)}
              className={`px-3 py-2 rounded-lg border  ${
                data.days.includes(day)
                  ? "bg-[#0C259F] text-white border-[#0C259F]"
                  : "bg-gray-400 text-white border-gray-200"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-2">Mode</label>
        <select
          value={data.mode}
          onChange={handleModeChange}
          className="w-full border rounded-lg px-3 py-2.5"
          disabled={data.days.length === 0}
        >
          <option value="">Select Mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>
    </div>
  );
}
