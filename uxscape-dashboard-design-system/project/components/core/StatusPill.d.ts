import type { ReactNode, HTMLAttributes } from "react";

/**
 * StatusPill — the brand's primary status chip.
 * @startingPoint section="Core" subtitle="Semantic status chip" viewport="700x100"
 */
export interface StatusPillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "success" | "warning" | "danger" | "info" | "neutral";
  children?: ReactNode;
}

export function StatusPill(props: StatusPillProps): JSX.Element;
