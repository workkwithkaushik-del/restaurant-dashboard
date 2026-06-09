import type { ReactNode, HTMLAttributes } from "react";

/** 0–100 horizontal meter with green→mint fill. */
export interface MiniMeterProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  label?: ReactNode;
  suffix?: ReactNode;
}

export function MiniMeter(props: MiniMeterProps): JSX.Element;
