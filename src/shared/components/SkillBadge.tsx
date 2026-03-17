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
      className={`px-3 py-[4px] text-sm font-medium text-primary bg-primary-50 border
              border-primray-200 hover:bg-primray-200 hover:border-primray-300 transition-all 
                duration-300 hover:scale-105 cursor-default ${className}`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {skill.name}
    </Badge>
  );
}
