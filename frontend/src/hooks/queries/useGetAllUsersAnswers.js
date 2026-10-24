import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUserAnswers } from "@/services/apiUser";

function useGetUserAnswers(page = 1) {
  const { data, isPending, error } = useQuery({
    queryKey: ["answers", "mine", page],
    queryFn: () => getUserAnswers(page),
    placeholderData: keepPreviousData,
  });

  return {
    answers: data?.answers ?? [],
    totalPages: data?.totalPages ?? 1,
    currentPage: data?.currentPage ?? 1,
    totalAnswers: data?.totalAnswers ?? 0,
    isLoading: isPending,
    error,
  };
}

export default useGetUserAnswers;
