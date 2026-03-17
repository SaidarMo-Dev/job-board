import type React from "react";

interface JobMetaItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export default function JobMetaItem({ label, value, icon }: JobMetaItemProps) {
  return (
    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
