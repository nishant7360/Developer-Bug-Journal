import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import AnswerCard from "./AnswerCard";
import AnswerForm from "./AnswerForm";
import useGetAnswers from "@/hooks/queries/useGetAnswers";
import useAcceptAnswer from "@/hooks/mutations/useAcceptAnswer";

export default function AnswersSection({
  questionId,
  answeresCount,
  canAccept,
  user,
}) {
  const { answers, isLoading, error } = useGetAnswers(questionId);
  const { accept, isPending: isAccepting } = useAcceptAnswer(questionId);

  const acceptedAnswer = answers.find((a) => a.status === "accepted");
  const otherAnswers = answers.filter((a) => a.status !== "accepted");

  return (
    <div className="mt-10 border-t border-border pt-6">
      <h2 className="text-lg font-semibold text-foreground">
        {answeresCount} {answeresCount === 1 ? "Answer" : "Answers"}
      </h2>

      {isLoading && (
        <div className="mt-4 flex flex-col gap-3">
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm text-destructive">
          Couldn&apos;t load answers. {error.message}
        </p>
      )}

      {!isLoading && !error && (
        <div className="mt-4 flex flex-col gap-6">
          {acceptedAnswer && (
            <AnswerCard
              answer={acceptedAnswer}
              canAccept={false}
              onAccept={accept}
              isAccepting={isAccepting}
            />
          )}

          {otherAnswers.length > 0 && (
            <div>
              {acceptedAnswer && (
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  {otherAnswers.length}{" "}
                  {otherAnswers.length === 1 ? "other answer" : "other answers"}
                </p>
              )}
              <div className="flex flex-col gap-3">
                {otherAnswers.map((answer) => (
                  <AnswerCard
                    key={answer._id}
                    answer={answer}
                    canAccept={canAccept}
                    onAccept={accept}
                    isAccepting={isAccepting}
                  />
                ))}
              </div>
            </div>
          )}

          {answers.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No answers yet. Be the first to help.
            </p>
          )}
        </div>
      )}

      <div className="mt-6 border-t border-border pt-6">
        {user ? (
          <AnswerForm questionId={questionId} />
        ) : (
          <p className="text-sm text-muted-foreground">
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Log in
            </Link>{" "}
            to post an answer.
          </p>
        )}
      </div>
    </div>
  );
}
