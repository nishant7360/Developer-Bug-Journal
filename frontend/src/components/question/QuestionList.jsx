import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import QuestionCard from "./QuestionCard";

function QuestionRowSkeleton() {
  return (
    <div className="px-1 py-4">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      <div className="mt-2 flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

export default function QuestionList({ questions, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="divide-y divide-border rounded-lg border border-border px-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <QuestionRowSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center text-sm text-destructive">
        Couldn&apos;t load questions. {error.message}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-10 text-center">
        <p className="text-sm text-muted-foreground">
          No questions yet. Be the first to ask one.
        </p>
        <Link
          to="/ask"
          className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
        >
          Ask a question
        </Link>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border rounded-lg border border-border px-4">
      {questions.map((question) => (
        <QuestionCard key={question._id} question={question} />
      ))}
    </div>
  );
}
