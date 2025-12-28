import { X } from "lucide-react";
import { useState } from "react";

export interface EducationEntry {
  academy: string;
  year: string;
}

interface Props {
  data: EducationEntry[];
  setData: (data: EducationEntry[]) => void;
}

export default function Education({ data, setData }: Props) {
  const [errors, setErrors] = useState<{ academy?: string; year?: string }[]>(
    []
  );

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const updated = [...data];
    updated[index] = { ...updated[index], [name]: value };
    setData(updated);

    // clear error on typing
    const errCopy = [...errors];
    if (errCopy[index]) {
      errCopy[index] = { ...errCopy[index], [name]: undefined };
      setErrors(errCopy);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1950 + 1 },
    (_, i) => currentYear - i
  );

  // ✅ Add Another with validation
  const addField = () => {
    const lastIndex = data.length - 1;
    const lastEntry = data[lastIndex];

    const newErrors = [...errors];
    let hasError = false;

    if (!lastEntry.academy.trim()) {
      newErrors[lastIndex] = {
        ...newErrors[lastIndex],
        academy: "Academy name is required",
      };
      hasError = true;
    }

    if (!lastEntry.year) {
      newErrors[lastIndex] = {
        ...newErrors[lastIndex],
        year: "Passing year is required",
      };
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    setData([...data, { academy: "", year: "" }]);
    setErrors([...newErrors, {}]);
  };

  const removeField = (index: number) => {
    setData(data.filter((_, i) => i !== index));
    setErrors(errors.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 text-gray-700">
      {data.map((entry, index) => (
        <div key={index} className="md:flex gap-4 items-start">
          <div className="md:flex-1 mb-4 md:mb-0">
            <label className="block font-medium">Academy Name</label>
            <input
              type="text"
              name="academy"
              value={entry.academy}
              onChange={(e) => handleChange(index, e)}
              placeholder="Academy Name"
              className={`w-full border rounded-lg px-3 py-2 ${
                errors[index]?.academy ? "border-red-500" : ""
              }`}
            />
            {errors[index]?.academy && (
              <p className="text-red-500 text-sm">{errors[index].academy}</p>
            )}
          </div>

          <div className="md:flex-1">
            <label className="block font-medium">Passing Year</label>
            <select
              name="year"
              value={entry.year}
              onChange={(e) => handleChange(index, e)}
              className={`w-full border rounded-lg px-3 py-2.5 ${
                errors[index]?.year ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors[index]?.year && (
              <p className="text-red-500 text-sm">{errors[index].year}</p>
            )}
          </div>

          {data.length > 1 && (
            <button
              type="button"
              onClick={() => removeField(index)}
              className="w-fit text-red-500 font-semibold mt-6 cursor-pointer border-2 p-1 rounded-full hover:bg-red-800"
            >
              <X />
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addField}
        className=" px-4 py-2 rounded-lg font-semibold bg-[#0D24A0] hover:bg-blue-700 text-white transition-all duration-200 transform hover:scale-95 shadow-lg inline-block"
      >
        Add Another
      </button>
    </div>
  );
}
