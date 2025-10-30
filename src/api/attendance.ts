import { api } from "./client";

export const startLiveDetection = async () => {
  const res = await api.post("/attendance/start-live");
  return res.data;
};

export const stopLiveDetection = async () => {
  const res = await api.post("/attendance/stop-live");
  return res.data;
};

export const sendDetectionFrame = async (base64Frame: string) => {
  const { data } = await api.post("/attendance/detect", {
    image_base64: base64Frame,
    event_type: "entry",
  });
  return data;
};
