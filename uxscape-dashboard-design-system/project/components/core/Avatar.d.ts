import type { HTMLAttributes } from "react";

/** Round monogram. Used for users (gradient green) or brand marks (amber-rounded square). */
export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  initials: string;
  size?: number;
  variant?: "user" | "brand" | "soft";
}

export function Avatar(props: AvatarProps): JSX.Element;
