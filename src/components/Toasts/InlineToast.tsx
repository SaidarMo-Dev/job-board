import React from "react";
import { X } from "lucide-react";

type InlineToastProps = {
  type: "success" | "error" | "info" | "warning";
  message: string;
  onClose?: () => void;
};

const typeStyles: Record<InlineToastProps["type"], string> = {
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  warning: "bg-yellow-100 text-yellow-800",
};

const InlineToast: React.FC<InlineToastProps> = ({
  type,
  message,
  onClose,
}) => {
  return (
    <div
      className={`relative mb-2 mt-3 rounded-md px-4 py-2 text-sm ${typeStyles[type]}`}
    >
      {message}
      {onClose && (
        <button
          className="absolute right-2 top-2 text-inherit hover:opacity-70"
          onClick={onClose}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default InlineToast;
