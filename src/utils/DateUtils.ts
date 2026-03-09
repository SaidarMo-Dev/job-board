

// Format date for display (dd/MM/yyyy)
export const formatForDisplay = (date: string | Date): string => {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

// Check if date is expired
export const isExpired = (date: string | Date): boolean => {
  return new Date(date) < new Date();
};
