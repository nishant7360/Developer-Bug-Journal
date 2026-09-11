import { createAnswer } from "@/services/apiAnswer";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCreateAnswer(questionId) {
  const queryClient = useQueryClient();

  const { mutate: postAnswer, isPending } = useMutation({
    mutationFn: createAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["answers", questionId] });
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
    },
  });

  return { postAnswer, isPending };
}

export default useCreateAnswer;
