import type { ISkill } from "./ISkill";

export interface JobProps {
  Title: string;
  Company: string;
  Location: string;
  JobType: string;
  SalaryRange: string;
  Skills: Array<ISkill>;
}
