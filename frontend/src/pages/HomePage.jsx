import useGetAllQuestions from "@/hooks/queries/useGetAllQuestions";
import QuestionList from "@/components/question/QuestionList";

export default function HomePage() {
  const { questions, isLoading, error } = useGetAllQuestions();

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">Recently asked</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        The latest bugs the community is working through.
      </p>

      <div className="mt-6">
        <QuestionList
          questions={questions}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}
