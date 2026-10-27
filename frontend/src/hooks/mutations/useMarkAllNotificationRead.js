import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAllRead } from "@/services/apiNotifications";

function useMarkAllNotificationRead() {
  const queryClient = useQueryClient();

  const { mutate: markAll, isPending } = useMutation({
    mutationFn: markAllRead,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count"],
      }),
  });

  return { markAll, isPending };
}

export default useMarkAllNotificationRead;
