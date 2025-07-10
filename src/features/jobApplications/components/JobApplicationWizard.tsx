import { type JobResponse } from "@/features/jobs/jobTypes";
import ApplicationHeader from "./ApplicationHeader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ApplicationData } from "../applicationType";
import PersonalInfoStep from "./PersonalInfoStep";
import { DocumentsStep } from "./DocumentStep";
import { AdditionalInfoStep } from "./AdditionalInfoStep";
import { ReviewStep } from "./ReviewStep";
import { SuccessStep } from "./SuccessStep";
import ApplicationNavigation from "./ApplicationNavigation";
import ProgressBar from "@/components/ProgressBar";

interface ApplicationFormProps {
  currentStep: number;
  applicationData: ApplicationData;
  jobData: JobResponse;
  onInputChange: (field: keyof ApplicationData, value: string) => void;
  onFileUpload: (file: File | null) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
  onReset: () => void;
  isStepValid: boolean;
}

const steps = [
  "Personal Info",
  "Documents",
  "Additional Info",
  "Review",
  "Complete",
];

export default function JobApplicationWizard({
  currentStep,
  applicationData,
  jobData,
  onInputChange,
  onFileUpload,
  onPrevStep,
  onNextStep,
  onSubmit,
  onReset,
  isStepValid,
}: ApplicationFormProps) {
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            applicationData={applicationData}
            onInputChange={onInputChange}
          />
        );
      case 1:
        return (
          <DocumentsStep
            applicationData={applicationData}
            onFileUpload={onFileUpload}
            onInputChange={onInputChange}
          />
        );

      case 2:
        return (
          <AdditionalInfoStep
            applicationData={applicationData}
            onInputChange={onInputChange}
          />
        );

      case 3:
        return <ReviewStep applicationData={applicationData} />;

      case 4:
        return <SuccessStep jobData={jobData} onReset={onReset} />;

      default:
        return null;
    }
  };

  if (currentStep === 4) {
    return (
      <Card>
        <CardContent className="pt-6">{renderStepContent()}</CardContent>
      </Card>
    );
  }
  return (
    <div className="max-w-4xl m-auto space-y-5">
      {/* Application flow header */}
      <ApplicationHeader jobData={jobData} />
      <Card>
        {/* Steps */}
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Application - Step {currentStep + 1} of 4</CardTitle>
            <span className="text-sm text-gray-500">{steps[currentStep]}</span>
          </div>
          <ProgressBar
            value={(1 / (steps.length - 1)) * 100}
            className="mt-2 h-[10px]"
            color=""
          />
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
        <CardFooter>
          <ApplicationNavigation
            currentStep={currentStep}
            onNextStep={onNextStep}
            onPrevStep={onPrevStep}
            onSubmit={onSubmit}
            isStepValid={isStepValid}
            isLastStep={currentStep === 3}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
