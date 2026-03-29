import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Option<T> = {
  value: T;
  label: string;
};

type MultiSelectCheckboxGroupProps<T> = {
  options: Option<T>[];
  value: T[];
  onChange: (selected: T[]) => void;
  name?: string;
  className?: string;
};

export function MultiSelectCheckboxGroup<T>({
  options,
  value,
  onChange,
  name,
  className,
}: MultiSelectCheckboxGroupProps<T>) {
  const isSelected = (option: Option<T>) =>
    value.some((v) => v === option.value);

  const handleChange = (option: Option<T>, checked: boolean) => {
    if (checked) {
      onChange([...value, option.value]);
    } else {
      onChange(value.filter((v) => v !== option.value));
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      {options.map((option) => {
        const id = `${name}-${option.value}`;

        return (
          <div key={id} className="flex items-center gap-2">
            <Checkbox
              id={id}
              name={name}
              checked={isSelected(option)}
              onCheckedChange={(checked) =>
                handleChange(option, checked as boolean)
              }
            />
            <Label
              htmlFor={id}
              className="text-sm text-muted-foreground cursor-pointer font-normal"
            >
              {option.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
