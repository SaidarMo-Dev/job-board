import AlreadyApplied from "@/features/jobs/components/AlreadyApplied";
import { Link } from "react-router";

interface ApplyButtonProps {
  jobId: number;
  title?: string;
  className?: string;
  isApplied?: boolean;
}
export default function ApplyButton({
  jobId,
  className,
  title,
  isApplied = false,
}: ApplyButtonProps) {
  return isApplied ? (
    <AlreadyApplied />
  ) : (
    <Link
      to={`/jobs/${jobId}/apply`}
      className={`bg-primary hover:bg-primary-hover rounded-md text-white font-medium text-sm px-4 py-2 ${className}`}
    >
      {title ?? "Apply Now"}
    </Link>
  );
}
