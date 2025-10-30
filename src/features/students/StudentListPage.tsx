import { useQuery } from "@tanstack/react-query";
import { fetchAllStudents } from "../../api/students";
import { useNavigate } from "react-router-dom";

const StudentListPage = () => {
  const navigate = useNavigate();

  const {
    data: students,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["students"],
    queryFn: fetchAllStudents,
  });

  if (isLoading)
    return <p className="p-6 text-gray-600">Loading students...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Failed to load student data</p>;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Student Directory
          </h1>
          <p className="text-gray-500 text-sm">
            Manage student records and monitor their status.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Grade</th>
              <th className="px-6 py-3">Section</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student: any) => (
              <tr
                key={student.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-3 font-medium text-gray-800 flex items-center gap-3">
                  {student.photo_path ? (
                    <img
                      src={`http://127.0.0.1:8000/faces/${student.photo_path.split("/").pop()}`}
                      alt={student.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  )}
                  {student.name}
                </td>
                <td className="px-6 py-3">{student.grade}</td>
                <td className="px-6 py-3">{student.section}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      Math.random() > 0.5
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {Math.random() > 0.5 ? "In School" : "Exited"}
                  </span>
                </td>
                <td
                  className="px-6 py-3 text-blue-600 font-medium cursor-pointer hover:underline"
                  onClick={() => navigate(`/students/${student.id}`)}
                >
                  View Details
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentListPage;
