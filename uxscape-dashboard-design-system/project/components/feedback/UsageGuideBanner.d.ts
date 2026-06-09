import type { ReactNode } from "react";

export interface UsageGuideBannerProps {
  tone?: "warning" | "success";
  icon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  steps?: ReactNode;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

export function UsageGuideBanner(props: UsageGuideBannerProps): JSX.Element;

export interface GuideStepProps {
  status?: "pending" | "done" | "info";
  icon?: ReactNode;
  children?: ReactNode;
}

export function GuideStep(props: GuideStepProps): JSX.Element;
