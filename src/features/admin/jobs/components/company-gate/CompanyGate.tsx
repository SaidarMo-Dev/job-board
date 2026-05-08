import { useEmployerCompanyQuery } from "@/features/employer/hooks/useEmployerCompanyQuery";
import CompanySkeleton from "./CompanySkeleton";
import EmptyCompanyState from "./EmptyCompanyState";
import CompanyCard from "./CompanyCard";
import ErrorField from "@/shared/components/ErrorField";
import { Building2 } from "lucide-react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";
import axios from "axios";

export default function CompanyGate() {
  const {
    data: company,
    isFetching,
    isError,
    error,
  } = useEmployerCompanyQuery({ enabled: true });

  const navigate = useNavigate();

  if (isFetching) return <CompanySkeleton />;

  const isCompanyNotFound =
    axios.isAxiosError(error) && error.response?.status === 404;

  if (isError && !isCompanyNotFound) {
    return (
      <ErrorField
        message={`Failed to load company information : ${extractAxiosErrorMessage(error)}.`}
      />
    );
  }

  const hasCompany = !!company;

  const description = company
    ? "This is your registered company..."
    : "You don't have a company yet...";
  return (
    <div className="rounded-xl border bg-card p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Building2 className="h-6 w-6 text-foreground" />
        <div>
          <h2 className="text-lg font-semibold">Company</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {hasCompany ? (
        <CompanyCard
          company={company}
          onEdit={() => navigate(ROUTES.EMPLOYER.COMPANY_PROFILE)}
        />
      ) : (
        <EmptyCompanyState
          onCreate={() => navigate(ROUTES.EMPLOYER.COMPANY_PROFILE)}
        />
      )}
    </div>
  );
}
