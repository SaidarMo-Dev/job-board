import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option<T> = {
  value: T;
  label: string;
};

type GenericSelectProps<T extends string> = {
  label?: string;
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
};

export function GenericSelect<T extends string>({
  label,
  value,
  onChange,
  options,
  placeholder,
  className,
  triggerClassName,
}: GenericSelectProps<T>) {
  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`}>
      {label && <span className="font-medium text-sm uppercase">{label} :</span>}

      <Select value={value} onValueChange={(v) => onChange(v as T)}>
        <SelectTrigger
          className={`${triggerClassName ?? ""} text-primary font-medium shadow-none bg-transparent border-none focus-visible:border-0 focus-visible:ring-0`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
