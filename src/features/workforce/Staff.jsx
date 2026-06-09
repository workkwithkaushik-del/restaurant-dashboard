import React, { useState } from 'react';
import { Modal } from '../../components/design-system/feedback/Modal';
import { Panel } from '../../components/design-system/data/Panel';
import { SummaryCard } from '../../components/design-system/data/SummaryCard';
import { Button } from '../../components/design-system/core/Button';
import { StatusPill } from '../../components/design-system/core/StatusPill';
import { IconButton } from '../../components/design-system/core/IconButton';
import { FieldSelect } from '../../components/design-system/forms/FieldSelect';
import { toast } from 'sonner';

export default function Staff({ role, selectedOutlet, searchQuery, outlets, chefs }) {
  const [shiftModalOpen, setShiftModalOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [newShiftRole, setNewShiftRole] = useState('Chef');

  const displayOutlets = selectedOutlet === "all" ? outlets : outlets.filter(o => o.id === selectedOutlet);

  const totalStaff = displayOutlets.reduce((sum, o) => sum + o.staff, 0);
  const openShifts = displayOutlets.length * 3;
  const overtime = (displayOutlets.reduce((sum, o) => sum + (o.sales / 5000), 0)).toFixed(1);
  const avgRating = (displayOutlets.reduce((sum, o) => sum + o.rating, 0) / (displayOutlets.length || 1)).toFixed(1);

  const getChefsForOutlet = (outletName) => chefs.filter(c => c.outlet === outletName);
  const getMockServer = (outletName) => {
    const servers = ["A. Lee", "S. Gupta", "K. Patel", "M. Sharma", "D. Kim"];
    return servers[outletName.length % servers.length];
  };

  const openProfile = (name, empRole, outletName) => {
    let employee = chefs.find(c => c.name === name);
    if (!employee) {
      employee = { name, role: empRole, outlet: outletName, score: 92, quality: 4.6, shift: "Variable", station: empRole === 'Server' ? 'Dining Floor' : 'Office', tickets: 24, load: 85 };
    }
    setSelectedProfile(employee);
    setProfileModalOpen(true);
  };

  const ShiftBlock = ({ time, name, empRole, outlet, styleType }) => {
    let bg, color, border;
    if (styleType === 'chef') {
      bg = 'var(--coral-soft)';
      color = 'var(--coral)';
      border = 'rgba(143, 59, 51, 0.2)';
    } else if (styleType === 'server') {
      bg = 'var(--blue-soft)';
      color = 'var(--blue)';
      border = 'rgba(47, 74, 107, 0.2)';
    } else if (styleType === 'manager') {
      bg = 'var(--green-soft)';
      color = 'var(--green)';
      border = 'rgba(12, 74, 85, 0.2)';
    } else {
      bg = 'var(--amber-soft)';
      color = 'var(--gold-deep)';
      border = 'var(--gold)';
    }

    return (
      <div 
        onClick={() => styleType === 'open' ? setShiftModalOpen(true) : openProfile(name, empRole, outlet)}
        style={{ 
          background: bg,
          color: color,
          padding: 8,
          borderRadius: 6, 
          border: `1px ${styleType === 'open' ? 'dashed' : 'solid'} ${border}`, 
          marginBottom: 8,
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          transition: 'opacity 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = '0.85'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
      >
        {styleType === 'open' ? (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 32, fontSize: 12, fontWeight: 700}}>Open Shift</div>
        ) : (
          <>
            <div style={{fontSize: 11, opacity: 0.8}}>{time}</div>
            <div style={{fontWeight: 800}}>{name}</div>
          </>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'var(--font-sans)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <p className="eyebrow" style={{ margin: 0 }}>Workforce & Scheduling</p>
          <h1 style={{ fontSize: 28, margin: '4px 0 0', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontWeight: 800 }}>Shift Scheduling</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: 14 }}>Manage staff allocation across {selectedOutlet === 'all' ? 'all regional outlets' : 'the outlet'}.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="secondary" onClick={() => setShiftModalOpen(true)}>+ Add New Shift</Button>
          <Button variant="primary" onClick={() => setPublishModalOpen(true)}>Publish Schedule</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: 16 }}>
        <SummaryCard label="Total Staff On-Duty" value={totalStaff} detail="↗ +5% vs last week" tone="green" />
        <SummaryCard label="Open Shifts" value={openShifts} detail="⚠ Requires attention" tone="coral" />
        <SummaryCard label="Overtime Hours (Week)" value={overtime} detail={`Across ${displayOutlets.length * 2} employees`} tone="blue" />
        <SummaryCard label="Avg Shift Rating" value={`${avgRating}/5`} detail="→ Stable" tone="green" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 24 }}>
        <Panel
          title="Master Schedule"
          padding={0}
          action={
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 500 }}>
              <IconButton size="sm" onClick={() => {}}>&lt;</IconButton>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 700 }}>Oct 24 - Oct 30</span>
              <IconButton size="sm" onClick={() => {}}>&gt;</IconButton>
            </div>
          }
        >
          <div style={{ overflowX: 'auto', maxHeight: 600, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--wash)' }}>
                  <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', position: 'sticky', top: 0, zIndex: 10, color: 'var(--text-secondary)', fontWeight: 800 }}>Location / Role</th>
                  <th style={{ padding: 12, textAlign: 'center', borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', position: 'sticky', top: 0, zIndex: 10, color: 'var(--text-secondary)', fontWeight: 800 }}>Mon 24</th>
                  <th style={{ padding: 12, textAlign: 'center', borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', background: 'var(--surface-inset)', position: 'sticky', top: 0, zIndex: 10, color: 'var(--text-success)', fontWeight: 900 }}>Tue 25<br/><small>(Today)</small></th>
                  <th style={{ padding: 12, textAlign: 'center', borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', position: 'sticky', top: 0, zIndex: 10, color: 'var(--text-secondary)', fontWeight: 800 }}>Wed 26</th>
                  <th style={{ padding: 12, textAlign: 'center', borderBottom: '1px solid var(--line)', position: 'sticky', top: 0, zIndex: 10, color: 'var(--text-secondary)', fontWeight: 800 }}>Thu 27</th>
                </tr>
              </thead>
              {displayOutlets.map((outlet) => {
                const outletChefs = getChefsForOutlet(outlet.name);
                const chefName = outletChefs.length > 0 ? outletChefs[0].name : "M. Smith";
                const chef2Name = outletChefs.length > 1 ? outletChefs[1].name : "J. Doe";
                const serverName = getMockServer(outlet.name);
                const server2Name = getMockServer(outlet.name + "2");

                return (
                  <tbody key={outlet.id}>
                    <tr>
                      <td colSpan={5} style={{ padding: '10px 12px', background: 'var(--wash)', fontWeight: 800, borderBottom: '1px solid var(--line)', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontSize: 14 }}>{outlet.name}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 12, fontWeight: 700, borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', verticalAlign: 'top', color: 'var(--text-secondary)' }}>Chef</td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', verticalAlign: 'top' }}>
                        <ShiftBlock time="08:00 - 16:00" name={chefName} empRole="Chef" outlet={outlet.name} styleType="chef" />
                      </td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', verticalAlign: 'top', background: 'var(--surface-inset)' }}>
                        <ShiftBlock time="08:00 - 16:00" name={chefName} empRole="Chef" outlet={outlet.name} styleType="chef" />
                        <ShiftBlock time="16:00 - 00:00" name={chef2Name} empRole="Chef" outlet={outlet.name} styleType="chef" />
                      </td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', verticalAlign: 'top' }}>
                        <ShiftBlock time="08:00 - 16:00" name={chefName} empRole="Chef" outlet={outlet.name} styleType="chef" />
                      </td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--line)', verticalAlign: 'top' }}>
                        <ShiftBlock styleType="open" />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: 12, fontWeight: 700, borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', verticalAlign: 'top', color: 'var(--text-secondary)' }}>Server</td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', verticalAlign: 'top' }}>
                        <ShiftBlock time="10:00 - 18:00" name={serverName} empRole="Server" outlet={outlet.name} styleType="server" />
                      </td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', verticalAlign: 'top', background: 'var(--surface-inset)' }}>
                        <ShiftBlock time="10:00 - 18:00" name={serverName} empRole="Server" outlet={outlet.name} styleType="server" />
                        <ShiftBlock time="18:00 - 02:00" name={server2Name} empRole="Server" outlet={outlet.name} styleType="server" />
                      </td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', verticalAlign: 'top' }}>
                        <ShiftBlock time="10:00 - 18:00" name={serverName} empRole="Server" outlet={outlet.name} styleType="server" />
                      </td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--line)', verticalAlign: 'top' }}>
                        <ShiftBlock time="10:00 - 18:00" name={serverName} empRole="Server" outlet={outlet.name} styleType="server" />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: 12, fontWeight: 700, borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', verticalAlign: 'top', color: 'var(--text-secondary)' }}>Manager</td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', verticalAlign: 'top' }}>
                        <ShiftBlock time="09:00 - 17:00" name={outlet.manager} empRole="Manager" outlet={outlet.name} styleType="manager" />
                      </td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', verticalAlign: 'top', background: 'var(--surface-inset)' }}>
                        <ShiftBlock time="09:00 - 17:00" name={outlet.manager} empRole="Manager" outlet={outlet.name} styleType="manager" />
                      </td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--line)', borderRight: '1px solid var(--line)', verticalAlign: 'top' }}>
                        <ShiftBlock time="09:00 - 17:00" name={outlet.manager} empRole="Manager" outlet={outlet.name} styleType="manager" />
                      </td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--line)', verticalAlign: 'top' }}>
                        <ShiftBlock time="09:00 - 17:00" name={outlet.manager} empRole="Manager" outlet={outlet.name} styleType="manager" />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </Panel>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Panel
            title="Pending Requests"
            action={
              <span style={{ background: 'var(--status-danger-fg)', color: 'var(--surface-card)', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 'bold' }}>
                {displayOutlets.length > 1 ? 3 : 1}
              </span>
            }
          >
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 16, marginBottom: 16, background: 'var(--wash)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <strong style={{ fontSize: 14, color: 'var(--text-primary)' }}>Leave Request</strong>
                <StatusPill tone="warning" style={{ fontSize: 11 }}>Pending</StatusPill>
              </div>
              <p style={{ margin: '0 0 4px 0', fontSize: 14, color: 'var(--text-primary)', fontWeight: 705 }}>{getMockServer(displayOutlets[0]?.name || "Local")} (Server)</p>
              <p style={{ margin: '0 0 16px 0', fontSize: 13, color: 'var(--text-muted)' }}>📅 Oct 28 - Oct 29 (Sick Leave)</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="secondary" style={{ flex: 1 }} onClick={(e) => { toast.error('Leave request denied.'); e.target.closest('div').parentElement.style.opacity = '0.5'; e.target.parentElement.style.pointerEvents = 'none'; }}>Deny</Button>
                <Button variant="primary" style={{ flex: 1 }} onClick={(e) => { toast.success('Leave request approved.'); e.target.closest('div').parentElement.style.opacity = '0.5'; e.target.parentElement.style.pointerEvents = 'none'; }}>Approve</Button>
              </div>
            </div>

            {displayOutlets.length > 1 && (
              <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 16, background: 'var(--wash)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <strong style={{ fontSize: 14, color: 'var(--text-primary)' }}>Shift Swap</strong>
                  <StatusPill tone="warning" style={{ fontSize: 11 }}>Pending</StatusPill>
                </div>
                <p style={{ margin: '0 0 4px 0', fontSize: 14, color: 'var(--text-primary)', fontWeight: 705 }}>{getChefsForOutlet(displayOutlets[1]?.name)?.[0]?.name || "Mike T."} ↔ John D.</p>
                <p style={{ margin: '0 0 16px 0', fontSize: 13, color: 'var(--text-muted)' }}>⇄ Chef Shift - Oct 26</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button variant="secondary" style={{ flex: 1 }} onClick={(e) => { toast.error('Shift swap denied.'); e.target.closest('div').parentElement.style.opacity = '0.5'; e.target.parentElement.style.pointerEvents = 'none'; }}>Deny</Button>
                  <Button variant="primary" style={{ flex: 1 }} onClick={(e) => { toast.success('Shift swap approved.'); e.target.closest('div').parentElement.style.opacity = '0.5'; e.target.parentElement.style.pointerEvents = 'none'; }}>Approve</Button>
                </div>
              </div>
            )}
          </Panel>

          <Panel title="Outlet Labor Cost" eyebrow="Weekly Spend vs Budget">
            {displayOutlets.map((outlet) => {
              const percentage = Math.max(80, Math.min(115, Math.round((outlet.sales / 250000) * 100)));
              const isOverBudget = percentage > 100;
              return (
                <div key={`labor-${outlet.id}`} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{outlet.name}</span>
                    <span style={{ color: isOverBudget ? 'var(--text-danger)' : 'var(--text-primary)' }}>{percentage}%</span>
                  </div>
                  <div style={{ width: '100%', height: 8, background: 'var(--line)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(percentage, 100)}%`, height: '100%', background: isOverBudget ? 'var(--status-danger-fg)' : 'var(--accent-green)' }}></div>
                  </div>
                </div>
              );
            })}
          </Panel>
        </div>
      </div>
      
      {/* Assign New Shift Modal */}
      <Modal open={shiftModalOpen} onClose={() => setShiftModalOpen(false)} title="Assign New Shift" ctaText="Assign Shift" onCta={() => { toast.success('Shift assigned to schedule successfully!'); setShiftModalOpen(false); }}>
        <p style={{color: 'var(--text-muted)', fontSize: 14, marginBottom: 16}}>Add a new shift to the master schedule.</p>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <FieldSelect
            label="Role Category"
            value={newShiftRole}
            onChange={(e) => setNewShiftRole(e.target.value)}
            style={{ marginBottom: 16 }}
          >
            <option>Chef</option>
            <option>Server</option>
            <option>Manager</option>
          </FieldSelect>
          <FieldSelect
            label="Select Employee"
            style={{ marginBottom: 16 }}
          >
            {newShiftRole === 'Chef' && chefs.map(c => <option key={c.id}>{c.name}</option>)}
            {newShiftRole === 'Server' && ["A. Lee", "S. Gupta", "K. Patel", "M. Sharma", "D. Kim"].map(n => <option key={n}>{n}</option>)}
            {newShiftRole === 'Manager' && displayOutlets.map(o => <option key={o.id}>{o.manager}</option>)}
          </FieldSelect>
          <FieldSelect
            label="Work Station / Assignment"
            style={{ marginBottom: 16 }}
          >
            {newShiftRole === 'Chef' && <><option>Hot Line</option><option>Grill</option><option>Fryer</option><option>Dessert</option><option>Prep</option></>}
            {newShiftRole === 'Server' && <><option>Dining Floor A</option><option>Dining Floor B</option><option>Patio</option><option>Takeout/Delivery Counter</option></>}
            {newShiftRole === 'Manager' && <><option>Opening Shift</option><option>Closing Shift</option><option>Mid-Day Floor</option></>}
          </FieldSelect>
          <div style={{display: 'flex', gap: 16}}>
            <label className="field" style={{flex: 1, display: 'grid', gap: 6}}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Start Time</span>
              <input type="time" defaultValue="08:00" style={{width: '100%', border: '1px solid var(--border-subtle)', background: 'var(--input-bg)', color: 'var(--text-primary)', padding: '10px 14px', borderRadius: 8, fontFamily: 'var(--font-sans)', outline: 'none'}} />
            </label>
            <label className="field" style={{flex: 1, display: 'grid', gap: 6}}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>End Time</span>
              <input type="time" defaultValue="16:00" style={{width: '100%', border: '1px solid var(--border-subtle)', background: 'var(--input-bg)', color: 'var(--text-primary)', padding: '10px 14px', borderRadius: 8, fontFamily: 'var(--font-sans)', outline: 'none'}} />
            </label>
          </div>
        </div>
      </Modal>

      {/* Staff Profile Modal */}
      <Modal open={profileModalOpen} onClose={() => setProfileModalOpen(false)} title={`Staff Profile`} ctaText="Message Employee" onCta={() => { toast.success(`Message dispatched securely to ${selectedProfile?.name}`); setProfileModalOpen(false); }}>
        <div style={{display: 'flex', gap: 20, marginBottom: 24, alignItems: 'center'}}>
          <div style={{width: 56, height: 56, borderRadius: '50%', background: 'var(--blue-soft)', color: 'var(--blue)', border: '1px solid rgba(47, 74, 107, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-serif)'}}>
            {selectedProfile?.name?.charAt(0)}
          </div>
          <div>
            <h3 style={{margin: '0 0 4px 0', fontSize: 20, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontWeight: 800}}>{selectedProfile?.name}</h3>
            <p style={{margin: 0, color: 'var(--text-muted)', fontSize: 13, fontWeight: 600}}>{selectedProfile?.role} • {selectedProfile?.outlet}</p>
          </div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(120px, 100%), 1fr))', gap: 12, marginBottom: 24}}>
          <div style={{background: 'var(--wash)', padding: 12, borderRadius: 8, border: '1px solid var(--border-subtle)'}}>
            <span style={{color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 4}}>Performance Score</span>
            <strong style={{display: 'block', fontSize: 18, color: 'var(--text-success)'}}>{selectedProfile?.score}%</strong>
          </div>
          <div style={{background: 'var(--wash)', padding: 12, borderRadius: 8, border: '1px solid var(--border-subtle)'}}>
            <span style={{color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 4}}>Avg Rating</span>
            <strong style={{display: 'block', fontSize: 18, color: 'var(--text-primary)'}}>{selectedProfile?.quality} / 5.0</strong>
          </div>
          <div style={{background: 'var(--wash)', padding: 12, borderRadius: 8, border: '1px solid var(--border-subtle)'}}>
            <span style={{color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 4}}>Primary Station</span>
            <strong style={{display: 'block', fontSize: 14, color: 'var(--text-primary)'}}>{selectedProfile?.station}</strong>
          </div>
          <div style={{background: 'var(--wash)', padding: 12, borderRadius: 8, border: '1px solid var(--border-subtle)'}}>
            <span style={{color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 4}}>Current Load</span>
            <strong style={{display: 'block', fontSize: 14, color: 'var(--text-primary)'}}>{selectedProfile?.load}%</strong>
          </div>
        </div>
        <div>
          <h4 style={{marginBottom: 12, fontSize: 15, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', fontWeight: 800}}>Upcoming Shifts</h4>
          <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            <p style={{fontSize: 13, margin: 0, background: 'var(--wash)', padding: '10px 12px', borderRadius: 6, display: 'flex', justifyContent: 'space-between', border: '1px solid var(--border-subtle)'}}>
              <span style={{ color: 'var(--text-secondary)' }}>Mon, Oct 24</span> <strong style={{ color: 'var(--text-primary)' }}>08:00 - 16:00</strong>
            </p>
            <p style={{fontSize: 13, margin: 0, background: 'var(--wash)', padding: '10px 12px', borderRadius: 6, display: 'flex', justifyContent: 'space-between', border: '1px solid var(--border-subtle)'}}>
              <span style={{ color: 'var(--text-secondary)' }}>Tue, Oct 25</span> <strong style={{ color: 'var(--text-primary)' }}>08:00 - 16:00</strong>
            </p>
            <p style={{fontSize: 13, margin: 0, background: 'var(--wash)', padding: '10px 12px', borderRadius: 6, display: 'flex', justifyContent: 'space-between', border: '1px solid var(--border-subtle)'}}>
              <span style={{ color: 'var(--text-secondary)' }}>Wed, Oct 26</span> <strong style={{ color: 'var(--text-primary)' }}>08:00 - 16:00</strong>
            </p>
          </div>
        </div>
      </Modal>

      <Modal open={publishModalOpen} onClose={() => setPublishModalOpen(false)} title="Publish Schedule" ctaText="Confirm Publish" onCta={() => { toast.success('Schedule published. All staff have been notified.'); setPublishModalOpen(false); }}>
        <p style={{marginBottom: 16, color: 'var(--text-secondary)'}}>Are you sure you want to notify all staff of the new schedule? Changes will be immediately reflected in their portals.</p>
      </Modal>
    </div>
  );
}
