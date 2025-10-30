// import { useQuery } from "@tanstack/react-query";
// import { fetchEvents } from "../../api/events";
// import { FaArrowDown, FaArrowUp } from "react-icons/fa";

// const AttendanceLogPage = () => {
//   const {
//     data: events,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["allEvents"],
//     queryFn: fetchEvents,
//   });

//   if (isLoading)
//     return <p className="p-6 text-gray-500">Loading event logs...</p>;
//   if (isError)
//     return <p className="p-6 text-red-500">Failed to load event logs.</p>;

//   return (
//     <div className="p-8 space-y-6">
//       <h1 className="text-3xl font-bold text-gray-900">Attendance Logs</h1>
//       <p className="text-gray-500 text-sm">
//         View all student entry and exit events.
//       </p>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
//             <tr>
//               <th className="px-4 py-2 text-left">Student</th>
//               <th className="px-4 py-2 text-left">Event</th>
//               <th className="px-4 py-2 text-left">Timestamp</th>
//               <th className="px-4 py-2 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {events?.map((e: any) => (
//               <tr key={e.id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-2">{e.student_name || "Unknown"}</td>
//                 <td className="px-4 py-2 flex items-center gap-2">
//                   {e.event_type === "entry" ? (
//                     <FaArrowDown className="text-green-500" />
//                   ) : (
//                     <FaArrowUp className="text-orange-500" />
//                   )}
//                   {e.event_type}
//                 </td>
//                 <td className="px-4 py-2">
//                   {new Date(e.timestamp).toLocaleString()}
//                 </td>
//                 <td className="px-4 py-2">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-medium ${
//                       e.status === "success"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {e.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AttendanceLogPage;
