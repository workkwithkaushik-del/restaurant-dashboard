import type { ReactNode, ButtonHTMLAttributes } from "react";

/**
 * Square icon button for sidebar toggles, modal close, etc.
 */
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: "default" | "dark";
  size?: "sm" | "md";
  children?: ReactNode;
}

export function IconButton(props: IconButtonProps): JSX.Element;
