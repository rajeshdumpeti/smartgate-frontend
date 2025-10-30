import { api } from "./client";

// Register new student
export const registerStudent = async (payload: {
  name: string;
  student_id?: string;
  grade: string;
  section: string;
  date_of_birth: string;
  parent_phone: string;
  photo_base64?: string;
}) => {
  const { data } = await api.post("/students/register", payload);
  return data;
};

// Fetch all students
export const fetchAllStudents = async () => {
  const { data } = await api.get("/students");
  return data;
};

// Fetch single student by ID
export const fetchStudentById = async (id: number | string) => {
  const { data } = await api.get(`/students/${id}`);
  return data;
};
