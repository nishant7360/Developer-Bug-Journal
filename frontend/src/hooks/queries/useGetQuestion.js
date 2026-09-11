import { getQuestionById } from "@/services/apiQuestion";
import { useQuery } from "@tanstack/react-query";

function useGetQuestion(id) {
  const {
    isLoading,
    data: question,
    error,
  } = useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestionById(id),
    enabled: !!id,
  });

  return { isLoading, question, error };
}

export default useGetQuestion;
