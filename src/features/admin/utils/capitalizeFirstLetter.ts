// Capitalize first letter to match API expectations (e.g. "categories" -> "Categories")
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
