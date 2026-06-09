import type { HTMLAttributes } from "react";

/**
 * Brand monogram tile (amber gradient).
 * @startingPoint section="Brand" subtitle="Logo monogram tile" viewport="700x140"
 */
export interface BrandMarkProps extends HTMLAttributes<HTMLSpanElement> {
  initials?: string;
  size?: number;
}

export function BrandMark(props: BrandMarkProps): JSX.Element;
