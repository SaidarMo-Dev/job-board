import { useAppSelector } from "@/hooks/useAppSelector";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getEmployerCompanyProfile } from "../employerApi";
import type { CompanyFull } from "../company/schemas/companySchema";

type UseEmployerCompanyOptions = Omit<
  UseQueryOptions<CompanyFull, Error>,
  "queryKey" | "queryFn"
>;

export const useEmployerCompanyQuery = (
  options?: UseEmployerCompanyOptions,
) => {
  // 1. Get the companyId from your Auth state
  const { currentUser } = useAppSelector((state) => state.authReducer);

  return useQuery({
    queryKey: ["employer/company-profile", currentUser?.id],
    queryFn: async () => {
      const response = await getEmployerCompanyProfile();
      return response;
    },
    ...options,

    enabled: !!options?.enabled && !!currentUser,
    // Keep data fresh but don't over-fetch while the user is typing in the form
    staleTime: 1000 * 60 * 5,
    retry: 1, // Retry once on failure
  });
};
