import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { MenuItem } from "@/types/MenuItem";
import { Link } from "react-router";

export function MenuSection({ items }: { items: MenuItem[] }) {
  return (
    <>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <DropdownMenuItem asChild key={item.href}>
            <Link to={item.href} className="flex items-center gap-2">
              <Icon className="h-6 w-6" />
              <span>{item.label}</span>
            </Link>
          </DropdownMenuItem>
        );
      })}
      <DropdownMenuSeparator />
    </>
  );
}
