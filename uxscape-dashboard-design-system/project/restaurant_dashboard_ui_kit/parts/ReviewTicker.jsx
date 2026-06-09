// ReviewTicker — scrollable list of FeedbackCards used in the
// leakage-feedback panel.
function ReviewTicker({ items }) {
  const ns = window.UXscapeDashboardDesignSystem_6e71f2;
  const { FeedbackCard, Badge } = ns;
  return (
    <div
      style={{
        maxHeight: 280,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingRight: 6,
      }}
    >
      {items.map((r) => (
        <FeedbackCard
          key={r.id}
          user={r.user}
          rating={r.rating}
          content={r.note}
          time={r.time}
          badge={<Badge tone={r.tagTone}>#{r.tag}</Badge>}
        />
      ))}
    </div>
  );
}

window.ReviewTicker = ReviewTicker;
