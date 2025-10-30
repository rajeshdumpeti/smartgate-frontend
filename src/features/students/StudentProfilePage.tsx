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
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
          <p className="text-gray-500 text-sm mt-1">Active Student Profile</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Deactivate Student</Button>
          <Button>Edit Student Details</Button>
        </div>
      </div>

      {/* Profile + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8">
        {/* Left Card - Profile (40%) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          {/* Student Info */}
          <div className="text-center mb-8">
            {student.photo_path ? (
              <img
                src={`http://127.0.0.1:8000/faces/${student.photo_path.split("/").pop()}`}
                alt={student.name}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-gray-100"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-6 border-4 border-gray-100"></div>
            )}

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {student.name}
            </h2>
            <p className="text-gray-600 text-sm">
              Student ID:{" "}
              <span className="font-semibold">
                {student.student_id || "Auto-generated"}
              </span>
            </p>
            <p className="text-gray-600 text-sm">
              Date of Birth:{" "}
              <span className="font-semibold">
                {student.date_of_birth || "N/A"}
              </span>
            </p>
          </div>

          {/* Grade & Section */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-4 text-center bg-gray-50 rounded-lg p-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Grade</p>
                <p className="font-semibold text-gray-900">{student.grade}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Section</p>
                <p className="font-semibold text-gray-900">
                  {student.section || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Parent/Guardian Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Parent/Guardian
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Contact Number:</span>
                <br />
                {student.parent_phone || "N/A"}
              </p>
              {student.parent_name && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Name:</span>
                  <br />
                  {student.parent_name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Card - Gate Activity (60%) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Gate Activity
          </h2>
          {events && events.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs border-b">
                  <tr>
                    <th className="px-6 py-3 font-medium">DATE</th>
                    <th className="px-6 py-3 font-medium">TIME</th>
                    <th className="px-6 py-3 font-medium">EVENT</th>
                    <th className="px-6 py-3 font-medium">GATE</th>
                    <th className="px-6 py-3 font-medium">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {events.map((e: any) => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(e.timestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(e.timestamp).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {e.event_type === "entry" ? (
                            <FaArrowDown className="text-green-500 text-sm" />
                          ) : (
                            <FaArrowUp className="text-orange-500 text-sm" />
                          )}
                          <span className="font-medium">
                            {e.event_type.charAt(0).toUpperCase() +
                              e.event_type.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {e.gate || "Main Gate A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            e.status === "success"
                              ? "bg-green-100 text-green-800"
                              : e.status === "unknown"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {e.status === "success"
                            ? "On Time"
                            : e.status === "unknown"
                              ? "Unmatched"
                              : "Verified"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No recent activity found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileSkeleton = () => (
  <div className="animate-pulse p-8 space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>
      <div className="flex gap-3">
        <div className="h-10 w-40 bg-gray-200 rounded"></div>
        <div className="h-10 w-40 bg-gray-200 rounded"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8">
      <div className="bg-gray-100 rounded-xl h-96"></div>
      <div className="bg-gray-100 rounded-xl h-96"></div>
    </div>
  </div>
);

export default StudentProfilePage;
