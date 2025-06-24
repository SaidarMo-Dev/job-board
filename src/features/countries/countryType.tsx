export interface Country {
  countryId: number;
  countryName: string;
}

export interface CounrtyState {
  loading: boolean;
  countries: Country[] | null;
  error: string | null;
}
