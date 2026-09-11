import { Skeleton } from "@/components/ui/skeleton";
import AnswerCard from "./AnswerCard";
import useAcceptAnswer from "@/hooks/mutations/useAcceptAnswer";

export default function AnswerList({
  answers,
  isLoading,
  error,
  questionId,
  canAccept,
}) {
  const { accept, isPending } = useAcceptAnswer(questionId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Couldn&apos;t load answers. {error.message}
      </p>
    );
  }

  if (answers.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No answers yet. Be the first to help.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          answer={answer}
          canAccept={canAccept}
          onAccept={accept}
          isAccepting={isPending}
        />
      ))}
    </div>
  );
}
