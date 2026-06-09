import type { ReactNode } from "react";

/**
 * Top-of-page hero band with eyebrow + h1 + supporting copy.
 * @startingPoint section="Navigation" subtitle="Page hero band" viewport="900x240"
 */
export interface HeroProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  status?: ReactNode;
  style?: React.CSSProperties;
}

export function Hero(props: HeroProps): JSX.Element;

export interface LiveDotProps {
  size?: number;
  style?: React.CSSProperties;
}
export function LiveDot(props: LiveDotProps): JSX.Element;
