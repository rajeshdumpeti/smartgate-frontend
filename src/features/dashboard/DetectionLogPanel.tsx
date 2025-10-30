import { useDetectionLogStore } from "../../store/useDetectionLogStore";

const DetectionLogPanel = () => {
  const { logs } = useDetectionLogStore();

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mt-6 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Detection Logs
      </h2>
      <div className="max-h-64 overflow-y-auto space-y-2">
        {logs.length === 0 && (
          <p className="text-gray-400 text-sm text-center">
            No detections yet...
          </p>
        )}
        {logs.map((log) => (
          <div
            key={log.id}
            className={`p-2 rounded-md text-sm border-l-4 ${
              log.status === "success"
                ? "border-green-500 bg-green-50 text-green-700"
                : log.status === "unknown"
                  ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                  : "border-gray-400 bg-gray-50 text-gray-700"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{log.message}</span>
              <span className="text-xs text-gray-500">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetectionLogPanel;
