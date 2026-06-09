import type { ReactNode, ButtonHTMLAttributes } from "react";

/**
 * Brand button. Default to primary; use secondary for positive non-CTA
 * actions, link for inline navigation, mini inside dense rows.
 *
 * @startingPoint section="Core" subtitle="Primary action button" viewport="700x140"
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "link" | "mini";
  children?: ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
