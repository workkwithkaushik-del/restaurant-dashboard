import type { ReactNode, HTMLAttributes } from "react";

/** Uppercase green label above a panel h2. */
export interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export function Eyebrow(props: EyebrowProps): JSX.Element;
