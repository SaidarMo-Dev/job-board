import type { SolutionProps } from "../types/SolutionProps";

export function Solution({ solutionName, jobsCount, icon }: SolutionProps) {
  return (
    <div className="bg-white p-4 flex gap-4 rounded-lg">
      {/* ICON */}
      <div className="mt-1.5">{icon}</div>

      {/* Description */}
      <div>
        <h4 className="font-bold">{solutionName}</h4>
        <span className="ml-0.5 text-sm text-gray-300 mt-3">{jobsCount} Jobs Available</span>
      </div>
    </div>
  );
}
