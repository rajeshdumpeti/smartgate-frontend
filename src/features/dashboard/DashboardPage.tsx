import { useDashboardStats } from "../../hooks/useDashboardStats";
import StatsCard from "./StatsCards";
import { FaUsers, FaUserCheck, FaQuestion, FaClock } from "react-icons/fa";
import { useCameraStore } from "../../store/useCameraStore";
import DetectionLogPanel from "./DetectionLogPanel";
import LiveCameraView from "./LiveCameraView";

const DashboardPage = () => {
  const { data, isLoading, isError } = useDashboardStats();
  const { setCameraRunning } = useCameraStore();

  if (isLoading)
    return <p className="p-6 text-gray-600 text-sm">Loading dashboard...</p>;
  if (isError)
    return <p className="p-6 text-red-500 text-sm">Failed to load data</p>;

  const { totalStudents, presentToday, unknownDetections, lastEvent } = data!;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
        SmartGate Live View
      </h1>

      {/* Live View Section - 70% Camera | 30% Logs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Camera Section - 70% */}
          <div className="lg:w-7/12">
            <LiveCameraView />
          </div>

          {/* Detection Logs Section - 30% */}
          <div className="lg:w-5/12">
            <DetectionLogPanel />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={totalStudents}
          icon={<FaUsers className="text-blue-500" />}
        />
        <StatsCard
          title="Present Today"
          value={presentToday}
          icon={<FaUserCheck className="text-green-500" />}
        />
        <StatsCard
          title="Unknown Detections"
          value={unknownDetections}
          icon={<FaQuestion className="text-yellow-500" />}
        />
        <StatsCard
          title="Last Event"
          value={
            lastEvent
              ? `${lastEvent.name} - ${lastEvent.eventType} at ${lastEvent.timestamp}`
              : "No recent events"
          }
          icon={<FaClock className="text-purple-500" />}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
