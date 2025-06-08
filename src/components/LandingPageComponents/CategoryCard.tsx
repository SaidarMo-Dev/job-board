import type { ReactNode } from "react";

type CategoryCardProps = {
  category: string;
  jobsCount: number;
  icon: ReactNode;
};

export function CategoryCard({ category, jobsCount, icon }: CategoryCardProps) {
  return (
    <div className="flex items-center gap-4 border-neutral-100 p-3 pr-6 hover:bg-neutral-50 border-2">
      {icon}
      <div>
        <h4 className="font-bold">{category}</h4>
        <span className="text-sm text-neutral-500 ml-1">{jobsCount} jobs available </span>
      </div>
    </div>
  );
}
