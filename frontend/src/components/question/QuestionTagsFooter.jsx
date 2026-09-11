import { formatFullDate } from "@/lib/questionUtils";

export default function QuestionTagsFooter({ tags, techList, createdAt }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag._id}
            className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground"
          >
            {tag.name}
          </span>
        ))}
        {techList.map((tech) => (
          <span
            key={tech}
            className="rounded border border-border px-2 py-1 text-xs text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        Posted {formatFullDate(createdAt)}
      </span>
    </div>
  );
}
