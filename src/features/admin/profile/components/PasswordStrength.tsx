export default function PasswordStrength({ password }: { password: string }) {
  const getPasswordStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { label: "Weak", color: "bg-red-500" };
    if (strength <= 3) return { label: "Medium", color: "bg-yellow-500" };
    return { label: "Strong", color: "bg-green-500" };
  };
  return (
    <div className="mt-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              getPasswordStrength().color
            }`}
            style={{
              width: `${
                getPasswordStrength().label === "Weak"
                  ? 33
                  : getPasswordStrength().label === "Medium"
                  ? 66
                  : 100
              }%`,
            }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {getPasswordStrength().label}
        </span>
      </div>
    </div>
  );
}
