import JobApplicationWizard from "@/features/jobApplications/components/JobApplicationWizard";
import type { JobResponse } from "@/features/jobs/jobTypes";
import { useApplicationWizard } from "@/hooks/useApplicationWizard";

const jobData: JobResponse = {
  jobId: 1,
  title: "Frontend Developer",
  description:
    "We are looking for a skilled frontend developer to join our team.",
  companyName: "TechCorp",
  location: "Stockholm, Sweden",
  jobType: "Full-time",
  maxSalary: 70000,
  minSalary: 50000,
  experienceLevel: "Any",
  datePosted: new Date("2025-07-01"),
  status: "Open",
  skills: [],
  cretaedByUser: "admin@example.com",
  categories: [],
};

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
  return (
    <div className="py-10">
      <JobApplicationWizard
        jobData={jobData}
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
