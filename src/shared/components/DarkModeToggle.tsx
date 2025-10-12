import { Moon, Sun } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function DarkModeToggle({
  isDark,
  onModeChange,
}: {
  isDark: boolean;
  onModeChange?: () => void;
}) {
  const handleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("isDark");
      if (onModeChange) onModeChange();
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("isDark", "true");
      if (onModeChange) onModeChange();
    }
  };
  return (
    <Button variant="ghost" size="icon" onClick={handleDarkMode}>
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
