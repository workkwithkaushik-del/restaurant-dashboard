// Trimmed mock data, copied from restaurant dashboard/src/data/mockData.js
// Used only for visual fidelity — no real filtering, sorting or seeding.

const outlets = [
  { id: "central", name: "Central Square",  area: "Old City",        manager: "Meera Joshi",  sales: 238000, orders: 426, growth: 14.8, rating: 4.7, nps: 68, prep: 18, stockHealth: 82, margin: 28 },
  { id: "lake",    name: "Lake Road",       area: "Lake Road",       manager: "Dev Iyer",     sales: 194000, orders: 352, growth:  8.6, rating: 4.5, nps: 59, prep: 21, stockHealth: 68, margin: 24 },
  { id: "campus",  name: "Campus Gate",     area: "University Zone", manager: "Ananya Shah",  sales: 167000, orders: 318, growth: 19.4, rating: 4.6, nps: 64, prep: 16, stockHealth: 74, margin: 26 },
];

const roles = [
  { id: "regional",   label: "Regional Manager", iconName: "building-2",   brief: "Track outlet health, revenue, alerts, and live service risk from one screen." },
  { id: "restaurant", label: "Restaurant Manager", iconName: "map-pin",    brief: "Run the floor with stock, orders, staff load, and customer issues in one place." },
  { id: "chef",       label: "Head Chef",          iconName: "chef-hat",   brief: "Monitor tickets, prep speed, station load, and food quality without digging through reports." },
  { id: "strategy",   label: "Strategy",           iconName: "trending-up", brief: "Spot campaign opportunities, pricing signals, and expansion patterns across outlets." },
];

const views = [
  { id: "overview",  iconName: "layout-dashboard"   },
  { id: "menu",      iconName: "utensils-crossed"   },
  { id: "orders",    iconName: "shopping-cart"      },
  { id: "inventory", iconName: "package"            },
  { id: "staff",     iconName: "users"              },
  { id: "feedback",  iconName: "message-square"     },
];

const weeklyTrend = [
  { label: "8 AM",  height: 42, sales: 32000,  orders: 58 },
  { label: "9 AM",  height: 48, sales: 38000,  orders: 66 },
  { label: "10 AM", height: 45, sales: 36000,  orders: 61 },
  { label: "11 AM", height: 56, sales: 47000,  orders: 78 },
  { label: "12 PM", height: 63, sales: 59000,  orders: 94 },
  { label: "1 PM",  height: 60, sales: 55000,  orders: 88 },
  { label: "2 PM",  height: 71, sales: 68000,  orders: 104 },
  { label: "3 PM",  height: 76, sales: 72000,  orders: 111 },
  { label: "4 PM",  height: 82, sales: 81000,  orders: 126 },
  { label: "5 PM",  height: 89, sales: 92000,  orders: 142 },
  { label: "6 PM",  height: 96, sales: 104000, orders: 158 },
  { label: "7 PM",  height: 104, sales: 118000, orders: 173 },
];

const dayParts = [
  { label: "Breakfast", value: 24, color: "#1b7f63" },
  { label: "Lunch",     value: 31, color: "#f0a72f" },
  { label: "Evening",   value: 28, color: "#e35b4f" },
  { label: "Late",      value: 17, color: "#3a5bdc" },
];

const reviews = [
  { id: "cm-1", user: "Harsh M. (Zomato)",   rating: 2, note: "The food arrived extremely cold and was 20 minutes late!",                        time: "10 min ago", tag: "ColdFood",     tagTone: "warning" },
  { id: "cm-2", user: "Priya S. (Swiggy)",   rating: 1, note: "The chicken patty inside was uncooked and raw in the center! High quality risk.", time: "15 min ago", tag: "QualityRisk",  tagTone: "danger" },
  { id: "cm-3", user: "Vikram K. (Direct)",  rating: 5, note: "Outstanding taste! The coffee blend is super aromatic, packed neatly.",           time: "25 min ago", tag: "Praise",       tagTone: "success" },
  { id: "cm-4", user: "Aisha R. (Zomato)",   rating: 2, note: "Order got delayed and fries were late and cold.",                                  time: "40 min ago", tag: "ColdFood",     tagTone: "warning" },
  { id: "cm-5", user: "Rohan D. (Swiggy)",   rating: 4, note: "Loved the packing but delivery could have been slightly faster.",                  time: "1h ago",     tag: "Praise",       tagTone: "success" },
];

const fmtINR = (n) =>
  "₹" + Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });

Object.assign(window, { kitData: { outlets, roles, views, weeklyTrend, dayParts, reviews, fmtINR } });
