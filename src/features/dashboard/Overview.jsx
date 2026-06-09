import { toast } from 'sonner';
import { useDashboardData } from '../../hooks/useDashboardData';\nimport { useDashboardStore } from '../../store/useDashboardStore';\nimport React, { useState, useMemo, useCallback } from "react";
import { formatCurrency, getTodayString, get30DaysAgoString, getSeedFromDate } from "../../utils/helpers";
import { outlets, liveOrders, roles, views, viralCampaigns, weeklyTrend, dayParts, roleBrief } from "../../data/mockData";
import { Metric } from "../../components/ui/Metric";
import { StrategyPanel } from "../strategy/StrategyPanel";
import { ViralMarketingPanel } from "../strategy/ViralMarketingPanel";
import { PricingExperimentsPanel } from "../strategy/PricingExperimentsPanel";
import { DemographicsPanel } from "../strategy/DemographicsPanel";
import { ChefPanel } from "../kitchen/ChefPanel";
import { MenuPerformancePanel } from "../kitchen/MenuPerformancePanel";
import { StaffFloorPanel } from "../restaurant/StaffFloorPanel";
import { CompliancePanel } from "../regional/CompliancePanel";
import { RegionalPanel } from "../regional/RegionalPanel";
import { RestaurantPanel } from "../restaurant/RestaurantPanel";
import { Modal } from "../../components/ui/Modal";

