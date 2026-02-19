export const FilterApplicants = {
  All: "All",
  Pending: "Pending",
  Accepted: "Accepted",
  Rejected: "Rejected",
};

export type FilterApplicantsKey = keyof typeof FilterApplicants;
