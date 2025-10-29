import { create } from "zustand";

export interface DetectionLog {
  id: string;
  status: string;
  message: string;
  timestamp: string;
}

interface DetectionLogState {
  logs: DetectionLog[];
  addLog: (log: DetectionLog) => void;
  clearLogs: () => void;
}

export const useDetectionLogStore = create<DetectionLogState>((set) => ({
  logs: [],
  addLog: (log) =>
    set((state) => ({
      logs: [log, ...state.logs].slice(0, 20), // keep only 20 latest
    })),
  clearLogs: () => set({ logs: [] }),
}));
