import { api } from "./client";
import type { DashboardStats } from "../types/dashboardPayload";

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const res = await api.get("/api/v1/dashboard/stats");
    return res.data;
  } catch (err) {
    console.warn(
      "[dashboard.ts] API not available, falling back to local mock data."
    );
    const res = await fetch("/mock/dashboard.json");
    return res.json();
  }
};
