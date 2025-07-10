import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "./FileUpload";
import type { StepProps } from "../applicationType";
export function DocumentsStep({
  applicationData,
  onInputChange,
  onFileUpload,
}: StepProps) {
  return (
    <div className="space-y-6">
      <FileUpload
        label="Resume"
        accept=".pdf,.doc,.docx"
        file={applicationData.resume}
        onFileUpload={onFileUpload!}
        required
      />
      <div className="space-y-2">
        <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
        <Textarea
          id="coverLetter"
          value={applicationData.coverLetter}
          onChange={(e) => onInputChange("coverLetter", e.target.value)}
          placeholder="Write a brief cover letter explaining why you're interested in this position..."
          rows={6}
        />
      </div>
    </div>
  );
}
