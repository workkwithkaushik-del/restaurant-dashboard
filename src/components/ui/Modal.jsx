import React, { useState, useMemo, useCallback } from "react";
import { formatCurrency, getTodayString, get30DaysAgoString, getSeedFromDate } from "../../utils/helpers";
import { outlets, liveOrders, roles, views, viralCampaigns, weeklyTrend, dayParts, roleBrief } from "../../data/mockData";

export function Modal({ isOpen, onClose, title, children, ctaText, onCtaClick }) {
  if (!isOpen) return null;
  return (
    <div className="c-modal-overlay" onClick={onClose} style={{position: 'fixed', inset: 0, background: 'rgba(20, 33, 28, 0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.2s ease'}}>
      <div className="c-modal-content" onClick={e => e.stopPropagation()} style={{background: 'var(--panel)', padding: 32, borderRadius: 16, border: '1px solid var(--line)', width: 400, maxWidth: '90%', boxShadow: '0 24px 60px rgba(0,0,0,0.1)', transform: 'translateY(0)'}}>
        <h2 style={{marginBottom: 24, fontSize: 24}}>{title}</h2>
        <div style={{marginBottom: 24}}>{children}</div>
        <div style={{display: 'flex', gap: 12, justifyContent: 'flex-end'}}>
          <button className="secondary-button" onClick={onClose}>Cancel</button>
          <button className="primary-button" onClick={() => { onCtaClick(); onClose(); }}>{ctaText}</button>
        </div>
      </div>
    </div>
  );
}
