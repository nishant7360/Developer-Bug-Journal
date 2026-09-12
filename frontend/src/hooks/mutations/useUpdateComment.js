import { updateComment } from "@/services/apiComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateComment(questiondId) {
  const queryClient = useQueryClient();

  const { mutate: editComment, isPending } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", questiondId] });
    },
  });
  return { editComment, isPending };
}

export default useUpdateComment;
