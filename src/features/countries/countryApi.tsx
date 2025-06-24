import type { ApiResponse } from "@/types/ApiResponse";
import type { Country } from "./countryType";
import api from "../../api/axiosInstance";

const COUNTRY_BASE_URL = "/country";

export const getAllCountries = async () => {
  const response = await api.get<ApiResponse<Country[]>>(
    `${COUNTRY_BASE_URL}/getAll`
  );
  const countries = response.data.data;
  return countries;
};
