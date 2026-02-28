import AddButton from "@/components/BasicUserCardComponents/AddButton";
import { Label } from "@/components/ui/label";
import type React from "react";
export default function InfoRow({
  label,
  children,
  onAddButtonClick,
}: {
  label: string;
  children: React.ReactNode;
  onAddButtonClick?: () => void;
}) {
  return (
    <div className="py-2 px-3 rounded-md w-full">
      <Label htmlFor="firstName" className="text-muted-foreground">
        {label}
      </Label>
      {children ? (
        <div className="py-2 px-3 rounded-md w-full">
          <span className="font-medium">{children}</span>
        </div>
      ) : (
        <AddButton field={label} onClick={onAddButtonClick} />
      )}
    </div>
  );
}
