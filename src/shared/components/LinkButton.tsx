import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";
import React from "react";

type LinkButtonProps = LinkProps & {
  variant?: "default" | "accent" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  className?: string;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none font-medium";

const variants = {
  default: "bg-primary text-white hover:bg-primary/90",
  accent: "bg-accent text-accent-foreground hover:bg-accent/80",
  outline: "border border-border hover:bg-muted",
  ghost: "hover:bg-muted",
  link: "text-primary underline-offset-4 hover:underline bg-accent",
};

const sizes = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-6 py-3",
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  variant = "default",
  size = "md",
  external = false,
  to,
  className,
  children,
  ...props
}) => {
  const styles = cn(baseStyles, variants[variant], sizes[size], className);

  // External link
  if (external) {
    return (
      <a
        href={to.toString()}
        className={styles}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal link (react-router)
  return (
    <Link to={to!} className={styles} {...props}>
      {children}
    </Link>
  );
};
