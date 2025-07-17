import JobApplicationWizard from "@/features/jobApplications/components/JobApplicationWizard";
import { getJobByIdThunk } from "@/features/jobs/jobThunk";
import type { JobResponse } from "@/features/jobs/jobTypes";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useApplicationWizard } from "@/hooks/useApplicationWizard";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export default function JobApplicationWizardPage() {
  const {
    currentStep,
    applicationData,
    handleInputChange,
    handleFileUpload,
    nextStep,
    prevStep,
    submitApplication,
    isStepValid,
    resetForm,
  } = useApplicationWizard();

  const { jobId } = useParams();
  const hasInitialized = useRef(false);

  const [jobInfo, setJobInfo] = useState<JobResponse>({
    jobId: -1,
    title: "",
    description: "",
    companyName: "",
    location: "",
    jobType: "",
    maxSalary: 0,
    minSalary: 0,
    experienceLevel: "Any",
    datePosted: new Date(),
    status: "",
    skills: [],
    cretaedByUser: "",
    categories: [],
  });

  const dispatch = useAppDispatch();

  if (!hasInitialized.current && jobId) {
    handleInputChange("jobId", jobId ?? "-1");
    hasInitialized.current = true;
  }

  useEffect(() => {
    dispatch(getJobByIdThunk({ Id: Number(jobId ?? -1) })).then((result) => {
      if (getJobByIdThunk.fulfilled.match(result)) {
        setJobInfo(result.payload);
      } else {
        toast.error(result.payload);
      }
    });
  }, [dispatch, jobId]);

  return (
    <div className="custom-container">
      <JobApplicationWizard
        jobData={jobInfo}
        currentStep={currentStep}
        applicationData={applicationData}
        onInputChange={handleInputChange}
        onFileUpload={handleFileUpload}
        onNextStep={nextStep}
        onPrevStep={prevStep}
        onSubmit={submitApplication}
        isStepValid={isStepValid()}
        onReset={resetForm}
      />
    </div>
  );
}
