import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionForm from "@/components/question/QuestionForm";
import useCreateQuestion from "@/hooks/mutations/useCreateQuestion";

export default function AskQuestionPage() {
  const navigate = useNavigate();
  const { create, isPending } = useCreateQuestion();
  const [submitError, setSubmitError] = useState(null);

  function handleSubmit(formData) {
    setSubmitError(null);
    create(formData, {
      onSuccess: (question) => navigate(`/questions/${question._id}`),
      onError: (err) => setSubmitError(err.message),
    });
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-semibold text-foreground">Ask a question</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Describe the bug clearly — the more context, the faster you'll get help.
      </p>

      <div className="mt-6">
        <QuestionForm
          defaultValues={{
            title: "",
            description: "",
            errorMessage: "",
            code: "",
            technologies: [],
            tags: [],
          }}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          submitLabel="Post question"
          submitPendingLabel="Posting..."
          submitError={submitError}
        />
      </div>
    </div>
  );
}
