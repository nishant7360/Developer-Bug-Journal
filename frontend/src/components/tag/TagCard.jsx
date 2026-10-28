import { Link } from "react-router-dom";

export default function TagCard({ tag }) {
  const { _id, name, description, questionCount = 0 } = tag;

  return (
    <Link
      to={`/questions?tag=${_id}`}
      className="flex flex-col rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/30"
    >
      <span className="w-fit rounded bg-muted px-2 py-1 font-mono text-sm font-medium text-foreground">
        {name}
      </span>

      <p className="mt-3 line-clamp-3 flex-1 text-sm text-muted-foreground">
        {description || "No description yet."}
      </p>

      <p className="mt-4 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{questionCount}</span>{" "}
        {questionCount === 1 ? "question" : "questions"}
      </p>
    </Link>
  );
}
