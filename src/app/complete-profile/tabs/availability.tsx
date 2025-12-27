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
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, mode: e.target.value as AvailabilityData["mode"] });
  };

  const handleDayToggle = (day: string) => {
    if (data.days.includes(day)) {
      setData({ ...data, days: data.days.filter(d => d !== day) });
    } else {
      setData({ ...data, days: [...data.days, day] });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-2">Available Days</label>
        <div className="flex flex-wrap gap-2">
          {weekDays.map((day) => (
            <button
              key={day}
              type="button"
              aria-pressed={data.days.includes(day)}
              onClick={() => handleDayToggle(day)}
              className={`px-3 py-1 rounded-lg border ${
                data.days.includes(day)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-800 text-white border-gray-600"
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
          className="w-full border rounded-lg px-3 py-2 bg-gray-800 text-white"
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
