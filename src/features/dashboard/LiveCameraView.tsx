import React from "react";
import { useLiveCamera } from "../../hooks/useLiveCamera";
import Button from "../../components/ui/Button";
import eyeImage from "../../assets/eye_image.png";

const LiveCameraView: React.FC = () => {
  const {
    videoRef,
    isActive,
    statusMsg,
    lastResult,
    startDetection,
    stopDetection,
  } = useLiveCamera();

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 pb-4 flex flex-col items-center space-y-2">
      {/* Video/Image Container - Toggles between camera feed and eye image */}
      <div className="w-full max-w-2xl aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
        {/* Video Feed - Only shows when camera is active */}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${isActive ? "block" : "hidden"}`}
          autoPlay
          playsInline
          muted
        />

        {/* Eye Image - Only shows when camera is inactive */}
        {!isActive && (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <img src={eyeImage} alt="SmartGate Eye" />
          </div>
        )}
      </div>

      {/* Status */}
      <p
        className={`text-sm font-medium ${
          statusMsg.includes("✅")
            ? "text-green-600"
            : statusMsg.includes("⚠️")
              ? "text-yellow-600"
              : statusMsg.includes("❌")
                ? "text-red-500"
                : "text-gray-600"
        }`}
      >
        {statusMsg}
      </p>

      {/* Detection result */}
      {lastResult && (
        <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {lastResult.status || "N/A"}
          </p>
          {lastResult.student_id && (
            <p>
              <span className="font-semibold">Student ID:</span>{" "}
              {lastResult.student_id}
            </p>
          )}
          {lastResult.message && (
            <p>
              <span className="font-semibold">Message:</span>{" "}
              {lastResult.message}
            </p>
          )}
          {lastResult.timestamp && (
            <p>
              <span className="font-semibold">Time:</span>{" "}
              {new Date(lastResult.timestamp).toLocaleString()}
            </p>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-4 mt-4">
        {!isActive ? (
          <Button onClick={startDetection}>Start Detection</Button>
        ) : (
          <Button variant="secondary" onClick={stopDetection}>
            Stop Detection
          </Button>
        )}
      </div>
    </div>
  );
};

export default LiveCameraView;
