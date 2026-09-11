import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptAnswer } from "@/services/apiAnswer";

function useAcceptAnswer(questionId) {
  const queryClient = useQueryClient();

  const {
    mutate: accept,
    isPending,
    error,
  } = useMutation({
    mutationFn: acceptAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["answers", questionId] });
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
    },
  });

  return { accept, isPending, error };
}

export default useAcceptAnswer;
