import React from 'react';
import { Panel } from '../../components/design-system/data/Panel';
import { SummaryCard } from '../../components/design-system/data/SummaryCard';
import { Button } from '../../components/design-system/core/Button';

export default function WorkforceManagementPanel({ setActiveView }) {
  return (
    <Panel 
      eyebrow="Centralized Hub" 
      title="Workforce Management" 
      action={<Button variant="primary" onClick={() => setActiveView("staff")}>Full Staff Schedule</Button>}
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
    >
      <div className="dashboard-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 14, marginTop: 8}}>
        <SummaryCard 
          label="Operational Oversight" 
          value="47 Active Duty" 
          detail="0 open shifts across all locations. Excellent coverage." 
          tone="blue" 
        />
        <SummaryCard 
          label="Master Schedule" 
          value="Kitchen: 18 / FOH: 29" 
          detail="Timeline view indicates optimal distribution across the morning rush." 
          tone="green" 
        />
        <SummaryCard 
          label="Financial Control" 
          value="24% Labor Cost" 
          detail="Optimized scheduling based on budget and revenue trends. Within target range." 
          tone="amber" 
        />
      </div>

      {/* Live Department Allocation Progress Tracker */}
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px dashed var(--line)' }}>
        <h4 style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 12 }}>
          Live Department Allocation & Shift Coverage
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
          {[
            { dept: "Kitchen Brigade", count: 18, limit: 20, pct: 90, status: "Optimal Prep", tone: "var(--green)" },
            { dept: "Front of House", count: 29, limit: 30, pct: 96, status: "Optimal Service", tone: "var(--blue)" },
            { dept: "Delivery Dispatch", count: 12, limit: 12, pct: 100, status: "High Efficiency", tone: "var(--amber)" },
            { dept: "Floor Management", count: 4, limit: 4, pct: 100, status: "On Duty", tone: "var(--purple)" }
          ].map((item) => (
            <div key={item.dept} style={{ background: 'var(--wash)', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-primary)' }}>{item.dept}</span>
                <span style={{ fontSize: '10px', fontWeight: '850', color: item.tone }}>{item.count}/{item.limit}</span>
              </div>
              <div style={{ width: '100%', height: 4, background: 'var(--line)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${item.pct}%`, height: '100%', background: item.tone, borderRadius: 2 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px', color: 'var(--text-muted)' }}>
                <span>Coverage: {item.pct}%</span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
