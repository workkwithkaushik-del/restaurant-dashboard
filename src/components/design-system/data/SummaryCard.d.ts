import type { ReactNode, HTMLAttributes } from "react";

/** Rolled-up KPI card with soft diagonal tint overlay. */
export interface SummaryCardProps extends HTMLAttributes<HTMLElement> {
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
  tone?: "green" | "blue" | "amber" | "purple";
  children?: ReactNode;
}

export function SummaryCard(props: SummaryCardProps): JSX.Element;
