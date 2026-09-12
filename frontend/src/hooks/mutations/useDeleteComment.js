import { deleteComment } from "@/services/apiComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteComment(questiondId) {
  const queryClient = useQueryClient();

  const { mutate: removeComment, isPending } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", questiondId] });
    },
  });

  return { removeComment, isPending };
}

export default useDeleteComment;
