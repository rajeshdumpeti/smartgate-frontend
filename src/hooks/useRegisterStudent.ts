import { useMutation } from "@tanstack/react-query";
import { registerStudent } from "../api/students";
import type { StudentPayload } from "../types/studentPayload";

export const useRegisterStudent = () => {
  return useMutation({
    mutationFn: (payload: StudentPayload) => registerStudent(payload),
  });
};
