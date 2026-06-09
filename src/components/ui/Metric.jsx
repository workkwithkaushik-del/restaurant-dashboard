import React, { useState, useMemo, useCallback } from "react";
import { formatCurrency, getTodayString, get30DaysAgoString, getSeedFromDate } from "../../utils/helpers";
import { outlets, liveOrders, roles, views, viralCampaigns, weeklyTrend, dayParts, roleBrief } from "../../data/mockData";

export function Metric({ title, value, change, accent }) {
  return (
    <article className={`metric-card metric-card--${accent}`}>
      <span>{title}</span>
      <strong>{value}</strong>
      <p>{change}</p>
    </article>
  );
}
