import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="group relative bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/10">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <p className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-[0.15em] mb-1">
            {label}
          </p>
          <p className="text-3xl font-black text-foreground tabular-nums">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
