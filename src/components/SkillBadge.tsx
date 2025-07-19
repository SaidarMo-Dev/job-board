import type { SkillResponse } from "@/types/Skill";
import { Badge } from "./ui/badge";

interface SkillBadgeProps {
  index: number;
  skill: SkillResponse;
  className?: string;
}

// TODO : handle three styles for skill
//const BgColors = ["bg-sky-300 text-white", "bg-violet-400/70 text-black"];

export default function SkillBadge({
  skill,
  index,
  className = "",
}: SkillBadgeProps) {
  return (
    <Badge
      key={skill.id}
      variant="secondary"
      className={`px-4 py-2 text-sm font-medium bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:scale-105 cursor-default ${className} `}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {skill.name}
    </Badge>
  );
}
