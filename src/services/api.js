import { outlets, inventory, chefs, liveOrders, feedback, campaigns, viralCampaigns, weeklyTrend, dayParts } from "../data/mockData";

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchOutlets = async () => {
  await delay(800);
  return outlets;
};

export const fetchInventory = async () => {
  await delay(600);
  return inventory;
};

export const fetchChefs = async () => {
  await delay(700);
  return chefs;
};

export const fetchLiveOrders = async () => {
  await delay(500);
  return liveOrders;
};

export const fetchFeedback = async () => {
  await delay(400);
  return feedback;
};

export const fetchCampaigns = async () => {
  await delay(900);
  return campaigns;
};

export const fetchViralCampaigns = async () => {
  await delay(600);
  return viralCampaigns;
};

export const fetchAnalytics = async () => {
  await delay(1000);
  return { weeklyTrend, dayParts };
};
