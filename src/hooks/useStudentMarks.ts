import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addMark, fetchMarksByStudent } from "../api/marks";

export const useStudentMarks = (studentId: number) => {
  const queryClient = useQueryClient();

  const marksQuery = useQuery({
    queryKey: ["marks", studentId],
    queryFn: () => fetchMarksByStudent(studentId),
    enabled: !!studentId,
  });

  const addMarkMutation = useMutation({
    mutationFn: addMark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marks", studentId] });
    },
  });

  return { ...marksQuery, addMarkMutation };
};
