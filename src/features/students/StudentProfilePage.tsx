import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchStudentById } from "../../api/students";
import { fetchEvents } from "../../api/events";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Button from "../../components/ui/Button";

const StudentProfilePage = () => {
  const { id } = useParams();
  const studentId = Number(id);

  // Fetch student details
  const {
    data: student,
    isLoading: loadingStudent,
    isError: studentError,
  } = useQuery({
    queryKey: ["student", studentId],
    queryFn: () => fetchStudentById(studentId),
  });

  // Fetch student events
  const {
    data: events,
    isLoading: loadingEvents,
    isError: eventError,
  } = useQuery({
    queryKey: ["studentEvents", studentId],
    queryFn: () => fetchEvents(studentId),
    enabled: !!studentId,
  });

  if (loadingStudent || loadingEvents) return <ProfileSkeleton />;
  if (studentError || eventError)
    return <p className="p-6 text-red-500">Failed to load student data.</p>;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
        <div className="flex gap-3">
          <Button variant="secondary">Deactivate Student</Button>
          <Button>Edit Student Details</Button>
        </div>
      </div>
      <p className="text-gray-500 text-sm">Active Student Profile</p>

      {/* Profile + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6">
        {/* Left Card - Profile (40%) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
          {student.photo_path ? (
            <img
              src={`http://127.0.0.1:8000/faces/${student.photo_path.split("/").pop()}`}
              alt={student.name}
              className="w-40 h-40 rounded-full object-cover mx-auto mb-4"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200 mx-auto mb-4"></div>
          )}

          <h2 className="text-xl font-semibold text-gray-800">
            {student.name}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Student ID:{" "}
            <span className="font-medium">
              {student.student_id || "Auto-generated"}
            </span>
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Date of Birth:{" "}
            <span className="font-medium">
              {student.date_of_birth || "N/A"}
            </span>
          </p>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="grid grid-cols-2 gap-3 text-sm text-left">
            <p>
              <span className="font-medium text-gray-700">Grade:</span>{" "}
              {student.grade}
            </p>
            <p>
              <span className="font-medium text-gray-700">Section:</span>{" "}
              {student.section || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Parent:</span>{" "}
              {student.parent_name || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Contact:</span>{" "}
              {student.parent_phone || "N/A"}
            </p>
          </div>
        </div>

        {/* Right Card - Gate Activity (60%) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Gate Activity
          </h2>
          {events && events.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[500px]">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Time</th>
                    <th className="px-4 py-2">Event</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e: any) => (
                    <tr key={e.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">
                        {new Date(e.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(e.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="px-4 py-2 flex items-center gap-2">
                        {e.event_type === "entry" ? (
                          <FaArrowDown className="text-green-500" />
                        ) : (
                          <FaArrowUp className="text-orange-500" />
                        )}
                        {e.event_type.charAt(0).toUpperCase() +
                          e.event_type.slice(1)}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            e.status === "success"
                              ? "bg-green-100 text-green-700"
                              : e.status === "unknown"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {e.status === "success"
                            ? "On Time"
                            : e.status === "unknown"
                              ? "Unmatched"
                              : "Other"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent activity found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileSkeleton = () => (
  <div className="animate-pulse p-8 space-y-8">
    <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-100 rounded-xl h-80"></div>
      <div className="bg-gray-100 rounded-xl h-80"></div>
    </div>
  </div>
);

export default StudentProfilePage;
