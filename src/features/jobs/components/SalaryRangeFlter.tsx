import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SalaryRangeFilter({
  onSelect,
}: {
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor="" className="text-sm block mb-2 font-medium">
        Salary Range
      </label>
      <Select onValueChange={(value) => onSelect(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Any Salary" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Any">Any Salary</SelectItem>
          <SelectItem value="$0 - $50k">$0 - $50k</SelectItem>
          <SelectItem value="$50k - $100k">$50k - $100k</SelectItem>
          <SelectItem value="$100k - $150k">$100k - $150k</SelectItem>
          <SelectItem value="$150k+">$150k+</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
