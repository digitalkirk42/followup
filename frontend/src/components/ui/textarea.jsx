export function Textarea({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      rows={4}
    />
  );
}
