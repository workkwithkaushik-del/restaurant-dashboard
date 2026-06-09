import type { ReactNode, HTMLAttributes } from "react";

/** Small uppercase #tag used inside feedback cards. */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "success" | "warning" | "danger" | "info" | "neutral";
  children?: ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;
