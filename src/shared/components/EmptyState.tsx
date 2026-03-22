import { Building2 } from "lucide-react";

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-4 py-10">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <Building2 className="w-6 h-6 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
