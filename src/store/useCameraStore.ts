import { create } from "zustand";

type CameraState = {
  isCameraRunning: boolean;
  setCameraRunning: (v: boolean) => void;
};

export const useCameraStore = create<CameraState>((set) => ({
  isCameraRunning: false,
  setCameraRunning: (v) => set({ isCameraRunning: v }),
}));
