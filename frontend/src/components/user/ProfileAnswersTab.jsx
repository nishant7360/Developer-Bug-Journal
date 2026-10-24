import { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/common/Pagination";
import useGetUserAnswers from "@/hooks/queries/useGetAllUsersAnswers";
import ProfileAnswerItem from "./ProfileAnswerItem";

export default function ProfileAnswersTab() {
  const [page, setPage] = useState(1);
  const { answers, isLoading, error, currentPage, totalPages } =
    useGetUserAnswers(page);

  if (isLoading) {
    return (
      <div className="divide-y divide-border rounded-lg border border-border px-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="py-4">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="mt-2 h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Couldn&apos;t load your answers. {error.message}
      </p>
    );
  }

  if (answers.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-10 text-center">
        <p className="text-sm text-muted-foreground">
          You haven&apos;t answered any questions yet.
        </p>
        <Link
          to="/questions"
          className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
        >
          Browse questions
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="divide-y divide-border rounded-lg border border-border px-4">
        {answers.map((answer) => (
          <ProfileAnswerItem key={answer._id} answer={answer} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
