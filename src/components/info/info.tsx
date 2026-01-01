export default function Info({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div>
      <p className="text-sm font-semibold text-gray-500">{label}</p>
      <p className="text-gray-900 font-medium capitalize">{value}</p>
    </div>
  );
}
