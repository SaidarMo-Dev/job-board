import { useUploadCompanyAsset } from "./useUploadCompanyAsset";

export const useUploadCompanyLogo = () => {
  const mutation = useUploadCompanyAsset();

  return {
    ...mutation,
    upload: (companyId: number, file: File) =>
      mutation.mutate({ companyId, file, type: "logo" }),
  };
};
