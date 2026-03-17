import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobType, type JobTypeKey } from "../jobTypes";

type Props = {
  onSelect: (value: JobTypeKey) => void;
};
export function JobTypeFilter({ onSelect }: Props) {
  return (
    <div>
      <label className="text-sm block mb-2 font-medium" htmlFor="">
        Job Type
      </label>
      <Select onValueChange={(value: JobTypeKey) => onSelect(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(JobType).map((key) => (
            <SelectItem key={key} value={key}>
              {JobType[key as JobTypeKey]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
