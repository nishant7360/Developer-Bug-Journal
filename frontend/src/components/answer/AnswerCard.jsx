import { formatRelativeTime, getAuthorInitial } from "@/lib/questionUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@base-ui/react";
import { CheckCircle2 } from "lucide-react";

function AnswerCard({ answer, canAccept, onAccept, isAccepting }) {
  const { author, content, status, createdAt } = answer;
  const isAccepted = status === "accepted";
  const authorName = author?.username ?? "Deleted user";

  return (
    <div
      className={`rounded-lg border p-4 ${
        isAccepted ? "border-primary/40 bg-primary/5" : "border-border"
      }`}
    >
      {isAccepted && (
        <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-primary">
          <CheckCircle2 className="h-4 w-4" />
          Accepted answer
        </div>
      )}

      <p className="whitespace-pre-wrap text-sm text-foreground">{content}</p>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Avatar className="h-5 w-5">
            {author?.profileImage && (
              <AvatarImage src={author.profileImage} alt={authorName} />
            )}
            <AvatarFallback className="text-[10px]">
              {getAuthorInitial(author)}
            </AvatarFallback>
          </Avatar>
          <span>{authorName}</span>
          <span>&middot;</span>
          <span>{formatRelativeTime(createdAt)}</span>
        </div>

        {canAccept && !isAccepted && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAccept(answer._id)}
            disabled={isAccepting}
          >
            Accept
          </Button>
        )}
      </div>
    </div>
  );
}

export default AnswerCard;
