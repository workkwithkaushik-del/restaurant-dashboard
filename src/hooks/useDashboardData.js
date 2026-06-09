import { useQuery } from "@tanstack/react-query";
import { fetchOutlets, fetchInventory, fetchChefs, fetchLiveOrders, fetchFeedback, fetchCampaigns, fetchViralCampaigns, fetchAnalytics } from "../services/api";

export function useDashboardData() {
  const { data: outlets = [], isLoading: outletsLoading } = useQuery({ queryKey: ['outlets'], queryFn: fetchOutlets });
  const { data: inventory = [], isLoading: inventoryLoading } = useQuery({ queryKey: ['inventory'], queryFn: fetchInventory });
  const { data: chefs = [], isLoading: chefsLoading } = useQuery({ queryKey: ['chefs'], queryFn: fetchChefs });
  const { data: liveOrders = [], isLoading: ordersLoading } = useQuery({ queryKey: ['liveOrders'], queryFn: fetchLiveOrders });
  const { data: feedback = [], isLoading: feedbackLoading } = useQuery({ queryKey: ['feedback'], queryFn: fetchFeedback });
  const { data: campaigns = [], isLoading: campaignsLoading } = useQuery({ queryKey: ['campaigns'], queryFn: fetchCampaigns });
  const { data: viralCampaigns = [], isLoading: viralCampaignsLoading } = useQuery({ queryKey: ['viralCampaigns'], queryFn: fetchViralCampaigns });
  const { data: analyticsData, isLoading: analyticsLoading } = useQuery({ queryKey: ['analytics'], queryFn: fetchAnalytics });
  
  const { weeklyTrend = [], dayParts = [] } = analyticsData || {};

  const isLoading = outletsLoading || inventoryLoading || chefsLoading || ordersLoading || feedbackLoading || campaignsLoading || viralCampaignsLoading || analyticsLoading;

  return {
    outlets,
    inventory,
    chefs,
    liveOrders,
    feedback,
    campaigns,
    viralCampaigns,
    weeklyTrend,
    dayParts,
    isLoading
  };
}
