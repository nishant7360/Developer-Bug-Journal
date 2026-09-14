import { toggleBookmark } from "@/services/apiUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useToggleBookmark() {
  const queryClient = useQueryClient();

  const { mutate: toggle, isPending } = useMutation({
    mutationFn: toggleBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  return { toggle, isPending };
}

export default useToggleBookmark;
