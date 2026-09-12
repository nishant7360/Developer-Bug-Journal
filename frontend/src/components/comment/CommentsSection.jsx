import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const PREVIEW_COUNT = 2;

export default function CommentsSection({
  questionId,
  comments,
  isLoading,
  error,
}) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const visibleComments = expanded
    ? comments
    : comments.slice(0, PREVIEW_COUNT);
  const hiddenCount = comments.length - visibleComments.length;

  return (
    <div className="mt-4 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          Comments {comments.length > 0 && `(${comments.length})`}
        </span>
        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            See all
          </button>
        )}
      </div>

      {isLoading && (
        <div className="mt-2 flex flex-col gap-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-2/3" />
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-destructive">
          Couldn&apos;t load comments. {error.message}
        </p>
      )}

      {!isLoading && !error && (
        <>
          {comments.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              No comments yet.
            </p>
          ) : (
            <div className="mt-1 divide-y divide-border">
              {visibleComments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  questionId={questionId}
                />
              ))}
            </div>
          )}

          {user ? (
            <CommentForm questionId={questionId} />
          ) : (
            <p className="mt-2 text-xs text-muted-foreground">
              Log in to add a comment.
            </p>
          )}
        </>
      )}
    </div>
  );
}
