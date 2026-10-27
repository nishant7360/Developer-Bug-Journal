import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/services/apiNotifications";
import { useAuth } from "@/context/AuthContext";

function useGetAllNotification(enabled = false) {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications", "list"],
    queryFn: getNotifications,
    enabled: !!user && enabled,
    staleTime: 0,
  });

  return { notifications: data ?? [], isLoading, error };
}

export default useGetAllNotification;
