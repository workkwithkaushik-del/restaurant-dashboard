import type { ReactNode } from "react";

export interface SidebarItemProps {
  icon?: ReactNode;
  children?: ReactNode;
  active?: boolean;
  collapsed?: boolean;
  title?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function SidebarItem(props: SidebarItemProps): JSX.Element;
