import { getAllQuestions } from "@/services/apiQuestion";
import { useQuery } from "@tanstack/react-query";

function useGetAllQuestions(query = "") {
  const { isLoading, data, error } = useQuery({
    queryKey: ["questions", query],
    queryFn: () => getAllQuestions(query),
  });

  return {
    isLoading,
    error,
    questions: data?.questions ?? [],
    totalPages: data?.totalPages ?? 1,
    currentPage: data?.currentPage ?? 1,
    totalQuestions: data?.totalQuestions ?? 0,
  };
}

export default useGetAllQuestions;
