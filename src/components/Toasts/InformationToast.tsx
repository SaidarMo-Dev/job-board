import { useState, useEffect } from "react";

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

export default function InformationToast({
  isOpen,
  onClose,
  title,
  description,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed w-full h-full inset-0 flex items-center justify-center z-1001 bg-black/25">
      <div
        className={`
          bg-sky-600 text-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4
          transform transition-all duration-300 ease-in-out
          ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
              <p className="text-sm opacity-90 mt-1">{description}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-sky-600 font-medium rounded hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
