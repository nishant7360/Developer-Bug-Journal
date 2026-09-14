import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import QuestionForm from "@/components/question/QuestionForm";
import useGetQuestion from "@/hooks/queries/useGetQuestion";
import useUpdateQuestion from "@/hooks/mutations/useUpdateQuestion";
import { normalizeTechnologies } from "@/lib/questionUtils";

export default function EditQuestionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { question, isLoading, error } = useGetQuestion(id);
  const { update, isPending } = useUpdateQuestion(id);
  const [submitError, setSubmitError] = useState(null);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl">
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="mt-6 h-32 w-full" />
        <Skeleton className="mt-4 h-24 w-full" />
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center text-sm text-destructive">
        Couldn&apos;t load this question. {error?.message}
      </div>
    );
  }

  function handleSubmit(formData) {
    setSubmitError(null);
    update(formData, {
      onSuccess: () => navigate(`/questions/${id}`),
      onError: (err) => setSubmitError(err.message),
    });
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-semibold text-foreground">Edit question</h1>

      <div className="mt-6">
        <QuestionForm
          defaultValues={{
            title: question.title,
            description: question.description,
            errorMessage: question.errorMessage ?? "",
            code: question.code ?? "",
            technologies: normalizeTechnologies(question.technologies),
            tags: question.tags.map((t) => t._id),
          }}
          existingImageUrl={question.images?.[0]?.url}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          submitLabel="Save changes"
          submitPendingLabel="Saving..."
          submitError={submitError}
        />
      </div>
    </div>
  );
}
