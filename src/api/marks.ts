import { api } from "./client";

export const addMark = async (payload: {
  student_id: number;
  subject: string;
  score: number;
  max_score: number;
  exam_type?: string;
  remarks?: string;
}) => {
  const { data } = await api.post("/marks", payload);
  return data;
};

export const fetchMarksByStudent = async (student_id: number) => {
  const { data } = await api.get(`/marks/student/${student_id}`);
  return data;
};
