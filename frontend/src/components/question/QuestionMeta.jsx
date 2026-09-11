import { Eye, MessageSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getAuthorInitial, formatRelativeTime } from "@/lib/questionUtils";

export default function QuestionMeta({
  author,
  createdAt,
  views,
  answeresCount,
}) {
  const authorName = author?.username ?? "Deleted user";

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <Avatar className="h-6 w-6">
        {author?.profileImage && (
          <AvatarImage src={author.profileImage} alt={authorName} />
        )}
        <AvatarFallback className="text-xs">
          {getAuthorInitial(author)}
        </AvatarFallback>
      </Avatar>
      <span>{authorName}</span>
      <span>&middot;</span>
      <span>{formatRelativeTime(createdAt)}</span>
      <span>&middot;</span>
      <span className="flex items-center gap-1">
        <Eye className="h-3.5 w-3.5" />
        {views} views
      </span>
      <span className="flex items-center gap-1">
        <MessageSquare className="h-3.5 w-3.5" />
        {answeresCount} answers
      </span>
    </div>
  );
}
