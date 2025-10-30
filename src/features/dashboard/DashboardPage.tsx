import { useDashboardStats } from "../../hooks/useDashboardStats";
import StatsCard from "./StatsCards";
<<<<<<< Updated upstream
import {
  FaUsers,
  FaUserCheck,
  FaQuestion,
  FaClock,
  FaVideo,
} from "react-icons/fa";
import eyeImage from "../../assets/eye_image.png";
import { startLiveDetection, stopLiveDetection } from "../../api/attendance";
import { useCameraStore } from "../../store/useCameraStore";

const DashboardPage = () => {
  const { data, isLoading, isError } = useDashboardStats();
  const { isCameraRunning, setCameraRunning } = useCameraStore();
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  const handleToggleDetection = async () => {
    try {
      setIsLoadingAction(true);
      if (isCameraRunning) {
        await stopLiveDetection();
        setCameraRunning(false);
      } else {
        await startLiveDetection();
        setCameraRunning(true);
      }
    } catch (e) {
      console.error("Failed to toggle detection", e);
    } finally {
      setIsLoadingAction(false);
    }
  };
=======
import { FaUsers, FaUserCheck, FaQuestion, FaClock } from "react-icons/fa";
import DetectionLogPanel from "./DetectionLogPanel";
import LiveCameraView from "./LiveCameraView";

const DashboardPage = () => {
  const { data, isLoading, isError } = useDashboardStats();
  // const { setCameraRunning } = useCameraStore();
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
      {/* Live View Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center space-y-4">
        <img
          src={eyeImage}
          alt="SmartGate Eye"
          className="w-64 h-40 object-cover rounded-xl shadow-sm"
        />
        <p className="text-gray-700 font-semibold text-lg">
          {isCameraRunning ? "Camera Active" : "Camera Offline"}
        </p>
        <p className="text-gray-500 text-sm">
          {isCameraRunning
            ? "SmartGate is actively detecting students at the gate."
            : "Press 'Start Detection' to begin the live feed and monitor the gate."}
        </p>

        <button
          onClick={handleToggleDetection}
          disabled={isLoadingAction}
          className={`mt-3 px-6 py-3 rounded-full font-semibold shadow-md transition flex items-center gap-2 ${
            isCameraRunning
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <FaVideo />
          {isLoadingAction
            ? "Processing..."
            : isCameraRunning
              ? "Stop Detection"
              : "Start Detection"}
        </button>
=======
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
>>>>>>> Stashed changes
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
