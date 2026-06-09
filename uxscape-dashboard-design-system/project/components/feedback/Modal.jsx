import React from "react";

/**
 * Modal — centred dialog with blurred ink overlay. Always shows a
 * Cancel + primary CTA pair in the footer.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  ctaText = "Confirm",
  onCta,
  cancelText = "Cancel",
  width = 400,
}) {
  if (!open) return null;
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
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface-card)",
          padding: 32,
          borderRadius: 16,
          border: "1px solid var(--border-subtle)",
          width,
          maxWidth: "90%",
          boxShadow: "0 24px 60px rgba(0,0,0,0.1)",
        }}
      >
        {title && (
          <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 850 }}>
            {title}
          </h2>
        )}
        <div style={{ marginBottom: 24 }}>{children}</div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
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
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              if (onCta) onCta();
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
            }}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
