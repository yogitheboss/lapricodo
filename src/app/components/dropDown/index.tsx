export default function DropDownContainer({
  label,
  options,
  priority,
  setPriority,
}: {
  label: string;
  options: string[];
  priority: string;
  setPriority: (priority: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
      </label>
      <select
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-amber-50"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
