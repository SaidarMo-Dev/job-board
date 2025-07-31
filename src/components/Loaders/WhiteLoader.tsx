import { cn } from "@/lib/utils";

interface WhiteLoaderProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

export default function WhiteLoader({
  className = "",
  size = "md",
}: WhiteLoaderProps) {
  const sizeClasses = {
    xs: "w-7 h-7",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };
  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute inset-0 rounded-full border-4 border-white !border-t-transparent animate-spin"></div>
    </div>
  );
}
