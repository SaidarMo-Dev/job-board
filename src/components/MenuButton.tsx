import { Link } from "react-router";
import type { MenuButtonProps } from "../types/MenuButtonProps";

const MenuButton: React.FC<MenuButtonProps> = ({ item, className = "" }) => {
  const Icon = item.icon;

  return (
    <Link
      to={item.href}
      className={`flex items-center gap-3 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-150 ${className}`}
    >
      <Icon />
      <span className="flex-1">{item.label}</span>
      {item.badge !== undefined && (
        <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full min-w-[20px] text-center font-medium">
          {item.badge}
        </span>
      )}
    </Link>
  );
};

export default MenuButton;
