import type { MenuItem } from "./MenuItem";

export interface MenuButtonProps {
  item: MenuItem;
  className?: string;
  onClick : () => void
}
