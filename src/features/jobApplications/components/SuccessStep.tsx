"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { JobResponse } from "../../jobs/jobTypes";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Link } from "react-router";
interface SuccessStepProps {
  jobData: JobResponse;
  onReset: () => void;
}

export function SuccessStep({ jobData, onReset }: SuccessStepProps) {
  const createdApplicationId = useAppSelector(
    (state) => state.applicationReducer.addedApplicationId
  );
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
          Application ID: #APP-{createdApplicationId ?? -1}
        </p>
      </div>
      <div className="flex justify-center mt-6">
        <Link to="/jobs">
          <Button
            className="flex gap-2 items-center bg-sky-600 hover:bg-sky-700 cursor-pointer"
            onClick={onReset}
          >
            Discover more Jobs...
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
