import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
  isCameraRunning: boolean;
  setCameraRunning: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false, // closed by default on mobile
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  openSidebar: () => set({ isSidebarOpen: true }),
  isCameraRunning: false,
  setCameraRunning: (value) => set({ isCameraRunning: value }),
}));
