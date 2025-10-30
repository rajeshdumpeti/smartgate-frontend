import { api } from "./client";

// Get events optionally filtered by student
export const fetchEvents = async (studentId?: string | number) => {
  const url = studentId ? `/events?student_id=${studentId}` : "/events";
  const { data } = await api.get(url);
  return data;
};
