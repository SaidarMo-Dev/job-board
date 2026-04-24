export const validateImage = (
  file: File,
  type: "logo" | "banner",
): string | null => {
  const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    return "Only PNG, JPG, WEBP allowed";
  }

  const maxSize = type === "logo" ? 1024 * 1024 : 5 * 1024 * 1024;

  if (file.size > maxSize) {
    return type === "logo"
      ? "Logo must be less than 1MB"
      : "Banner must be less than 5MB";
  }

  return null;
};
