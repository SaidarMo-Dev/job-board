import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StepProps } from "../applicationType";

export default function JobApplicationStepPersonalInfo({
  applicationData,
  onInputChange,
}: StepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={applicationData.firstName}
            onChange={(e) => onInputChange("firstName", e.target.value)}
            placeholder="Enter your first name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={applicationData.lastName}
            onChange={(e) => onInputChange("lastName", e.target.value)}
            placeholder="Enter your last name"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={applicationData.email}
          onChange={(e) => onInputChange("email", e.target.value)}
          placeholder="Enter your email address"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          value={applicationData.phone}
          onChange={(e) => onInputChange("phone", e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>
    </div>
  );
}
