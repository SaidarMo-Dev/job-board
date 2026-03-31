import { MinusCircle } from "lucide-react";

export default function NoOpenings({
  title = "No openings",
  className,
}: {
  title?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full ${className || ""}`}
    >
      <MinusCircle size={14} />
      {title}
    </span>
  );
}
