import { ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function AddEditHeader() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col h-16">
        <Link
          to={ROUTES.ADMIN.COMPANIES.LIST}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 -ml-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Companies
        </Link>
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-900">Add New Company</h1>
          <p className="text-sm text-gray-600">Create a new company profile</p>
        </div>
      </div>
    </div>
  );
}
