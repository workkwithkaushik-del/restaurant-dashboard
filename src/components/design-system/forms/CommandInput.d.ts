import type { ReactNode, ChangeEventHandler, InputHTMLAttributes } from "react";

/**
 * Command bar search input with inner uppercase label.
 * @startingPoint section="Forms" subtitle="Search command bar input" viewport="700x100"
 */
export interface CommandInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: ReactNode;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function CommandInput(props: CommandInputProps): JSX.Element;
