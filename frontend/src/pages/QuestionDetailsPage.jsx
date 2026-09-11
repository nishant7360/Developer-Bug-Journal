import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useGetQuestion from "@/hooks/queries/useGetQuestion";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import QuestionHeader from "@/components/question/QuestionHeader";
import QuestionMeta from "@/components/question/QuestionMeta";
import QuestionBody from "@/components/question/QuestionBody";
import QuestionTagsFooter from "@/components/question/QuestionTagsFooter";
import CommentsPreview from "@/components/comment/CommentsPreview";
import AnswersSection from "@/components/answer/AnswersSection";
import { normalizeTechnologies } from "@/lib/questionUtils";

function QuestionDetailsSkeleton() {
  return (
    <div>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-6 h-7 w-2/3" />
      <Skeleton className="mt-3 h-4 w-40" />
      <Skeleton className="mt-6 h-24 w-full" />
      <Skeleton className="mt-4 h-32 w-full" />
    </div>
  );
}

export default function QuestionDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { question, isLoading, error } = useGetQuestion(id);

  if (isLoading) return <QuestionDetailsSkeleton />;

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center text-sm text-destructive">
        Couldn&apos;t load this question. {error.message}
      </div>
    );
  }

  if (!question) return null;

  const techList = normalizeTechnologies(question.technologies);
  const canAccept =
    user && question.author?._id === user._id && !question.isSolved;

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to questions
      </Link>

      <div className="mt-6">
        <QuestionHeader title={question.title} isSolved={question.isSolved} />
      </div>

      <div className="mt-3">
        <QuestionMeta
          author={question.author}
          createdAt={question.createdAt}
          views={question.views}
          answeresCount={question.answeresCount}
        />
      </div>

      <QuestionBody
        description={question.description}
        errorMessage={question.errorMessage}
        code={question.code}
        image={question.images?.[0]}
      />

      <QuestionTagsFooter
        tags={question.tags}
        techList={techList}
        createdAt={question.createdAt}
      />

      <CommentsPreview />

      <AnswersSection
        questionId={id}
        answeresCount={question.answeresCount}
        canAccept={canAccept}
        user={user}
      />
    </div>
  );
}
