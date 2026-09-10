import { createQuestion } from "@/services/apiQuestion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCreateQuestion() {
  const queryClient = useQueryClient();

  const { mutate: create, isPending } = useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });

  return { create, isPending };
}

export default useCreateQuestion;
