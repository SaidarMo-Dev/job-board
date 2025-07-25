import { createSlice } from "@reduxjs/toolkit";
import type { CounrtyState } from "./countryType";

import { getAllCountriesThunk } from "./countryThunk";
import type { RootState } from "@/store";

const initialState: CounrtyState = {
  loading: false,
  countries: null,
  error: null,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountriesThunk.pending, (state) => {
        state.loading = true;
        state.countries = null;
        state.error = null;
      })
      .addCase(getAllCountriesThunk.fulfilled, (state, action) => {
        state.countries = action.payload;
      })
      .addCase(getAllCountriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : null;
        state.countries = null;
      });
  },
});

const selectCountries = (state: RootState) => state.countryReducer.countries;

export default countrySlice.reducer;

// selectors
export { selectCountries };
