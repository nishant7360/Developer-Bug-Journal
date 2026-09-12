import { createComment } from "@/services/apiComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCreateComment(questionId) {
  const queryClient = useQueryClient();

  const { mutate: postComment, isPending } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", questionId] });
    },
  });

  return { postComment, isPending };
}

export default useCreateComment;
