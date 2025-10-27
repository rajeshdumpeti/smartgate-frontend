import axios from "axios";
import type { StudentPayload } from "../types/studentPayload";

const API_BASE = "http://127.0.0.1:8000/api/v1/students";

export const registerStudent = async (payload: StudentPayload) => {
  const { data } = await axios.post(`${API_BASE}/register`, payload);
  return data;
};
