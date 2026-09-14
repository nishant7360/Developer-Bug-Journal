import { CheckCircle2, Bookmark, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import useGetBookmarks from "@/hooks/queries/useGetBookmarks";
import useToggleBookmark from "@/hooks/mutations/useToggleBookmark";
import QuestionOwnerMenu from "./QuestionOwnerMenu";

export default function QuestionHeader({
  questionId,
  title,
  isSolved,
  authorId,
}) {
  const { user } = useAuth();
  const { bookmarks } = useGetBookmarks();
  const { toggle, isPending } = useToggleBookmark();

  const isBookmarked = bookmarks.some((q) => q._id === questionId);
  const isOwner = user && authorId === (user.id ?? user._id);

  function handleBookmarkClick() {
    if (!user) return;
    toggle(questionId);
  }

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-2">
        {isSolved && (
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
        )}
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {user && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmarkClick}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Bookmark
                className={`h-5 w-5 ${
                  isBookmarked ? "fill-primary text-primary" : ""
                }`}
              />
            )}
            <span className="sr-only">
              {isBookmarked ? "Remove bookmark" : "Add bookmark"}
            </span>
          </Button>
        )}

        {isOwner && <QuestionOwnerMenu questionId={questionId} />}
      </div>
    </div>
  );
}
