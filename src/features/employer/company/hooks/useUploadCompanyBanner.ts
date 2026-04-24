import { useUploadCompanyAsset } from "./useUploadCompanyAsset";

export const useUploadCompanyBanner = () => {
  const mutation = useUploadCompanyAsset();

  return {
    ...mutation,
    upload: (companyId: number, file: File) =>
      mutation.mutate({ companyId, file, type: "banner" }),
  };
};
