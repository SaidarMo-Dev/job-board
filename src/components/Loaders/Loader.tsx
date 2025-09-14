import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "dots" | "spinner" | "pulse" | "bars";
  color?: string;
}

export default function Loader({
  className = "",
  size = "md",
  variant = "spinner",
  color = "text-primary",
}: LoaderProps) {
  const sizeClasses = {
    xs: "w-7 h-7",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  if (variant === "dots") {
    const dotSize =
      size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4";

    return (
      <div
        className={cn("flex items-center justify-center space-x-2", className)}
      >
        {[0, 150, 300].map((delay, i) => (
          <div
            key={i}
            className={cn(
              "rounded-full animate-bounce",
              color,
              dotSize,
              "bg-current"
            )}
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    );
    // return (
    //   <div
    //     className={cn("flex items-center justify-center space-x-2", className)}
    //   >
    //     <div
    //       className={cn(
    //         "rounded-full bg-primary animate-bounce",
    //         size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
    //       )}
    //       style={{ animationDelay: "0ms" }}
    //     />
    //     <div
    //       className={cn(
    //         "rounded-full bg-primary animate-bounce",
    //         size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
    //       )}
    //       style={{ animationDelay: "150ms" }}
    //     />
    //     <div
    //       className={cn(
    //         "rounded-full bg-primary animate-bounce",
    //         size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
    //       )}
    //       style={{ animationDelay: "300ms" }}
    //     />
    //   </div>
    // );
  }

  if (variant === "spinner") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
        <div className="absolute inset-0 rounded-full border-4 border-sky-600 !border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></div>
        <div className="relative rounded-full bg-primary"></div>
      </div>
    );
  }

  if (variant === "bars") {
    return (
      <div className={cn("flex items-end justify-center space-x-1", className)}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "bg-primary animate-pulse",
              size === "sm"
                ? "w-1 h-4"
                : size === "md"
                ? "w-1.5 h-6"
                : "w-2 h-8"
            )}
            style={{
              animationDelay: `${i * 100}ms`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
