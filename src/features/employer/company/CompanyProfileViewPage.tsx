import { useState } from "react";
import { type CompanyFormValues } from "./schemas/companySchema";
import { useEmployerCompanyQuery } from "../hooks/useEmployerCompanyQuery";
import CompanyEmptyState from "./components/EmptyState";
import { addCompany, updateCompany } from "@/features/companies/CompaniesApi";
import { toast } from "react-toastify";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CompanyProfileForm from "./components/CompanyProfileForm";

export default function CompanyProfilePageView() {
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

  if (!company && !isEditing && !isLoading)
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
