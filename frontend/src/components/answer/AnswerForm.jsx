import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useCreateAnswer from "@/hooks/mutations/useCreateAnswer";

export default function AnswerForm({ questionId }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const { postAnswer, isPending } = useCreateAnswer(questionId);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!content.trim()) {
      setError("Answer can't be empty");
      return;
    }

    postAnswer(
      { questionId, content },
      {
        onSuccess: () => setContent(""),
        onError: (err) => setError(err.message),
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        placeholder="Share how you'd solve this..."
      />
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      <Button type="submit" className="mt-2" disabled={isPending}>
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? "Posting..." : "Post answer"}
      </Button>
    </form>
  );
}
