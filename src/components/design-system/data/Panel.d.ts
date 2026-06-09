import type { ReactNode, HTMLAttributes } from "react";

/**
 * Generic white panel surface with an optional eyebrow + h2 header.
 * @startingPoint section="Data" subtitle="Panel card with heading" viewport="700x260"
 */
export interface PanelProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  action?: ReactNode;
  padding?: number;
  children?: ReactNode;
}

export function Panel(props: PanelProps): JSX.Element;
