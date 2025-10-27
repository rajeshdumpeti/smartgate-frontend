import { create } from "zustand";
import type { DashboardStats } from "../types/dashboardPayload";

export interface DashboardState {
  stats: DashboardStats | null;
  setStats: (data: DashboardStats) => void;
  clearStats: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  setStats: (data) => set({ stats: data }),
  clearStats: () => set({ stats: null }),
}));
