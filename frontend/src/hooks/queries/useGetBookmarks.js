import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "@/services/apiUser";
import { useAuth } from "@/context/AuthContext";

function useGetBookmarks() {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
    enabled: !!user,
  });

  return { bookmarks: data?.bookmarks ?? [], isLoading, error };
}

export default useGetBookmarks;
