import { Separator } from "@/components/ui/separator";
import type { ApplicationData } from "../applicationType";

interface ReviewStepProps {
  applicationData: ApplicationData;
}

export function ReviewStep({ applicationData }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Review Your Application</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm text-gray-600 mb-1">
              Personal Information
            </h4>
            <p>
              {applicationData.firstName} {applicationData.lastName}
            </p>
            <p>{applicationData.email}</p>
            <p>{applicationData.phone}</p>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium text-sm text-gray-600 mb-1">
              Documents
            </h4>
            <p>
              Resume:
              {applicationData.resume
                ? applicationData.resume.name
                : "Not uploaded"}
            </p>
            <p>
              Cover Letter:{" "}
              {applicationData.coverLetter ? "Provided" : "Not provided"}
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium text-sm text-gray-600 mb-1">
              Additional Information
            </h4>
            <p>Experience: {applicationData.experience}</p>
            <p>Availability: {applicationData.availability}</p>
            {applicationData.linkedIn && (
              <p>LinkedIn: {applicationData.linkedIn}</p>
            )}
            {applicationData.portfolio && (
              <p>Portfolio: {applicationData.portfolio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
