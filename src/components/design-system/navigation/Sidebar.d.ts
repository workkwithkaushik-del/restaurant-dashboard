import type { ReactNode } from "react";

export interface SidebarProps {
  collapsed?: boolean;
  children?: ReactNode;
  style?: React.CSSProperties;
}

export function Sidebar(props: SidebarProps): JSX.Element;
export function SidebarDivider(): JSX.Element;

export interface SidebarLabelProps {
  children?: ReactNode;
  collapsed?: boolean;
}
export function SidebarLabel(props: SidebarLabelProps): JSX.Element;
