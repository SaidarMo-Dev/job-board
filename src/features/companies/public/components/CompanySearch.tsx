import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CompanySearchProps {
  search?: string;
  onChange?: (value: string) => void;
}

export default function CompanySearch({
  search,
  onChange,
}: CompanySearchProps) {
  return (
    <div className="w-full max-w-4xl mt-4 flex flex-col md:flex-row gap-2 p-2 bg-card rounded-xl shadow-xl border border-border">
      <div className="flex-1 flex items-center px-4 gap-2 border-r border-border">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Company keyword, industry, city, state, or remote..."
          className="border-none bg-transparent focus-visible:ring-0 shadow-none"
          value={search}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>

      <Button size="lg" className="font-bold px-8">
        Search
      </Button>
    </div>
  );
}
