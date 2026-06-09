import type { ReactNode, ChangeEventHandler, SelectHTMLAttributes } from "react";

/** Labelled select. */
export interface FieldSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: ReactNode;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  children?: ReactNode;
  size?: "sm" | "md";
}

export function FieldSelect(props: FieldSelectProps): JSX.Element;
