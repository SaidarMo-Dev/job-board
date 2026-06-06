import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExperienceLevelType, type ExperienceLevelTypekey } from "../jobTypes";

type Props = {
  onSelect: (value: ExperienceLevelTypekey) => void;
};
export function ExperienceLevelFilter({ onSelect }: Props) {
  return (
    <div>
      <label htmlFor="" className="text-sm block mb-2 font-medium">
        Experience level
      </label>
      <Select onValueChange={(value) => onSelect(value as ExperienceLevelTypekey)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Any Level" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(ExperienceLevelType).map((key) => (
            <SelectItem key={key} value={key}>
              {ExperienceLevelType[key as ExperienceLevelTypekey]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
