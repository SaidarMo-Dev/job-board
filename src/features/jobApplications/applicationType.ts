export interface ApplicationData {
  userId: number;
  jobId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  linkedIn: string;
  portfolio: string;
  experience: string;
  availability: string;
}

export interface StepProps {
  applicationData: ApplicationData;
  onInputChange: (field: keyof ApplicationData, value: string) => void;
  onFileUpload?: (file: File | null) => void;
}
