import { api } from "./client";

export const startLiveDetection = async () => {
  const res = await api.post("/attendance/start-live");
  return res.data;
};

export const stopLiveDetection = async () => {
  const res = await api.post("/attendance/stop-live");
  return res.data;
};
