import { updateQuestion } from "@/services/apiQuestion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateQuestion(questionId) {
  const queryClient = useQueryClient();

  const { mutate: update, isPending } = useMutation({
    mutationFn: (formData) => updateQuestion(questionId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });

  return { update, isPending };
}

export default useUpdateQuestion;
