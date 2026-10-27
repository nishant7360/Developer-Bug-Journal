import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import useGetUnreadCount from "@/hooks/queries/useGetUnreadCount";
import useGetAllNotification from "@/hooks/queries/useGetAllNotification";
import useMarkAllNotificationRead from "@/hooks/mutations/useMarkAllNotificationRead";
import NotificationItem from "./NotificationItem";

export default function NotificationBell() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const markedThisOpen = useRef(false);

  const { unreadCount } = useGetUnreadCount();
  const { notifications, isLoading, error } = useGetAllNotification(open);
  const { markAll } = useMarkAllNotificationRead();

  useEffect(() => {
    if (!open || isLoading || error || markedThisOpen.current) return;
    markedThisOpen.current = true;
    if (notifications.some((n) => !n.isRead)) markAll();
  }, [open, isLoading, error, notifications, markAll]);

  function handleOpenChange(next) {
    setOpen(next);
    if (!next) {
      markedThisOpen.current = false;
      queryClient.removeQueries({ queryKey: ["notifications", "list"] });
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium leading-none text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
        <span className="sr-only">Notifications</span>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[380px] max-w-[calc(100vw-2rem)] p-0"
      >
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold text-foreground">
            Notifications
          </h2>
        </div>

        <div className="max-h-[420px] overflow-y-auto">
          {isLoading && (
            <div className="flex flex-col gap-3 p-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="mt-2 h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <p className="p-4 text-sm text-destructive">
              Couldn&apos;t load notifications. {error.message}
            </p>
          )}

          {!isLoading && !error && notifications.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              You&apos;re all caught up.
            </p>
          )}

          {!isLoading && !error && notifications.length > 0 && (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                  onNavigate={() => handleOpenChange(false)}
                />
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
