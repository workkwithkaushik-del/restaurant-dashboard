import { toast } from 'sonner';
import React, { useState } from 'react';
import { Modal } from '../../components/design-system/feedback/Modal';
import { Panel } from '../../components/design-system/data/Panel';
import { SummaryCard } from '../../components/design-system/data/SummaryCard';
import { Button } from '../../components/design-system/core/Button';

export default function VendorPerformancePanel() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const vendors = [
    { name: "Blue Hill Roasters", category: "Beverage", rating: "4.8", fulfillment: "98%", analytics: "320kg used this month" },
    { name: "Monarch Foods", category: "Dairy", rating: "4.2", fulfillment: "85%", analytics: "150ltr used this month" },
    { name: "Rise Bakery", category: "Bakery", rating: "4.6", fulfillment: "94%", analytics: "800pcs used this month" }
  ];

  return (
    <Panel 
      eyebrow="Procurement & Analytics" 
      title="Vendor Performance"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
    >
      <div className="dashboard-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16, marginTop: 8}}>
        {vendors.map(vendor => (
          <SummaryCard 
            key={vendor.name} 
            label={`${vendor.category} — ${vendor.name}`} 
            value={`${vendor.fulfillment} Fulfillment`} 
            detail={`Rating: ${vendor.rating} ★ | ${vendor.analytics}`} 
            tone="purple"
          >
            <Button 
              variant="secondary" 
              style={{marginTop: 16, alignSelf: 'flex-start'}} 
              onClick={() => { setSelectedVendor(vendor); setModalOpen(true); }}
            >
              Order Ingredients
            </Button>
          </SummaryCard>
        ))}
      </div>

      <Modal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        title={`Procurement: ${selectedVendor?.name}`}
        ctaText="Place Order"
        onCta={() => toast.success(`Order placed successfully with ${selectedVendor?.name}. Tracking updated.`)}
      >
        <p style={{marginBottom: 16, color: 'var(--text-secondary)'}}>Order ingredients directly from the dashboard for simplified tracking.</p>
        <label className="field" style={{marginBottom: 16, display: 'grid', gap: 6}}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Ingredient & Quantity</span>
          <input 
            type="text" 
            defaultValue={selectedVendor?.category === 'Beverage' ? '50kg Arabica Beans' : selectedVendor?.category === 'Dairy' ? '100ltr Whole Milk' : '500pcs Assorted Buns'} 
            style={{width: '100%', border: '1px solid var(--border-subtle)', background: 'var(--input-bg)', color: 'var(--text-primary)', padding: '10px 14px', borderRadius: 8, fontFamily: 'var(--font-sans)', outline: 'none'}} 
          />
        </label>
        <label className="field" style={{marginBottom: 16, display: 'grid', gap: 6}}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Delivery Expected By</span>
          <input 
            type="date" 
            defaultValue={new Date(Date.now() + 86400000).toISOString().split('T')[0]} 
            style={{width: '100%', border: '1px solid var(--border-subtle)', background: 'var(--input-bg)', color: 'var(--text-primary)', padding: '10px 14px', borderRadius: 8, fontFamily: 'var(--font-sans)', outline: 'none'}} 
          />
        </label>
      </Modal>
    </Panel>
  );
}
