import Loader from "@/components/Loaders/Loader";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface ApplicationNavigationProps {
  currentStep: number;
  isStepValid: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSubmit: () => void;
  isLastStep?: boolean;
}

export default function ApplicationNavigation({
  currentStep,
  isStepValid,
  onNextStep,
  onPrevStep,
  onSubmit,
  isLastStep = false,
}: ApplicationNavigationProps) {
  const loading = useAppSelector(
    (state) => state.applicationReducer.loading.fetch
  );

  return (
    <div className="flex justify-between pt-4 w-full">
      <Button
        variant="outline"
        className="flex items-center gap-2 bg-transparent md:w-25"
        disabled={currentStep === 0}
        onClick={onPrevStep}
      >
        <ArrowLeft className="h-4 w-4" />
        Previos
      </Button>

      {isLastStep ? (
        <Button
          onClick={onSubmit}
          disabled={!isStepValid}
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700"
        >
          {loading && <Loader size="xs" />}
          {loading ? "Submit Application..." : "Submit Application"}
          <CheckCircle className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          onClick={onNextStep}
          disabled={!isStepValid}
          className="flex items-center gap-2 md:w-25 bg-sky-600 hover:bg-sky-700"
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
