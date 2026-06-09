import type { ReactNode } from "react";

export interface RangeSwitchProps {
  options: Array<string | { label: ReactNode; value: string }>;
  value: string;
  onChange?: (v: string) => void;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

export function RangeSwitch(props: RangeSwitchProps): JSX.Element;
