import type { ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children?: ReactNode;
  ctaText?: string;
  onCta?: () => void;
  cancelText?: string;
  width?: number;
}

export function Modal(props: ModalProps): JSX.Element | null;
