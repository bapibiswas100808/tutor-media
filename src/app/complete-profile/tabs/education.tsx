import { ChangeEvent } from "react";

export interface EducationEntry {
  academy: string;
  year: string;
}

interface Props {
  data: EducationEntry[];
  setData: (data: EducationEntry[]) => void;
}

export default function Education({ data, setData }: Props) {
  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [e.target.name]: e.target.value };
    setData(newData);
  };

  const addField = () => {
    setData([...data, { academy: "", year: "" }]);
  };

  const removeField = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <div className="space-y-4">
      {data.map((entry, index) => (
        <div key={index} className="flex gap-4 items-center">
          <div className="flex-1">
            <label className="block font-medium">Academy Name</label>
            <input
              type="text"
              name="academy"
              value={entry.academy}
              onChange={(e) => handleChange(index, e)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Passing Year</label>
            <input
              type="text"
              name="year"
              value={entry.year}
              onChange={(e) => handleChange(index, e)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          {data.length > 1 && (
            <button
              type="button"
              onClick={() => removeField(index)}
              className="text-red-500 font-semibold mt-6"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addField}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
      >
        Add Another
      </button>
    </div>
  );
}
