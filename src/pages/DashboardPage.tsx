import { useDashboardStats } from "../hooks/useDashboardStats";
import StatsCard from "../features/dashboard/StatsCards";
import { FaUsers, FaUserCheck, FaQuestion, FaClock } from "react-icons/fa";

const DashboardPage = () => {
  const { data, isLoading, isError } = useDashboardStats();

  if (isLoading)
    return <p className="p-6 text-gray-600 text-sm">Loading dashboard...</p>;
  if (isError)
    return <p className="p-6 text-red-500 text-sm">Failed to load data</p>;

  const { totalStudents, presentToday, unknownDetections, lastEvent } = data!;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800">
        SmartGate Live View
      </h1>
      <p className="text-gray-500 text-sm">
        Monitor real-time student attendance and gate activity
      </p>

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

      {/* Live View Placeholder */}
      <div className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center justify-center border border-gray-100">
        <p className="text-gray-600 mb-4">Camera Offline</p>
        <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
          Start Detection
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
