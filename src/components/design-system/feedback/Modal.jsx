import React from "react";

/**
 * Modal — centred dialog with blurred ink overlay. Always shows a
 * Cancel + primary CTA pair in the footer.
 */
export function Modal({
  open,
  isOpen,
  onClose,
  title,
  children,
  ctaText = "Confirm",
  onCta,
  onCtaClick,
  cancelText = "Cancel",
  width = 400,
}) {
  const isModalOpen = open !== undefined ? open : isOpen;
  const handleCta = onCta || onCtaClick;

  if (!isModalOpen) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20, 33, 28, 0.4)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        fontFamily: "var(--font-sans)",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface-card, var(--panel))",
          padding: "clamp(16px, 4vw, 32px)",
          borderRadius: 16,
          border: "1px solid var(--border-subtle, var(--line))",
          width,
          maxWidth: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: "0 24px 60px rgba(0,0,0,0.1)",
        }}
      >
        {title && (
          <h2 style={{ marginBottom: "clamp(12px, 3vw, 24px)", fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 850 }}>
            {title}
          </h2>
        )}
        <div style={{ marginBottom: "clamp(12px, 3vw, 24px)" }}>{children}</div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <button
            onClick={onClose}
            style={{
              minHeight: 42,
              borderRadius: 8,
              border: 0,
              padding: "0 16px",
              background: "var(--green-soft)",
              color: "var(--green)",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
              flex: "1 1 auto",
              minWidth: "80px",
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              if (handleCta) handleCta();
              if (onClose) onClose();
            }}
            style={{
              minHeight: 42,
              borderRadius: 8,
              border: 0,
              padding: "0 16px",
              background: "var(--ink)",
              color: "var(--panel)",
              fontWeight: 800,
              fontSize: 14,
              boxShadow: "var(--shadow-button)",
              cursor: "pointer",
              flex: "1 1 auto",
              minWidth: "80px",
            }}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
