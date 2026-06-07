import { useState } from "react";
import { type CompanyFormValues } from "./schemas/companySchema";
import { useEmployerCompanyQuery } from "../hooks/useEmployerCompanyQuery";
import CompanyEmptyState from "./components/EmptyState";
import { addCompany, updateCompany } from "@/features/companies/CompaniesApi";
import { toast } from "react-toastify";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CompanyProfileForm from "./components/CompanyProfileForm";
import Loader from "@/components/Loaders/Loader";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";

export default function CompanyProfilePageView() {
  useDocumentTitle("Company Profile | iLink");
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const { data: company, isLoading } = useEmployerCompanyQuery({
    enabled: !isEditing,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CompanyFormValues) =>
      company ? updateCompany(company.companyId, data) : addCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer/company-profile"] });
      setIsEditing(false);
      toast.success("Profile updated!", {
        position: "bottom-right",
      });
    },
    onError: (error) => {
      toast.error(extractAxiosErrorMessage(error), {
        position: "bottom-right",
      });
    },
  });

  const onSubmit = (data: CompanyFormValues) => mutate(data);

  if (isLoading && !company)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader size="xs" />
      </div>
    );

  if (!company && !isEditing)
    return <CompanyEmptyState onStart={() => setIsEditing(true)} />;

  return (
    <CompanyProfileForm
      company={company}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
