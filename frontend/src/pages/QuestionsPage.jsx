import { useSearchParams } from "react-router-dom";
import useGetAllQuestions from "@/hooks/queries/useGetAllQuestions";
import QuestionFilters from "@/components/question/QuestionFilters";
import QuestionList from "@/components/question/QuestionList";
import Pagination from "@/components/common/Pagination";

export default function QuestionsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();
  const searchTerm = searchParams.get("search");

  const {
    questions,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalQuestions,
  } = useGetAllQuestions(query);

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">
        {searchTerm ? `Results for "${searchTerm}"` : "Questions"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {totalQuestions > 0
          ? `${totalQuestions} question${totalQuestions === 1 ? "" : "s"}`
          : "Browse and filter questions."}
      </p>

      <div className="mt-4">
        <QuestionFilters />
      </div>

      <div className="mt-6">
        <QuestionList
          questions={questions}
          isLoading={isLoading}
          error={error}
        />
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
