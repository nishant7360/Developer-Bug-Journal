import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "@/services/apiNotifications";
import { useAuth } from "@/context/AuthContext";

function useGetUnreadCount() {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: getUnreadCount,
    enabled: !!user,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });

  return { unreadCount: data?.unreadNotifications ?? 0 };
}

export default useGetUnreadCount;
