import {
  uploadCompanyBanner,
  uploadCompanyLogo,
} from "@/features/companies/CompaniesApi";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

export const useUploadCompanyAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companyId,
      file,
      type,
    }: {
      companyId: number;
      file: File;
      type: "logo" | "banner";
    }) => {
      if (type == "logo") return uploadCompanyLogo(companyId, file);
      else return uploadCompanyBanner(companyId, file);
    },

    onSuccess: (_, { type }) => {
      queryClient.invalidateQueries({
        queryKey: ["employer/company-profile"],
      });

      toast.success(
        type === "logo"
          ? "Logo updated successfully"
          : "Banner updated successfully",
      );
    },
    onError: (error) => {
      toast.error(extractAxiosErrorMessage(error));
    },
  });
};
