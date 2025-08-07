export const formatDescription = (value: string | undefined): string => {
  if (!value) return "Not Specified";
  const result = value.split(" ");

  if (result.length > 4) return result.slice(0, 4).join(" ") + "...";
  return value;
};
