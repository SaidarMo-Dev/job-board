import type { SkillResponse } from "@/shared/types/Skill";
import { Badge } from "../../components/ui/badge";

interface SkillBadgeProps {
  index: number;
  skill: SkillResponse;
  className?: string;
}

export default function SkillBadge({
  skill,
  index,
  className = "",
}: SkillBadgeProps) {
  return (
    <Badge
      key={skill.id}
      variant="secondary"
      className={`px-3 py-[4px] text-sm font-medium text-blue-900 bg-blue-100 border
              border-blue-200 hover:bg-blue-200 hover:border-blue-300 transition-all 
                duration-300 hover:scale-105 cursor-default ${className}`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {skill.name}
    </Badge>
  );
}