export function Overview({ role, totals: liveTotals, average: liveAverage, filteredOutlets, criticalAlerts: liveAlerts, setDismissedAlerts, setActiveView, scopedOrders, isHistorical, dateMultiplier, selectedDate }) {
  const totals = useMemo(() => {
    if (!isHistorical) return liveTotals;
    return {
      sales: Math.round(liveTotals.sales * dateMultiplier),
      orders: Math.round(liveTotals.orders * dateMultiplier),
      liveQueue: 0,
      delivery: Math.round(liveTotals.delivery * dateMultiplier),
    };
  }, [liveTotals, isHistorical, dateMultiplier]);

  const average = useCallback((key, decimals = 0) => {
    if (!isHistorical) return liveAverage(key, decimals);
    const liveVal = Number(liveAverage(key, decimals));
    const newVal = liveVal * (0.9 + (dateMultiplier - 0.8) / 2);
    return newVal.toFixed(decimals);
  }, [liveAverage, isHistorical, dateMultiplier]);

  const criticalAlerts = isHistorical ? [] : liveAlerts;

  const showStrategy = role === "strategy" || role === "regional" || role === "restaurant";
  const showChef = role === "chef";
  const fulfilledOrders = Math.max(totals.orders - totals.liveQueue, 0);
  const fulfillmentRate = Math.round((fulfilledOrders / Math.max(totals.orders, 1)) * 100);
  const delayedOrders = scopedOrders.filter((order) => order.status === "Delayed").length;
  const averageMargin = Number(average("margin"));
  const grossProfit = Math.round((totals.sales * averageMargin) / 100);
  const serviceLeakage = Math.round(totals.sales * 0.032);
  const netPnl = grossProfit - serviceLeakage;

  const [inspectModalOpen, setInspectModalOpen] = useState(false);
  const [selectedOutletForInspect, setSelectedOutletForInspect] = useState(null);

  const metricRow = (
    <section className="metric-row" key="metrics">
      {isHistorical ? (
        role === "chef" ? (
          <>
            <Metric title="Total Ingredients Used" value={`${Math.round(420 * dateMultiplier)} lbs`} change="EOD final tally" accent="blue" />
            <Metric title="Total Tickets Prepped" value={totals.orders} change="100% completed" accent="green" />
            <Metric title="EOD Wastage Rate" value={`${average("wastage", 1) || "1.4"}%`} change="End of shift" accent="orange" />
            <Metric title="Avg Prep Time" value={`${average("prep")} min`} change="Daily average" accent="purple" />
          </>
        ) : role === "restaurant" ? (
          <>
            <Metric title="EOD Net Sales" value={formatCurrency(totals.sales)} change="Final daily total" accent="green" />
            <Metric title="Total Footfall" value={Math.round(totals.orders * 1.8)} change="Guests served" accent="blue" />
            <Metric title="Final CX Score" value={`${average("nps")} NPS`} change={`${average("rating", 1)} avg rating`} accent="red" />
            <Metric title="Staff Shift Hours" value={Math.round(142 * dateMultiplier)} change="Total hours logged" accent="purple" />
          </>
        ) : role === "regional" ? (
          <>
            <Metric title="EOD Net Sales" value={formatCurrency(totals.sales)} change="Across all outlets" accent="green" />
            <Metric title="Total Orders" value={totals.orders.toLocaleString("en-IN")} change="100% fulfillment" accent="blue" />
            <Metric title="Audit Success Rate" value={`${Math.min(Math.round(98 * dateMultiplier), 100)}%`} change="Daily checks" accent="purple" />
            <Metric title="Critical Incidents" value="0" change="All resolved" accent="red" />
          </>
        ) : (
          <>
            <Metric title="EOD Net Sales" value={formatCurrency(totals.sales)} change="Final daily total" accent="green" />
            <Metric title="Total Ad Spend" value={formatCurrency(Math.round(25000 * dateMultiplier))} change="Daily budget" accent="orange" />
            <Metric title="Blended CAC" value={`₹${Math.round(145 * (2 - dateMultiplier))}`} change="Cost per acquisition" accent="purple" />
            <Metric title="Active Campaigns" value="4" change="Running normally" accent="blue" />
          </>
        )
      ) : (
        <>
          <Metric title="Net sales" value={formatCurrency(totals.sales)} change="+13.4% vs last week" accent="green" />
          {role === "strategy" ? (
            <>
              <Metric title="Avg. CAC" value="₹145" change="-12% vs last month" accent="green" />
              <Metric title="Social Reach" value="1.2M" change="Instagram & TikTok" accent="purple" />
            </>
          ) : (
            <>
              <Metric title="Orders" value={totals.orders.toLocaleString("en-IN")} change={`${totals.delivery} delivery orders`} accent="blue" />
              <Metric title="Live queue" value={totals.liveQueue} change="tickets being prepared" accent="orange" />
            </>
          )}
          <Metric title="CX score" value={`${average("nps")} NPS`} change={`${average("rating", 1)} avg rating`} accent="red" />
          {role === "strategy" ? (
             <Metric title="Est. Margin" value={`${averageMargin}%`} change="Net profit estimate" accent="purple" />
          ) : (
             <Metric title={showChef ? "Avg. prep" : "Stock health"} value={showChef ? `${average("prep")} min` : `${average("stockHealth")}%`} change={showChef ? "target 18 min" : `${criticalAlerts.length} alerts open`} accent="purple" />
          )}
        </>
      )}
    </section>
  );

  const chartPanel = (
    <section className="panel chart-panel" key="chart">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Performance</p>
          <h2>{showStrategy ? "Expansion signal" : "Revenue and order trend"}</h2>
        </div>
        <span className="status-pill positive">Healthy trajectory</span>
      </div>
      <div className="combo-chart" aria-label="Sales trend chart">
        {weeklyTrend.map((point) => (
          <span
            className="chart-bar"
            style={{ height: `${point.height}%` }}
            key={point.label}
            tabIndex="0"
            aria-label={`${point.label}: ${formatCurrency(point.sales)}, ${point.orders} orders`}
          >
            <i />
            <b className="chart-tooltip">
              <em>{point.label}</em>
              {formatCurrency(point.sales)}
              <small>{point.orders} orders</small>
            </b>
          </span>
        ))}
      </div>
      <div className="chart-footer">
        <b>{formatCurrency(Math.round(totals.sales / 7))}</b>
        <span>average daily sales for selected scope</span>
      </div>
    </section>
  );

  const mixPanel = (
    <section className="panel mix-panel" key="mix">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Demand mix</p>
          <h2>Day-part contribution</h2>
        </div>
      </div>
      <DonutChart total={totals.orders} />
      <div className="legend-list">
        {dayParts.map((item) => (
          <div key={item.label}>
            <i style={{ background: item.color }} />
            <span>{item.label}</span>
            <b>{item.value}%</b>
          </div>
        ))}
      </div>
    </section>
  );

  const summaryPanel = (
    <section className="graph-summary-panel" aria-label="Graph summary" key="summary">
      <SummaryCard
        label="Sales"
        value={formatCurrency(totals.sales)}
        detail={`${formatCurrency(Math.round(totals.sales / 7))} average daily run-rate`}
        tone="green"
      />
      <SummaryCard
        label="Fulfilled"
        value={fulfilledOrders.toLocaleString("en-IN")}
        detail={`${fulfillmentRate}% of orders completed or closed`}
        tone="blue"
      />
      <SummaryCard
        label="Unfulfilled"
        value={totals.liveQueue.toLocaleString("en-IN")}
        detail={`${delayedOrders} delayed order${delayedOrders === 1 ? "" : "s"} needs attention`}
        tone="orange"
      />
      <SummaryCard
        label="Est. P&L"
        value={formatCurrency(netPnl)}
        detail={`${averageMargin}% margin after ${formatCurrency(serviceLeakage)} service leakage`}
        tone="purple"
      />
    </section>
  );

  const outletPanel = (
    <section className="panel outlet-panel" key="outlet" style={{ gridColumn: '1 / -1' }}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Outlet health</p>
          <h2>Ranked operating view</h2>
        </div>
        <button className="link-button" onClick={() => setActiveView("orders")}>Open orders</button>
      </div>
      <div className="outlet-list">
        {[...filteredOutlets]
          .sort((a, b) => b.sales - a.sales)
          .map((outlet, index) => (
            <div className="outlet-row" key={outlet.id} style={{display: 'flex', alignItems: 'center'}}>
              <strong>{index + 1}</strong>
              <div style={{flex: 1}}>
                <b>{outlet.name}</b>
                <span>{outlet.area} - {outlet.manager}</span>
              </div>
              <p>{formatCurrency(outlet.sales)}</p>
              <Meter value={outlet.stockHealth} label="Stock" />
              <span className="status-pill">+{outlet.growth}%</span>
              <button className="mini-button" style={{marginLeft: 16}} onClick={() => { setSelectedOutletForInspect(outlet); setInspectModalOpen(true); }}>Inspect</button>
            </div>
          ))}
      </div>

      <Modal 
        isOpen={inspectModalOpen} 
        onClose={() => setInspectModalOpen(false)}
        title={`Inspect: ${selectedOutletForInspect?.name}`}
        ctaText="Acknowledge"
        onCtaClick={() => toast.success(`Acknowledged alerts for ${selectedOutletForInspect?.name}`)}
      >
        <div style={{display: 'grid', gap: 16, marginBottom: 24}}>
          <Metric title="Current Health" value={`${selectedOutletForInspect?.stockHealth}%`} change="Stock levels" accent={selectedOutletForInspect?.stockHealth < 80 ? 'red' : 'green'} />
          <Metric title="Manager" value={selectedOutletForInspect?.manager} change="On duty" accent="blue" />
        </div>
        <p style={{color: 'var(--muted)', fontSize: 13}}>Clicking acknowledge will clear non-critical alerts for this location.</p>
      </Modal>
    </section>
  );

  const opsPanel = (
    <section className="panel ops-panel" key="ops" style={{ gridColumn: role === 'regional' ? '1 / -1' : 'span 2' }}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{showChef ? "Kitchen control" : "Priority queue"}</p>
          <h2>{showChef ? "Station performance" : "Action required"}</h2>
        </div>
        <span className="status-pill critical">{criticalAlerts.length} open</span>
      </div>
      <div className="action-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 12 }}>
        {(showChef ? chefs : criticalAlerts).map((item) => (
          <div className="action-item" key={item.id}>
            <span className={showChef ? "status-dot good" : "status-dot alert"} />
            <div>
              <b>{showChef ? item.name : item.item}</b>
              <span>
                {showChef
                  ? `${item.station} - ${item.prep} min prep - ${item.tickets} tickets`
                  : `${item.outlet} - ${item.level}% stock - reorder ${item.reorder}`}
              </span>
            </div>
            {!showChef && (
              <button className="mini-button" onClick={() => setDismissedAlerts((current) => [...current, item.id])}>
                Done
              </button>
            )}
          </div>
        ))}
        {!showChef && criticalAlerts.length === 0 && <p className="empty-state" style={{ gridColumn: '1 / -1' }}>All visible alerts are reviewed.</p>}
      </div>
    </section>
  );

  const ordersPanel = (
    <section className="panel orders-panel" key="orders">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Live service</p>
          <h2>Order queue</h2>
        </div>
        <button className="link-button" onClick={() => setActiveView("orders")}>Manage queue</button>
      </div>
      <div className="compact-orders">
        {scopedOrders.slice(0, 3).map((order) => (
          <div key={order.id}>
            <span className={`order-status ${order.status.toLowerCase()}`} />
            <b>{order.id}</b>
            <p>{order.outlet}</p>
            <strong>{order.eta}</strong>
          </div>
        ))}
      </div>
    </section>
  );

  const strategyPanel = showStrategy ? (
    <div key="strategy" style={{ gridColumn: '1 / -1' }}>
      <StrategyPanel />
    </div>
  ) : null;

  const demographicsPanel = showStrategy ? (
    <div key="demographics" style={{ gridColumn: '1 / -1' }}>
      <DemographicsPanel />
    </div>
  ) : null;

  const pricingExperimentsPanel = showStrategy ? (
    <div key="pricing" style={{ gridColumn: '1 / -1' }}>
      <PricingExperimentsPanel />
    </div>
  ) : null;

  const viralMarketingPanel = showStrategy ? (
    <div key="viralMarketing" style={{ gridColumn: '1 / -1' }}>
      <ViralMarketingPanel />
    </div>
  ) : null;

  const chefPanel = role === "chef" ? (
    <div key="chefInfo" style={{ gridColumn: '1 / -1' }}>
      <ChefPanel />
    </div>
  ) : null;

  const regionalPanel = role === "regional" ? (
    <div key="regionalInfo" style={{ gridColumn: '1 / -1' }}>
      <RegionalPanel />
    </div>
  ) : null;

  const restaurantPanel = role === "restaurant" ? (
    <div key="restaurantInfo" style={{ gridColumn: '1 / -1' }}>
      <RestaurantPanel />
    </div>
  ) : null;

  const menuPerformancePanel = role === "chef" ? (
    <div key="menuPerf" style={{ gridColumn: '1 / -1' }}>
      <MenuPerformancePanel />
    </div>
  ) : null;

  const staffFloorPanel = role === "restaurant" ? (
    <div key="staffFloor" style={{ gridColumn: '1 / -1' }}>
      <StaffFloorPanel />
    </div>
  ) : null;

  const compliancePanel = role === "regional" ? (
    <div key="compliance" style={{ gridColumn: '1 / -1' }}>
      <CompliancePanel />
    </div>
  ) : null;

  let layout = [];
  if (role === "strategy") {
    layout = [metricRow, demographicsPanel, viralMarketingPanel, strategyPanel, pricingExperimentsPanel, chartPanel, mixPanel];
  } else if (role === "chef") {
    layout = [metricRow, chefPanel, menuPerformancePanel, opsPanel, ordersPanel];
  } else if (role === "restaurant") {
    layout = [metricRow, restaurantPanel, staffFloorPanel, opsPanel, ordersPanel, chartPanel, mixPanel, summaryPanel];
  } else {
    // regional (default)
    layout = [metricRow, regionalPanel, compliancePanel, chartPanel, mixPanel, summaryPanel, outletPanel, opsPanel];
  }

  if (isHistorical) {
    layout = layout.filter(panel => 
      panel !== chefPanel && 
      panel !== opsPanel && 
      panel !== ordersPanel && 
      panel !== staffFloorPanel
    );
  }

  return (
    <div className="dashboard-grid">
      {layout}
    </div>
  );
}
