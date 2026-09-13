import { useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import useGetTags from "@/hooks/queries/useGetTags";

const selectClass =
  "h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground sm:w-40";

export default function QuestionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { tags } = useGetTags();

  function updateParam(key, value) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      next.delete("page");
      return next;
    });
  }

  function clearFilters() {
    const search = searchParams.get("search");
    setSearchParams(search ? { search } : {});
  }

  const hasActiveFilters = ["technology", "tag", "status", "sort"].some((k) =>
    searchParams.get(k),
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <input
        value={searchParams.get("technology") ?? ""}
        onChange={(e) => updateParam("technology", e.target.value)}
        placeholder="Technology (e.g. react)"
        className={selectClass}
      />

      <select
        value={searchParams.get("tag") ?? ""}
        onChange={(e) => updateParam("tag", e.target.value)}
        className={selectClass}
      >
        <option value="">All tags</option>
        {tags.map((tag) => (
          <option key={tag._id} value={tag._id}>
            {tag.name}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get("status") ?? ""}
        onChange={(e) => updateParam("status", e.target.value)}
        className={selectClass}
      >
        <option value="">All</option>
        <option value="solved">Solved</option>
        <option value="unsolved">Unsolved</option>
      </select>

      <select
        value={searchParams.get("sort") ?? "newest"}
        onChange={(e) => updateParam("sort", e.target.value)}
        className={selectClass}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="mostViewed">Most viewed</option>
      </select>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="h-4 w-4" />
          Clear filters
        </Button>
      )}
    </div>
  );
}
