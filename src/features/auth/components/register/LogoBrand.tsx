import { Link } from "react-router";

export function LogoBrand() {
  return (
    <div className="text-center mb-8">
      <div className="text-center mb-5 mt-5">
        <Link
          to="/"
          className="text-2xl font-bold text-sky-600 hover:text-sky-600 transition-colors"
        >
          iLink
        </Link>
      </div>
    </div>
  );
}
