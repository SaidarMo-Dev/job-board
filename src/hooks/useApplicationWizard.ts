import { useState } from "react";
import type { ApplicationData } from "../features/jobApplications/applicationType";
import { useAppSelector } from "./useAppSelector";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useAppDispatch } from "./useAppDispatch";
import { applyForJobThunk } from "@/features/jobApplications/applicationThunk";
import { toast } from "react-toastify";

export function useApplicationWizard() {
  const currentUser = useAppSelector(selectCurrentUser)?.id ?? -1;

  const [currentStep, setCurrentStep] = useState(0);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    userId: currentUser,
    jobId: -1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    linkedIn: "",
    portfolio: "",
    experience: "",
    availability: "",
  });

  const handleInputChange = (field: keyof ApplicationData, value: string) => {
    if (field === "jobId" || field === "userId")
      setApplicationData((prev) => ({ ...prev, [field]: Number(value) }));
    else setApplicationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File | null) => {
    setApplicationData((prev) => ({ ...prev, resume: file }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const dispatch = useAppDispatch();

  const submitApplication = async () => {
    const result = await dispatch(applyForJobThunk({ applicationData }));

    if (applyForJobThunk.fulfilled.match(result)) {
      nextStep();
    } else {
      toast.error(result.payload ?? "Something went wrong!");
    }
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 0:
        return Boolean(
          applicationData.firstName &&
            applicationData.lastName &&
            applicationData.email &&
            applicationData.phone
        );

      case 1:
        return applicationData.resume !== null;
      case 2:
        return Boolean(
          applicationData.experience && applicationData.availability
        );
      case 3:
        return true;
      default:
        return false;
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setApplicationData({
      userId: -1,
      jobId: -1,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      resume: null,
      coverLetter: "",
      linkedIn: "",
      portfolio: "",
      experience: "",
      availability: "",
    });
  };

  return {
    currentStep,
    applicationData,
    handleInputChange,
    handleFileUpload,
    nextStep,
    prevStep,
    submitApplication,
    isStepValid,
    resetForm,
  };
}
