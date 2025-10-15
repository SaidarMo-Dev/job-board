import AddEditHeader from "../components/AddEditHeader";
import CompanyForm from "../components/CompanyForm";
import type { FormMode } from "@/shared/types/formModes";

interface AddEditCompanyProps {
  mode: FormMode;
}

export default function AddEditCompany({ mode = "Add" }: AddEditCompanyProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <AddEditHeader />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CompanyForm mode={mode} />
      </main>
    </div>
  );
}
