import { useEffect, useRef, useState, useCallback } from "react";
import { useDetectionLogStore } from "../store/useDetectionLogStore";
import { sendDetectionFrame } from "../api/attendance";

/**
 * Hook: useLiveCamera
 * Handles webcam access, base64 encoding, and sending frames to backend.
 */
export const useLiveCamera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [lastResult, setLastResult] = useState<any>(null);
  const captureInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  /** 🔹 Start the webcam stream */
  const startCamera = useCallback(async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play(); // TS knows this returns Promise<void>
      }
      setIsActive(true);
      setStatusMsg("🎥 Camera started — detecting faces...");
    } catch (err) {
      console.error("Camera error:", err);
      setStatusMsg("❌ Unable to access camera");
    }
  }, []);

  /** 🔹 Stop the webcam and clear intervals */
  const stopCamera = useCallback((): void => {
    if (videoRef.current?.srcObject instanceof MediaStream) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
    }
    if (captureInterval.current) clearInterval(captureInterval.current);
    setIsActive(false);
    // setStatusMsg("🛑 Camera stopped");
  }, []);

  /** 🔹 Convert a frame from video to base64 string */
  const getBase64Frame = useCallback((): string | null => {
    const video = videoRef.current;
    if (!video) return null;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg");
  }, []);

  /** 🔹 Send current frame to backend for detection */
  const sendFrame = useCallback(async (): Promise<void> => {
    const base64Frame = getBase64Frame();
    if (!base64Frame) return;

    try {
      // Assume sendDetectionFrame returns Promise<any>; if not, wrap in Promise.resolve
      const data = (await Promise.resolve(
        sendDetectionFrame(base64Frame)
      )) as Promise<any>;

      setLastResult(data);
      setStatusMsg(
        data.status === "success"
          ? `✅ ${data.message}`
          : `⚠️ ${data.message || "Unknown face"}`
      );

      // 🟢 Log globally
      useDetectionLogStore.getState().addLog({
        id: crypto.randomUUID(),
        status: data.status,
        message: data.message || "No message",
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("Detection error:", err);
      setStatusMsg("⚠️ Detection failed");
    }
  }, [getBase64Frame]);

  /** 🔹 Start periodic frame capture */
  const startDetection = useCallback((): void => {
    void startCamera(); // Use void to suppress await warning (fire-and-forget)
    if (captureInterval.current) clearInterval(captureInterval.current);
    captureInterval.current = setInterval(sendFrame, 4000); // every 4s
  }, [startCamera, sendFrame]);

  /** 🔹 Stop detection and camera */
  const stopDetection = useCallback((): void => {
    stopCamera();
    if (captureInterval.current) clearInterval(captureInterval.current);
  }, [stopCamera]);

  /** 🔹 Cleanup on unmount */
  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  return {
    videoRef,
    isActive,
    statusMsg,
    lastResult,
    startDetection,
    stopDetection,
  };
};
