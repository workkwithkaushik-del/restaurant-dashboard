import type { ReactNode } from "react";

export interface ViewTabsProps {
  options: Array<string | { label: ReactNode; value: string }>;
  value: string;
  onChange?: (v: string) => void;
  style?: React.CSSProperties;
}

export function ViewTabs(props: ViewTabsProps): JSX.Element;
