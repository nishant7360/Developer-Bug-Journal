import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUserQuestions } from "@/services/apiUser";

function useGetUserQuestions(page = 1) {
  const { data, isPending, error } = useQuery({
    queryKey: ["questions", "mine", page],
    queryFn: () => getUserQuestions(page),
    placeholderData: keepPreviousData,
  });

  return {
    questions: data?.questions ?? [],
    totalPages: data?.totalPages ?? 1,
    currentPage: data?.currentPage ?? 1,
    totalQuestions: data?.totalQuestions ?? 0,
    isLoading: isPending,
    error,
  };
}

export default useGetUserQuestions;
