"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import type { JobResponse } from "../../jobs/jobTypes";
interface SuccessStepProps {
  jobData: JobResponse;
  onReset: () => void;
}

export function SuccessStep({ jobData, onReset }: SuccessStepProps) {
  return (
    <div className="text-center space-y-4">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <h3 className="text-2xl font-bold text-green-600">
        Application Submitted!
      </h3>
      <p className="text-gray-600">
        Thank you for applying to {jobData.title} at {jobData.companyName}.
        We'll review your application and get back to you within 5-7 business
        days.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          {/* TODO : handle application Id */}
          Application ID: #APP-
        </p>
      </div>
      <div className="flex justify-center mt-6">
        <Button onClick={onReset}>Apply for Another Position</Button>
      </div>
    </div>
  );
}
