export function splitCamelCase(text: string): string {
  if (!text) return text;

  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export const capitalizeWords = (value?: string) =>
  value
    ?.toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") || "";

export const capitalizeFirst = (value?: string) =>
  value ? value[0].toUpperCase() + value.slice(1) : "";
