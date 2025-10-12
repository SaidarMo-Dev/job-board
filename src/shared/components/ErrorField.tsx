import { X } from "lucide-react";

export default function ErrorField({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-sm text-red-500 flex items-center gap-1">
      <X className="h-3 w-3" />
      <span>{message}</span>
    </p>
  );
}
