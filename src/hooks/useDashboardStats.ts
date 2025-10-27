import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDashboardStore } from "../store/useDashboardStore";
import { fetchDashboardStats } from "../api/dashboard";
import type { DashboardStats } from "../types/dashboardPayload";

export const useDashboardStats = () => {
  const { setStats } = useDashboardStore();

  const queryResult = useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  // Use useEffect to handle side effects when data changes
  useEffect(() => {
    if (queryResult.data) {
      setStats(queryResult.data);
    }
  }, [queryResult.data, setStats]);

  return queryResult;
};
