import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCreateComment from "@/hooks/mutations/useCreateComment";

function CommentForm({ questionId }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const { postComment, isPending } = useCreateComment(questionId);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!content.trim()) {
      throw new Error("Comment can't be empty");
    }
    postComment(
      { questionId, content },
      {
        onSuccess: setContent(""),
        onError: (error) => setError(error.message),
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex items-start gap-2">
      <div className="flex-1">
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment"
        />
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
      <Button type="submit" size="sm" disabled={isPending}>
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post"}
      </Button>
    </form>
  );
}

export default CommentForm;
