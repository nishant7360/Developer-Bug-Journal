import { deleteQuestion as deleteQuestionRequest } from "@/services/apiQuestion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteQuestion() {
  const queryClient = useQueryClient();

  const { mutate: deleteQuestion, isPending } = useMutation({
    mutationFn: deleteQuestionRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
  return { deleteQuestion, isPending };
}

export default useDeleteQuestion;
