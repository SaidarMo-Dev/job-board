export interface MenuItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
  badge?: number;
}
