import { useState } from "react";
import { Pencil, Trash2, Check, X, Loader2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/context/AuthContext";
import useUpdateComment from "@/hooks/mutations/useUpdateComment";
import useDeleteComment from "@/hooks/mutations/useDeleteComment";
import { getAuthorInitial, formatRelativeTime } from "@/lib/questionUtils";

export default function CommentItem({ comment, questionId }) {
  const { user } = useAuth();
  const { author, content, isEdited, createdAt } = comment;
  const authorName = author?.username ?? "Deleted user";
  const isOwner = user && author?._id === user.id;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(content);

  const { editComment, isPending: isSaving } = useUpdateComment(questionId);
  const { removeComment, isPending: isDeleting } = useDeleteComment(questionId);

  function handleSave() {
    if (!draft.trim()) return;
    editComment(
      { commentId: comment._id, content: draft },
      { onSuccess: () => setIsEditing(false) },
    );
  }

  function handleCancel() {
    setDraft(content);
    setIsEditing(false);
  }

  return (
    <div className="flex gap-2 py-2">
      <Avatar className="h-6 w-6 shrink-0">
        {author?.profileImage && (
          <AvatarImage src={author.profileImage} alt={authorName} />
        )}
        <AvatarFallback className="text-[10px]">
          {getAuthorInitial(author)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        {isEditing ? (
          <div className="flex items-center gap-1.5">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="h-7 text-sm"
              autoFocus
            />
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="text-primary hover:opacity-80"
            >
              {isSaving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <p className="text-sm text-foreground">
            <span className="font-medium">{authorName}</span>{" "}
            <span className="text-muted-foreground">{content}</span>
          </p>
        )}

        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span>
            {formatRelativeTime(createdAt)}
            {isEdited && " · edited"}
          </span>

          {isOwner && !isEditing && (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="hover:text-foreground"
              >
                <Pencil className="h-3 w-3" />
              </button>

              <AlertDialog>
                <AlertDialogTrigger className="hover:text-destructive">
                  <Trash2 className="h-3 w-3" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete comment?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This can&apos;t be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => removeComment(comment._id)}
                      disabled={isDeleting}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
