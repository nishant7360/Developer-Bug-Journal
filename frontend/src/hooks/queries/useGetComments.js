import { getComments } from "@/services/apiComment";
import { useQuery } from "@tanstack/react-query";

function useGetComments(questionId) {
  const {
    data: comments,
    isPending,
    error,
  } = useQuery({
    queryKey: ["comments", questionId],
    queryFn: () => getComments(questionId),
  });

  return { comments: comments ?? [], isPending, error };
}

export default useGetComments;
