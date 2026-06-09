import type { ReactNode } from "react";

export interface WarningBannerProps {
  icon?: ReactNode;
  children?: ReactNode;
  style?: React.CSSProperties;
}

export function WarningBanner(props: WarningBannerProps): JSX.Element;
