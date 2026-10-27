import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatRelativeTime, getAuthorInitial } from "@/lib/questionUtils";

export default function NotificationItem({ notification, onNavigate }) {
  const { sender, message, question, isRead, createdAt } = notification;
  const to = question?._id ? `/questions/${question._id}` : null;

  const content = (
    <>
      <Avatar className="h-9 w-9 shrink-0">
        {sender?.profileImage && (
          <AvatarImage src={sender.profileImage} alt={sender.username} />
        )}
        <AvatarFallback className="text-xs">
          {getAuthorInitial(sender)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="text-sm text-foreground">{message}</p>
        {question?.title && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {question.title}
          </p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          {formatRelativeTime(createdAt)}
        </p>
      </div>

      {!isRead && (
        <span
          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
          aria-label="New"
        />
      )}
    </>
  );

  const className = `flex items-start gap-3 px-4 py-3 transition-colors hover:bg-accent/50 ${
    isRead ? "" : "bg-primary/5"
  }`;

  return to ? (
    <Link to={to} onClick={onNavigate} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
