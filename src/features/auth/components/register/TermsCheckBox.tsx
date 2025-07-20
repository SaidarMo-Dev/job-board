import { Link } from "react-router";

export function TermsCheckBox({
  onChange,
  checked,
}: {
  onChange: (value: boolean) => void;
  checked: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-start space-x-2">
        <input
          id="terms"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 mt-1 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
        />
        <label
          htmlFor="terms"
          className="text-sm text-gray-600 cursor-pointer leading-5"
        >
          I agree to the
          <Link to="" className="text-sky-600 hover:text-sky-700 font-medium">
            Terms of Service
          </Link>
          and
          <Link to="" className="text-sky-600 hover:text-sky-700 font-medium">
            Privacy Policy
          </Link>
        </label>
      </div>
    </div>
  );
}
