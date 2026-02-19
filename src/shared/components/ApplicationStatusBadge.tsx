import type { applicationStatus } from "@/features/jobApplications/applicationType";

export const ApplicationStatusBadge = ({
  status,
}: {
  status: applicationStatus;
}) => {
  const base = "px-2 py-0.5 text-xs font-medium rounded-full capitalize";

  const styles = {
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200",
    Accepted:
      "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200",
    Rejected: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200",
  };

  return <span className={`${base} ${styles[status]}`}>{status}</span>;
};
