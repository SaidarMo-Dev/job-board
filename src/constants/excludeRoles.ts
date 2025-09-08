export const excludedEndpoints = {
  static: ["/jobs", "/users/bookmarks/count", "/auth/resend-verification-code"],
  dynamic: [/^\/users\/\d+\/dashboard-stats$/],
};

export function isExcluded(url?: string) {
  if (!url) return false;
  return (
    excludedEndpoints.static.some(
      (e) => url === e || url.startsWith(e + "?")
    ) || excludedEndpoints.dynamic.some((r) => r.test(url))
  );
}
