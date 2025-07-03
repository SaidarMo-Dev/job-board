import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Country } from "./countryType";
import { getAllCountries } from "./countryApi";
import axios from "axios";
import type { ApiResponse } from "@/types/ApiResponse";

const getAllCountriesThunk = createAsyncThunk<
  Country[],
  void,
  { rejectValue: string }
>("country/all", async (_, thunkApi) => {
  try {
    const countries = await getAllCountries();
    return countries;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const resError = error.response?.data as ApiResponse<null>;
      return thunkApi.rejectWithValue(resError.message);
    }
    return thunkApi.rejectWithValue("Something wont wrong!");
  }
});

export { getAllCountriesThunk };
