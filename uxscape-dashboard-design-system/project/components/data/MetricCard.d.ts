import type { ReactNode, HTMLAttributes } from "react";

/**
 * Top-of-page KPI card with coloured left stripe.
 * @startingPoint section="Data" subtitle="KPI metric tile" viewport="700x180"
 */
export interface MetricCardProps extends HTMLAttributes<HTMLElement> {
  label: ReactNode;
  value: ReactNode;
  change?: ReactNode;
  accent?: "green" | "blue" | "amber" | "coral" | "purple";
}

export function MetricCard(props: MetricCardProps): JSX.Element;
