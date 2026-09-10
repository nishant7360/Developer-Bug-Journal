import { getAllTags } from "@/services/apiTag";
import { useQuery } from "@tanstack/react-query";

function useGetTags() {
  const {
    data: tags,
    isPending,
    error,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getAllTags,
    staleTime: 10 * 60 * 1000,
  });
  return { tags: tags ?? [], isPending, error };
}
export default useGetTags;
