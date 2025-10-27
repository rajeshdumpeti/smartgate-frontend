import { api } from "./client";

export const registerStudent = async (payload: {
  name: string;
  student_id?: string;
  grade: string;
  section: string;
  date_of_birth: string;
  parent_phone: string;
  photo_base64: string;
}) => {
  const { data } = await api.post("/students/register", payload);
  return data;
};
