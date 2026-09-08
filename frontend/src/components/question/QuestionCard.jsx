import { Link } from "react-router-dom";
import { MessageSquare, Eye, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  normalizeTechnologies,
  getAuthorInitial,
  formatRelativeTime,
  truncate,
} from "@/lib/questionUtils";

const MAX_VISIBLE_TAGS = 3;

export default function QuestionCard({ question }) {
  const {
    _id,
    title,
    description,
    author,
    tags,
    technologies,
    views,
    answeresCount,
    isSolved,
    createdAt,
  } = question;

  const techList = normalizeTechnologies(technologies);
  const allTags = [...tags.map((t) => t.name), ...techList];
  const visibleTags = allTags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = allTags.length - visibleTags.length;
  const authorName = author?.username ?? "Deleted user";

  return (
    <Link
      to={`/questions/${_id}`}
      className="block px-1 py-4 transition-colors hover:bg-accent/40"
    >
      <div className="flex items-center gap-1.5">
        {isSolved && (
          <Tooltip>
            <TooltipTrigger className="shrink-0">
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </TooltipTrigger>
            <TooltipContent>Solved</TooltipContent>
          </Tooltip>
        )}
        <h3 className="truncate text-sm font-medium text-foreground sm:text-base">
          {title}
        </h3>
      </div>

      <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground sm:line-clamp-1">
        {truncate(description, 100)}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-muted-foreground">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar className="h-5 w-5 shrink-0">
            {author?.profileImage && (
              <AvatarImage src={author.profileImage} alt={authorName} />
            )}
            <AvatarFallback className="text-[10px]">
              {getAuthorInitial(author)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate">{authorName}</span>
          <span className="shrink-0">&middot;</span>
          <span className="shrink-0">{formatRelativeTime(createdAt)}</span>
        </div>

        {visibleTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            {visibleTags.map((tag, i) => (
              <span
                key={tag}
                className={`rounded bg-muted px-1.5 py-0.5 text-muted-foreground ${
                  i > 0 ? "hidden sm:inline-block" : ""
                }`}
              >
                {tag}
              </span>
            ))}
            {hiddenCount > 0 && (
              <span className="hidden sm:inline">+{hiddenCount}</span>
            )}
          </div>
        )}

        <div className="ml-auto flex items-center gap-3">
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            {answeresCount}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {views}
          </span>
        </div>
      </div>
    </Link>
  );
}
