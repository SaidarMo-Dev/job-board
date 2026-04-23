import { Button } from "@/components/ui/button";

export default function CompanyProfileActions({
  isEditing,
  isPending,
  onCancel,
}: {
  isEditing: boolean;
  isPending: boolean;
  onCancel: () => void;
}) {
  if (!isEditing) return null;

  return (
    <div className="sticky bottom-0 flex justify-end gap-3 p-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
