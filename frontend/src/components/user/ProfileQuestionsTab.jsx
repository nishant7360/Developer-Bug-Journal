import { useState } from "react";
import useGetUserQuestions from "@/hooks/queries/useGetAllUserQuestions";
import QuestionList from "@/components/question/QuestionList";
import Pagination from "@/components/common/Pagination";

export default function ProfileQuestionsTab() {
  const [page, setPage] = useState(1);
  const { questions, isLoading, error, currentPage, totalPages } =
    useGetUserQuestions(page);

  return (
    <div>
      <QuestionList
        questions={questions}
        isLoading={isLoading}
        error={error}
        emptyMessage="You haven't asked any questions yet."
        emptyActionTo="/ask"
        emptyActionLabel="Ask your first question"
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
