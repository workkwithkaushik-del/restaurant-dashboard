import type { ReactNode } from "react";

export interface FeedbackCardProps {
  user: ReactNode;
  rating?: number;
  badge?: ReactNode;
  content?: ReactNode;
  time?: ReactNode;
  style?: React.CSSProperties;
}

export function FeedbackCard(props: FeedbackCardProps): JSX.Element;
