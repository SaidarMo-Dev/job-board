import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

function JobLinks({
  categories,
  onClick,
}: {
  categories: { name: string; href: string }[];
  onClick: () => void;
}) {
  return (
    <>
      {categories.map((cat) => (
        <Link
          key={cat.name}
          to={cat.href}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-sky-600"
          onClick={onClick}
        >
          {cat.name}
        </Link>
      ))}
      <div className="border-t border-gray-100 mt-1 pt-1">
        <Link
          to="/jobs"
          className="block px-4 py-2 font-medium text-sky-600 hover:bg-blue-50"
          onClick={onClick}
        >
          View All Jobs
        </Link>
      </div>
    </>
  );
}

export function JobDropdown({
  categories,
  onClose,
  isMobile,
}: {
  categories: { name: string; href: string }[];
  onClose?: () => void;
  isMobile?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if click happened outside of the dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false); // close the dropdown
      }
    }

    // Listen to clicks on the whole document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      {isMobile ? (
        <div className="py-2">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center text-gray-600 hover:text-sky-600 font-medium"
          >
            Find Jobs
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="pl-4 space-y-2 mt-1">
              <JobLinks
                categories={categories}
                onClick={() => setOpen(false)}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center text-gray-700 hover:text-sky-600 px-2 py-2 font-medium"
          >
            Find Jobs
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
              <JobLinks
                categories={categories}
                onClick={() => setOpen(false)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
