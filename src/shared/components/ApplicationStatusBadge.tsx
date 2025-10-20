import type { applicationStatus } from "@/features/jobApplications/applicationType";

export const ApplicationStatusBadge = ({
  status,
}: {
  status: applicationStatus;
}) => {
  const base = "px-2 py-0.5 text-sm font-medium rounded-full capitalize border";
  const styles = {
    Pending:
      "border-yellow-500 text-yellow-700 dark:text-yellow-300 dark:border-yellow-600",
    Accepted:
      "border-green-500 text-green-700 dark:text-green-300 dark:border-green-600",
    Rejected:
      "border-red-500 text-red-700 dark:text-red-300 dark:border-red-600",
  };

  return <span className={`${base} ${styles[status]}`}>{status}</span>;
};
