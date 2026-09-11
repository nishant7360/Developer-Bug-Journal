import { CheckCircle2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuestionHeader({ title, isSolved }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-2">
        {isSolved && (
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
        )}
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      </div>

      <Button variant="ghost" size="icon" className="shrink-0">
        <Bookmark className="h-5 w-5" />
        <span className="sr-only">Bookmark</span>
      </Button>
    </div>
  );
}
