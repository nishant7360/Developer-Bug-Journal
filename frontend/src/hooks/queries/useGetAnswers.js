import { getAnswersByQuestion } from "@/services/apiAnswer";
import { useQuery } from "@tanstack/react-query";

function useGetAnswers(questionId) {
  const {
    data: answers,
    isPending,
    error,
  } = useQuery({
    queryKey: ["answers", questionId],
    queryFn: () => getAnswersByQuestion(questionId),
    enabled: !!questionId,
  });

  return { answers: answers ?? [], isPending, error };
}

export default useGetAnswers;
