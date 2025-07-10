import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StepProps } from "../applicationType";

export function AdditionalInfoStep({
  applicationData,
  onInputChange,
}: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="linkedIn">LinkedIn Profile</Label>
        <Input
          id="linkedIn"
          value={applicationData.linkedIn}
          onChange={(e) => onInputChange("linkedIn", e.target.value)}
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="portfolio">Portfolio Website</Label>
        <Input
          id="portfolio"
          value={applicationData.portfolio}
          onChange={(e) => onInputChange("portfolio", e.target.value)}
          placeholder="https://yourportfolio.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="experience">Years of Experience *</Label>
        <Input
          id="experience"
          value={applicationData.experience}
          onChange={(e) => onInputChange("experience", e.target.value)}
          placeholder="e.g., 5 years"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="availability">When can you start? *</Label>
        <Input
          id="availability"
          value={applicationData.availability}
          onChange={(e) => onInputChange("availability", e.target.value)}
          placeholder="e.g., Immediately, 2 weeks notice, etc."
        />
      </div>
    </div>
  );
}
