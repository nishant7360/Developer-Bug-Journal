import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { formatRelativeTime, truncate } from "@/lib/questionUtils";

export default function ProfileAnswerItem({ answer }) {
  const { question, content, status, createdAt } = answer;
  const isAccepted = status === "accepted";

  const title = question?.title ?? "Deleted question";
  const heading = (
    <span className="text-sm font-medium text-foreground">{title}</span>
  );

  return (
    <div className="py-4">
      {question?._id ? (
        <Link to={`/questions/${question._id}`} className="hover:underline">
          {heading}
        </Link>
      ) : (
        heading
      )}

      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
        {truncate(content, 160)}
      </p>

      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
        <span>{formatRelativeTime(createdAt)}</span>
        {isAccepted && (
          <span className="flex items-center gap-1 text-primary">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Accepted
          </span>
        )}
      </div>
    </div>
  );
}
