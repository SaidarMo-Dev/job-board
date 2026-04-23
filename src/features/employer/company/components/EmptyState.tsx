import React from "react";
import { Building2, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onStart: () => void;
}

const CompanyEmptyState: React.FC<EmptyStateProps> = ({ onStart }) => {

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-white border-2 border-dashed border-slate-200 rounded-2xl mx-8 my-4">
      {/* Icon Container */}
      <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-sky-50 text-primary">
        <Building2 className="w-10 h-10" />
      </div>

      {/* Text Content */}
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        Create your company profile
      </h2>
      <p className="max-w-md mb-8 text-slate-500">
        You haven't set up a company profile yet. Build your brand identity to
        start posting jobs and attracting the right candidates to your team.
      </p>

      {/* Call to Action */}
      <Button
        onClick={onStart}
        className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all rounded-lg bg-primary hover:bg-primary-hover active:scale-95 shadow-lg shadow-sky-700/20"
      >
        <PlusIcon className="w-5 h-5" />
        Create Profile Now
      </Button>

      <p className="mt-4 text-xs text-slate-400">
        Takes less than 3 minutes to set up.
      </p>
    </div>
  );
};

export default CompanyEmptyState;
