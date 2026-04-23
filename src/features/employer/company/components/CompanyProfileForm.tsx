import { FormProvider, useForm } from "react-hook-form";
import { CompanyProfileHeader } from "./CompanyProfileHeader";
import { CompanyProfileLayout } from "./CompanyProfileLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  companySchema,
  type CompanyFormValues,
  type CompanyFull,
} from "../schemas/companySchema";
import { useEffect } from "react";
import type { BaseCompanyComponentsProps } from "../types/baseCompanyComponentsType";
import CompanyProfileActions from "./CompanyProfileActions";

interface CompanyProfileFormProps extends BaseCompanyComponentsProps {
  company?: CompanyFull;
  onSubmit: (data: CompanyFormValues) => void;
  isPending: boolean;
}
export default function CompanyProfileForm({
  company,
  isEditing,
  setIsEditing,
  onSubmit,
  isPending,
}: CompanyProfileFormProps) {
  const methods = useForm({
    resolver: zodResolver(companySchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (company) {
      methods.reset({
        ...company,
        industryIds: company.industries?.map((i) => i.id),
      });
    }
  }, [company, methods]);

  const handleCancel = () => {
    // Revert to original data
    methods.reset({
      ...company,
      industryIds: company?.industries?.map((ind) => ind.id),
    });
    setIsEditing?.(false);
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="px-8 py-4 space-y-6"
      >
        {company && (
          <CompanyProfileHeader
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            company={company}
          />
        )}

        <CompanyProfileLayout
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />

        <CompanyProfileActions
          isEditing={isEditing}
          isPending={isPending}
          onCancel={handleCancel}
        />
      </form>
    </FormProvider>
  );
}
